import { Resend } from "resend";
import { NextResponse } from "next/server";

// Where lead notifications go, and the address they are sent from. Both can be changed in
// Vercel without touching code (server-only variables; no NEXT_PUBLIC_ prefix):
//   LEAD_NOTIFY_EMAIL   e.g. outreach@useleadsync.com
//   RESEND_FROM_EMAIL   e.g. LeadSync <outreach@useleadsync.com>
// Resend's shared test sender (onboarding@resend.dev, the default below) can only deliver to the
// email on your own Resend account. To notify any other address, first verify the domain in
// Resend and set RESEND_FROM_EMAIL to an address on it; otherwise Resend refuses the send.
const RECIPIENT = process.env.LEAD_NOTIFY_EMAIL?.trim() || "malekabdelrahmanco@gmail.com";
const FROM = process.env.RESEND_FROM_EMAIL?.trim() || "LeadSync Contact <onboarding@resend.dev>";

const MAX_BODY_BYTES = 10_000;
const LIMITS = { name: 100, email: 254, business: 200, task: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------------------------------------------------------------------
// Rate limiting (best effort). On serverless hosts every instance keeps its own
// memory, so this slows casual abuse but is not a hard guarantee.
//
// Two limiters, so ordinary typos never use up the email quota while floods of
// invalid requests are still capped:
//   - sendLimiter:    valid submissions about to be emailed, 5 per 10 minutes.
//   - requestLimiter: every request, valid or not, as a flood guard.
// Requests with no trustworthy IP share one bucket per limiter with a higher
// ceiling, so a missing IP can't be used to dodge limits and can't lock out
// every visitor after a handful of messages.
// ---------------------------------------------------------------------------
const WINDOW_MS = 10 * 60 * 1000;
const MAX_TRACKED_IPS = 2000;

type Limiter = { max: number; unknownMax: number; hits: Map<string, number[]> };

function createLimiter(max: number, unknownMax: number): Limiter {
  return { max, unknownMax, hits: new Map() };
}

const sendLimiter = createLimiter(5, 30);
const requestLimiter = createLimiter(30, 120);

// Returns true if the request is allowed (and records it), false if limited.
function takeSlot(limiter: Limiter, ip: string): boolean {
  const { hits } = limiter;
  const now = Date.now();
  const max = ip === "unknown" ? limiter.unknownMax : limiter.max;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= max) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.delete(ip); // re-insert so Map order tracks recency
  hits.set(ip, recent);
  if (hits.size > MAX_TRACKED_IPS) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
    // Hard cap: if still too large, drop the least recently seen entries.
    while (hits.size > MAX_TRACKED_IPS) {
      const oldest = hits.keys().next().value;
      if (oldest === undefined) break;
      hits.delete(oldest);
    }
  }
  return true;
}

// Forwarding headers are only trustworthy when a platform proxy sets them.
// On Vercel the edge proxy sets x-real-ip to the client IP (it is the header
// Vercel's own `ipAddress()` helper reads) and overwrites x-forwarded-for
// rather than passing client-supplied values through. Anywhere else those
// headers are client-controlled, so they are ignored.
function clientIp(req: Request): string {
  if (process.env.VERCEL !== "1") return "unknown";
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  const last = req.headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  if (last) return last.slice(0, 64);
  return "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// undefined/null -> "" (optional field left empty), non-string -> null (invalid)
function readField(value: unknown): string | null {
  if (value === undefined || value === null) return "";
  return typeof value === "string" ? value.trim() : null;
}

function fail(error: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json({ ok: false, error }, { status, headers });
}

const TOO_MANY = { "Retry-After": String(WINDOW_MS / 1000) };

// Reads the body as a stream and stops as soon as it exceeds the cap, so an
// oversized (or chunked / mislabelled) body is never fully buffered.
async function readBodyCapped(
  req: Request,
  maxBytes: number
): Promise<{ ok: true; text: string } | { ok: false; reason: "too_large" | "unreadable" }> {
  if (!req.body) return { ok: true, text: "" };
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => {});
        return { ok: false, reason: "too_large" };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "unreadable" };
  }
  return { ok: true, text: Buffer.concat(chunks).toString("utf8") };
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  // Every request counts here, valid or not.
  if (!takeSlot(requestLimiter, ip)) {
    return fail("Too many requests. Please try again in a few minutes.", 429, TOO_MANY);
  }

  // Reject on the declared size before touching the body.
  const declared = Number(req.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return fail("Your message is too long.", 413);
  }

  // The header can be absent (chunked) or wrong, so the read itself is capped too.
  const read = await readBodyCapped(req, MAX_BODY_BYTES);
  if (!read.ok) {
    return read.reason === "too_large"
      ? fail("Your message is too long.", 413)
      : fail("Invalid request.", 400);
  }

  let body: unknown;
  try {
    body = JSON.parse(read.text);
  } catch {
    return fail("Invalid request.", 400);
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return fail("Invalid request.", 400);
  }
  const input = body as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field. Bots get a silent
  // "ok" so they don't learn they were filtered; nothing is sent and the email
  // quota is not touched.
  if (typeof input.contact_ref === "string" && input.contact_ref.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = readField(input.name);
  const email = readField(input.email);
  const business = readField(input.business);
  const task = readField(input.task);

  if (name === null || email === null || business === null || task === null) {
    return fail("Invalid request.", 400);
  }
  if (!name || !email) {
    return fail("Name and email are required.", 400);
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    business.length > LIMITS.business ||
    task.length > LIMITS.task
  ) {
    return fail("One of the fields is too long.", 400);
  }
  if (!EMAIL_RE.test(email) || /[\r\n]/.test(email)) {
    return fail("Please enter a valid email address.", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set; cannot send email.");
    return NextResponse.json(
      {
        ok: false,
        code: "email_not_configured",
        error:
          "The contact form is temporarily unavailable. Please message me on WhatsApp or email instead.",
      },
      { status: 500 }
    );
  }

  // Only a fully valid submission that is about to be emailed uses the quota.
  if (!takeSlot(sendLimiter, ip)) {
    return fail("Too many messages in a short time. Please try again in a few minutes.", 429, TOO_MANY);
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeBusiness = escapeHtml(business);
  const safeTask = escapeHtml(task).replace(/\r?\n/g, "<br>");
  const subjectName = name.replace(/[\r\n]+/g, " ");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: email,
      subject: `New enquiry from ${subjectName}`,
      html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0B1024;color:#F4F6FF;border-radius:12px;">
        <h2 style="margin:0 0 24px;font-size:22px;font-weight:600;">New contact from LeadSync site</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#A7AECB;font-size:13px;width:140px;">Name</td>
            <td style="padding:10px 0;font-size:15px;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#A7AECB;font-size:13px;">Email</td>
            <td style="padding:10px 0;font-size:15px;"><a href="mailto:${safeEmail}" style="color:#00C2E0;">${safeEmail}</a></td>
          </tr>
          ${business ? `
          <tr>
            <td style="padding:10px 0;color:#A7AECB;font-size:13px;">Business</td>
            <td style="padding:10px 0;font-size:15px;">${safeBusiness}</td>
          </tr>` : ""}
          ${task ? `
          <tr>
            <td style="padding:10px 0;color:#A7AECB;font-size:13px;vertical-align:top;">Repetitive task</td>
            <td style="padding:10px 0;font-size:15px;line-height:1.5;">${safeTask}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:#6B7297;">
          Sent via LeadSync contact form
        </div>
      </div>
    `,
    });

    if (error) {
      console.error("Contact form: Resend rejected the email:", error.name, error.message);
      return fail(
        "We couldn't send your message right now. Please try again, or message me on WhatsApp or email.",
        502
      );
    }
  } catch (err) {
    console.error("Contact form: email delivery threw:", err instanceof Error ? err.message : err);
    return fail(
      "We couldn't send your message right now. Please try again, or message me on WhatsApp or email.",
      502
    );
  }

  return NextResponse.json({ ok: true });
}

import { Resend } from "resend";
import { NextResponse } from "next/server";

const RECIPIENT = "malekabdelrahmanco@gmail.com";
const FROM = "LeadSync Contact <onboarding@resend.dev>";

const MAX_BODY_CHARS = 10_000;
const LIMITS = { name: 100, email: 254, business: 200, task: 2000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort limiter. On serverless hosts each instance keeps its own memory,
// so this slows casual abuse but is not a hard guarantee.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return false;
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

function fail(error: string, status: number) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return fail("Too many messages in a short time. Please try again in a few minutes.", 429);
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return fail("Invalid request.", 400);
  }
  if (raw.length > MAX_BODY_CHARS) {
    return fail("Your message is too long.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return fail("Invalid request.", 400);
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return fail("Invalid request.", 400);
  }
  const input = body as Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field. Bots get a silent
  // "ok" so they don't learn they were filtered; nothing is sent.
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

import { createHash } from "crypto";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { validateQualification } from "../../lib/qualification";
import {
  WINDOW_MS,
  clientIp,
  createLimiter,
  escapeHtml,
  readBodyCapped,
  takeSlot,
} from "../../lib/security";

// Prospect qualification submissions are emailed to the owner through Resend, the same
// mechanism as the contact form. There is no database: the email is the record.
const RECIPIENT = "malekabdelrahmanco@gmail.com";
const FROM = "LeadSync Contact <onboarding@resend.dev>";

const MAX_BODY_BYTES = 10_000;
const TOO_MANY = { "Retry-After": String(WINDOW_MS / 1000) };

// Same limits as the contact form: 5 emailed submissions and 30 requests of any kind
// per 10 minutes per client. Validation mistakes never use the email quota.
const sendLimiter = createLimiter(5, 30);
const requestLimiter = createLimiter(30, 120);

// Remembers recent submissions so a double click, retry or page reload cannot email the
// same enquiry twice. In-memory and best effort, like the rate limiter.
const recent = new Map<string, number>();
function isDuplicate(key: string): boolean {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t >= WINDOW_MS) recent.delete(k);
  if (recent.has(key)) return true;
  recent.set(key, now);
  if (recent.size > 500) recent.delete(recent.keys().next().value as string);
  return false;
}

function fail(error: string, status: number, extra?: Record<string, unknown>, headers?: Record<string, string>) {
  return NextResponse.json({ ok: false, error, ...extra }, { status, headers });
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (!takeSlot(requestLimiter, ip)) {
    return fail("Too many requests. Please try again in a few minutes.", 429, undefined, TOO_MANY);
  }

  const declared = Number(req.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > MAX_BODY_BYTES) {
    return fail("Your message is too long.", 413);
  }

  const read = await readBodyCapped(req, MAX_BODY_BYTES);
  if (!read.ok) {
    return read.reason === "too_large" ? fail("Your message is too long.", 413) : fail("Invalid request.", 400);
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

  // Honeypot: real visitors never see or fill this field. Bots get a silent "ok";
  // nothing is emailed and the email quota is untouched.
  if (typeof input.ref_code === "string" && input.ref_code.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const result = validateQualification(input);
  if (!result.ok) {
    return fail("Please check the highlighted fields.", 400, { errors: result.errors });
  }
  const q = result.value;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Qualification form: RESEND_API_KEY is not set; cannot send email.");
    return fail(
      "The booking form is temporarily unavailable. Please email or message LeadSync directly instead.",
      500,
      { code: "email_not_configured" }
    );
  }

  const fingerprint = createHash("sha256")
    .update(`${q.email.toLowerCase()}|${q.company.toLowerCase()}|${q.description}`)
    .digest("hex");
  if (isDuplicate(fingerprint)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  if (!takeSlot(sendLimiter, ip)) {
    recent.delete(fingerprint);
    return fail("Too many submissions in a short time. Please try again in a few minutes.", 429, undefined, TOO_MANY);
  }

  const row = (label: string, value: string, multiline = false) => `
          <tr>
            <td style="padding:9px 0;color:#A7AECB;font-size:13px;width:150px;vertical-align:top;">${escapeHtml(label)}</td>
            <td style="padding:9px 0;font-size:15px;line-height:1.5;">${
              value ? (multiline ? escapeHtml(value).replace(/\r?\n/g, "<br>") : escapeHtml(value)) : "<span style=\"color:#6B7297;\">Not provided</span>"
            }</td>
          </tr>`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      replyTo: q.email,
      subject: `New discovery call enquiry: ${q.name} (${q.company})`.replace(/[\r\n]+/g, " ").slice(0, 200),
      html: `
      <div style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:32px;background:#0B1024;color:#F4F6FF;border-radius:12px;">
        <h2 style="margin:0 0 6px;font-size:22px;font-weight:600;">New discovery call enquiry</h2>
        <p style="margin:0 0 24px;color:#A7AECB;font-size:14px;">Submitted through the LeadSync qualification form. A call is only booked when Calendly confirms it.</p>
        <table style="width:100%;border-collapse:collapse;">${row("Name", q.name)}${row("Email", q.email)}${row("Company", q.company)}${row("Website", q.website)}${row("Role", q.role)}${row("Industry", q.industry)}${row("Company size", q.companySize + " employees")}${row("Country", q.country)}${row("Main challenge", q.challenge)}${row("Problem", q.description, true)}${row("Monthly budget", q.budget)}${row("Consent", "Agreed to be contacted about this enquiry")}
        </table>
      </div>
    `,
    });

    if (error) {
      recent.delete(fingerprint);
      console.error("Qualification form: Resend rejected the email:", error.name, error.message);
      return fail("We couldn't send your details right now. Please try again, or email LeadSync directly.", 502);
    }
  } catch (err) {
    recent.delete(fingerprint);
    console.error("Qualification form: email delivery threw:", err instanceof Error ? err.message : err);
    return fail("We couldn't send your details right now. Please try again, or email LeadSync directly.", 502);
  }

  return NextResponse.json({ ok: true });
}

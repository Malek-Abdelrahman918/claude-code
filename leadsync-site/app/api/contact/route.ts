import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, business, task } = await req.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "LeadSync Contact <onboarding@resend.dev>",
    to: "malekabdelrahmanco@gmail.com",
    replyTo: email,
    subject: `New enquiry from ${name}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0B1024;color:#F4F6FF;border-radius:12px;">
        <h2 style="margin:0 0 24px;font-size:22px;font-weight:600;">New contact from LeadSync site</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#A7AECB;font-size:13px;width:140px;">Name</td>
            <td style="padding:10px 0;font-size:15px;">${name}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#A7AECB;font-size:13px;">Email</td>
            <td style="padding:10px 0;font-size:15px;"><a href="mailto:${email}" style="color:#00C2E0;">${email}</a></td>
          </tr>
          ${business ? `
          <tr>
            <td style="padding:10px 0;color:#A7AECB;font-size:13px;">Business</td>
            <td style="padding:10px 0;font-size:15px;">${business}</td>
          </tr>` : ""}
          ${task ? `
          <tr>
            <td style="padding:10px 0;color:#A7AECB;font-size:13px;vertical-align:top;">Repetitive task</td>
            <td style="padding:10px 0;font-size:15px;line-height:1.5;">${task}</td>
          </tr>` : ""}
        </table>
        <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,.08);font-size:12px;color:#6B7297;">
          Sent via LeadSync contact form
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

"use client";

import { useState } from "react";
import { ArrowRight, Linkedin, MessageCircle, Mail, ArrowUpRight } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const read = (field: string) =>
      (form.elements.namedItem(field) as HTMLInputElement | HTMLTextAreaElement | null)?.value ?? "";
    const data = {
      name: read("name"),
      email: read("email"),
      business: read("business"),
      task: read("task"),
      contact_ref: read("contact_ref"),
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      const body = await res.json().catch(() => null);

      // Only treat the message as sent when the server explicitly confirms it.
      if (!res.ok || body?.ok !== true) {
        throw new Error(
          typeof body?.error === "string" && body.error
            ? body.error
            : "Something went wrong. Please try again, or message me on WhatsApp or email."
        );
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      if (err instanceof DOMException && err.name === "AbortError") {
        setErrorMsg("The request timed out and your message was not confirmed as sent. Please try again, or message me on WhatsApp or email.");
      } else if (err instanceof TypeError) {
        setErrorMsg("Couldn't reach the server, so your message was not sent. Check your connection and try again.");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <section id="contact">
      <div className="container">
        <div className="section-head">
          <span className="overline">Contact</span>
          <h2>Let&apos;s see if I can help.</h2>
          <p>
            Tell me what&apos;s broken in two sentences. I&apos;ll come back
            within 24 hours with either &quot;yes, here&apos;s how&quot; or a
            referral to someone better suited.
          </p>
        </div>

        <div className="contact-wrap">
          <form
            className="form"
            onSubmit={handleSubmit}
            onChange={() => {
              // Editing after a result clears it so the form can be sent again.
              if (status === "success" || status === "error") setStatus("idle");
            }}
          >
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" placeholder="Jane Doe" maxLength={100} required />
            </div>
            <div className="field">
              <label htmlFor="email">Work email</label>
              <input id="email" name="email" type="email" placeholder="jane@company.com" maxLength={254} required />
            </div>
            <div className="field">
              <label htmlFor="business">What does your business do?</label>
              <input id="business" name="business" type="text" placeholder="Real estate agency in New Cairo" maxLength={200} />
            </div>
            <div className="field">
              <label htmlFor="task">What&apos;s the most repetitive task on your team?</label>
              <textarea
                id="task"
                name="task"
                placeholder="We get 80 WhatsApp messages a day asking the same 5 questions..."
                maxLength={2000}
              />
            </div>

            {/* Spam trap: off-screen, and inert so it can't be focused, clicked, or read by assistive tech. */}
            <div
              aria-hidden="true"
              ref={(el) => el?.setAttribute("inert", "")}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
            >
              <label htmlFor="contact_ref">Leave this field empty</label>
              <input id="contact_ref" name="contact_ref" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div aria-live="polite">
              {status === "loading" && (
                <p style={{ color: "var(--fg-muted)", fontSize: 15, margin: 0 }}>Sending your message…</p>
              )}
              {status === "success" && (
                <p className="form-success">
                  Message sent. I&apos;ll reply within 24 hours.
                </p>
              )}
              {status === "error" && (
                <p className="form-error" role="alert">{errorMsg}</p>
              )}
            </div>

            <button
              className="btn btn--primary btn--lg"
              type="submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending…" : status === "success" ? "Sent ✓" : (
                <>Send <ArrowRight size={18} className="arrow" /></>
              )}
            </button>
          </form>

          <div className="contact-links">
            <a href="https://www.linkedin.com/in/malek-abdelrahmanma/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={22} className="ico" />
              <div>
                <div className="ll">LinkedIn</div>
                <div className="vv">/in/malek-abdelrahmanma</div>
              </div>
              <ArrowUpRight size={16} className="arrow" />
            </a>
            <a href="https://wa.me/201142339381" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={22} className="ico" />
              <div>
                <div className="ll">WhatsApp</div>
                <div className="vv">+20 114 233 9381</div>
              </div>
              <ArrowUpRight size={16} className="arrow" />
            </a>
            <a href="mailto:hi@leadsync.dev">
              <Mail size={22} className="ico" />
              <div>
                <div className="ll">Email</div>
                <div className="vv">hi@leadsync.dev</div>
              </div>
              <ArrowUpRight size={16} className="arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

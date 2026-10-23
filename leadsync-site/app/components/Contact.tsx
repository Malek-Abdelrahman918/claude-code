"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

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
    <section id="contact" className="section on-dark" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">02</span>
          <span>Contact</span>
        </p>

        <div className="contact__grid">
          <div>
            <div className="contact__intro">
              <h2 id="contact-title" className="h2">
                Prefer to <span className="serif">ask first?</span>
              </h2>
              <p className="lede">
                Not ready to book a call? Send a question and I’ll reply by email. To book a
                discovery call, use the <Link href="/book">booking page</Link>.
              </p>
            </div>

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
                <input id="business" name="business" type="text" placeholder="e.g. A clinic, agency or distributor in Cairo" maxLength={200} />
              </div>
              <div className="field">
                <label htmlFor="task">Where is your team losing the most time?</label>
                <textarea
                  id="task"
                  name="task"
                  placeholder="e.g. Enquiries arrive on WhatsApp, email and forms, and someone copies them into a spreadsheet by hand."
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
                {status === "loading" && <p className="form-status">Sending your message…</p>}
                {status === "success" && (
                  <p className="form-success">Message sent. Thank you for getting in touch.</p>
                )}
                {status === "error" && (
                  <p className="form-error" role="alert">{errorMsg}</p>
                )}
              </div>

              <button
                className="btn btn--lg"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending…" : status === "success" ? "Sent ✓" : (
                  <>Send <ArrowRight size={18} className="arrow" aria-hidden="true" /></>
                )}
              </button>
            </form>
          </div>

          <aside aria-label="Other ways to reach me">
            <p className="tag">Prefer to write directly?</p>
            <ul className="channels">
              <li>
                <a className="channel" href="https://wa.me/201142339381" target="_blank" rel="noopener noreferrer">
                  <span className="tag">WhatsApp</span>
                  <span className="channel__value">+20 114 233 9381</span>
                  <ArrowUpRight size={20} className="arrow" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a className="channel" href="mailto:Outreach@useleadsync.com">
                  <span className="tag">Email</span>
                  <span className="channel__value">Outreach@useleadsync.com</span>
                  <ArrowUpRight size={20} className="arrow" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  className="channel"
                  href="https://www.linkedin.com/in/malek-abdelrahmanma/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="tag">LinkedIn</span>
                  <span className="channel__value">/in/malek-abdelrahmanma</span>
                  <ArrowUpRight size={20} className="arrow" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

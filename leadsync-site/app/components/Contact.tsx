"use client";

import { useState } from "react";
import { ArrowRight, Linkedin, MessageCircle, Mail, ArrowUpRight } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      business: (form.elements.namedItem("business") as HTMLInputElement).value,
      task: (form.elements.namedItem("task") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
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
          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Your name</label>
              <input id="name" name="name" type="text" placeholder="Jane Doe" required />
            </div>
            <div className="field">
              <label htmlFor="email">Work email</label>
              <input id="email" name="email" type="email" placeholder="jane@company.com" required />
            </div>
            <div className="field">
              <label htmlFor="business">What does your business do?</label>
              <input id="business" name="business" type="text" placeholder="Real estate brokerage in Dubai" />
            </div>
            <div className="field">
              <label htmlFor="task">What&apos;s the most repetitive task on your team?</label>
              <textarea
                id="task"
                name="task"
                placeholder="We get 80 WhatsApp messages a day asking the same 5 questions..."
              />
            </div>

            {status === "success" && (
              <p className="form-success">Sent. Talk soon — usually within 24 hours.</p>
            )}
            {status === "error" && (
              <p className="form-error">{errorMsg}</p>
            )}

            <button
              className="btn btn--primary btn--lg"
              type="submit"
              disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? "Sending…" : status === "success" ? "Sent ✓" : (
                <>Send <ArrowRight size={18} className="arrow" /></>
              )}
            </button>
          </form>

          <div className="contact-links">
            <a href="https://linkedin.com/in/malek-abdelrahman" target="_blank" rel="noopener noreferrer">
              <Linkedin size={22} className="ico" />
              <div>
                <div className="ll">LinkedIn</div>
                <div className="vv">/in/malek-abdelrahman</div>
              </div>
              <ArrowUpRight size={16} className="arrow" />
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
              <MessageCircle size={22} className="ico" />
              <div>
                <div className="ll">WhatsApp</div>
                <div className="vv">+971 · message me directly</div>
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

"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CALENDLY_URL, CONTACT_EMAIL, WHATSAPP_URL } from "../lib/config";
import {
  BUDGETS,
  CHALLENGES,
  COMPANY_SIZES,
  INDUSTRIES,
  LIMITS,
  validateQualification,
  type FieldErrors,
  type FieldName,
} from "../lib/qualification";

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: { name?: string; email?: string };
      }) => void;
    };
  }
}

type Values = {
  name: string;
  email: string;
  company: string;
  website: string;
  role: string;
  industry: string;
  companySize: string;
  country: string;
  challenge: string;
  description: string;
  budget: string;
  consent: boolean;
};

const EMPTY: Values = {
  name: "",
  email: "",
  company: "",
  website: "",
  role: "",
  industry: "",
  companySize: "",
  country: "",
  challenge: "",
  description: "",
  budget: "",
  consent: false,
};

const CALENDLY_SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
const CALENDLY_STYLES = "https://assets.calendly.com/assets/external/widget.css";

function loadCalendly(): Promise<void> {
  if (window.Calendly) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CALENDLY_STYLES}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_STYLES;
      document.head.appendChild(link);
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT}"]`);
    const script = existing ?? Object.assign(document.createElement("script"), { src: CALENDLY_SCRIPT, async: true });
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => {
      script.remove(); // a failed tag can never fire "load" again, so a retry must start from a fresh one
      reject(new Error("Calendly failed to load"));
    });
    if (!existing) document.body.appendChild(script);
  });
}

/** Shown whenever the calendar can't be used. The details were already sent, so nothing is lost. */
function BookingFallback({ notConfigured, onRetry }: { notConfigured: boolean; onRetry?: () => void }) {
  return (
    <div className="book__fallback" role="alert">
      <p className="h3" style={{ margin: 0 }}>
        {notConfigured ? "Online booking isn’t switched on yet." : "The booking calendar didn’t load."}
      </p>
      <p className="small" style={{ margin: "10px 0 0", maxWidth: "46ch" }}>
        Your details have already been sent to LeadSync, so there’s no need to fill in the form again.
        To arrange a time, email or message directly and a time will be agreed with you.
      </p>
      <div className="row">
        <a className="btn" href={`mailto:${CONTACT_EMAIL}?subject=Discovery%20call`}>
          Email {CONTACT_EMAIL}
        </a>
        <a className="btn btn--ghost" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        {!notConfigured && onRetry && (
          <button type="button" className="btn btn--ghost" onClick={onRetry}>
            Try the calendar again
          </button>
        )}
      </div>
    </div>
  );
}

type CalendarState = "loading" | "ready" | "slow" | "error" | "booked";

function CalendlyStep({ name, email }: { name: string; email: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CalendarState>("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const url = CALENDLY_URL;
    if (!url || !hostRef.current) return;
    const host = hostRef.current;
    let cancelled = false;
    setState("loading");

    // Calendly posts messages from its own iframe; only trust its origin.
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const event = e.data && typeof e.data === "object" ? (e.data as { event?: unknown }).event : undefined;
      if (typeof event !== "string" || !event.startsWith("calendly.")) return;
      setState((prev) => (event === "calendly.event_scheduled" ? "booked" : prev === "booked" ? prev : "ready"));
    };
    window.addEventListener("message", onMessage);
    const slowTimer = window.setTimeout(() => setState((s) => (s === "loading" ? "slow" : s)), 12000);

    loadCalendly()
      .then(() => {
        if (cancelled || !window.Calendly) return;
        // Only the name and email are passed along, and only through Calendly's own prefill option.
        window.Calendly.initInlineWidget({ url, parentElement: host, prefill: { name, email } });
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
      window.clearTimeout(slowTimer);
      window.removeEventListener("message", onMessage);
      host.innerHTML = "";
    };
  }, [name, email, attempt]);

  if (!CALENDLY_URL) return <BookingFallback notConfigured />;

  // The calendar container stays mounted (hidden) while the fallback is showing, so a retry
  // has somewhere to render.
  return (
    <div>
      {state === "error" && <BookingFallback notConfigured={false} onRetry={() => setAttempt((n) => n + 1)} />}
      {state === "booked" && (
        <p className="book__banner" role="status">
          <strong>You’re booked.</strong> Check your inbox for the confirmation from Calendly.
        </p>
      )}
      {(state === "loading" || state === "slow") && (
        <p className="form-status" role="status">
          {state === "slow"
            ? `The calendar is taking longer than usual. If it doesn’t appear, email ${CONTACT_EMAIL} and a time will be agreed with you.`
            : "Loading the calendar…"}
        </p>
      )}
      <div className="calendly-host" ref={hostRef} hidden={state === "error"} />
    </div>
  );
}

export default function Booking() {
  const [step, setStep] = useState<"form" | "book">("form");
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sending = useRef(false);

  useEffect(() => {
    if (step === "book") headingRef.current?.focus();
  }, [step]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as FieldName]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key as FieldName];
        return next;
      });
    }
  };

  // Show the message for one field when the visitor leaves it.
  const checkField = (key: FieldName) => {
    const result = validateQualification({ ...values });
    setErrors((e) => {
      const next = { ...e };
      if (!result.ok && result.errors[key]) next[key] = result.errors[key];
      else delete next[key];
      return next;
    });
  };

  const control = (key: Exclude<FieldName, "consent">, required = true) => ({
    id: `q-${key}`,
    name: key,
    value: values[key],
    "aria-invalid": errors[key] ? (true as const) : undefined,
    "aria-describedby": errors[key] ? `q-${key}-error` : undefined,
    "aria-required": required ? (true as const) : undefined,
    onBlur: () => checkField(key),
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => set(key, e.target.value as never),
  });

  const fieldError = (key: FieldName) =>
    errors[key] ? (
      <p className="field__error" id={`q-${key}-error`}>
        {errors[key]}
      </p>
    ) : null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending.current) return; // blocks double clicks and double Enter presses

    const result = validateQualification({ ...values });
    if (!result.ok) {
      setErrors(result.errors);
      setStatus("idle");
      setServerError("");
      const first = (Object.keys(result.errors) as FieldName[])[0];
      document.getElementById(`q-${first}`)?.focus();
      return;
    }

    const trap = (new FormData(e.currentTarget).get("ref_code") as string | null) ?? "";
    sending.current = true;
    setErrors({});
    setServerError("");
    setStatus("submitting");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.value, ref_code: trap }),
        signal: controller.signal,
      });
      const body = await res.json().catch(() => null);

      // Move on only when the server explicitly confirms the details were received.
      if (res.ok && body?.ok === true) {
        setStatus("idle");
        setStep("book");
        return;
      }
      if (res.status === 400 && body?.errors && typeof body.errors === "object") {
        setErrors(body.errors as FieldErrors);
      }
      setStatus("error");
      setServerError(
        typeof body?.error === "string" && body.error
          ? body.error
          : "Something went wrong. Please try again, or email us directly."
      );
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof DOMException && err.name === "AbortError"
          ? "The request timed out and your details were not confirmed as sent. Please try again."
          : "Couldn’t reach the server, so your details were not sent. Check your connection and try again."
      );
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  }

  const firstName = values.name.trim().split(/\s+/)[0] || "there";

  return (
    <section id="book" className="section on-light" aria-labelledby="book-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">08</span>
          <span>Book a discovery call</span>
        </p>

        <div className="shead">
          <h2 id="book-title" className="h2">
            Share a few details, <span className="serif">then pick a time.</span>
          </h2>
          <p className="lede">
            A short form helps make the call useful for both sides. Once it’s sent, you can choose a
            time that suits you.
          </p>
        </div>

        <ol className="book__steps" aria-label="Booking steps">
          <li aria-current={step === "form" ? "step" : undefined} className={step === "book" ? "done" : undefined}>
            <span className="n" aria-hidden="true">1</span>
            Your business
          </li>
          <li aria-current={step === "book" ? "step" : undefined}>
            <span className="n" aria-hidden="true">2</span>
            Choose a time
          </li>
        </ol>

        {step === "form" ? (
          <form className="form form--grid qform" onSubmit={onSubmit} noValidate aria-label="Discovery call qualification form">
            <div className="field">
              <label htmlFor="q-name">Full name</label>
              <input type="text" autoComplete="name" maxLength={LIMITS.name} placeholder="Jane Doe" {...control("name")} />
              {fieldError("name")}
            </div>

            <div className="field">
              <label htmlFor="q-email">Work email</label>
              <input type="email" autoComplete="email" maxLength={LIMITS.email} placeholder="jane@company.com" {...control("email")} />
              {fieldError("email")}
            </div>

            <div className="field">
              <label htmlFor="q-company">Company name</label>
              <input type="text" autoComplete="organization" maxLength={LIMITS.company} {...control("company")} />
              {fieldError("company")}
            </div>

            <div className="field">
              <label htmlFor="q-website">
                Company website <span className="opt">(optional)</span>
              </label>
              <input type="text" inputMode="url" autoComplete="url" maxLength={LIMITS.website} placeholder="company.com" {...control("website", false)} />
              {fieldError("website")}
            </div>

            <div className="field">
              <label htmlFor="q-role">Job title or role</label>
              <input type="text" autoComplete="organization-title" maxLength={LIMITS.role} {...control("role")} />
              {fieldError("role")}
            </div>

            <div className="field">
              <label htmlFor="q-country">Country</label>
              <input type="text" autoComplete="country-name" maxLength={LIMITS.country} {...control("country")} />
              {fieldError("country")}
            </div>

            <div className="field">
              <label htmlFor="q-industry">Industry</label>
              <select {...control("industry")}>
                <option value="">Select an industry</option>
                {INDUSTRIES.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {fieldError("industry")}
            </div>

            <div className="field">
              <label htmlFor="q-companySize">Company size</label>
              <select {...control("companySize")}>
                <option value="">Select a range</option>
                {COMPANY_SIZES.map((o) => (
                  <option key={o} value={o}>{o} employees</option>
                ))}
              </select>
              {fieldError("companySize")}
            </div>

            <div className="field field--full">
              <label htmlFor="q-challenge">Main operational challenge</label>
              <select {...control("challenge")}>
                <option value="">Select the closest match</option>
                {CHALLENGES.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {fieldError("challenge")}
            </div>

            <div className="field field--full">
              <label htmlFor="q-description">Briefly describe the problem</label>
              <textarea
                maxLength={LIMITS.description}
                placeholder="e.g. Enquiries arrive on WhatsApp, email and forms, and someone copies them into a spreadsheet by hand."
                {...control("description")}
              />
              {fieldError("description")}
            </div>

            <div className="field field--full">
              <label htmlFor="q-budget">
                Estimated monthly budget for solving this <span className="opt">(optional)</span>
              </label>
              <select {...control("budget", false)}>
                <option value="">Prefer not to say</option>
                {BUDGETS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
              {fieldError("budget")}
            </div>

            {/* Spam trap: off-screen, and inert so it can't be focused, clicked, or read by assistive tech. */}
            <div
              aria-hidden="true"
              ref={(el) => el?.setAttribute("inert", "")}
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
            >
              <label htmlFor="q-ref_code">Leave this field empty</label>
              <input id="q-ref_code" name="ref_code" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="field field--full">
              <label className="check" htmlFor="q-consent">
                <input
                  id="q-consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? "q-consent-error" : "q-privacy"}
                  aria-required="true"
                  onChange={(e) => set("consent", e.target.checked)}
                />
                <span>I agree that LeadSync may use these details to review my enquiry and contact me about a discovery call.</span>
              </label>
              {fieldError("consent")}
              <p className="small qform__privacy" id="q-privacy">
                Privacy notice: your answers are sent to LeadSync by email and used only to assess your
                enquiry and arrange a call. If you then book a time, Calendly also processes your name,
                email and chosen time under its own privacy policy. Please don’t include sensitive
                personal information. To ask for your details to be corrected or deleted, email {CONTACT_EMAIL}.
              </p>
            </div>

            <div className="field field--full qform__foot" aria-live="polite">
              {status === "submitting" && <p className="form-status">Sending your details…</p>}
              {status === "error" && (
                <p className="form-error" role="alert">{serverError}</p>
              )}
              {Object.keys(errors).length > 0 && status !== "error" && (
                <p className="form-error" role="alert">Please fix the highlighted fields and try again.</p>
              )}
            </div>

            <button className="btn btn--lg" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                "Sending…"
              ) : (
                <>
                  Continue to choose a time <ArrowRight size={18} className="arrow" aria-hidden="true" />
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="book__panel">
            <h3 className="h3" tabIndex={-1} ref={headingRef} style={{ marginBottom: 8 }}>
              Thanks, {firstName}. Now choose a time.
            </h3>
            <p className="small" style={{ margin: "0 0 24px", maxWidth: "52ch" }}>
              Your details have been sent to LeadSync. Pick a date and time below to book the call.
            </p>
            <CalendlyStep name={values.name.trim()} email={values.email.trim()} />
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Clinic facts — the single source of truth for anything factual on the site.
 *
 * Rule: nothing here is invented. Every field is either
 *   - "listed":  found in a public directory listing (Vezeeta / directory aggregators),
 *                consistent across sources, but NOT yet confirmed by the clinic, or
 *   - null:      unknown. The UI renders a discreet "to be confirmed" annotation
 *                instead of a fake value.
 *
 * Once the clinic confirms details, fill them in here — no component changes needed.
 */

export type Credential = { title: string; detail?: string };

export type ClinicFacts = {
  /** Surname is consistent across the brief, the meeting invite and public listings. */
  brandName: string;
  /** Full doctor name. Brief says "Mahmoud", public listing + meeting invite say "Mohamed". Unresolved. */
  doctorFullName: string | null;
  /** Professional title as the clinic wants it shown. */
  doctorTitle: string | null;
  credentials: Credential[];
  doctorPhoto: string | null;
  area: string;
  /** Exact unit / building. Directory listings disagree (e.g. "Gate 9, Services Mall 13"). */
  streetAddress: string | null;
  /** E.164 without "+", e.g. "2010xxxxxxxx". Leave null until the clinic confirms it. */
  phone: string | null;
  whatsapp: string | null;
  hours: string | null;
  mapsUrl: string;
  social: { label: string; href: string }[];
};

export const clinic: ClinicFacts = {
  brandName: "الباز",
  doctorFullName: null,
  doctorTitle: null,
  credentials: [],
  doctorPhoto: null,
  area: "بيفرلي هيلز، الشيخ زايد، الجيزة",
  streetAddress: null,
  phone: null,
  whatsapp: null,
  hours: null,
  // Area-level search, deliberately not a fabricated pin.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Beverly+Hills+Sheikh+Zayed+Giza",
  social: [],
};

/** Pre-filled WhatsApp text. Administrative only — never asks for symptoms or health data. */
const WHATSAPP_MESSAGE = "مرحبًا، أود الاستفسار عن حجز موعد في العيادة.";

export const links = {
  phone: clinic.phone ? `tel:+${clinic.phone}` : null,
  whatsapp: clinic.whatsapp
    ? `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : null,
  /** Primary booking CTA. Falls back to the contact section until a number is confirmed. */
  booking(): string {
    return this.whatsapp ?? this.phone ?? "#contact";
  },
};

/** Formats an E.164 Egyptian number for display, e.g. "2010…" → "010 xxxx xxxx". */
export function displayPhone(e164: string): string {
  const local = e164.startsWith("20") ? "0" + e164.slice(2) : e164;
  return local.replace(/^(\d{3})(\d{4})(\d+)$/, "$1 $2 $3");
}

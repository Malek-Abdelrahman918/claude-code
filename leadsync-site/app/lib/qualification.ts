// Qualification form definition and validation.
// Pure TypeScript with no secrets: imported by the browser form (inline messages)
// and by the API route (the authoritative check), so both always agree.

export const INDUSTRIES = [
  "Real estate",
  "Retail and e-commerce",
  "Healthcare and clinics",
  "Professional services",
  "Logistics and distribution",
  "Hospitality and travel",
  "Education and training",
  "Construction and trades",
  "Finance and insurance",
  "Technology and software",
  "Other",
] as const;

export const COMPANY_SIZES = ["1–5", "6–20", "21–50", "51–200", "200+"] as const;

export const CHALLENGES = [
  "Repetitive administration",
  "Customer enquiries",
  "Sales follow-up",
  "Disconnected systems",
  "Reporting",
  "Document processing",
  "Other",
] as const;

export const BUDGETS = [
  "Under $1,000",
  "$1,000–$3,000",
  "$3,000–$10,000",
  "$10,000+",
  "Not sure yet",
] as const;

export const LIMITS = {
  name: 100,
  email: 254,
  company: 120,
  website: 200,
  role: 100,
  country: 80,
  description: 1000,
} as const;
export const MIN_DESCRIPTION = 15;

export type QualificationInput = {
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

export type FieldName = keyof QualificationInput;
export type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEBSITE_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;
const LINE_BREAK = /[\r\n]/;

const text = (v: unknown) => (typeof v === "string" ? v.trim() : "");
const oneOf = (list: readonly string[], v: string) => list.includes(v);

export function validateQualification(
  raw: Record<string, unknown>
): { ok: true; value: QualificationInput } | { ok: false; errors: FieldErrors } {
  const value: QualificationInput = {
    name: text(raw.name),
    email: text(raw.email),
    company: text(raw.company),
    website: text(raw.website),
    role: text(raw.role),
    industry: text(raw.industry),
    companySize: text(raw.companySize),
    country: text(raw.country),
    challenge: text(raw.challenge),
    description: text(raw.description),
    budget: text(raw.budget),
    consent: raw.consent === true,
  };
  const errors: FieldErrors = {};

  const singleLine = (key: FieldName, v: string, max: number, required: string, tooLong: string) => {
    if (!v) errors[key] = required;
    else if (LINE_BREAK.test(v)) errors[key] = "Please remove any line breaks.";
    else if (v.length > max) errors[key] = tooLong;
  };

  singleLine("name", value.name, LIMITS.name, "Please enter your full name.", "That name is too long.");
  if (!errors.name && value.name.length < 2) errors.name = "Please enter your full name.";

  singleLine("email", value.email, LIMITS.email, "Please enter your work email.", "That email address is too long.");
  if (!errors.email && !EMAIL_RE.test(value.email)) errors.email = "Please enter a valid email address.";

  singleLine("company", value.company, LIMITS.company, "Please enter your company name.", "That company name is too long.");

  if (value.website) {
    if (LINE_BREAK.test(value.website) || value.website.length > LIMITS.website || !WEBSITE_RE.test(value.website)) {
      errors.website = "Please enter a valid website address, or leave this blank.";
    }
  }

  singleLine("role", value.role, LIMITS.role, "Please enter your job title or role.", "That job title is too long.");
  singleLine("country", value.country, LIMITS.country, "Please enter your country.", "That country name is too long.");
  if (!errors.country && value.country.length < 2) errors.country = "Please enter your country.";

  if (!oneOf(INDUSTRIES, value.industry)) errors.industry = "Please choose your industry.";
  if (!oneOf(COMPANY_SIZES, value.companySize)) errors.companySize = "Please choose your company size.";
  if (!oneOf(CHALLENGES, value.challenge)) errors.challenge = "Please choose your main operational challenge.";
  if (value.budget && !oneOf(BUDGETS, value.budget)) errors.budget = "Please choose one of the listed options.";

  if (value.description.length < MIN_DESCRIPTION) {
    errors.description = `Please describe the problem in a sentence or two (at least ${MIN_DESCRIPTION} characters).`;
  } else if (value.description.length > LIMITS.description) {
    errors.description = `Please keep this under ${LIMITS.description} characters.`;
  }

  if (!value.consent) errors.consent = "Please tick the box so LeadSync can contact you about your enquiry.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, value };
}

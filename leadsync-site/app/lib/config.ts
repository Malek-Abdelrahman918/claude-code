// Central configuration for the booking funnel.
//
// Everything a person might need to change lives here or in environment variables:
//   NEXT_PUBLIC_CALENDLY_URL    your Calendly event link (https://calendly.com/...)
//   NEXT_PUBLIC_VSL_EMBED_URL   embed URL from YouTube / Vimeo / Loom / Wistia
//   NEXT_PUBLIC_VSL_VIDEO_URL   direct https link to an .mp4/.webm file you host
//   NEXT_PUBLIC_VSL_POSTER_URL  optional poster image for a direct video file
// NEXT_PUBLIC_* values are public by design (they ship to the browser) and are
// read at build time, so redeploy after changing them. None of them is a secret.

/** Every primary "Book a Discovery Call" button points here (the dedicated booking page). */
export const BOOKING_PATH = "/book";

/** Fallback contact routes shown if online booking is unavailable. */
export const CONTACT_EMAIL = "hi@leadsync.dev";
export const WHATSAPP_URL = "https://wa.me/201142339381";

function parseHttps(raw: string | undefined): URL | null {
  if (!raw || !raw.trim()) return null;
  try {
    const url = new URL(raw.trim());
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/** Only official Calendly hosts are accepted. Returns null when unset or invalid. */
export function parseCalendlyUrl(raw: string | undefined): string | null {
  const url = parseHttps(raw);
  if (!url) return null;
  const host = url.hostname.toLowerCase();
  if (host !== "calendly.com" && !host.endsWith(".calendly.com")) return null;
  return url.toString();
}

// Iframe embeds are limited to these providers so a typo or bad value can never
// put an arbitrary page inside the site.
const EMBED_HOSTS = new Set([
  "www.youtube-nocookie.com",
  "www.youtube.com",
  "player.vimeo.com",
  "www.loom.com",
  "fast.wistia.net",
  "fast.wistia.com",
]);

/** Accepts only https URLs from known video hosts; strips any autoplay parameter. */
export function parseVslEmbedUrl(raw: string | undefined): string | null {
  const url = parseHttps(raw);
  if (!url || !EMBED_HOSTS.has(url.hostname.toLowerCase())) return null;
  url.searchParams.delete("autoplay");
  return url.toString();
}

/** Direct video file: any https URL. Returns null when unset or invalid. */
export function parseVslFileUrl(raw: string | undefined): string | null {
  return parseHttps(raw)?.toString() ?? null;
}

export const CALENDLY_URL = parseCalendlyUrl(process.env.NEXT_PUBLIC_CALENDLY_URL);
export const VSL_EMBED_URL = parseVslEmbedUrl(process.env.NEXT_PUBLIC_VSL_EMBED_URL);
export const VSL_VIDEO_URL = parseVslFileUrl(process.env.NEXT_PUBLIC_VSL_VIDEO_URL);
export const VSL_POSTER_URL = parseVslFileUrl(process.env.NEXT_PUBLIC_VSL_POSTER_URL);

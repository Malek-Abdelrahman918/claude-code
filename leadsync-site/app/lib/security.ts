// Request-hardening helpers for API routes.
// These mirror the protections in app/api/contact/route.ts (which is intentionally
// left untouched) so the qualification endpoint is protected the same way.

export const WINDOW_MS = 10 * 60 * 1000;
const MAX_TRACKED_KEYS = 2000;

export type Limiter = { max: number; unknownMax: number; hits: Map<string, number[]> };

export function createLimiter(max: number, unknownMax: number): Limiter {
  return { max, unknownMax, hits: new Map() };
}

// Best effort: serverless instances each keep their own memory. Returns true if the
// request is allowed (and records it), false if limited.
export function takeSlot(limiter: Limiter, ip: string): boolean {
  const { hits } = limiter;
  const now = Date.now();
  const max = ip === "unknown" ? limiter.unknownMax : limiter.max;
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= max) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.delete(ip);
  hits.set(ip, recent);
  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
    while (hits.size > MAX_TRACKED_KEYS) {
      const oldest = hits.keys().next().value;
      if (oldest === undefined) break;
      hits.delete(oldest);
    }
  }
  return true;
}

// Forwarding headers are only trusted on Vercel, where the edge sets x-real-ip to the
// client address. Anywhere else they are client-controlled, so they are ignored.
export function clientIp(req: Request): string {
  if (process.env.VERCEL !== "1") return "unknown";
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 64);
  const last = req.headers.get("x-forwarded-for")?.split(",").pop()?.trim();
  if (last) return last.slice(0, 64);
  return "unknown";
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Reads the body as a stream and stops as soon as it exceeds the cap, so an oversized
// (or chunked / mislabelled) body is never fully buffered.
export async function readBodyCapped(
  req: Request,
  maxBytes: number
): Promise<{ ok: true; text: string } | { ok: false; reason: "too_large" | "unreadable" }> {
  if (!req.body) return { ok: true, text: "" };
  const reader = req.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => {});
        return { ok: false, reason: "too_large" };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "unreadable" };
  }
  return { ok: true, text: Buffer.concat(chunks).toString("utf8") };
}

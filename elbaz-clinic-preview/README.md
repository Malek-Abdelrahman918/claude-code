# Elbaz Physiotherapy — homepage concept (LeadSync)

A concept preview of the homepage for a physiotherapy clinic in Beverly Hills, Sheikh Zayed (Giza, Egypt). It is Arabic-first with full RTL support. It is a sales preview, not a commissioned site, and it is marked `noindex`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out (host on Vercel, Netlify or any CDN)
```

## Where things live

| Path | Purpose |
| --- | --- |
| `content/clinic.ts` | **Every fact on the site** (name, phone, WhatsApp, address, hours, credentials, photo). Unknown values are `null` and the page shows a small "يُضاف بعد التأكيد" annotation instead of an invented value. |
| `content/ar.ts` | All Arabic copy. Add `content/en.ts` with the same shape for English later. |
| `components/Goniometer.tsx` | The signature visual: a range-of-motion goniometer, drawn in SVG and animated with CSS. |
| `app/globals.css` | Design tokens and all styles. |

Fill in `phone` / `whatsapp` (E.164 without `+`, for example `2010XXXXXXXX`) and every booking and WhatsApp button goes live. No component changes are needed.

## Verification ledger

| Item | Status | Source |
| --- | --- | --- |
| Area: Beverly Hills, Sheikh Zayed | Listed, consistent across sources | Vezeeta search listing, ekshef.com directory |
| Services: adult physiotherapy, sports injuries, rehabilitation | Listed | Vezeeta / directory text: "علاج طبيعي بالغين، اصابات ملاعب و تأهيل" |
| Post-operative rehabilitation | Listed, one source only | Vezeeta listing summary |
| Doctor's first name | **Conflict**: the brief says "Mahmoud"; the public listing and the meeting invite say "Mohamed" | Not resolved, so the site shows "د. الباز" |
| Title, credentials, photo | Not found | Placeholder annotations |
| Street address / unit | Sources disagree | Area only |
| Phone / WhatsApp | One unofficial directory number found; not used | null |
| Hours, social links, logo | Not found | null |
| Testimonials | None verifiable | Section omitted |

## Future integration points (not built)

- Every conversion link carries `data-cta="booking|whatsapp|phone|maps"`, ready for analytics or a WhatsApp automation layer.
- `links.booking()` in `content/clinic.ts` is the single switch point for any future appointment-request system.
- The pre-filled WhatsApp message is administrative only and asks for no health data. Any future AI receptionist should stay administrative: no diagnosis and no treatment advice.

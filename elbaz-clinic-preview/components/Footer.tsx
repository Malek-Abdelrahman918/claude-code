import { ar } from "@/content/ar";
import { clinic, displayPhone, links } from "@/content/clinic";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const t = ar.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Wordmark tone="light" sub={ar.nav.brandSub} />
          <p>{t.tagline}</p>
        </div>

        <nav aria-label="روابط التذييل">
          <h2 className="site-footer__h">{t.navTitle}</h2>
          <ul>
            {ar.nav.items.map((i) => (
              <li key={i.href}>
                <a href={i.href}>{i.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="site-footer__h">{t.contactTitle}</h2>
          <ul>
            <li>{clinic.area}</li>
            {clinic.phone && links.phone && (
              <li>
                <a href={links.phone} dir="ltr">{displayPhone(clinic.phone)}</a>
              </li>
            )}
            {links.whatsapp && (
              <li>
                <a href={links.whatsapp} target="_blank" rel="noopener">واتساب</a>
              </li>
            )}
            <li>
              <a href={clinic.mapsUrl} target="_blank" rel="noopener">خرائط جوجل</a>
            </li>
            {clinic.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container site-footer__base">
        <span>© {year.toLocaleString("ar-EG", { useGrouping: false })} الباز — {t.rights}</span>
        <span className="site-footer__credit" lang="en" dir="ltr">{t.concept}</span>
      </div>
    </footer>
  );
}

import { ar } from "@/content/ar";
import { clinic, displayPhone, links } from "@/content/clinic";

function Pending({ text }: { text: string }) {
  return (
    <span className="annotation annotation--inline">
      <span className="annotation__dot" aria-hidden="true" />
      {text}
    </span>
  );
}

export function Contact() {
  const t = ar.contact;

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="kicker" data-reveal>{t.kicker}</p>
          <h2 id="contact-title" className="display contact__title" data-reveal>
            {t.title}
          </h2>
          <p className="contact__lead" data-reveal>{t.lead}</p>

          <div className="contact__actions" data-reveal>
            {links.whatsapp ? (
              <a href={links.whatsapp} className="btn btn--primary" target="_blank" rel="noopener" data-cta="whatsapp">
                {t.whatsappCta}
              </a>
            ) : (
              <span className="btn btn--primary is-disabled" aria-disabled="true" title={t.pending}>
                {t.whatsappCta}
              </span>
            )}
            {links.phone ? (
              <a href={links.phone} className="btn btn--ghost" data-cta="phone">
                {t.phoneCta}
              </a>
            ) : (
              <span className="btn btn--ghost is-disabled" aria-disabled="true" title={t.pending}>
                {t.phoneCta}
              </span>
            )}
          </div>
          {!links.whatsapp && !links.phone && (
            <p className="contact__pending" data-reveal>
              <Pending text="أزرار التواصل تعمل تلقائيًا بمجرد إضافة رقم العيادة المعتمد." />
            </p>
          )}
        </div>

        <div className="contact-card" data-reveal>
          <dl className="contact-card__rows">
            <div className="contact-card__row">
              <dt>{t.rows.address}</dt>
              <dd>
                <span className="contact-card__value">{clinic.area}</span>
                {clinic.streetAddress ? (
                  <span className="contact-card__sub">{clinic.streetAddress}</span>
                ) : (
                  <Pending text={t.addressPending} />
                )}
              </dd>
            </div>
            <div className="contact-card__row">
              <dt>{t.rows.phone}</dt>
              <dd>
                {clinic.phone && links.phone ? (
                  <a href={links.phone} className="contact-card__value contact-card__num" dir="ltr">
                    {displayPhone(clinic.phone)}
                  </a>
                ) : (
                  <Pending text={t.pending} />
                )}
              </dd>
            </div>
            <div className="contact-card__row">
              <dt>{t.rows.whatsapp}</dt>
              <dd>
                {clinic.whatsapp && links.whatsapp ? (
                  <a href={links.whatsapp} className="contact-card__value contact-card__num" dir="ltr" target="_blank" rel="noopener">
                    {displayPhone(clinic.whatsapp)}
                  </a>
                ) : (
                  <Pending text={t.pending} />
                )}
              </dd>
            </div>
            <div className="contact-card__row">
              <dt>{t.rows.hours}</dt>
              <dd>{clinic.hours ? <span className="contact-card__value">{clinic.hours}</span> : <Pending text={t.pending} />}</dd>
            </div>
          </dl>

          <a href={clinic.mapsUrl} className="map-link" target="_blank" rel="noopener" data-cta="maps">
            <svg viewBox="0 0 320 120" className="map-link__art" aria-hidden="true">
              <path d="M0 84 C 60 70, 90 96, 150 80 S 250 50, 320 66" />
              <path d="M0 40 C 70 52, 120 20, 190 34 S 280 60, 320 30" />
              <path d="M110 0 L 130 120" />
              <path d="M228 0 L 210 120" />
              <circle cx="96" cy="52" r="22" className="map-link__ring" />
              <circle cx="96" cy="52" r="5" className="map-link__pin" />
            </svg>
            <span className="map-link__label">
              {t.mapCta}
              <span aria-hidden="true"> ↖</span>
            </span>
          </a>

          <p className="contact-card__note">{t.note}</p>
        </div>
      </div>
    </section>
  );
}

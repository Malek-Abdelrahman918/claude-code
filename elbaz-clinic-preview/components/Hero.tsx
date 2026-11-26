import { ar } from "@/content/ar";
import { links } from "@/content/clinic";
import { Goniometer } from "./Goniometer";

export function Hero() {
  const t = ar.hero;
  const booking = links.booking();
  const external = booking.startsWith("http");

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow">
            <span className="eyebrow__rule" aria-hidden="true" />
            {t.eyebrow}
          </p>
          <h1 id="hero-title" className="display hero__title">
            <span>{t.title[0]}</span>
            <span className="hero__title-accent">{t.title[1]}</span>
          </h1>
          <p className="hero__lead">{t.lead}</p>
          <div className="hero__actions">
            <a
              href={booking}
              className="btn btn--primary"
              data-cta="booking"
              {...(external ? { target: "_blank", rel: "noopener" } : {})}
            >
              {t.primary}
              <span className="btn__arrow" aria-hidden="true">←</span>
            </a>
            <a href="#services" className="btn btn--ghost">
              {t.secondary}
            </a>
          </div>
          <ul className="hero__points" aria-label="منهج العيادة">
            {t.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <figure className="hero__instrument">
          <Goniometer sweep={128} title={t.instrumentNote} className="hero__goniometer" />
          <figcaption className="hero__caption">
            <span className="hero__caption-label">{t.instrumentCaption}</span>
            <span className="hero__caption-note">{t.instrumentNote}</span>
          </figcaption>
        </figure>
      </div>

      <div className="facts" role="list" aria-label="معلومات سريعة">
        <div className="container facts__row">
          {ar.facts.map((f) => (
            <div className="facts__item" role="listitem" key={f.k}>
              <span className="facts__k">{f.k}</span>
              <span className="facts__v">{f.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ar } from "@/content/ar";
import { clinic } from "@/content/clinic";

export function About() {
  const t = ar.about;
  const name = clinic.doctorFullName ?? t.name;
  const role = clinic.doctorTitle ?? t.role;

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <figure className="about__portrait" data-reveal>
          {clinic.doctorPhoto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={clinic.doctorPhoto} alt={name} width={720} height={900} loading="lazy" />
          ) : (
            <div className="portrait-placeholder" aria-hidden="true">
              <span className="portrait-placeholder__mono">ب</span>
              <svg viewBox="0 0 200 110" className="portrait-placeholder__arc">
                <path d="M190 104 A90 90 0 0 0 10 104" />
              </svg>
            </div>
          )}
          {!clinic.doctorPhoto && (
            <figcaption className="annotation">
              <span className="annotation__dot" aria-hidden="true" />
              {t.portraitNote} — {t.pending}
            </figcaption>
          )}
        </figure>

        <div className="about__copy">
          <p className="kicker" data-reveal>{t.kicker}</p>
          <h2 id="about-title" className="display about__name" data-reveal>
            {name}
          </h2>
          <p className="about__role" data-reveal>{role}</p>
          <div className="about__body" data-reveal>
            {t.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="credentials" data-reveal>
            <h3 className="credentials__title">{t.credentialsTitle}</h3>
            {clinic.credentials.length > 0 ? (
              <ul className="credentials__list">
                {clinic.credentials.map((c) => (
                  <li key={c.title}>
                    <strong>{c.title}</strong>
                    {c.detail && <span>{c.detail}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="annotation">
                <span className="annotation__dot" aria-hidden="true" />
                {t.pending}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

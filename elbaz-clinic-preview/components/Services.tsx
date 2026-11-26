import { ar } from "@/content/ar";

const numerals = ["٠١", "٠٢", "٠٣", "٠٤", "٠٥", "٠٦"];

export function Services() {
  const t = ar.services;
  return (
    <section id="services" className="section services" aria-labelledby="services-title">
      <div className="container">
        <header className="section-head">
          <p className="kicker" data-reveal>{t.kicker}</p>
          <h2 id="services-title" className="display section-head__title" data-reveal>
            {t.title}
          </h2>
          <p className="section-head__intro" data-reveal>{t.intro}</p>
        </header>

        <ol className="service-list">
          {t.items.map((s, i) => (
            <li className="service" key={s.title} data-reveal>
              <span className="service__num" aria-hidden="true">{numerals[i]}</span>
              <div className="service__head">
                <h3 className="service__title">{s.title}</h3>
                <span className="service__en" lang="en" dir="ltr">{s.en}</span>
              </div>
              <p className="service__body">{s.body}</p>
              <span className="service__tick" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

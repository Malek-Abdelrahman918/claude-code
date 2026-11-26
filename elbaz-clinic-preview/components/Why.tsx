import { ar } from "@/content/ar";

export function Why() {
  const t = ar.why;
  return (
    <section id="why" className="section why" aria-labelledby="why-title">
      <div className="container why__grid">
        <header className="why__head">
          <p className="kicker kicker--light" data-reveal>{t.kicker}</p>
          <h2 id="why-title" className="display why__title" data-reveal>
            {t.title}
          </h2>
        </header>
        <dl className="why__list">
          {t.items.map((item) => (
            <div className="why__item" key={item.title} data-reveal>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

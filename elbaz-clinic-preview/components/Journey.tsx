import { ar } from "@/content/ar";
import { Goniometer } from "./Goniometer";

const stepNums = ["١", "٢", "٣", "٤"];

export function Journey() {
  const t = ar.journey;
  return (
    <section className="section journey" aria-labelledby="journey-title">
      <div className="container">
        <header className="section-head section-head--center">
          <p className="kicker" data-reveal>{t.kicker}</p>
          <h2 id="journey-title" className="display section-head__title" data-reveal>
            {t.title}
          </h2>
        </header>

        <ol className="steps">
          {t.steps.map((s, i) => (
            <li className="step" key={s.title} data-reveal style={{ ["--i" as string]: i }}>
              <Goniometer variant="mini" sweep={45 * (i + 1)} className="step__glyph" />
              <span className="step__num" aria-hidden="true">{stepNums[i]}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__body">{s.body}</p>
            </li>
          ))}
        </ol>

        <p className="journey__disclaimer" data-reveal>
          <span aria-hidden="true">※</span> {t.disclaimer}
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LeadCard from "./LeadCard";
import { pains } from "./Problem";
import { others } from "./Services";
import { steps } from "./HowItWorks";

// Short previews for the home page. Each one links to the page that holds the full content,
// and reuses that page's data so the wording never drifts.

const More = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link className="link-arrow" href={href}>
    {children} <ArrowRight size={16} className="arrow" aria-hidden="true" />
  </Link>
);

export function ProblemPreview() {
  return (
    <section className="section on-light" aria-labelledby="pp-title">
      <div className="wrap">
        <p className="eyebrow">
          <span>The problem</span>
        </p>
        <div className="shead">
          <h2 id="pp-title" className="h2">
            Your best people are stuck <span className="serif">doing repetitive work.</span>
          </h2>
          <p className="lede">
            Which of these sound familiar? Most businesses recognise a few of them, rarely all of
            them.
          </p>
        </div>
        <ol className="pgrid">
          {pains.map((p) => (
            <li key={p.num}>
              <span className="num">{p.num}</span>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </li>
          ))}
        </ol>
        <div className="preview__more">
          <More href="/services">See what LeadSync can build</More>
        </div>
      </div>
    </section>
  );
}

const featured = [
  {
    h: "AI opportunity assessment",
    p: "Identify where AI can genuinely improve how your business operates, so you invest in the right problem first.",
  },
  others[0],
  others[3],
  others[5],
];

export function ServicesPreview() {
  return (
    <section className="section on-dark" aria-labelledby="sp-title">
      <div className="wrap">
        <p className="eyebrow">
          <span>Services</span>
        </p>
        <div className="split">
          <div>
            <h2 id="sp-title" className="h2" style={{ maxWidth: "14ch" }}>
              Assessment first, <span className="serif">then implementation.</span>
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              Most engagements start with a clear look at where time is being lost. From there, I
              scope what is worth building and implement it with the tools you already have.
            </p>
            <div className="preview__more">
              <More href="/services">All services</More>
            </div>
          </div>
          <ul className="index">
            {featured.map((s, i) => (
              <li key={s.h}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProcessPreview() {
  return (
    <section className="section on-light" aria-labelledby="prp-title">
      <div className="wrap">
        <p className="eyebrow">
          <span>Process</span>
        </p>
        <div className="shead">
          <h2 id="prp-title" className="h2">
            From first conversation to <span className="serif">handover.</span>
          </h2>
          <p className="lede">
            Four steps, with the scope and price agreed before any build starts.
          </p>
        </div>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.num} className="step">
              <span className="step__num">{s.num}</span>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </li>
          ))}
        </ol>
        <div className="preview__more">
          <More href="/process">The full process and pricing</More>
        </div>
      </div>
    </section>
  );
}

export function WorkPreview() {
  return (
    <section className="section on-dark" aria-labelledby="wp-title">
      <div className="wrap">
        <p className="eyebrow">
          <span>Work</span>
        </p>
        <div className="split">
          <div>
            <h2 id="wp-title" className="h2" style={{ maxWidth: "14ch" }}>
              See one example <span className="serif">in action.</span>
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              LeadSync is early-stage and has no client case studies to publish yet. The demo shows,
              with fictional data, how an enquiry becomes a structured lead and reaches the right
              person.
            </p>
            <div className="preview__more">
              <More href="/work">View the demo</More>
            </div>
          </div>
          <LeadCard />
        </div>
      </div>
    </section>
  );
}

export function AboutTeaser() {
  return (
    <section className="section on-light" aria-labelledby="at-title">
      <div className="wrap">
        <p className="eyebrow">
          <span>About</span>
        </p>
        <div className="shead">
          <h2 id="at-title" className="h2">
            Founder-led, <span className="serif">early-stage.</span>
          </h2>
          <p className="lede">
            LeadSync is run by Malek Abdelrahman, an engineer who helps businesses use AI where it
            genuinely improves operations.
          </p>
        </div>
        <dl className="facts" style={{ marginTop: 0 }}>
          <div>
            <dt>Built for</dt>
            <dd>Businesses with manual, repetitive operations</dd>
          </div>
          <div>
            <dt>Approach</dt>
            <dd>Assess the problem, design the system, implement and integrate</dd>
          </div>
          <div>
            <dt>Engagement</dt>
            <dd>Scoped and priced per project</dd>
          </div>
        </dl>
        <div className="preview__more">
          <More href="/about">About LeadSync</More>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from "lucide-react";
import { BOOKING_ANCHOR } from "../lib/config";

const included = [
  "Discovery and problem assessment",
  "A system designed around your operations",
  "Implementation and integration with your tools",
  "Full source code and documentation",
  "Deployed in your environment or mine",
  "Optional ongoing support, agreed separately",
];

export default function Pricing() {
  return (
    <section id="pricing" className="section on-dark" aria-labelledby="pricing-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">06</span>
          <span>Pricing</span>
        </p>

        <div className="pricing__grid">
          <div>
            <h2 id="pricing-title" className="h2">
              One flat quote <span className="serif">per project.</span>
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              No subscriptions, no per-seat maths, no surprises. You pay for the system you
              scoped, not for the tools.
            </p>
          </div>

          <div className="quote">
            <p className="tag" style={{ color: "var(--acc)" }}>
              Custom engagement
            </p>
            <h3 className="h3">Priced per project.</h3>
            <p className="quote__price">A free discovery call, then a written quote.</p>
            <ul>
              {included.map((f) => (
                <li key={f}>
                  <span className="tick" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <a className="btn btn--lg" href={BOOKING_ANCHOR}>
              Book a Discovery Call <ArrowRight size={18} className="arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

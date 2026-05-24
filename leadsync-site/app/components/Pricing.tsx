import { Check, ArrowRight } from "lucide-react";

const features = [
  "Discovery + scoping",
  "Production-ready workflow",
  "Full source code & docs",
  "Deploy on your infra or mine",
  "14 days post-launch support",
  "Maintenance retainer if you want it",
];

export default function Pricing() {
  return (
    <section id="pricing">
      <div className="container">
        <div
          className="section-head"
          style={{ textAlign: "center", margin: "0 auto 64px" }}
        >
          <span className="overline">Pricing</span>
          <h2>One flat quote per project.</h2>
          <p style={{ margin: "16px auto 0" }}>
            No subscriptions. No per-seat math. No surprises. You pay for the
            outcome, not the tools.
          </p>
        </div>

        <div className="price-card">
          <div className="tag">Custom engagement</div>
          <h3>Priced per project.</h3>
          <div className="price">
            <span className="grad">Free</span> 30-minute discovery call. Quote
            within 48h.
          </div>
          <ul>
            {features.map((f) => (
              <li key={f}>
                <Check size={16} className="ck" />
                {f}
              </li>
            ))}
          </ul>
          <a className="btn btn--gradient btn--lg" href="#contact">
            Book a discovery call <ArrowRight size={18} className="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}

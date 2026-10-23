import LeadCard from "./LeadCard";

// Sits above the real-estate demo on /work: a generic, clearly fictional example, so the demo
// reads as one illustration of a broader capability rather than the whole offer.
export default function WorkExample() {
  return (
    <section className="section on-dark" aria-labelledby="we-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">02</span>
          <span>Illustrative example</span>
        </p>
        <div className="split">
          <div>
            <h2 id="we-title" className="h2" style={{ maxWidth: "14ch" }}>
              The same idea, <span className="serif">in any business.</span>
            </h2>
            <p className="lede" style={{ marginTop: 20 }}>
              LeadSync is not tied to one industry. In this generic example an enquiry arrives, the
              system gathers the details a person would otherwise ask for, and the right person
              receives a structured record. The demo below shows the same idea for a real-estate
              enquiry on WhatsApp.
            </p>
          </div>
          <LeadCard />
        </div>
      </div>
    </section>
  );
}

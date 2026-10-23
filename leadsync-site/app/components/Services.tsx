export const deliverables = [
  "A review of how your team handles customers, requests and repeat work.",
  "A shortlist of bottlenecks worth fixing, ranked by value and effort.",
  "A practical plan with scope, tools and how success will be judged.",
  "A clear view of what is not worth automating.",
];

export const others = [
  { h: "Customer and enquiry handling", p: "Capture, qualify and route enquiries from WhatsApp, forms and email, so the right person follows up with context." },
  { h: "Customer-support assistants", p: "First-line replies and triage on WhatsApp, web chat or email, escalating to your team with context." },
  { h: "Sales follow-up and workflow automation", p: "Reminders, sequences and handovers, so leads and customers are not forgotten." },
  { h: "Internal operations and administration", p: "Onboarding, approvals and internal requests handled with less manual admin." },
  { h: "Document processing", p: "Contracts, IDs and invoices extracted, validated and filed." },
  { h: "Business software and CRM integrations", p: "Connect your CRM, spreadsheets, messaging and internal tools so information is entered once." },
  { h: "Reporting and operational visibility", p: "Reports pulled from your existing tools and delivered where your team already works." },
];

export default function Services() {
  return (
    <section id="services" className="section on-dark" aria-labelledby="services-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">02</span>
          <span>Services</span>
        </p>

        <div className="shead">
          <h2 id="services-title" className="h2">
            Assessment first, <span className="serif">then implementation.</span>
          </h2>
          <p className="lede">
            Most engagements start with a clear look at where time is being lost. From there, I
            scope what is worth building and implement it with the tools you already have.
          </p>
        </div>

        <div className="services__grid">
          <article className="feature">
            <p className="tag" style={{ color: "var(--acc)" }}>
              Core service
            </p>
            <h3 className="h3">AI opportunity assessment</h3>
            <p className="lede">
              Before anything is built, LeadSync identifies where AI can genuinely improve how your
              business operates, so you invest in the right problem first.
            </p>
            <ol className="deliverables">
              {deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ol>
          </article>

          <div>
            <p className="tag index__head">Also available</p>
            <ul className="index">
              {others.map((s, i) => (
                <li key={s.h}>
                  <span className="num">{String(i + 2).padStart(2, "0")}</span>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

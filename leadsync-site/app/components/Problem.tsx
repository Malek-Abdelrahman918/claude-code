export default function Problem() {
  const pains = [
    {
      num: "01",
      h: "Leads go cold while you sleep.",
      p: "The first reply matters more than the pitch. By the time someone reads last night's enquiries at 9am, the best prospects may already be talking to another agency.",
    },
    {
      num: "02",
      h: "Same questions, every day.",
      p: "Pricing, hours, product specs, refund status. Your team types the same answers from 9 to 6. That's a workflow, not a job.",
    },
    {
      num: "03",
      h: "Data lives in seven tabs.",
      p: "Sheet here, CRM there, Slack thread elsewhere. Reporting is a manual export party every Monday morning.",
    },
  ];

  return (
    <section id="problem">
      <div className="container">
        <div className="section-head">
          <span className="overline">The problem</span>
          <h2>Your team is doing work a machine should be doing.</h2>
          <p>
            Most ops drag because the same five tasks keep landing on a human.
            They&apos;re slow, error-prone, and they don&apos;t scale.
          </p>
        </div>
        <div className="problem-grid">
          {pains.map((p) => (
            <div key={p.num} className="pain">
              <span className="num">{p.num}</span>
              <h3>{p.h}</h3>
              <p>{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

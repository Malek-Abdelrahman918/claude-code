export const steps = [
  {
    num: "Step 01",
    h: "Assess",
    p: "We look at how your business runs today: the processes, the tools and where time is being lost.",
    get: "A clear picture of your bottlenecks.",
  },
  {
    num: "Step 02",
    h: "Identify and agree scope",
    p: "We pick the AI opportunities that suit your business, and agree what will and won’t be built.",
    get: "A written scope and a quote.",
  },
  {
    num: "Step 03",
    h: "Design and implement",
    p: "The relevant systems are designed around your operations and connected to the tools you already use.",
    get: "Working systems built to the agreed scope.",
  },
  {
    num: "Step 04",
    h: "Test and hand over",
    p: "The implementation is tested, then handed over according to the agreed scope.",
    get: "Handover and documentation as set out in the scope.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="section on-light" aria-labelledby="how-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">01</span>
          <span>Process</span>
        </p>

        <div className="shead">
          <h2 id="how-title" className="h2">
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
              <p className="get">
                <b>You get</b>
                {s.get}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

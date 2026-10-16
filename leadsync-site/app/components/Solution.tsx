const principles = [
  {
    h: "Scoped per project, not per seat.",
    p: "Flat custom quote. No platform lock-in. You own everything I build.",
  },
  {
    h: "Plugs into what you already use.",
    p: "CRMs, spreadsheets, Slack, WhatsApp. I meet your stack where it is.",
  },
  {
    h: "AI where it helps, plain software where it doesn’t.",
    p: "AI models for judgement calls, ordinary software for everything else.",
  },
  {
    h: "Built in stages.",
    p: "Start with one process, check that it works, then extend. No big-bang projects.",
  },
];

export default function Solution() {
  return (
    <section id="solution" className="section on-dark" aria-labelledby="solution-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">02</span>
          <span>What LeadSync does</span>
        </p>

        <div className="shead">
          <h2 id="solution-title" className="h2">
            From operational problem to <span className="serif">working system.</span>
          </h2>
          <p className="lede">
            LeadSync first identifies which bottlenecks are worth addressing, then designs and
            implements practical AI-powered systems around your business’s needs. The aim: less
            repetitive work, better customer handling, connected systems, and your people free for
            higher-value tasks. Customer handling is a common first project, and it follows four
            steps.
          </p>
        </div>

        <ol className="rail">
          <li className="stage">
            <span className="stage__num">01 · INQUIRY</span>
            <h3>A customer writes in</h3>
            <p>The system responds on the channel your customer already uses, in Arabic or English.</p>
            <div className="mini" aria-hidden="true">
              <p className="bubble" style={{ margin: 0 }}>
                <span lang="ar" dir="rtl" className="ar">
                  مرحبا
                </span>
                , I need a quote
              </p>
            </div>
          </li>

          <li className="stage">
            <span className="stage__num">02 · QUALIFICATION</span>
            <h3>It asks the right questions</h3>
            <p>It collects what your team would otherwise ask for, one question at a time, as a normal conversation.</p>
            <div className="mini" aria-hidden="true">
              {["Need", "Quantity", "Timing", "Contact"].map((k) => (
                <div className="mini__row" key={k}>
                  <span className="tick" />
                  {k}
                </div>
              ))}
            </div>
          </li>

          <li className="stage">
            <span className="stage__num">03 · STRUCTURED RECORD</span>
            <h3>Answers become a clean record</h3>
            <p>Written to your CRM or spreadsheet as fields, not a chat you have to scroll through.</p>
            <div className="mini" aria-hidden="true">
              {[
                ["Request", "62%"],
                ["Scope", "40%"],
                ["Timing", "54%"],
              ].map(([k, w]) => (
                <div className="mini__row" key={k}>
                  <span className="k">{k}</span>
                  <span className="bar" style={{ width: w }} />
                </div>
              ))}
            </div>
          </li>

          <li className="stage">
            <span className="stage__num">04 · HANDOFF</span>
            <h3>The right person is notified</h3>
            <p>They receive the details and the full conversation, ready to follow up.</p>
            <div className="mini" aria-hidden="true">
              <span className="chip" style={{ alignSelf: "flex-start" }}>
                <span className="dot" />
                Team notified
              </span>
              <span className="small" style={{ fontSize: "0.8125rem" }}>
                Details + transcript attached
              </span>
            </div>
          </li>
        </ol>

        <div className="split">
          <ul className="principles">
            {principles.map((p) => (
              <li key={p.h}>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </li>
            ))}
          </ul>

          <figure className="code" style={{ margin: 0 }}>
            <figcaption className="code__bar">Pseudocode · illustrative, not a running config</figcaption>
            <pre>
              <code>
                <span className="c"># handle one customer enquiry</span>
                {"\n"}
                <span className="k">on</span> message(enquiry):{"\n"}
                {"  "}lead = extract_fields(enquiry){"\n"}
                {"  "}
                <span className="c"># need, quantity, timing, contact</span>
                {"\n\n"}
                {"  "}
                <span className="k">while</span> lead.missing:{"\n"}
                {"    "}ask(next_question(lead.missing)){"\n"}
                {"    "}
                <span className="c"># in Arabic or English</span>
                {"\n\n"}
                {"  "}crm.upsert(lead){"\n"}
                {"  "}owner = owner_for(lead.topic){"\n"}
                {"  "}notify(owner, lead, transcript)
              </code>
            </pre>
          </figure>
        </div>
      </div>
    </section>
  );
}

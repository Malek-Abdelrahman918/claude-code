// Fictional demo content: every name, number and message here is invented for illustration.
const messages: { from: "in" | "out"; node: React.ReactNode; time: string }[] = [
  {
    from: "in",
    node: (
      <>
        <span lang="ar" dir="rtl" className="ar">
          السلام عليكم
        </span>
        , I’m looking for a 3-bedroom apartment in Sheikh Zayed.
      </>
    ),
    time: "10:42",
  },
  {
    from: "out",
    node: (
      <>
        <span lang="ar" dir="rtl" className="ar">
          وعليكم السلام
        </span>
        ! Happy to help. What budget range are you considering?
      </>
    ),
    time: "10:42",
  },
  { from: "in", node: <>Up to 8M EGP.</>, time: "10:43" },
  {
    from: "out",
    node: <>Is it for living or investment, and do you prefer a compound?</>,
    time: "10:43",
  },
  {
    from: "in",
    node: <>For living, in a compound. Can I view something on Saturday?</>,
    time: "10:44",
  },
  {
    from: "out",
    node: <>Noted. I’ll pass this to an agent now so they can confirm a time with you.</>,
    time: "10:44",
  },
];

const fields: [string, string][] = [
  ["Interest", "3-bedroom apartment"],
  ["Area", "Sheikh Zayed"],
  ["Compound", "Preferred"],
  ["Purpose", "Living"],
  ["Budget", "Up to 8M EGP"],
  ["Timing", "Viewing on Saturday"],
];

export default function CaseStudy() {
  return (
    <section id="work" className="section on-light" aria-labelledby="work-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">03</span>
          <span>Demo</span>
        </p>

        <div className="shead">
          <h2 id="work-title" className="h2">
            A WhatsApp qualification flow, <span className="serif">end to end.</span>
          </h2>
          <p className="lede">
            The kind of system I build for an Egyptian agency: one conversation in, one structured
            lead and agent handoff out.
          </p>
        </div>

        <p className="notice" role="note">
          <strong>Illustrative demo.</strong>
          <span>
            Fictional conversation and data. Not a real customer interaction or client engagement.
          </span>
        </p>

        <div className="demo__grid">
          <div className="thread" role="group" aria-label="Fictional WhatsApp conversation">
            <div className="thread__head">
              <span className="thread__av" aria-hidden="true">
                LS
              </span>
              <div>
                <div className="thread__name">Demo assistant · LeadSync</div>
                <div className="thread__sub">Demo · fictional conversation</div>
              </div>
            </div>
            <ol className="msgs">
              {messages.map((m, i) => (
                <li key={i} className={`msg msg--${m.from}`}>
                  <span className="sr-only">{m.from === "in" ? "Buyer: " : "Assistant: "}</span>
                  {m.node}
                  <small aria-hidden="true">{m.time}</small>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <div className="panel">
              <div className="panel__head">
                <span>Structured lead</span>
                <span>Demo data</span>
              </div>
              <dl className="record" style={{ padding: "6px 18px" }}>
                {fields.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
                <div>
                  <dt>Status</dt>
                  <dd>
                    <span className="chip">Ready for agent</span>
                  </dd>
                </div>
              </dl>
              <div className="handoff">
                <span className="tick" aria-hidden="true" style={{ marginTop: 4 }} />
                <div>
                  <strong>Handed to an agent</strong>
                  <span>Details and full transcript attached, ready to confirm the viewing.</span>
                </div>
              </div>
            </div>

            <div className="demo__stack">
              <p className="tag">Example stack for a build like this</p>
              <ul className="chips">
                {["n8n", "Claude", "WhatsApp Cloud API", "Redis", "CRM or spreadsheet"].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="small" style={{ marginTop: 12 }}>
                A real project uses the tools your agency already has.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

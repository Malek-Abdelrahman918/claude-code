export const pains = [
  {
    num: "01",
    h: "Repetitive manual data entry.",
    p: "Details typed into one system, then typed again into another.",
  },
  {
    num: "02",
    h: "The same customer questions, over and over.",
    p: "Pricing, availability and status updates answered by hand, every day.",
  },
  {
    num: "03",
    h: "Leads and customers tracked by hand.",
    p: "Follow-ups depend on someone remembering to chase them.",
  },
  {
    num: "04",
    h: "Information copied between disconnected tools.",
    p: "Spreadsheets, a CRM, messaging apps and email that don’t talk to each other.",
  },
  {
    num: "05",
    h: "Reports rebuilt again and again.",
    p: "The same figures gathered and formatted manually, week after week.",
  },
  {
    num: "06",
    h: "Admin that crowds out real work.",
    p: "Approvals, onboarding, filing and internal requests that take skilled people’s time.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="section on-light" aria-labelledby="problem-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">01</span>
          <span>The problem</span>
        </p>

        <div className="problem__grid">
          <div className="problem__intro">
            <h2 id="problem-title" className="h2">
              Your best people are stuck <span className="serif">doing repetitive work.</span>
            </h2>
            <p className="lede">
              Which of these sound familiar? Most businesses recognise a few of them, rarely all of
              them. Each one costs time, invites mistakes, and gets harder to manage as the business
              grows.
            </p>
          </div>

          <div>
            <figure
              className="timeline"
              aria-label="Illustrative timeline of an unanswered customer message"
            >
              <figcaption>Illustrative timeline · fictional example, not measured data</figcaption>
              <ol className="tl">
                <li className="tl__row">
                  <time>23:40</time>
                  <span className="tl__rail" aria-hidden="true" />
                  <div>
                    <p>A customer messages the business on WhatsApp after hours.</p>
                  </div>
                </li>
                <li className="tl__gap">
                  <span aria-hidden="true" />
                  <span className="tl__rail" aria-hidden="true" />
                  <div>
                    <p>
                      <span className="serif">9 h 24 min</span>
                      with no reply
                    </p>
                  </div>
                </li>
                <li className="tl__row tl__row--late">
                  <time>09:05</time>
                  <span className="tl__rail" aria-hidden="true" />
                  <div>
                    <p>The team opens for the day and someone finally reads the message.</p>
                  </div>
                </li>
              </ol>
            </figure>

            <ol className="ledger">
              {pains.map((p) => (
                <li key={p.num}>
                  <span className="num">{p.num}</span>
                  <h3>{p.h}</h3>
                  <p>{p.p}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

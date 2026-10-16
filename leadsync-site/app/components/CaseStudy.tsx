import { Bell, FlaskConical } from "lucide-react";

export default function CaseStudy() {
  return (
    <section id="work">
      <div className="container">
        <div className="section-head">
          <span className="overline">Example build</span>
          <h2>What I can build: WhatsApp AI for real estate.</h2>
        </div>

        <div className="case">
          {/* Illustrative demo banner */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 20px",
            background: "rgba(0,194,224,.08)",
            borderBottom: "1px solid rgba(0,194,224,.15)",
            fontSize: 13,
            color: "var(--ls-cyan-soft)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.03em",
          }}>
            <FlaskConical size={14} style={{ flexShrink: 0 }} />
            Illustrative demo — a fictional enquiry, not a real customer conversation or client engagement
          </div>

          <div className="case-inner">
            <div>
              <div className="tag">Real estate · Egypt · Fictional demo</div>
              <h3>
                From a new WhatsApp enquiry to a qualified lead in an agent&apos;s hands.
              </h3>
              <p className="lede">
                Slow replies make it easy to lose property enquiries. This
                fictional demo shows the kind of WhatsApp assistant I can build
                for an Egyptian agency: it greets a new enquiry in Arabic or
                English, asks the qualifying questions, organizes the details,
                and passes the lead to the right agent.
              </p>

              <div className="stats">
                <div className="stat">
                  <div className="v grad">Qualify</div>
                  <div className="l">Budget, area, timing</div>
                </div>
                <div className="stat">
                  <div className="v">Organize</div>
                  <div className="l">Prospect details</div>
                </div>
                <div className="stat">
                  <div className="v">Route</div>
                  <div className="l">To the right agent</div>
                </div>
              </div>

              <div className="stack">
                {["n8n", "Claude Sonnet", "WhatsApp Cloud API", "Redis", "HubSpot"].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <div className="wa-mock">
              <div className="head">
                <div className="av">D</div>
                <div>
                  <div className="nm">Demo assistant · LeadSync</div>
                  <div className="sub">● demo · fictional conversation</div>
                </div>
              </div>

              <div className="msgs">
                <div className="b them">
                  السلام عليكم، I&apos;m looking for a 3-bedroom apartment in Sheikh Zayed, budget up to 8M EGP.
                </div>
                <div className="b us">
                  وعليكم السلام! Happy to help. Is it for living or investment, and do you prefer a compound?
                  <div className="meta">Demo message</div>
                </div>
                <div className="b them">For living, in a compound. Can I view something on Saturday?</div>
                <div className="b us">
                  Noted: 3BR · Sheikh Zayed · compound · up to 8M EGP · Saturday viewing. I&apos;ll pass this to an agent now.
                  <div className="meta">Demo message</div>
                </div>
              </div>

              <div className="agent-alert">
                <Bell size={14} className="ico" />
                <div>
                  <b style={{ color: "var(--fg)" }}>Demo: enquiry routed to an agent</b>
                  <br />
                  Budget stated · Area and unit type captured · Viewing requested
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

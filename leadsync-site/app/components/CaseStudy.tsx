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
          {/* Illustrative example banner */}
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
            Illustrative example — representative of the kind of system I build, not a specific client engagement
          </div>

          <div className="case-inner">
            <div>
              <div className="tag">Real estate · Example scenario</div>
              <h3>
                From cold form-fill to hot agent ping — in under 90 seconds.
              </h3>
              <p className="lede">
                A typical real estate brokerage loses a large share of inbound
                leads to slow replies. This is an example of a WhatsApp
                assistant I can build: it qualifies leads in Arabic and English,
                shares matching listings instantly, and pings the right agent
                the moment a lead heats up.
              </p>

              <div className="stats">
                <div className="stat">
                  <div className="v grad">~10×</div>
                  <div className="l">Faster first reply <span style={{ fontSize: 10, color: "var(--fg-subtle)", display: "block" }}>example outcome</span></div>
                </div>
                <div className="stat">
                  <div className="v">&gt;60%</div>
                  <div className="l">Qualified rate <span style={{ fontSize: 10, color: "var(--fg-subtle)", display: "block" }}>example outcome</span></div>
                </div>
                <div className="stat">
                  <div className="v">2–6 wks</div>
                  <div className="l">Typical timeline</div>
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
                <div className="av">A</div>
                <div>
                  <div className="nm">Ayaan · LeadSync Concierge</div>
                  <div className="sub">● online · usually replies instantly</div>
                </div>
              </div>

              <div className="msgs">
                <div className="b them">
                  Hi, looking for a 2BR in Dubai Marina under 2.5M AED. Move in by August.
                </div>
                <div className="b us">
                  Got it. Pulling 6 matching units now — sea view, balcony, ready handover. One sec.
                  <div className="meta">10:42 · ✓✓</div>
                </div>
                <div className="b us">
                  Here are 3 I&apos;d bet on for your range. Want viewings this weekend?
                  <div className="meta">10:42 · ✓✓</div>
                </div>
                <div className="b them">Yes, Saturday afternoon works.</div>
              </div>

              <div className="agent-alert">
                <Bell size={14} className="ico" />
                <div>
                  <b style={{ color: "var(--fg)" }}>Hot lead routed to agent</b>
                  <br />
                  Budget confirmed · Move-in &lt; 90 days · Viewing requested
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

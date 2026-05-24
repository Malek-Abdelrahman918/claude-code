import { Bell } from "lucide-react";

export default function CaseStudy() {
  return (
    <section id="work">
      <div className="container">
        <div className="section-head">
          <span className="overline">Case study</span>
          <h2>WhatsApp AI for Dubai real estate.</h2>
        </div>

        <div className="case">
          <div className="case-inner">
            <div>
              <div className="tag">Real estate · Dubai · 2025</div>
              <h3>
                From cold form-fill to hot agent ping — in under 90 seconds.
              </h3>
              <p className="lede">
                A mid-sized Dubai brokerage was losing 40% of inbound leads to
                slow replies. I built a WhatsApp assistant that qualifies leads
                in Arabic and English, shares matching listings instantly, and
                pings the right agent the moment a lead heats up.
              </p>

              <div className="stats">
                <div className="stat">
                  <div className="v grad">12×</div>
                  <div className="l">Faster first reply</div>
                </div>
                <div className="stat">
                  <div className="v">68%</div>
                  <div className="l">Qualified rate</div>
                </div>
                <div className="stat">
                  <div className="v">4 wks</div>
                  <div className="l">To production</div>
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
                  <b style={{ color: "var(--fg)" }}>Hot lead routed to Reema</b>
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

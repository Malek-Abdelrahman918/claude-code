export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="section-head">
          <span className="overline">About</span>
          <h2>Built by one engineer who actually ships.</h2>
        </div>

        <div className="about-card">
          <div className="av">M</div>
          <div>
            <h3>Malek Abdelrahman</h3>
            <div className="role">Founder · LeadSync</div>
            <p>
              I started LeadSync to do one thing — build the AI automations that
              small teams actually need, instead of selling them another platform
              they&apos;ll have to babysit. Background&apos;s in engineering;
              the last few months have been building real workflows for real
              clients on n8n, Claude, and the APIs that already run their
              business. If your team is doing the same five tasks every day, I
              can probably fix that — and I&apos;ll stay until it&apos;s
              invisible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

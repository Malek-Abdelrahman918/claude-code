import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Logo width={132} />
            <p className="footer__blurb">
              AI implementation consultancy. LeadSync helps businesses find operational bottlenecks
              and build practical AI-powered systems on the tools they already use.
            </p>
          </div>

          <nav aria-label="Services">
            <h2>Services</h2>
            <ul>
              <li><a href="#services">Opportunity assessment</a></li>
              <li><a href="#services">Customer handling</a></li>
              <li><a href="#services">Internal operations</a></li>
              <li><a href="#services">Systems integration</a></li>
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2>Company</h2>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#work">Demo</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>

          <nav aria-label="Connect">
            <h2>Connect</h2>
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/malek-abdelrahmanma/" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://wa.me/201142339381" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li><a href="mailto:hi@leadsync.dev">Email</a></li>
            </ul>
          </nav>
        </div>

        <div className="legal">
          <span>© 2026 LeadSync. Built by Malek Abdelrahman.</span>
          <span>AI implementation consultancy · Based in Egypt</span>
        </div>
      </div>
    </footer>
  );
}

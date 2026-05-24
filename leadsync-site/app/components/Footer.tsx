import Logo from "./Logo";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="grid">
          <div>
            <div className="logo">
              <Logo width={110} />
            </div>
            <p className="blurb">
              Custom AI automations for businesses that ship. Built one workflow
              at a time, on the tools you already use.
            </p>
          </div>

          <div>
            <h5>Services</h5>
            <ul>
              <li><a href="#services">Lead handling</a></li>
              <li><a href="#services">Sales workflows</a></li>
              <li><a href="#services">Support bots</a></li>
              <li><a href="#services">Internal ops</a></li>
            </ul>
          </div>

          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#work">Case study</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5>Connect</h5>
            <ul>
              <li><a href="https://linkedin.com/in/malek-abdelrahman" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://wa.me/" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="mailto:hi@leadsync.dev">Email</a></li>
            </ul>
          </div>
        </div>

        <div className="legal">
          <span>© 2026 LeadSync. Built by Malek Abdelrahman.</span>
          <span>Booking projects globally · Based in Dubai</span>
        </div>
      </div>
    </footer>
  );
}

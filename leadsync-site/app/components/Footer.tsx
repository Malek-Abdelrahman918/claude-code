import Link from "next/link";
import Logo from "./Logo";
import { BOOKING_PATH } from "../lib/config";

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

          <nav aria-label="Pages">
            <h2>Pages</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/process">Process</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href={BOOKING_PATH}>Book a call</Link></li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2>Services</h2>
            <ul>
              <li><Link href="/services">Opportunity assessment</Link></li>
              <li><Link href="/services">Customer handling</Link></li>
              <li><Link href="/services">Internal operations</Link></li>
              <li><Link href="/services">Systems integration</Link></li>
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
              <li><Link href="/about#contact">Contact form</Link></li>
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

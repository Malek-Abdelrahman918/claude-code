"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="top">
      <div className="container inner">
        <a href="#" className="logo" aria-label="LeadSync home">
          <Logo width={235} />
        </a>

        <div className="links">
          {links.map((l) => (
            <a key={l.href} className="link" href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <a className="btn btn--primary nav-cta" href="#contact">
          Book a call
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="mobile-toggle"
          style={{
            background: "none",
            border: "none",
            color: "var(--fg)",
            cursor: "pointer",
            padding: 0,
            display: "none",
          }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <style>{`
        @media (max-width: 800px) {
          nav.top .nav-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>

      {open && (
        <div className="mobile-menu">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div style={{ padding: "12px 32px" }}>
            <a className="btn btn--primary" href="#contact" onClick={() => setOpen(false)}>
              Book a call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

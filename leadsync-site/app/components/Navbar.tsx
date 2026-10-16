"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { BOOKING_ANCHOR } from "../lib/config";

const links = [
  { href: "#work", label: "Demo" },
  { href: "#services", label: "Services" },
  { href: "#how", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav on-dark">
      <div className="wrap nav__inner">
        <a href="#" className="nav__brand" aria-label="LeadSync, back to top">
          <Logo width={156} />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} className="nav__link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--sm nav__cta" href={BOOKING_ANCHOR}>
          Book a call <ArrowRight size={16} className="arrow" aria-hidden="true" />
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <nav id="nav-panel" className="nav__panel" data-open={open} aria-label="Mobile">
        <div className="wrap">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          ))}
          <a className="btn" href={BOOKING_ANCHOR} onClick={() => setOpen(false)}>
            Book a call
          </a>
        </div>
      </nav>
    </header>
  );
}

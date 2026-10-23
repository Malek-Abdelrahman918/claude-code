"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { BOOKING_PATH } from "../lib/config";

const links = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = (href: string) => (pathname === href ? ("page" as const) : undefined);

  // A route change always closes the mobile menu.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        <Link href="/" className="nav__brand" aria-label="LeadSync, home" aria-current={current("/")}>
          <Logo width={156} />
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} className="nav__link" href={l.href} aria-current={current(l.href)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link className="btn btn--sm nav__cta" href={BOOKING_PATH} aria-current={current(BOOKING_PATH)}>
          Book a call <ArrowRight size={16} className="arrow" aria-hidden="true" />
        </Link>

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
          {[{ href: "/", label: "Home" }, ...links].map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href)} onClick={() => setOpen(false)}>
              {l.label}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          ))}
          <Link className="btn" href={BOOKING_PATH} aria-current={current(BOOKING_PATH)} onClick={() => setOpen(false)}>
            Book a call
          </Link>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { ar } from "@/content/ar";
import { links } from "@/content/clinic";
import { Wordmark } from "./Wordmark";

export function Header() {
  const t = ar.nav;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const booking = links.booking();
  const external = booking.startsWith("http");

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="container site-header__inner">
        <a href="#top" className="site-header__brand" aria-label="الباز — العلاج الطبيعي والتأهيل، الصفحة الرئيسية">
          <Wordmark sub={t.brandSub} />
        </a>

        <nav className="site-nav" aria-label="القائمة الرئيسية">
          <ul>
            {t.items.map((i) => (
              <li key={i.href}>
                <a href={i.href}>{i.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={booking}
          className="btn btn--primary btn--sm site-header__cta"
          data-cta="booking"
          {...(external ? { target: "_blank", rel: "noopener" } : {})}
        >
          {t.cta}
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? t.close : t.menu}</span>
          <span className="burger" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <nav aria-label="قائمة الجوال">
          <ol>
            {t.items.map((i, n) => (
              <li key={i.href}>
                <a href={i.href} onClick={() => setOpen(false)}>
                  <span className="mobile-menu__num">{"٠" + "١٢٣٤٥"[n]}</span>
                  {i.label}
                </a>
              </li>
            ))}
          </ol>
          <a
            href={booking}
            className="btn btn--primary btn--block"
            data-cta="booking"
            onClick={() => setOpen(false)}
            {...(external ? { target: "_blank", rel: "noopener" } : {})}
          >
            {t.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}

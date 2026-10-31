"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONSENT_KEY, CONSENT_REOPEN_EVENT, META_PIXEL_ID, isPixelHost } from "../lib/config";

// Meta Pixel with a consent gate.
//  - Nothing from Meta is loaded until the visitor presses "Accept".
//  - It only runs on the production domain (see isPixelHost) and only when
//    NEXT_PUBLIC_META_PIXEL_ID is set; otherwise this component renders nothing.
//  - PageView is sent once on acceptance and once per client-side page change (the App Router
//    does not reload the page, so the stock snippet alone would count only the first page).
//  - The snippet's <noscript> tracking image is deliberately not used: it would track visitors
//    who have not agreed.

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};
declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}
function saveChoice(c: Choice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, c);
  } catch {
    /* storage blocked: the choice then lasts for this visit only */
  }
}

// The official Meta loader, unchanged in behaviour, with the ID passed in.
function loadPixel(id: string) {
  if (window.fbq) return;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  window.fbq("init", id);
}

function clearMetaCookies() {
  const host = window.location.hostname;
  const domains = [host, "." + host.replace(/^www\./, "")];
  for (const name of ["_fbp", "_fbc"]) {
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${d}`;
    }
  }
}

export default function MetaPixel() {
  const pathname = usePathname();
  const [active, setActive] = useState(false); // production host with a valid ID
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID || !isPixelHost(window.location.hostname)) return;
    const saved = readChoice();
    setActive(true);
    setChoice(saved);
    setOpen(saved === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_REOPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, reopen);
  }, []);

  // Load once consent is granted; send PageView for the first page and for every page change.
  useEffect(() => {
    if (!active || choice !== "granted" || !META_PIXEL_ID) return;
    loadPixel(META_PIXEL_ID);
    window.fbq?.("consent", "grant");
    if (lastTracked.current !== pathname) {
      lastTracked.current = pathname;
      window.fbq?.("track", "PageView");
    }
  }, [active, choice, pathname]);

  const decide = useCallback((c: Choice) => {
    saveChoice(c);
    setChoice(c);
    setOpen(false);
    if (c === "denied") {
      window.fbq?.("consent", "revoke");
      lastTracked.current = null;
      clearMetaCookies();
    }
  }, []);

  if (!active || !open) return null;

  return (
    <div className="consent on-dark" role="region" aria-label="Cookie notice">
      <p className="consent__text" id="consent-text">
        We’d like to use Meta’s advertising pixel to measure how our ads perform. It stays off unless you
        accept, and you can change your mind any time from “Cookie settings” in the footer.{" "}
        <Link href="/privacy#cookies">Privacy policy</Link>
      </p>
      <div className="consent__actions">
        <button type="button" className="btn btn--sm" onClick={() => decide("granted")}>
          Accept
        </button>
        <button type="button" className="btn btn--sm btn--ghost" onClick={() => decide("denied")}>
          Decline
        </button>
      </div>
    </div>
  );
}

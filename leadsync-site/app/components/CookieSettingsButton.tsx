"use client";

import { useEffect, useState } from "react";
import { CONSENT_REOPEN_EVENT, META_PIXEL_ID, isPixelHost } from "../lib/config";

// Footer link that reopens the consent notice. Shown only where the Pixel can run.
export default function CookieSettingsButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(Boolean(META_PIXEL_ID) && isPixelHost(window.location.hostname));
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      className="legal__link"
      onClick={() => window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT))}
    >
      Cookie settings
    </button>
  );
}

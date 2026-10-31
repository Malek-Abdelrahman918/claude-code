"use client";

import Link from "next/link";
import { useState } from "react";

// Third-party video players (YouTube, Vimeo, Loom, Wistia) set cookies and send visitor data to
// their owners as soon as their iframe loads. So the iframe is not loaded on page load: the visitor
// presses play first, which loads it from the provider and starts the video.
function withAutoplay(src: string): string {
  const url = new URL(src);
  if (url.hostname === "fast.wistia.net" || url.hostname === "fast.wistia.com") {
    url.searchParams.set("autoPlay", "true");
  } else {
    url.searchParams.set("autoplay", "1");
  }
  return url.toString();
}

export default function VslEmbed({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const host = new URL(src).hostname.replace(/^www\./, "");

  if (playing) {
    return (
      <iframe
        src={withAutoplay(src)}
        title="LeadSync overview video"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <div className="vsl__placeholder">
      <button type="button" className="vsl__facade" onClick={() => setPlaying(true)} aria-label="Play the LeadSync overview video">
        <span className="vsl__play" aria-hidden="true" />
        <span className="vsl__note">Play video</span>
      </button>
      <p className="vsl__consent">
        Playing loads the video from {host}, which may set its own cookies.{" "}
        <Link href="/privacy#cookies">Details</Link>
      </p>
    </div>
  );
}

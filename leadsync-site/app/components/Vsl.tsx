import { ArrowRight } from "lucide-react";
import { BOOKING_ANCHOR, VSL_EMBED_URL, VSL_POSTER_URL, VSL_VIDEO_URL } from "../lib/config";

// The video is chosen from environment variables (see app/lib/config.ts):
//   NEXT_PUBLIC_VSL_EMBED_URL  -> YouTube / Vimeo / Loom / Wistia embed (takes precedence)
//   NEXT_PUBLIC_VSL_VIDEO_URL  -> a direct https link to a file you host
// With neither set, a clear placeholder is shown. Nothing autoplays.
export default function Vsl() {
  return (
    <section id="vsl" className="section on-dark" aria-labelledby="vsl-title">
      <div className="wrap">
        <p className="eyebrow">
          <span className="eyebrow__idx">00</span>
          <span>How it works</span>
        </p>

        <div className="shead">
          <h2 id="vsl-title" className="h2">
            See What Your Business <span className="serif">Could Automate.</span>
          </h2>
          <p className="lede">
            Discover how LeadSync identifies repetitive work, connects your existing tools, and
            implements AI-powered systems around your business operations.
          </p>
        </div>

        <div className="vsl">
          <div className="vsl__frame">
            {VSL_EMBED_URL ? (
              <iframe
                src={VSL_EMBED_URL}
                title="LeadSync overview video"
                loading="lazy"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : VSL_VIDEO_URL ? (
              <video
                controls
                playsInline
                preload="none"
                poster={VSL_POSTER_URL ?? undefined}
                src={VSL_VIDEO_URL}
                aria-label="LeadSync overview video"
              >
                Your browser can’t play this video.
              </video>
            ) : (
              <div className="vsl__placeholder" role="img" aria-label="Placeholder: the LeadSync overview video will appear here">
                <span className="vsl__play" aria-hidden="true" />
                <span className="vsl__note">Overview video coming soon</span>
              </div>
            )}
          </div>

          <div className="vsl__cta">
            <a className="btn btn--lg" href={BOOKING_ANCHOR}>
              Book a Discovery Call <ArrowRight size={18} className="arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Vsl from "./Vsl";

// Home hero: the headline and the VSL are the two dominant elements, side by side on
// desktop. On mobile they stack as headline, video, booking CTA, then the supporting copy.
export default function Hero() {
  return (
    <section className="hero home-hero on-dark" aria-labelledby="hero-title">
      <div className="wrap hh">
        <div className="hh__head">
          <p className="hero__label rise" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="dot" aria-hidden="true" />
            AI implementation consultancy
          </p>

          <h1 id="hero-title" className="h1 h1--hero rise" style={{ "--i": 1 } as React.CSSProperties}>
            Your Business Could Be Losing <span className="serif">20+ Hours and $2,000+</span> Every
            Month to Repetitive Work.
          </h1>
          <p className="hero__note rise" style={{ "--i": 1 } as React.CSSProperties}>
            Illustrative estimate. Actual time and cost savings vary by business.
          </p>
        </div>

        <div className="hh__media rise" style={{ "--i": 2 } as React.CSSProperties}>
          <Vsl />
        </div>

        <div className="hh__sub">
          <p className="lede hero__lede rise" style={{ "--i": 3 } as React.CSSProperties}>
            Manual data entry, repetitive customer enquiries, missed follow-ups, and disconnected
            tools waste your team’s time and create unnecessary costs. LeadSync identifies where AI
            can make a difference and builds practical systems to help you reclaim that time and
            reduce repetitive work.
          </p>
          <div className="hh__links rise" style={{ "--i": 4 } as React.CSSProperties}>
            <Link className="link-arrow" href="/process">
              How an engagement works <ArrowRight size={16} className="arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

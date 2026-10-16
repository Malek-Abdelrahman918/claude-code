import { ArrowRight } from "lucide-react";
import { BOOKING_ANCHOR, VSL_ANCHOR } from "../lib/config";

export default function Hero() {
  return (
    <section className="hero on-dark" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div>
          <p className="hero__label rise" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="dot" aria-hidden="true" />
            AI implementation consultancy
          </p>

          <h1 id="hero-title" className="h1 h1--long rise" style={{ "--i": 1 } as React.CSSProperties}>
            Your Business Could Be Losing <span className="serif">20+ Hours and $2,000+</span> Every
            Month to Repetitive Work.
          </h1>
          <p className="hero__note rise" style={{ "--i": 1 } as React.CSSProperties}>
            Illustrative estimate. Actual time and cost savings vary by business.
          </p>

          <p className="lede hero__lede rise" style={{ "--i": 2 } as React.CSSProperties}>
            Manual data entry, repetitive customer enquiries, missed follow-ups, and disconnected
            tools waste your team’s time and create unnecessary costs. LeadSync identifies where AI
            can make a difference and builds practical systems to help you reclaim that time and
            reduce repetitive work.
          </p>

          <div className="hero__cta rise" style={{ "--i": 3 } as React.CSSProperties}>
            <a className="btn btn--lg" href={BOOKING_ANCHOR}>
              Book a Discovery Call <ArrowRight size={18} className="arrow" aria-hidden="true" />
            </a>
            <a className="link-arrow" href={VSL_ANCHOR}>
              Watch How It Works <ArrowRight size={16} className="arrow" aria-hidden="true" />
            </a>
          </div>

          <dl className="facts rise" style={{ "--i": 4 } as React.CSSProperties}>
            <div>
              <dt>Built for</dt>
              <dd>Businesses with manual, repetitive operations</dd>
            </div>
            <div>
              <dt>Approach</dt>
              <dd className="areas">
                <span>Assess the problem</span>
                <span>Design the system</span>
                <span>Implement and integrate</span>
              </dd>
            </div>
            <div>
              <dt>Engagement</dt>
              <dd>Scoped and priced per project</dd>
            </div>
          </dl>
        </div>

        <figure
          className="leadcard rise"
          style={{ "--i": 3 } as React.CSSProperties}
          aria-label="Illustrative example: a customer enquiry becoming a structured record"
        >
          <div className="leadcard__bar">
            <span className="dot" aria-hidden="true" />
            Illustrative example · fictional data
          </div>

          <div className="leadcard__msg">
            <span className="tag">WhatsApp enquiry</span>
            <p className="bubble" style={{ margin: 0 }}>
              <span lang="ar" dir="rtl" className="ar">
                السلام عليكم
              </span>
              , I’d like a quote for office furniture for 30 staff, delivered next month. Can someone
              call me on Thursday?
            </p>
          </div>

          <div className="leadcard__flow" aria-hidden="true">
            ↓ Understood and structured by the system
          </div>

          <dl className="record">
            <div>
              <dt>Request</dt>
              <dd>Quote for office furniture</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>30 staff</dd>
            </div>
            <div>
              <dt>Timeline</dt>
              <dd>Delivery next month</dd>
            </div>
            <div>
              <dt>Next step</dt>
              <dd>Call on Thursday</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>
                <span className="chip">Ready for team</span>
              </dd>
            </div>
          </dl>

          <div className="leadcard__foot">
            <span className="tick" aria-hidden="true" />
            Passed to the right person with the full conversation attached
          </div>
        </figure>
      </div>
    </section>
  );
}

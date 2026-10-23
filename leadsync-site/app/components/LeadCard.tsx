// Illustrative, fictional example: an enquiry becoming a structured record.
// Shared by the home-page work preview and the /work page.
export default function LeadCard() {
  return (
    <figure
      className="leadcard"
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
  );
}

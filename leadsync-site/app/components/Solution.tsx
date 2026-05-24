import { Check } from "lucide-react";

const items = [
  {
    h: "Scoped per project, not per seat.",
    p: "Flat custom quote. No platform lock-in. You own everything I build.",
  },
  {
    h: "Plugs into what you already pay for.",
    p: "HubSpot, Salesforce, Pipedrive, Notion, Sheets, Slack, WhatsApp, Shopify — I meet your stack where it is.",
  },
  {
    h: "AI where it pays off, code where it counts.",
    p: 'Claude or OpenAI for judgement calls. Plain functions for the rest. No “AI everything” upsell.',
  },
  {
    h: "Two to six weeks, typically.",
    p: "Discovery → prototype → deploy. I won't disappear for three months.",
  },
];

export default function Solution() {
  return (
    <section id="solution" style={{ paddingTop: 32 }}>
      <div className="container">
        <div className="section-head">
          <span className="overline">What I do</span>
          <h2>Custom AI workflows. Built around your stack, not ours.</h2>
          <p>
            I sit with your team for an hour, find the repetitive work, and ship
            a workflow that handles it end-to-end. You keep your tools — I wire
            them together with an AI layer that actually understands the job.
          </p>
        </div>

        <div className="solution-wrap">
          <div className="solution-list">
            {items.map((item) => (
              <div key={item.h} className="item">
                <div className="check">
                  <Check size={16} />
                </div>
                <div>
                  <h4>{item.h}</h4>
                  <p>{item.p}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="preview-block">
            <div className="pbar">
              <span className="d" />
              <span className="d" />
              <span className="d" />
              <span className="ftitle">workflows/qualify-lead.n8n</span>
            </div>
            <pre>
              <span className="c"># trigger: WhatsApp message in</span>
              {"\n"}
              <span className="k">on</span>{" "}
              <span className="s">&quot;webhook:whatsapp.message&quot;</span>
              {" {\n  "}
              <span className="n">lead</span>
              {" = enrich(message.sender)\n  "}
              <span className="n">intent</span>
              {" = claude.classify(message.body)\n\n  "}
              <span className="k">if</span>
              {" intent == "}
              <span className="s">&quot;high_intent&quot;</span>
              {" {\n    crm.upsert(lead, status="}
              <span className="s">&quot;hot&quot;</span>
              {")\n    slack.post("}
              <span className="s">&quot;#sales&quot;</span>
              {", mention=lead.owner)\n    whatsapp.reply(claude.draft(lead))\n  } "}
              <span className="k">else</span>
              {" {\n    crm.upsert(lead, status="}
              <span className="s">&quot;nurture&quot;</span>
              {")\n    whatsapp.reply(template.faq(intent))\n  }\n}"}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

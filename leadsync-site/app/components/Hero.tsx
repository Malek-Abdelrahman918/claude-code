import { Inbox, Sparkles, Zap, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container inner">
        <span className="eyebrow">
          <span className="dot" />
          Booking projects for Q3
        </span>

        <h1>
          Automate the boring half of your business.{" "}
          <span className="grad">Ship it in weeks.</span>
        </h1>

        <p className="sub">
          Custom AI workflows for lead handling, sales, support, and ops. Built
          one client at a time on n8n, OpenAI, Claude, and the APIs you already
          use.
        </p>

        <div className="cta-row">
          <a className="btn btn--primary btn--lg" href="#contact">
            Book a free discovery call{" "}
            <ArrowRight size={18} className="arrow" />
          </a>
          <a className="btn btn--ghost btn--lg" href="#work">
            See a case study
          </a>
        </div>

        <div className="trust">
          <span>
            <b>Built for</b> agencies, SaaS, e-commerce, real estate
          </span>
          <span className="dot" />
          <span>Dubai · US · EU · global</span>
          <span className="dot" />
          <span>Pricing per project</span>
        </div>

        <div className="schematic">
          <div className="row">
            <div className="node">
              <div className="ico">
                <Inbox size={20} />
              </div>
              <div>
                <div className="label">Source</div>
                <div className="name">Forms · DMs · Ads · WhatsApp</div>
              </div>
            </div>

            <div className="arrow-x">
              <ArrowRight size={20} />
            </div>

            <div className="node ai-core">
              <div className="ico">
                <Sparkles size={20} />
              </div>
              <div>
                <div className="label">LeadSync AI</div>
                <div className="name">Qualify · Enrich · Route</div>
              </div>
            </div>

            <div className="arrow-x">
              <ArrowRight size={20} />
            </div>

            <div className="node purple">
              <div className="ico">
                <Zap size={20} />
              </div>
              <div>
                <div className="label">Destination</div>
                <div className="name">CRM · Slack · Email · Agent</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

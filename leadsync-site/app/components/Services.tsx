import {
  Users,
  TrendingUp,
  Headphones,
  Settings2,
  FileText,
  Database,
  BarChart3,
  ShoppingBag,
  Edit3,
} from "lucide-react";

const services = [
  {
    Icon: Users,
    h: "Lead handling",
    p: "Capture, score, enrich, and route inbound leads from forms, ads, DMs, and WhatsApp into your CRM in seconds.",
  },
  {
    Icon: TrendingUp,
    h: "Sales workflows",
    p: "Quote generation, follow-up sequences, deal-stage automations, meeting prep dossiers, post-call summaries.",
  },
  {
    Icon: Headphones,
    h: "Customer support bots",
    p: "24/7 first-line agent on WhatsApp, web chat, or email. Escalates to a human with full context when it should.",
  },
  {
    Icon: Settings2,
    h: "Internal operations",
    p: "Onboarding flows, approvals, internal Slack assistants, expense routing, knowledge-base bots for your team.",
  },
  {
    Icon: FileText,
    h: "Document processing",
    p: "Invoices, contracts, IDs, statements — extracted, validated, and pushed wherever they belong.",
  },
  {
    Icon: Database,
    h: "Data pipelines",
    p: "Scheduled ETL between your tools. Dedupe, normalize, sync. Stop exporting CSVs every Monday.",
  },
  {
    Icon: BarChart3,
    h: "Reporting dashboards",
    p: "Live KPIs auto-pulled from your stack, posted to Slack daily or rendered in Notion / Looker.",
  },
  {
    Icon: ShoppingBag,
    h: "E-commerce automation",
    p: "Abandoned-cart recovery, order updates over WhatsApp, returns workflows, dynamic restock alerts.",
  },
  {
    Icon: Edit3,
    h: "Content workflows",
    p: "Brief → draft → review → publish pipelines. AI-assisted, human-approved. Works for blog, social, and internal comms.",
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="section-head">
          <span className="overline">Services</span>
          <h2>If it&apos;s repetitive, it&apos;s automatable.</h2>
          <p>
            A non-exhaustive list of what I can build for your agency. Yours
            doesn&apos;t have to be on it — most projects are bespoke.
          </p>
        </div>
        <div className="services">
          {services.map(({ Icon, h, p }) => (
            <div key={h} className="service">
              <Icon size={26} className="ico" />
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

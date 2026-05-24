import {
  Workflow,
  Sparkles,
  MessageSquareCode,
  MessageCircle,
  DatabaseZap,
  Zap,
  Puzzle,
  Webhook,
  Code2,
  Database,
  Cloud,
  Terminal,
} from "lucide-react";

const tools = [
  { Icon: Workflow, name: "n8n" },
  { Icon: Sparkles, name: "OpenAI" },
  { Icon: MessageSquareCode, name: "Claude" },
  { Icon: MessageCircle, name: "WhatsApp API" },
  { Icon: DatabaseZap, name: "Redis" },
  { Icon: Zap, name: "Zapier" },
  { Icon: Puzzle, name: "Make" },
  { Icon: Webhook, name: "Webhooks" },
  { Icon: Code2, name: "REST APIs" },
  { Icon: Database, name: "Postgres" },
  { Icon: Cloud, name: "Supabase" },
  { Icon: Terminal, name: "Node · Python" },
];

export default function TechStack() {
  return (
    <section id="stack">
      <div className="container">
        <div className="section-head">
          <span className="overline">Tech stack</span>
          <h2>Pragmatic tools, not buzzwords.</h2>
          <p>
            I pick the tool that fits the job. I lean on this set most weeks —
            and I&apos;m fluent in whatever else your team already uses.
          </p>
        </div>
        <div className="stack-grid">
          {tools.map(({ Icon, name }) => (
            <div key={name} className="stack-item">
              <Icon size={28} className="ico" />
              <span className="name">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

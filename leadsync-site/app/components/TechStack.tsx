const tools = [
  "n8n",
  "OpenAI",
  "Claude",
  "WhatsApp API",
  "Redis",
  "Zapier",
  "Make",
  "Webhooks",
  "REST APIs",
  "Postgres",
  "Supabase",
  "Node · Python",
];

export default function TechStack() {
  return (
    <section id="stack" className="section section--tight on-light" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="stack">
          <div>
            <p className="tag" style={{ color: "var(--acc)" }}>
              05 · Stack
            </p>
            <h2 id="stack-title" className="h3">
              Tools I work with.
            </h2>
            <p className="small" style={{ marginTop: 10, maxWidth: "30rem" }}>
              The tool follows the problem. I choose what fits the job and work with the stack your team already uses.
            </p>
          </div>
          <ul className="chips" aria-label="Tools">
            {tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

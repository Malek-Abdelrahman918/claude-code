import { MessageCircle, LayoutTemplate, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    num: "STEP 01",
    Icon: MessageCircle,
    h: "Discovery call",
    p: "30 minutes. You show me the pain. I tell you if I can fix it and roughly what it'll take. Free, no pitch deck.",
  },
  {
    num: "STEP 02",
    Icon: LayoutTemplate,
    h: "Scope & quote",
    p: "One-pager with the workflow, the stack, success criteria, and a flat price. Sign or don't — no pressure.",
  },
  {
    num: "STEP 03",
    Icon: Cpu,
    h: "Build & iterate",
    p: "I ship a working version in week one. You poke at it. We tune the edges together until it's invisible.",
  },
  {
    num: "STEP 04",
    Icon: Rocket,
    h: "Deploy & handover",
    p: "Live on your infra or mine. Full docs, runbook, and 14 days of bug-fix support. You own the code.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how">
      <div className="container">
        <div className="section-head">
          <span className="overline">How it works</span>
          <h2>From &quot;this is killing us&quot; to live in production.</h2>
        </div>
        <div className="steps">
          {steps.map(({ num, Icon, h, p }) => (
            <div key={num} className="step">
              <span className="num">{num}</span>
              <Icon size={28} className="ico" />
              <h3>{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

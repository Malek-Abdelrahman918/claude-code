export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 via-white to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-brand-400 to-brand-600 opacity-20 sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="container-x py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100/70 px-4 py-1.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
            New: AI lead scoring is live
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Turn leads into customers,{" "}
            <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
              automatically
            </span>
          </h1>

          <p className="mt-6 text-pretty text-lg leading-8 text-slate-600">
            LeadSync unifies your inbound leads across forms, ads, and CRMs so your
            team can respond in seconds, not days. Stop losing deals to slow follow-ups.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href="#contact" className="btn-primary w-full sm:w-auto">
              Start free trial
            </a>
            <a href="#services" className="btn-secondary w-full sm:w-auto">
              See how it works →
            </a>
          </div>

          <p className="mt-6 text-xs text-slate-500">
            No credit card required · 14-day free trial · Cancel anytime
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-y-8 sm:grid-cols-4">
          {[
            { k: "10k+", v: "Active teams" },
            { k: "2.4M", v: "Leads synced/mo" },
            { k: "<2s", v: "Avg. response" },
            { k: "98%", v: "Retention rate" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-3xl font-bold tracking-tight text-slate-900">{s.k}</div>
              <div className="mt-1 text-sm text-slate-600">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

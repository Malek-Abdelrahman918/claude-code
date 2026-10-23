import type { ReactNode } from "react";

// Heading block that opens each inner page (the only h1 on the page).
export default function PageHeader({
  idx,
  label,
  title,
  lede,
}: {
  idx?: string;
  label?: string;
  title: ReactNode;
  lede: ReactNode;
}) {
  return (
    <section className="page-head on-dark" aria-labelledby="page-title">
      <div className="wrap">
        {label && (
          <p className="eyebrow">
            {idx && <span className="eyebrow__idx">{idx}</span>}
            <span>{label}</span>
          </p>
        )}
        <div className="shead">
          <h1 id="page-title" className="h1 h1--page">
            {title}
          </h1>
          <p className="lede">{lede}</p>
        </div>
      </div>
    </section>
  );
}

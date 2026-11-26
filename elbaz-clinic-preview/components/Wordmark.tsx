/**
 * Typographic identity. No verified logo exists publicly, so the mark is a
 * miniature goniometer arc beside the surname — a proposal, not the clinic's logo.
 */
export function Wordmark({ sub, tone = "ink" }: { sub?: string; tone?: "ink" | "light" }) {
  return (
    <span className={`wordmark wordmark--${tone}`}>
      <svg viewBox="0 0 40 24" className="wordmark__glyph" aria-hidden="true">
        <path d="M36 21 A16 16 0 0 0 4 21" />
        <line x1="20" y1="21" x2="37" y2="21" />
        <line x1="20" y1="21" x2="9.5" y2="9" className="wordmark__needle" />
        <circle cx="20" cy="21" r="2.4" />
      </svg>
      <span className="wordmark__text">
        <span className="wordmark__name">الباز</span>
        {sub && <span className="wordmark__sub">{sub}</span>}
      </span>
    </span>
  );
}

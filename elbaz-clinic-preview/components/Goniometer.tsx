/**
 * The site's signature motif: a goniometer — the instrument physiotherapists use
 * to measure a joint's range of motion. Drawn as precise line work (no stock photo),
 * rendered on the server, animated with CSS only.
 *
 * 0° sits on the right, so the sweep reads right-to-left like the Arabic text.
 */

const toArabicDigits = (n: number) =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

type Props = {
  /** Degrees swept by the moving arm. */
  sweep?: number;
  /** Full instrument with labels, or a compact glyph. */
  variant?: "full" | "mini";
  className?: string;
  title?: string;
};

export function Goniometer({ sweep = 128, variant = "full", className, title }: Props) {
  const full = variant === "full";
  const W = 600;
  const cx = W / 2;
  const cy = full ? 310 : 300;
  const R = 270; // outer scale
  const r = 232; // swept-range arc
  const arcLen = Math.PI * r;

  const pt = (deg: number, rad: number) => {
    const a = (deg * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy - rad * Math.sin(a)] as const;
  };

  const ticks: JSX.Element[] = [];
  if (full) {
    for (let d = 0; d <= 180; d += 2) {
      const major = d % 30 === 0;
      const mid = d % 10 === 0;
      const len = major ? 22 : mid ? 13 : 6;
      const [x1, y1] = pt(d, R);
      const [x2, y2] = pt(d, R - len);
      ticks.push(
        <line
          key={d}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          className={major ? "g-tick g-tick--major" : "g-tick"}
        />,
      );
      if (major) {
        const [lx, ly] = pt(d, R + 22);
        ticks.push(
          <text key={`l${d}`} x={lx} y={ly} className="g-label" textAnchor="middle" dominantBaseline="middle">
            {toArabicDigits(d)}
          </text>,
        );
      }
    }
  } else {
    for (let d = 0; d <= 180; d += 15) {
      const [x1, y1] = pt(d, R);
      const [x2, y2] = pt(d, R - (d % 45 === 0 ? 34 : 18));
      ticks.push(<line key={d} x1={x1} y1={y1} x2={x2} y2={y2} className="g-tick g-tick--major" />);
    }
  }

  const [sx, sy] = pt(0, r);
  const [ex, ey] = pt(180, r);
  const [ox, oy] = pt(0, R + 6);
  const viewH = full ? 360 : 320;

  return (
    <svg
      viewBox={`0 0 ${W} ${viewH}`}
      className={`goniometer goniometer--${variant} ${className ?? ""}`}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      style={{ ["--sweep" as string]: `${-sweep}deg`, ["--arc" as string]: arcLen, ["--arc-on" as string]: arcLen * (1 - sweep / 180) }}
    >
      {/* Outer scale */}
      <path d={`M ${cx + R} ${cy} A ${R} ${R} 0 0 0 ${cx - R} ${cy}`} className="g-scale" />
      {full && <path d={`M ${cx + 150} ${cy} A 150 150 0 0 0 ${cx - 150} ${cy}`} className="g-inner" />}
      {ticks}

      {/* Swept range */}
      <path d={`M ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey}`} className="g-range" />

      {/* Fixed arm along 0° */}
      <line x1={cx} y1={cy} x2={ox} y2={oy} className="g-arm g-arm--fixed" />

      {/* Moving arm */}
      <g className="g-needle" style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <line x1={cx} y1={cy} x2={cx + R + 6} y2={cy} className="g-arm g-arm--moving" />
        <circle cx={cx + r} cy={cy} r={full ? 6 : 14} className="g-bead" />
      </g>

      {/* Pivot */}
      <circle cx={cx} cy={cy} r={full ? 16 : 26} className="g-pivot" />
      <circle cx={cx} cy={cy} r={full ? 4 : 8} className="g-pivot-dot" />
    </svg>
  );
}

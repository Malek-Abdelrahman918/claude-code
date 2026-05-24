type Props = {
  size?: "sm" | "md";
};

export default function Logo({ size = "md" }: Props) {
  const fontSize = size === "sm" ? 18 : 22;
  return (
    <span
      style={{
        fontFamily: "var(--font-orbitron), ui-sans-serif, system-ui, sans-serif",
        fontWeight: 400,
        fontSize,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--fg)",
        display: "inline-flex",
        lineHeight: 1,
        userSelect: "none",
      }}
    >
      <span>LEAD</span>
      <span style={{ color: "var(--ls-cyan)" }}>S</span>
      <span>YNC</span>
    </span>
  );
}

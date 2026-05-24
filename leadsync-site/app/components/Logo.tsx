import Image from "next/image";

export default function Logo({ width = 120 }: { width?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="LeadSync"
      width={width}
      height={0}
      sizes={`${width}px`}
      style={{ width, height: "auto", display: "block" }}
      priority
    />
  );
}

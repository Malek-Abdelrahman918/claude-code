import Image from "next/image";

type Props = {
  width?: number;
};

export default function Logo({ width = 140 }: Props) {
  return (
    <Image
      src="/logo.png"
      alt="LeadSync"
      width={width}
      height={0}
      style={{ height: "auto", display: "block" }}
      priority
    />
  );
}

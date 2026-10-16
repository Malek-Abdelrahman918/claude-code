import Image from "next/image";

// logo.png is a 500x500 canvas with the wordmark centred in it (about 330x53px).
// Crop to the wordmark with CSS so the layout box matches what is visible,
// instead of reserving a large transparent square.
const CROP = { x: 82, y: 212, w: 338, h: 61 };
const SCALE = 500 / CROP.w;

export default function Logo({ width = 156 }: { width?: number }) {
  return (
    <span className="logo" style={{ width, aspectRatio: `${CROP.w} / ${CROP.h}` }}>
      <Image
        src="/logo.png"
        alt="LeadSync"
        width={500}
        height={500}
        sizes={`${Math.ceil(width * SCALE)}px`}
        priority
        style={{
          position: "absolute",
          maxWidth: "none",
          height: "auto",
          width: `${SCALE * 100}%`,
          left: `${(-CROP.x / CROP.w) * 100}%`,
          top: `${(-CROP.y / CROP.h) * 100}%`,
        }}
      />
    </span>
  );
}

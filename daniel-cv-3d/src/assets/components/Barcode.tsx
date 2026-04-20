import { useMemo } from "react";
import { colors } from "../tokens";

type Props = {
  seed?: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
};

/** Deterministic decorative barcode — not scannable. */
export function Barcode({
  seed = "DT-2026",
  caption,
  width = 200,
  height = 44,
  className,
}: Props) {
  const bars = useMemo(() => {
    // Simple string-seeded PRNG so the same seed gives the same bars.
    let h = 2166136261;
    for (let i = 0; i < seed.length; i++) {
      h ^= seed.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    const rand = () => {
      h = (h * 1664525 + 1013904223) >>> 0;
      return h / 0xffffffff;
    };
    const out: { x: number; w: number }[] = [];
    let x = 0;
    while (x < width - 2) {
      const w = 1 + Math.floor(rand() * 4);
      const gap = 1 + Math.floor(rand() * 2);
      out.push({ x, w });
      x += w + gap;
    }
    return out;
  }, [seed, width]);

  const barHeight = caption ? height - 8 : height;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={caption ?? "barcode"}
    >
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={barHeight} fill={colors.ink} />
      ))}
      {caption && (
        <text
          x={0}
          y={height - 1}
          fill={colors.ink}
          fontFamily='JetBrains Mono, ui-monospace, monospace'
          fontSize={6}
          letterSpacing={1.5}
        >
          {caption}
        </text>
      )}
    </svg>
  );
}

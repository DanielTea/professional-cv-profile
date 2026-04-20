import type { CSSProperties } from "react";
import { colors } from "../tokens";

type Props = {
  height?: number;
  direction?: "left" | "right";
  tone?: "ink" | "orange";
  className?: string;
  style?: CSSProperties;
};

/** Diagonal hazard-stripe tape. Transparent gaps sit on paper. */
export function HazardTape({
  height = 14,
  direction = "left",
  tone = "ink",
  className,
  style,
}: Props) {
  const color = tone === "orange" ? colors.orange : colors.ink;
  const angle = direction === "left" ? -45 : 45;
  return (
    <div
      className={className}
      role="presentation"
      aria-hidden
      style={{
        width: "100%",
        height,
        backgroundImage: `repeating-linear-gradient(${angle}deg, ${color} 0 8px, transparent 8px 16px)`,
        ...style,
      }}
    />
  );
}

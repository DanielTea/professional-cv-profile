import { colors } from "../tokens";

type Props = { size?: number; tone?: "ink" | "orange" | "paper" };

/**
 * DT monogram — solid ink badge with a chamfered top-right corner and
 * paper-knockout "D·T" set in the display face. Reads as a stamp at any size.
 */
export function Monogram({ size = 40, tone = "ink" }: Props) {
  const bg = tone === "orange" ? colors.orange : tone === "paper" ? colors.paper : colors.ink;
  const fg = tone === "paper" ? colors.ink : colors.paper;
  const accent = tone === "ink" ? colors.orange : bg;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-label="Daniel Tremer"
      style={{ display: "block" }}
    >
      {/* Chamfered body */}
      <path
        d="M1 1 H36 L47 12 V47 H1 Z"
        fill={bg}
        stroke={bg}
        strokeWidth="0"
      />
      {/* Accent hairline along the chamfer */}
      <path
        d="M36 1 L47 12"
        fill="none"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="square"
      />
      {/* Monogram "DT" — compact, Orbitron-flavored */}
      <g fill={fg}>
        {/* D: square + notched right side (slight curve via right cap) */}
        <path d="M7 14 H16 L20 18 V32 L16 36 H7 Z" />
        {/* inner knockout */}
        <path d="M11 18 V32 H16 L17 31 V19 L16 18 Z" fill={bg} />
        {/* T: wide cap + stem */}
        <rect x="24" y="14" width="18" height="4" />
        <rect x="31" y="18" width="4" height="18" />
      </g>
      {/* Tiny index tick — reads like an editorial mark */}
      <circle cx="42" cy="42" r="1.4" fill={accent} />
    </svg>
  );
}

"use client";
import { colors, fonts } from "../tokens";

type Props = {
  items: string[];
  speed?: number; // seconds for one full loop
  tone?: "ink" | "orange";
};

/** Infinite horizontal marquee strip — mono caps. CSS-only animation. */
export function TickerLine({ items, speed = 45, tone = "ink" }: Props) {
  const bg = tone === "orange" ? colors.orange : colors.ink;
  const fg = tone === "orange" ? colors.ink : colors.paper;
  const track = [...items, ...items].join("   •   ");
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: bg,
        color: fg,
        padding: "8px 0",
        borderTop: `1px solid ${colors.ink}`,
        borderBottom: `1px solid ${colors.ink}`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          animation: `dt-ticker ${speed}s linear infinite`,
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          paddingLeft: "100%",
        }}
      >
        {track}
      </div>
      <style>{`
        @keyframes dt-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

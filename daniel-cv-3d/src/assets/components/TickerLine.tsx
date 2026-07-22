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
        className="dt-ticker-track"
        style={{
          display: "inline-block",
          whiteSpace: "nowrap",
          // Duration flows through a custom property so the reduced-motion
          // override below can win without fighting an inline animation.
          ["--dt-ticker-speed" as string]: `${speed}s`,
          fontFamily: fonts.mono,
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}
      >
        {track}
      </div>
      <style>{`
        .dt-ticker-track {
          padding-left: 100%;
          animation: dt-ticker var(--dt-ticker-speed, 45s) linear infinite;
        }
        @keyframes dt-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          /* Stop the marquee and pull the track back on-screen so the
             items read as a static strip instead of scrolling past. */
          .dt-ticker-track {
            animation: none;
            padding-left: 0;
          }
        }
      `}</style>
    </div>
  );
}

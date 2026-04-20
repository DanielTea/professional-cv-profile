import type { CSSProperties, ReactNode } from "react";
import { colors, radii } from "../tokens";

type Props = {
  children?: ReactNode;
  label?: string;
  code?: string;
  tone?: "paper" | "ink" | "orange";
  className?: string;
  style?: CSSProperties;
};

/** Rounded-rect techwear frame with optional label pill + code tag (ChainGPT-style). */
export function Frame({
  children,
  label,
  code,
  tone = "paper",
  className,
  style,
}: Props) {
  const bg =
    tone === "ink" ? colors.ink : tone === "orange" ? colors.orange : colors.paper;
  const fg = tone === "paper" ? colors.ink : colors.paper;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        background: bg,
        color: fg,
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.frame,
        padding: "18px 20px",
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            position: "absolute",
            top: -10,
            left: 14,
            background: bg,
            padding: "0 6px",
            fontFamily: "var(--mono, JetBrains Mono, monospace)",
            fontSize: 10,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      )}
      {code && (
        <span
          style={{
            position: "absolute",
            top: -10,
            right: 14,
            background: bg,
            padding: "0 6px",
            fontFamily: "var(--mono, JetBrains Mono, monospace)",
            fontSize: 10,
            letterSpacing: "0.18em",
            color: colors.inkMute,
          }}
        >
          {code}
        </span>
      )}
      {children}
    </div>
  );
}

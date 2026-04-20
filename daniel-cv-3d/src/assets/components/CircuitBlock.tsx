import type { ReactNode } from "react";
import { colors } from "../tokens";

type Props = {
  children?: ReactNode;
  height?: number;
  label?: string;
};

/** Orange flag block with PCB traces bleeding right — BLACKBOX accent. */
export function CircuitBlock({ children, height = 160, label }: Props) {
  return (
    <div style={{ position: "relative", width: "100%", height }}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 600 ${height}`}
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0 }}
        aria-hidden
      >
        <rect x="0" y="0" width="240" height={height} fill={colors.orange} />
        <g stroke={colors.ink} strokeWidth="1.25" fill="none">
          <path d={`M240 ${height * 0.2} H330 L345 ${height * 0.32} H470 M470 ${height * 0.32} H520 L540 ${height * 0.44} H600`} />
          <path d={`M240 ${height * 0.5} H300 L315 ${height * 0.6} H420 L440 ${height * 0.68} H540`} />
          <path d={`M240 ${height * 0.78} H340 M360 ${height * 0.78} H440 L460 ${height * 0.88} H600`} />
        </g>
        <g fill={colors.ink}>
          <circle cx="345" cy={height * 0.32} r="3" />
          <circle cx="540" cy={height * 0.44} r="3" />
          <circle cx="440" cy={height * 0.68} r="3" />
          <rect x="576" y={height * 0.4} width="8" height="8" />
          <rect x="536" y={height * 0.82} width="8" height="8" />
        </g>
      </svg>
      {label && (
        <span
          style={{
            position: "absolute",
            left: 20,
            top: 16,
            fontFamily: "JetBrains Mono, ui-monospace, monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: colors.ink,
          }}
        >
          {label}
        </span>
      )}
      {children && (
        <div
          style={{
            position: "absolute",
            left: 20,
            bottom: 16,
            color: colors.ink,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

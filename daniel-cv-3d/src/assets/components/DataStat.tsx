import type { ReactNode } from "react";
import { colors, fonts } from "../tokens";

type Props = {
  value: ReactNode;
  label: string;
  hint?: string;
  size?: "sm" | "md" | "lg";
};

/** Big numeric value over a small mono label (POLYMER / ChainGPT stat cell). */
export function DataStat({ value, label, hint, size = "md" }: Props) {
  const valueSize = size === "lg" ? 44 : size === "sm" ? 20 : 28;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <div
        style={{
          fontFamily: fonts.display,
          fontWeight: 800,
          fontSize: valueSize,
          lineHeight: 1,
          letterSpacing: "-0.01em",
          color: colors.ink,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: colors.inkMute,
        }}
      >
        {label}
      </div>
      {hint && (
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            color: colors.inkSoft,
            marginTop: 2,
          }}
        >
          {hint}
        </div>
      )}
    </div>
  );
}

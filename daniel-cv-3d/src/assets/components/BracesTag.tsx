import type { ReactNode } from "react";
import { colors, fonts } from "../tokens";

type Props = {
  children: ReactNode;
  tone?: "ink" | "orange";
};

/** { LABEL } stencil-style tag. */
export function BracesTag({ children, tone = "ink" }: Props) {
  const color = tone === "orange" ? colors.orange : colors.ink;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: fonts.display,
        fontWeight: 800,
        fontSize: 18,
        letterSpacing: "0.02em",
        color,
      }}
    >
      <span aria-hidden style={{ fontWeight: 500 }}>{"{"}</span>
      <span>{children}</span>
      <span aria-hidden style={{ fontWeight: 500 }}>{"}"}</span>
    </span>
  );
}

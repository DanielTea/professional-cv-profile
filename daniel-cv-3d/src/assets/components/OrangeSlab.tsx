import type { CSSProperties, ReactNode } from "react";
import { colors } from "../tokens";

type Props = {
  children?: ReactNode;
  /** full-bleed pulls the block to the viewport edge */
  fullBleed?: boolean;
  height?: number | string;
  style?: CSSProperties;
};

/** Full-bleed orange accent slab for heroes / dividers. */
export function OrangeSlab({ children, fullBleed, height = "auto", style }: Props) {
  return (
    <div
      style={{
        background: colors.orange,
        color: colors.ink,
        padding: "28px 32px",
        height,
        ...(fullBleed ? { marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

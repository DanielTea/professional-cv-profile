import type { CSSProperties, ReactNode } from "react";
import { colors } from "../tokens";

type Props = {
  children?: ReactNode;
  gap?: number;
  className?: string;
  style?: CSSProperties;
};

/** Swiss editorial hairline grid backdrop (ChainGPT). */
export function GridBackdrop({ children, gap = 48, className, style }: Props) {
  return (
    <div
      className={className}
      style={{
        position: "relative",
        background: `
          linear-gradient(to right, ${colors.grid} 1px, transparent 1px) 0 0 / ${gap}px 100%,
          linear-gradient(to bottom, ${colors.grid} 1px, transparent 1px) 0 0 / 100% ${gap}px,
          ${colors.paper}
        `,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

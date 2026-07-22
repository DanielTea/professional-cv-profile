import type { ReactNode } from "react";
import { fonts, radii } from "../tokens";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
};

/** Apply-now style orange pill button (ChainGPT). */
export function OrangePill({ children, href, onClick, variant = "solid" }: Props) {
  const Tag = href ? "a" : "button";
  // Color, border, and hover/focus feedback live in globals.css (.dt-pill)
  // so :hover / :focus-visible states can restyle the gradient fill.
  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 18px",
    borderRadius: radii.sm,
    fontFamily: fonts.mono,
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
  };
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`dt-pill dt-pill--${variant}`}
      style={style}
    >
      {children}
      <span className="dt-pill-arrow" aria-hidden>
        →
      </span>
    </Tag>
  );
}

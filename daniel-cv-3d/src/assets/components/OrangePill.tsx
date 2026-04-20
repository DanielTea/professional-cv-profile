import type { ReactNode } from "react";
import { colors, fonts, radii } from "../tokens";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
};

/** Apply-now style orange pill button (ChainGPT). */
export function OrangePill({ children, href, onClick, variant = "solid" }: Props) {
  const Tag = href ? "a" : "button";
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
    background: variant === "solid" ? colors.orange : "transparent",
    color: variant === "solid" ? colors.paper : colors.orange,
    border: `1.5px solid ${colors.orange}`,
    cursor: "pointer",
    textDecoration: "none",
  };
  return (
    <Tag href={href} onClick={onClick} style={style}>
      {children}
      <span aria-hidden>→</span>
    </Tag>
  );
}

import type { ReactNode } from "react";
import { fonts, radii } from "../tokens";
import { ArrowUpRight } from "./ArrowUpRight";
import { ArrowRight } from "./ArrowRight";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
};

/** Apply-now style orange pill button (ChainGPT). */
export function OrangePill({ children, href, onClick, variant = "solid" }: Props) {
  const Tag = href ? "a" : "button";
  // Off-site links (LinkedIn, GitHub, …) open in a new tab so the CV stays put,
  // matching every other outbound link on the page. mailto:/tel:/in-page anchors
  // stay in the same tab. rel guards the new window; a visually-hidden note tells
  // assistive tech the link opens a new tab.
  const isExternal = !!href && /^https?:\/\//i.test(href);
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
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <span className="dt-pill-arrow" aria-hidden>
        {isExternal ? <ArrowUpRight size="1em" /> : <ArrowRight size="1em" />}
      </span>
      {isExternal && <span className="dt-sr-only"> (opens in new tab)</span>}
    </Tag>
  );
}

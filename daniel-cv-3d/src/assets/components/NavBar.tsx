"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import { colors, fonts } from "../tokens";
import { Monogram } from "./Monogram";
import { OrangePill } from "./OrangePill";

type Item = { label: string; href: string };

type Props = {
  items?: Item[];
  cta?: { label: string; href: string };
  code?: string;
};

/** Sticky techwear top bar: monogram, mono links, orange CTA. */
export function NavBar({
  items = [
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],
  cta = { label: "Hire", href: "mailto:info@danieltremer.com" },
  code = "DT // REV.01",
}: Props) {
  const isMobile = useIsMobile();
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: colors.paper,
        borderBottom: `1px solid ${colors.ink}`,
        backdropFilter: "saturate(180%)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "auto 1fr auto" : "auto 1fr auto auto",
          alignItems: "center",
          gap: isMobile ? 12 : 20,
          padding: isMobile ? "10px 16px" : "10px 32px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: colors.ink }}>
          <Monogram size={isMobile ? 28 : 32} />
          {!isMobile && (
            <span style={{ fontFamily: fonts.display, fontWeight: 900, letterSpacing: "0.02em" }}>
              DANIEL TREMER
            </span>
          )}
        </a>
        {!isMobile && (
          <nav style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap" }}>
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: colors.ink,
                  textDecoration: "none",
                }}
              >
                {it.label}
              </a>
            ))}
          </nav>
        )}
        {isMobile && (
          <span
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 14,
              letterSpacing: "0.02em",
              color: colors.ink,
            }}
          >
            DANIEL TREMER
          </span>
        )}
        {!isMobile && (
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: colors.inkMute,
            }}
          >
            {code}
          </span>
        )}
        <OrangePill href={cta.href}>{cta.label}</OrangePill>
      </div>
    </header>
  );
}

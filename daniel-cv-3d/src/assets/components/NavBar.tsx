"use client";
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
          gridTemplateColumns: "auto 1fr auto auto",
          alignItems: "center",
          gap: 20,
          padding: "10px 32px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: colors.ink }}>
          <Monogram size={32} />
          <span style={{ fontFamily: fonts.display, fontWeight: 900, letterSpacing: "0.02em" }}>
            DANIEL TREMER
          </span>
        </a>
        <nav style={{ display: "flex", justifyContent: "center", gap: 28 }}>
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
        <OrangePill href={cta.href}>{cta.label}</OrangePill>
      </div>
    </header>
  );
}

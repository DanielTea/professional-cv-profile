"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import { colors, fonts, gradients, space } from "../tokens";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll-spy: light up the nav link for whichever section owns the viewport.
  // A thin trigger band near the top third decides the "current" section; the
  // last-known intersecting states persist in a map so the active link never
  // flickers to nothing between sections. Sets aria-current for assistive tech.
  useEffect(() => {
    const ids = items
      .map((it) => it.href)
      .filter((h) => h.startsWith("#"))
      .map((h) => h.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = ids.find((id) => visible.get(id));
        if (current) setActiveId(current);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  // Scroll progress drives the gradient bar via scaleX on the ref directly —
  // no state, so scrolling never re-renders the header.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = progressRef.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Escape closes the menu; a viewport change to desktop discards it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

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
          gridTemplateColumns: isMobile ? "auto 1fr auto auto" : "auto 1fr auto auto",
          alignItems: "center",
          gap: isMobile ? space.md : space.lg,
          padding: isMobile ? `${space.sm}px ${space.md}px` : `${space.sm}px ${space.xl}px`,
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
          <nav aria-label="Primary" style={{ display: "flex", justifyContent: "center", gap: space.xl, flexWrap: "wrap" }}>
            {items.map((it) => {
              const isActive = it.href === `#${activeId}`;
              return (
                <a
                  key={it.href}
                  href={it.href}
                  className={isActive ? "dt-navlink dt-navlink--active" : "dt-navlink"}
                  aria-current={isActive ? "true" : undefined}
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
              );
            })}
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
        {isMobile && (
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="dt-mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            style={{
              width: 36,
              height: 36,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
              background: menuOpen ? colors.ink : "transparent",
              border: `1.5px solid ${colors.ink}`,
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              {menuOpen ? (
                <path d="M3 3l10 10M13 3L3 13" stroke={colors.paper} strokeWidth="1.5" />
              ) : (
                <path d="M2 4h12M2 8h12M2 12h8" stroke={colors.ink} strokeWidth="1.5" />
              )}
            </svg>
          </button>
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
      {/* Reading-progress bar: signature gradient fills left-to-right as the page scrolls */}
      <div
        ref={progressRef}
        aria-hidden
        style={{
          height: 2,
          background: gradients.edge,
          transform: "scaleX(0)",
          transformOrigin: "left",
          pointerEvents: "none",
        }}
      />
      {isMobile && menuOpen && (
        <nav
          id="dt-mobile-menu"
          aria-label="Primary"
          style={{
            borderTop: `1px solid ${colors.ink}`,
            background: `${gradients.mesh}, ${colors.paper}`,
          }}
        >
          {/* Gradient signature edge, matching the site's card language */}
          <div aria-hidden style={{ height: 3, background: gradients.edge }} />
          {items.map((it, i) => {
            const isActive = it.href === `#${activeId}`;
            return (
              <a
                key={it.href}
                href={it.href}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: space.md,
                  minHeight: 44,
                  padding: `${space.md}px ${space.lg}px`,
                  borderLeft: `3px solid ${isActive ? colors.orange : "transparent"}`,
                  borderBottom: i < items.length - 1 ? `1px solid ${colors.grid}` : "none",
                  fontFamily: fonts.mono,
                  fontSize: 12,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: colors.ink,
                  textDecoration: "none",
                }}
              >
                <span aria-hidden style={{ fontSize: 10, color: isActive ? colors.orange : colors.inkMute }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {it.label}
              </a>
            );
          })}
        </nav>
      )}
    </header>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  FileTag,
  SectionRule,
  StencilTitle,
  colors,
  fonts,
  gradients,
  radii,
  space,
} from "@/assets";
import pressData from "@/data/press.json";

type PressItem = {
  id: string;
  title: string;
  source: string;
  kind?: string;
  date: string; // ISO yyyy-mm-dd
  url: string;
  summary: string;
  image?: string;
};

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

// Deterministic (locale-free) so static prerender and client agree.
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const month = MONTHS[Number(m) - 1] ?? m;
  return `${d} ${month} ${y}`;
}

const ITEMS = (pressData as PressItem[])
  .slice()
  .sort((a, b) => b.date.localeCompare(a.date));

function PressImage({ src, source }: { src?: string; source: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // Catch images that already failed before hydration (onError won't re-fire).
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (!src || failed) {
    // Fallback: gradient field with the publication's initial stamped on it.
    return (
      <div
        aria-hidden
        style={{
          height: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `${gradients.mesh}, ${colors.paperDim}`,
          borderBottom: `1px solid ${colors.ink}`,
        }}
      >
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 63,
            lineHeight: 1,
            background: gradients.accent,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: colors.orange,
            WebkitTextFillColor: "transparent",
          }}
        >
          {source.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }
  return (
    <div style={{ position: "relative", borderBottom: `1px solid ${colors.ink}` }}>
      <img
        ref={imgRef}
        src={src}
        alt={`${source} — article preview`}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          display: "block",
          filter: "saturate(0.92)",
        }}
      />
      {/* Gradient wash keys external imagery into the site's palette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: gradients.wash,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function PressCard({ item, isMobile }: { item: PressItem; isMobile: boolean }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.frame,
        overflow: "hidden",
        background: colors.paper,
        color: colors.ink,
        textDecoration: "none",
        boxShadow: hover ? `4px 4px 0 ${colors.orange}` : "none",
        transform: hover ? "translate(-2px, -2px)" : "none",
        transition: "transform 120ms ease, box-shadow 120ms ease",
      }}
    >
      {/* Gradient signature edge */}
      <div aria-hidden style={{ height: 3, background: gradients.edge }} />
      <PressImage src={item.image} source={item.source} />
      <div style={{ padding: isMobile ? space.md : space.lg, display: "flex", flexDirection: "column", gap: space.sm, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: space.md, flexWrap: "wrap" }}>
          <FileTag tone="orange">{item.kind ?? "Press"}</FileTag>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.18em",
              color: colors.inkMute,
            }}
          >
            {formatDate(item.date)}
          </span>
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 19,
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: fonts.mono,
            fontSize: 11,
            lineHeight: 1.55,
            color: colors.inkSoft,
            flex: 1,
          }}
        >
          {item.summary}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${colors.grid}`,
            paddingTop: space.sm,
            marginTop: space.xs,
          }}
        >
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: colors.inkMute,
            }}
          >
            Source: {item.source}
          </span>
          <span
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 18,
              color: hover ? colors.orange : colors.ink,
              transition: "color 120ms ease",
            }}
            aria-hidden
          >
            →
          </span>
        </div>
      </div>
    </a>
  );
}

/** SEC_08 — curated third-party coverage: talks, articles, interviews. */
export function Press() {
  const isMobile = useIsMobile();
  if (ITEMS.length === 0) return null;
  return (
    <section
      id="news"
      style={{
        padding: isMobile ? `${space.xl}px ${space.md}px` : `${space.xxl}px`,
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: space.lg }}>
        <FileTag>SEC_08 / PRESS SIGNAL</FileTag>
        <StencilTitle size={96} tone="gradient">
          IN THE NEWS
        </StencilTitle>
      </div>
      <SectionRule
        label="COVERAGE"
        code={`${ITEMS.length.toString().padStart(2, "0")} ${ITEMS.length === 1 ? "ENTRY" : "ENTRIES"}`}
      />
      <div
        style={{
          marginTop: space.xl,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(340px, 1fr))",
          gap: isMobile ? space.lg : space.xl,
        }}
      >
        {ITEMS.map((item) => (
          <PressCard key={item.id} item={item} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
}

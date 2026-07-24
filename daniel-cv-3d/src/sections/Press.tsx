"use client";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  ArrowRight,
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

// A publication's own favicon, referenced by URL from the article's origin —
// nothing copyrighted is committed to the repo. Renders a small credibility
// mark next to the source line; if the icon is missing or blocked it simply
// removes itself, leaving the text-only attribution untouched (no regression).
function SourceFavicon({ url }: { url: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  let favicon: string | null = null;
  try {
    favicon = `${new URL(url).origin}/favicon.ico`;
  } catch {
    favicon = null;
  }
  // Catch icons that already failed before hydration (onError won't re-fire).
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (!favicon || failed) return null;
  return (
    <img
      ref={imgRef}
      src={favicon}
      alt=""
      aria-hidden
      width={14}
      height={14}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{
        width: 14,
        height: 14,
        objectFit: "contain",
        flexShrink: 0,
        borderRadius: 2,
      }}
    />
  );
}

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
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="dt-card"
      style={{
        display: "flex",
        flexDirection: "column",
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.frame,
        overflow: "hidden",
        background: colors.paper,
        color: colors.ink,
        textDecoration: "none",
        flex: 1, // fill the <li> grid cell so cards in a row equalize height
      }}
    >
      {/* Gradient signature edge */}
      <div aria-hidden style={{ height: 3, background: gradients.edge }} />
      <PressImage src={item.image} source={item.source} />
      <div style={{ padding: isMobile ? space.md : space.lg, display: "flex", flexDirection: "column", gap: space.sm, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: space.md, flexWrap: "wrap" }}>
          <FileTag tone="orange">{item.kind ?? "Press"}</FileTag>
          <time
            dateTime={item.date}
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.18em",
              color: colors.inkMute,
            }}
          >
            {formatDate(item.date)}
          </time>
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
              display: "flex",
              alignItems: "center",
              gap: space.xs,
              minWidth: 0,
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: colors.inkMute,
            }}
          >
            <SourceFavicon url={item.url} />
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Source: {item.source}
            </span>
          </span>
          <span
            className="dt-card-arrow"
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 18,
              display: "inline-flex",
            }}
            aria-hidden
          >
            <ArrowRight size="1em" weight={2.25} />
          </span>
        </div>
      </div>
      <span className="dt-sr-only"> (opens in new tab)</span>
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
      {/* A curated list — real <ul>/<li> semantics so assistive tech announces
          "list, N items" instead of a bag of anonymous links. */}
      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          marginTop: space.xl,
          display: "grid",
          // auto-fit (not auto-fill) collapses empty trailing tracks, and the
          // 460px cap stops a sparse row from stretching cards to full width.
          // justify-center then balances the group so a handful of entries reads
          // as intentional instead of clumping left over an empty void.
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fit, minmax(340px, 460px))",
          justifyContent: "center",
          gap: isMobile ? space.lg : space.xl,
        }}
      >
        {ITEMS.map((item) => (
          <li key={item.id} style={{ display: "flex" }}>
            <PressCard item={item} isMobile={isMobile} />
          </li>
        ))}
      </ul>
    </section>
  );
}

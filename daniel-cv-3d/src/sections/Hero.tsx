"use client";
import { PUBLIC_DASHBOARDS } from "@/lib/worldData";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  ArrowUpRight,
  BracesTag,
  FileTag,
  MetaLine,
  OrangePill,
  PhotoFrame,
  StencilTitle,
  Timestamp,
  colors,
  fonts,
  gradients,
  space,
  displayType,
} from "@/assets";

const DASHBOARDS = PUBLIC_DASHBOARDS;

const STATS = [
  { v: "10+", k: "Years AI/ML" },
  { v: "07", k: "Active projects" },
  { v: "500k+", k: "Cars touched" },
  { v: "700+", k: "Network" },
];

// Interior dividers for the STATS cell grid (gap:0, so the cell borders *are*
// the grid lines): a right border on every cell except the last in its row,
// and a top border on every row after the first. Derived from the live item
// and column counts rather than a hardcoded index — a fixed `i < 3` test was
// written when both hero grids were 4-up and silently dropped dividers once
// the dashboards row grew to five boards. The dashboards strip has since moved
// to a CSS grid whose column count follows its own width (.dt-dash in
// globals.css), so it no longer needs a JS column count at all.
function cellBorders(index: number, count: number, cols: number) {
  const line = `1px solid ${colors.ink}`;
  const lastInRow = index % cols === cols - 1;
  const isLast = index === count - 1;
  return {
    borderRight: lastInRow || isLast ? undefined : line,
    borderTop: index >= cols ? line : undefined,
  };
}

export function Hero() {
  const isMobile = useIsMobile();
  return (
    <section
      id="top"
      aria-labelledby="top-title"
      style={{
        position: "relative",
        padding: isMobile ? `${space.xl}px ${space.md}px ${space.md}px` : `${space.xl}px ${space.xl}px ${space.lg}px`,
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      {/* The hero's ambient gradient now comes from the page-scale field in
          page.tsx (fixed, behind all content), so the top no longer carries a
          second local mesh — one cohesive wash spans the whole scroll. */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          alignItems: "end",
          gap: isMobile ? space.lg : space.xl,
        }}
      >
        <div>
          <div style={{ display: "flex", gap: isMobile ? space.sm : space.lg, alignItems: "center", marginBottom: isMobile ? space.md : space.lg, flexWrap: "wrap" }}>
            <BracesTag tone="ink">DT-01 / PROFILE</BracesTag>
            <FileTag tone="mute">REV.2026-04</FileTag>
          </div>
          {/* One h1 for the full name; the styled lines are spans inside it */}
          <h1 id="top-title" style={{ margin: 0 }}>
            <StencilTitle as="span" size={isMobile ? 88 : 180}>
              DANIEL
            </StencilTitle>{" "}
            <StencilTitle as="span" size={isMobile ? 88 : 180} tone="gradient">
              TREMER
            </StencilTitle>
          </h1>
          <p
            style={{
              marginTop: space.lg,
              fontFamily: fonts.mono,
              fontSize: 14,
              lineHeight: 1.55,
              color: colors.inkSoft,
              maxWidth: 560,
            }}
          >
            CEO & Managing Partner @{" "}
            <strong style={{ color: colors.ink }}>control-f GmbH</strong>.
            Machine learning engineer with 10+ years of data science and AI
            shipped at Porsche, Daimler, and Mercedes-Benz.
          </p>
          <div style={{ marginTop: space.lg, display: "flex", gap: space.md }}>
            <OrangePill href="mailto:info@danieltremer.com">Open channel</OrangePill>
            <OrangePill href="https://www.linkedin.com/in/daniel-tremer/" variant="outline">
              LinkedIn
            </OrangePill>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end", gap: space.md }}>
          <MetaLine
            align={isMobile ? "left" : "right"}
            items={[
              { k: "Role", v: "CEO & Managing Partner · control-f GmbH" },
              { k: "Base", v: "Berlin, Germany" },
              { k: "Coords", v: "52.52°N · 13.40°E" },
              { k: "Focus", v: "Applied AI · Data · Product" },
              { k: "Years", v: "10+ in production ML" },
            ]}
          />
          <Timestamp />
        </div>
      </div>

      {/* Portrait + side annotations */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: isMobile ? space.lg : space.xl,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
          gap: isMobile ? space.lg : space.xl,
          alignItems: "start",
        }}
      >
        <PhotoFrame
          src="/images/profile-optimized.jpg"
          alt="Daniel Tremer"
          caption="SUBJECT · 01"
          code="DT-001"
          width={isMobile ? 220 : 300}
          height={isMobile ? 280 : 380}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? space.lg : space.xl }}>
        <div style={{ border: `1px solid ${colors.ink}` }}>
          {/* Gradient signature edge — joins the Hero's stat module to the
              site's card family (Press cards, mobile menu carry the same 3px
              accent sweep). */}
          <div aria-hidden style={{ height: 3, background: gradients.edge }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
              gap: 0,
            }}
          >
          {STATS.map((s, i) => (
            <div
              key={s.k}
              style={{
                padding: isMobile ? `${space.md}px` : `${space.lg}px`,
                ...cellBorders(i, STATS.length, isMobile ? 2 : 4),
                // The accent tile gains the same translucent ember/tint depth
                // the Contact CTA slab carries — richer than flat orange, and
                // documented to keep ink ≥4.5:1 over solid orange.
                background: i === 1 ? `${gradients.slab}, ${colors.orange}` : colors.paper,
                color: colors.ink,
              }}
            >
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: isMobile ? displayType.sm : displayType.md, lineHeight: 1 }}>
                {s.v}
              </div>
              <div
                style={{
                  marginTop: space.xs,
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  // Mute gray fails contrast on the orange tile; use full ink there
                  color: i === 1 ? colors.ink : colors.inkMute,
                }}
              >
                {s.k}
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Public dashboards from the World Data Analysis project.
            The panel is the size container the strip below reads its column
            count from (see .dt-dash in globals.css). */}
        <div className="dt-dash-panel" style={{ border: `1.5px solid ${colors.ink}` }}>
          {/* Gradient signature edge — same accent sweep the site's cards carry */}
          <div aria-hidden style={{ height: 3, background: gradients.edge }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: space.md,
              padding: `${space.sm}px ${space.md}px`,
              background: colors.ink,
              color: colors.paper,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: colors.orange,
                }}
              />
              World data dashboards
            </span>
            {!isMobile && (
              <span
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.6,
                }}
              >
                WORLD_DATA_ANALYSIS
              </span>
            )}
          </div>
          {/* Public dashboards share a responsive two-column strip. */}
          <div className="dt-dash">
            {DASHBOARDS.map((d) => (
              <a
                key={d.label}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="dt-dash-cell"
              >
                <div
                  className="dt-dash-label"
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 900,
                    lineHeight: 1,
                    // The arrow belongs to the word. Left to wrap, it dropped
                    // onto a line of its own the moment the label filled the
                    // cell (it did at 1280px) — the size rule in CSS is what
                    // keeps the pair inside the cell instead.
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.label}{" "}
                  {/* Wrapped so it can follow the cell's hover fill via
                      currentColor (see .dt-dash-arrow), as the segmented
                      LIVE_DASHBOARDS strip in PROJECT_INDEX already does. */}
                  <span className="dt-dash-arrow">
                    <ArrowUpRight />
                  </span>
                </div>
                <div
                  className="dt-dash-sub"
                  style={{
                    marginTop: space.xs,
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {d.sub}
                </div>
                <span className="dt-sr-only"> (opens in new tab)</span>
              </a>
            ))}
          </div>
          <div
            style={{
              padding: `${space.sm}px ${space.md}px`,
              borderTop: `1px solid ${colors.ink}`,
              fontFamily: fonts.mono,
              fontSize: 9,
              letterSpacing: "0.08em",
              lineHeight: 1.5,
              color: colors.inkMute,
              textTransform: "uppercase",
            }}
          >
            Exploring public data out of curiosity. Sources, observation dates
            and limitations are documented in each dashboard.
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

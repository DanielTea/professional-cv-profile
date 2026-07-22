"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  BracesTag,
  FileTag,
  KatakanaTag,
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

const DASHBOARDS = [
  { label: "Indicators", sub: "Market signals", href: "https://danieltremer.com/alpaca-autotrader/" },
  { label: "History", sub: "Signal timeline", href: "https://danieltremer.com/alpaca-autotrader/history.html" },
  { label: "Account", sub: "P&L · positions", href: "https://danieltremer.com/alpaca-autotrader/account.html" },
  { label: "World", sub: "Global macro", href: "https://danieltremer.com/alpaca-autotrader/world.html" },
];

export function Hero() {
  const isMobile = useIsMobile();
  return (
    <section
      id="top"
      style={{
        position: "relative",
        padding: isMobile ? `${space.xl}px ${space.md}px ${space.md}px` : `${space.xl}px ${space.xl}px ${space.lg}px`,
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      {/* Layered mesh backdrop — kept behind content and translucent so ink stays legible */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: gradients.mesh,
          pointerEvents: "none",
        }}
      />
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
            {!isMobile && <KatakanaTag text="ปัญญาประดิษฐ์" en="Artificial Intelligence" />}
            <FileTag tone="mute">REV.2026-04</FileTag>
          </div>
          <StencilTitle size={isMobile ? 88 : 180}>
            DANIEL
          </StencilTitle>
          <StencilTitle size={isMobile ? 88 : 180} tone="gradient">
            TREMER
          </StencilTitle>
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: 0,
            border: `1px solid ${colors.ink}`,
          }}
        >
          {[
            { v: "10+", k: "Years AI/ML" },
            { v: "07", k: "Active projects" },
            { v: "500k+", k: "Cars touched" },
            { v: "700+", k: "Network" },
          ].map((s, i) => (
            <div
              key={s.k}
              style={{
                padding: isMobile ? `${space.md}px` : `${space.lg}px`,
                borderRight: isMobile
                  ? i % 2 === 0
                    ? `1px solid ${colors.ink}`
                    : undefined
                  : i < 3
                    ? `1px solid ${colors.ink}`
                    : undefined,
                borderTop: isMobile && i >= 2 ? `1px solid ${colors.ink}` : undefined,
                background: i === 1 ? colors.orange : colors.paper,
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
                  color: colors.inkMute,
                }}
              >
                {s.k}
              </div>
            </div>
          ))}
        </div>

        {/* Live trading dashboards — published by the alpaca-autotrader pipeline */}
        <div style={{ border: `1.5px solid ${colors.ink}` }}>
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
              Live trading dashboards
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
                ALPACA_AUTOTRADER
              </span>
            )}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            }}
          >
            {DASHBOARDS.map((d, i) => (
              <a
                key={d.label}
                href={d.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  padding: isMobile ? `${space.md}px` : `${space.md}px ${space.lg}px`,
                  background: colors.paper,
                  color: colors.ink,
                  textDecoration: "none",
                  borderRight: isMobile
                    ? i % 2 === 0
                      ? `1px solid ${colors.ink}`
                      : undefined
                    : i < 3
                      ? `1px solid ${colors.ink}`
                      : undefined,
                  borderTop: isMobile && i >= 2 ? `1px solid ${colors.ink}` : undefined,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.display,
                    fontWeight: 900,
                    fontSize: isMobile ? 16 : 20,
                    lineHeight: 1,
                  }}
                >
                  {d.label} <span style={{ color: colors.orange }}>↗</span>
                </div>
                <div
                  style={{
                    marginTop: space.xs,
                    fontFamily: fonts.mono,
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: colors.inkMute,
                  }}
                >
                  {d.sub}
                </div>
              </a>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

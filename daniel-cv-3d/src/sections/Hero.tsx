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
} from "@/assets";

export function Hero() {
  const isMobile = useIsMobile();
  return (
    <section
      id="top"
      style={{
        position: "relative",
        padding: isMobile ? "32px 16px 16px" : "48px 48px 24px",
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr auto",
          alignItems: "end",
          gap: isMobile ? 20 : 32,
        }}
      >
        <div>
          <div style={{ display: "flex", gap: isMobile ? 10 : 20, alignItems: "center", marginBottom: isMobile ? 14 : 20, flexWrap: "wrap" }}>
            <BracesTag tone="ink">DT-01 / PROFILE</BracesTag>
            {!isMobile && <KatakanaTag jp="レトロフューチャー" en="Retro Future" />}
            <FileTag tone="mute">REV.2026-04</FileTag>
          </div>
          <StencilTitle size={isMobile ? 88 : 180}>
            DANIEL
          </StencilTitle>
          <StencilTitle size={isMobile ? 88 : 180} tone="orange">
            TREMER
          </StencilTitle>
          <p
            style={{
              marginTop: 20,
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
          <div style={{ marginTop: 24, display: "flex", gap: 14 }}>
            <OrangePill href="mailto:info@danieltremer.com">Open channel</OrangePill>
            <OrangePill href="https://www.linkedin.com/in/daniel-tremer/" variant="outline">
              LinkedIn
            </OrangePill>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end", gap: 14 }}>
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
          marginTop: isMobile ? 24 : 40,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
          gap: isMobile ? 20 : 40,
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
                padding: isMobile ? "14px 14px" : "18px 20px",
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
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: isMobile ? 28 : 42, lineHeight: 1 }}>
                {s.v}
              </div>
              <div
                style={{
                  marginTop: 6,
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
      </div>
    </section>
  );
}

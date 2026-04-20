"use client";
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
  return (
    <section
      id="top"
      style={{
        position: "relative",
        padding: "48px 48px 24px",
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "end",
          gap: 32,
        }}
      >
        <div>
          <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20 }}>
            <BracesTag tone="ink">DT-01 / PROFILE</BracesTag>
            <KatakanaTag jp="レトロフューチャー" en="Retro Future" />
            <FileTag tone="mute">REV.2026-04</FileTag>
          </div>
          <StencilTitle size={180}>
            DANIEL
          </StencilTitle>
          <StencilTitle size={180} tone="orange">
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

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 14 }}>
          <MetaLine
            align="right"
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
          marginTop: 40,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: 40,
          alignItems: "start",
        }}
      >
        <PhotoFrame
          src="/images/profile-optimized.jpg"
          alt="Daniel Tremer"
          caption="SUBJECT · 01"
          code="DT-001"
          width={300}
          height={380}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
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
                padding: "18px 20px",
                borderRight: i < 3 ? `1px solid ${colors.ink}` : undefined,
                background: i === 1 ? colors.orange : colors.paper,
                color: colors.ink,
              }}
            >
              <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 42, lineHeight: 1 }}>
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

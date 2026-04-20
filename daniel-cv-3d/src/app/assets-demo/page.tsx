"use client";

import {
  Frame,
  HazardTape,
  Barcode,
  Chevrons,
  DataStat,
  MetaLine,
  Crosshair,
  CircuitBlock,
  BracesTag,
  KatakanaTag,
  DisplayNumeral,
  StencilTitle,
  OrangePill,
  GridBackdrop,
  SectionRule,
  colors,
  fonts,
} from "@/assets";

export default function AssetsDemoPage() {
  return (
    <GridBackdrop style={{ minHeight: "100vh", padding: "48px 64px", color: colors.ink, fontFamily: fonts.mono }}>
      {/* Page header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 }}>
        <div>
          <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 14 }}>
            <BracesTag>DT-CV / REDESIGN</BracesTag>
            <KatakanaTag jp="レトロフューチャー" en="Retro Future" />
          </div>
          <StencilTitle size={140} underscore>
            ASSET LIBRARY
          </StencilTitle>
        </div>
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 8 }}>
          <MetaLine
            align="right"
            items={[
              { k: "Vol", v: "01 / 2026" },
              { k: "Set", v: "DT-TECHWEAR" },
              { k: "Location", v: "48.78°N 9.18°E" },
            ]}
          />
          <OrangePill>Apply</OrangePill>
        </div>
      </header>

      <HazardTape />

      <SectionRule label="01 — Frames & Stats" code="SEC_01" />

      <section style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 48 }}>
        <Frame label="Profile" code="DT/01">
          <DataStat value="10+" label="Years in AI" hint="Data · ML · Product" />
        </Frame>
        <Frame label="Company" code="CF/24">
          <DataStat value="07" label="Projects" hint="Active engagements" />
        </Frame>
        <Frame label="Network" code="IN/7X">
          <DataStat value="700+" label="LinkedIn conns" hint="Industry leaders" />
        </Frame>
      </section>

      <SectionRule label="02 — Marks" code="SEC_02" />

      <section style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 24, alignItems: "center", marginBottom: 48 }}>
        <Crosshair />
        <Chevrons count={5} size={18} />
        <BracesTag tone="orange">RX-09</BracesTag>
        <Barcode seed="DT-2026-ALPHA" caption="DT 2026 ALPHA" />
        <KatakanaTag jp="テックウェア" en="Techwear" />
        <div style={{ color: colors.orange, fontFamily: fonts.display, fontWeight: 900, fontSize: 34 }}>↗</div>
      </section>

      <SectionRule label="03 — Feature Block" code="SEC_03" />

      <CircuitBlock label="// BLACK-BOX / CONTROL-F">
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <StencilTitle size={44} tone="ink">CONTROL_F</StencilTitle>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: "0.14em", color: colors.ink }}>
            MANAGING DIRECTOR · 2024—PRESENT
          </span>
        </div>
      </CircuitBlock>

      <div style={{ height: 40 }} />

      <SectionRule label="04 — Typography" code="SEC_04" />

      <section style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32, marginBottom: 48 }}>
        <div>
          <StencilTitle size={200} tone="ink">48</StencilTitle>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: "0.2em", color: colors.inkMute, marginTop: 8 }}>
            OBLAST / KILOS OF OUTPUT
          </div>
        </div>
        <div>
          <DisplayNumeral size={80} tone="orange">2026</DisplayNumeral>
          <p style={{ fontFamily: fonts.mono, fontSize: 12, lineHeight: 1.6, color: colors.inkSoft, maxWidth: 360 }}>
            A redesign grounded in Swiss editorial grids, cyber-stencil
            display type, and surgical orange accents. Techwear, not
            cyberpunk.
          </p>
        </div>
      </section>

      <HazardTape tone="orange" />

      <footer style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <MetaLine
          items={[
            { k: "Build", v: "0.1.0" },
            { k: "Commit", v: "a7f2d19" },
            { k: "Status", v: "READY" },
          ]}
        />
        <Barcode seed="DT-FOOTER-2026" caption="DT 2026 · CONTROL-F" width={220} />
      </footer>
    </GridBackdrop>
  );
}

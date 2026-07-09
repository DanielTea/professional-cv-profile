"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import { Barcode, MetaLine, Monogram, TickerLine, Timestamp, colors, fonts, space } from "@/assets";

export function FooterBlock() {
  const isMobile = useIsMobile();
  return (
    <footer style={{ borderTop: `1px solid ${colors.ink}` }}>
      <TickerLine
        items={[
          "DANIEL TREMER",
          "AI · DATA · PRODUCT",
          "AVAILABLE FOR Q3 2026",
          "REV 2026-04-19",
          "DT · CONTROL-F",
          "STUTTGART · BERLIN",
        ]}
        speed={60}
      />
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: isMobile ? `${space.lg}px ${space.md}px` : `${space.xl}px ${space.xxl}px`,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
          alignItems: isMobile ? "stretch" : "center",
          gap: isMobile ? space.lg : space.xl,
        }}
      >
        <div style={{ display: "flex", gap: space.md, alignItems: "center" }}>
          <Monogram size={32} />
          <span style={{ fontFamily: fonts.display, fontWeight: 900 }}>
            DANIEL TREMER
          </span>
        </div>

        <MetaLine
          items={[
            { k: "Build", v: "0.3.0" },
            { k: "Stack", v: "Next · React · Tokens" },
            { k: "Rev", v: "2026-04" },
            { k: "φ", v: "1.618033989" },
          ]}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "flex-start" : "flex-end", gap: space.xs }}>
          <Barcode seed="DT-FOOTER-2026" caption="DT · CONTROL-F · 2026" width={isMobile ? 180 : 220} />
          <Timestamp />
        </div>
      </div>
    </footer>
  );
}

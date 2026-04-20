"use client";
import { Barcode, MetaLine, Monogram, TickerLine, Timestamp, colors, fonts } from "@/assets";

export function FooterBlock() {
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
          padding: "28px 48px",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 32,
        }}
      >
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
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
          ]}
        />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <Barcode seed="DT-FOOTER-2026" caption="DT · CONTROL-F · 2026" width={220} />
          <Timestamp />
        </div>
      </div>
    </footer>
  );
}

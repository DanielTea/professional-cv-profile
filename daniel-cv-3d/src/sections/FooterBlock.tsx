"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import { Barcode, MetaLine, Monogram, TickerLine, Timestamp, colors, fonts, gradients, space } from "@/assets";

export function FooterBlock() {
  const isMobile = useIsMobile();
  return (
    <footer>
      {/* Signature edge — same 3px accent strip that tops the press/project cards,
          so the footer reads as the page's closing card. */}
      <div aria-hidden style={{ height: 3, background: gradients.edge }} />
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
      <div style={{ position: "relative" }}>
        {/* Mesh field behind the sign-off — the page closes on the same
            layered backdrop it opens with in the hero. */}
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
            maxWidth: 1440,
            margin: "0 auto",
            padding: isMobile ? `${space.lg}px ${space.md}px` : `${space.xl}px ${space.xxl}px`,
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "auto 1fr auto",
            alignItems: isMobile ? "stretch" : "center",
            gap: isMobile ? space.lg : space.xl,
          }}
        >
        <div style={{ display: "flex", flexDirection: "column", gap: space.md, alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: space.md, alignItems: "center" }}>
            <Monogram size={32} />
            <span style={{ fontFamily: fonts.display, fontWeight: 900 }}>
              DANIEL{" "}
              <span
                style={{
                  // Echo of the hero wordmark: surname carries the accent sweep,
                  // solid orange stays as the no-background-clip fallback.
                  color: colors.orange,
                  background: gradients.accent,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TREMER
              </span>
            </span>
          </div>
          {/* On-brand trigger for the print stylesheet — recruiters can save a
              clean PDF of the CV. Native print already works via Ctrl/Cmd+P;
              this just makes it discoverable. Hidden from the printout itself. */}
          <button
            type="button"
            onClick={() => window.print()}
            className="dt-printbtn"
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: colors.ink,
              background: "transparent",
              border: `1px solid ${colors.ink}`,
              padding: `${space.xs}px ${space.md}px`,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: space.xs,
            }}
          >
            <span aria-hidden style={{ fontSize: 12, lineHeight: 1 }}>⎙</span>
            Save as PDF
          </button>
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
      </div>
    </footer>
  );
}

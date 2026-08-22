"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  BracesTag,
  FileTag,
  KanjiStamp,
  OrangePill,
  StencilTitle,
  colors,
  fonts,
  gradients,
  space,
} from "@/assets";

export function Contact() {
  const isMobile = useIsMobile();
  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? `${space.xxl}px ${space.md}px` : `${space.xxxl}px ${space.xl}px`,
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "relative",
          background: `${gradients.slab}, ${colors.orange}`,
          color: colors.ink,
          padding: isMobile ? `${space.xl}px ${space.lg}px ${space.lg}px` : `${space.xxl}px ${space.xxl}px ${space.xl}px`,
          borderRadius: 14,
          border: `1.5px solid ${colors.ink}`,
          overflow: "hidden",
        }}
      >
        {/* corner ticks */}
        <span
          style={{
            position: "absolute",
            top: space.md,
            left: space.md,
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.22em",
          }}
        >
          // CH_01 / OPEN
        </span>
        <span
          style={{
            position: "absolute",
            top: space.md,
            right: space.md,
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.22em",
          }}
        >
          LAT 08ms · SECURE
        </span>

        <div style={{ marginBottom: space.md }}>
          <BracesTag tone="ink">HANDSHAKE</BracesTag>
        </div>
        <StencilTitle size={isMobile ? 64 : 140}>LET&apos;S BUILD</StencilTitle>
        <p
          style={{
            marginTop: space.md,
            maxWidth: 640,
            fontFamily: fonts.mono,
            fontSize: 14,
            lineHeight: 1.55,
            color: colors.ink,
          }}
        >
          Available for AI advisory, fractional CTO engagements, and
          hands-on product builds. Typical lead time: two weeks.
        </p>

        <div style={{ marginTop: space.xl, display: "flex", gap: space.md, flexWrap: "wrap" }}>
          <OrangePill href="mailto:info@danieltremer.com">
            info@danieltremer.com
          </OrangePill>
          <OrangePill href="https://www.linkedin.com/in/daniel-tremer/">
            LinkedIn
          </OrangePill>
          <OrangePill href="https://github.com/DanielTea">
            GitHub
          </OrangePill>
        </div>

        {/* Sign-off row. At 375px the slab's inner width is 305px and the two
            marks measure 137 + 150; a φ-step `lg` gap put them 3px over, which
            squeezed the status tag into a two-line "// STATUS · / READY". The
            gap steps down to `md` so the pair clears its narrowest supported
            width on one line, and the row is wrap-safe below that: the stamp
            drops to its own line, still pinned right by the auto margin, rather
            than either mark shrinking into a wrap. */}
        <div
          style={{
            marginTop: space.xl,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            columnGap: space.md,
            rowGap: space.lg,
          }}
        >
          <div style={{ flex: "none" }}>
            <FileTag tone="ink">STATUS · READY</FileTag>
          </div>
          <div style={{ flex: "none", marginLeft: "auto" }}>
            <KanjiStamp jp="接続可能" en="Connection Open" code="™ · 2026" />
          </div>
        </div>
      </div>
    </section>
  );
}

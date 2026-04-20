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
} from "@/assets";

export function Contact() {
  const isMobile = useIsMobile();
  return (
    <section
      id="contact"
      style={{
        padding: isMobile ? "48px 16px" : "72px 48px",
        maxWidth: 1440,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "relative",
          background: colors.orange,
          color: colors.ink,
          padding: isMobile ? "32px 20px 28px" : "48px 48px 40px",
          borderRadius: 14,
          border: `1.5px solid ${colors.ink}`,
          overflow: "hidden",
        }}
      >
        {/* corner ticks */}
        <span
          style={{
            position: "absolute",
            top: 14,
            left: 14,
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
            top: 14,
            right: 14,
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.22em",
          }}
        >
          LAT 08ms · SECURE
        </span>

        <div style={{ marginBottom: 12 }}>
          <BracesTag tone="ink">HANDSHAKE</BracesTag>
        </div>
        <StencilTitle size={isMobile ? 64 : 140}>LET&apos;S BUILD</StencilTitle>
        <p
          style={{
            marginTop: 16,
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

        <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <OrangePill href="mailto:info@danieltremer.com" variant="outline">
            info@danieltremer.com
          </OrangePill>
          <OrangePill href="https://www.linkedin.com/in/daniel-tremer/" variant="outline">
            LinkedIn
          </OrangePill>
          <OrangePill href="https://github.com/DanielTea" variant="outline">
            GitHub
          </OrangePill>
        </div>

        <div
          style={{
            marginTop: 36,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 20,
          }}
        >
          <FileTag tone="ink">STATUS · READY</FileTag>
          <KanjiStamp jp="接続可能" en="Connection Open" code="™ · 2026" />
        </div>
      </div>
    </section>
  );
}

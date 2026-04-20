"use client";

import dynamic from "next/dynamic";
import { useIsMobile } from "@/lib/useIsMobile";
import { FileTag, MetaLine, SectionRule, StencilTitle, colors, fonts } from "@/assets";

const WorldMap3D = dynamic(() => import("@/components/WorldMap3D"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 560,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fonts.mono,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: colors.inkMute,
        border: `1px solid ${colors.ink}`,
      }}
    >
      // BOOTING GLOBE / TERRA.SPHERE …
    </div>
  ),
});

export function GlobeSection() {
  const isMobile = useIsMobile();
  return (
    <section id="world" style={{ padding: isMobile ? "40px 16px" : "56px 48px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, gap: 16, flexWrap: "wrap" }}>
        <div>
          <FileTag>SEC_07 / FIELD PRESENCE</FileTag>
          <StencilTitle size={96} underscore>GLOBAL_MAP</StencilTitle>
        </div>
        <MetaLine
          align={isMobile ? "left" : "right"}
          items={[
            { k: "Base", v: "Berlin · 52.52°N" },
            { k: "Projects", v: "EU · NA · APAC" },
            { k: "Travel", v: "DACH focused" },
          ]}
        />
      </div>

      <SectionRule label="TERRA" code="SPHERE · LIVE" />

      <div
        style={{
          marginTop: 16,
          position: "relative",
          border: `1.5px solid ${colors.ink}`,
          background: colors.ink,
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        <WorldMap3D />
      </div>
    </section>
  );
}

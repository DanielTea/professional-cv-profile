"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import { asset } from "../asset";
import { colors, fonts, gradients } from "../tokens";
import { ArrowRight } from "./ArrowRight";

// Fixed 64×64 org tile so every timeline row aligns on the same left rail —
// logo'd or not. When a row has no logo (or the logo file 404s), the tile
// degrades to the org's initials, clipped from the signature accent sweep over
// a soft mesh, matching the fallbacks the site already uses for press images
// and company badges. Same footprint either way, so the org name never shifts.
function LogoTile({ logo, org }: { logo?: string; org: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // Catch logos that already failed before hydration (onError won't re-fire).
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  const showImg = logo && !failed;
  return (
    <span
      style={{
        flex: "0 0 auto",
        width: 64,
        height: 64,
        marginTop: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `1px solid ${colors.ink}`,
        background: showImg ? colors.paper : `${gradients.mesh}, ${colors.paper}`,
        overflow: "hidden",
      }}
    >
      {showImg ? (
        <img
          ref={imgRef}
          src={asset(logo)}
          alt=""
          width={48}
          height={48}
          style={{ objectFit: "contain", filter: "grayscale(1)" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          aria-hidden
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: 22,
            lineHeight: 1,
            letterSpacing: "0.02em",
            background: gradients.accent,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: colors.orange,
            WebkitTextFillColor: "transparent",
          }}
        >
          {org.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}

type Props = {
  period: string; // "2024 —"
  org: string;
  role: string;
  location?: string;
  stack?: string[];
  children?: ReactNode;
  index?: number;
  logo?: string;
};

/** Editorial experience row: period | org/role | notes. */
export function TimelineRow({ period, org, role, location, stack, children, index, logo }: Props) {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "96px 1fr 1fr 40px",
        gap: isMobile ? 12 : 24,
        padding: isMobile ? "18px 0" : "22px 0",
        // Fuse-rule separator: ember tip cooling into ink, same motif as
        // SectionRule. border-image keeps the grid row a single element.
        borderTop: "1px solid",
        borderImageSource: gradients.rule,
        borderImageSlice: 1,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {typeof index === "number" && (
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.18em",
              color: colors.inkMute,
            }}
          >
            {String(index).padStart(2, "0")}
          </span>
        )}
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "-0.01em",
          }}
        >
          {period}
        </span>
      </div>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <LogoTile logo={logo} org={org} />
        <div style={{ minWidth: 0 }}>
          <h3
            style={{
              margin: 0,
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 24,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {org}
          </h3>
          <div
            style={{
              marginTop: 4,
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: colors.inkSoft,
            }}
          >
            {role}
            {location ? ` · ${location}` : ""}
          </div>
        </div>
      </div>
      <div>
        {children && (
          <p
            style={{
              margin: 0,
              fontFamily: fonts.mono,
              fontSize: 12,
              lineHeight: 1.55,
              color: colors.inkSoft,
            }}
          >
            {children}
          </p>
        )}
        {stack && stack.length > 0 && (
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
            }}
          >
            {stack.map((s) => (
              <span
                key={s}
                style={{
                  padding: "2px 8px",
                  border: `1px solid ${colors.ink}`,
                  fontFamily: fonts.mono,
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
      {!isMobile && (
        <div
          aria-hidden
          style={{
            alignSelf: "center",
            display: "flex",
            justifyContent: "flex-end",
            fontSize: 22,
          }}
        >
          {/* Accent sweep now rides the SVG stroke (see ArrowRight), so it can
              never be substituted by an emoji arrow glyph on mobile. */}
          <ArrowRight size="1em" weight={2.25} gradient />
        </div>
      )}
    </div>
  );
}

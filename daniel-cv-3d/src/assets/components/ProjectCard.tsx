import type { ReactNode } from "react";
import { colors, fonts, radii } from "../tokens";

export type ProjectStat = { k: string; v: string };

type Props = {
  category: string;
  title: string;
  logo?: ReactNode;
  description?: string;
  stats?: ProjectStat[];
  href?: string;
  status?: string;
};

/** Portfolio card (ChainGPT style): category pill, big title, 4 stats, arrow. */
export function ProjectCard({
  category,
  title,
  logo,
  description,
  stats = [],
  href,
  status,
}: Props) {
  return (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.frame,
        background: colors.paper,
        color: colors.ink,
        textDecoration: "none",
        marginTop: 12,
      }}
    >
      {/* Category pill */}
      <span
        style={{
          position: "absolute",
          top: -10,
          left: 14,
          background: colors.paper,
          padding: "0 8px",
          border: `1px solid ${colors.ink}`,
          borderRadius: radii.xs,
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {category}
      </span>
      {status && (
        <span
          style={{
            position: "absolute",
            top: -10,
            right: 14,
            background: colors.orange,
            color: colors.paper,
            padding: "1px 8px",
            borderRadius: radii.xs,
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          {status}
        </span>
      )}

      {/* Hero area */}
      <div
        style={{
          minHeight: 140,
          padding: "32px 20px 24px",
          borderBottom: `1px solid ${colors.ink}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
        }}
      >
        {logo}
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: "-0.01em",
            textAlign: "center",
          }}
        >
          {title}
        </span>
      </div>

      {/* Stats grid */}
      {stats.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
            gridAutoRows: "minmax(52px, auto)",
          }}
        >
          {stats.slice(0, 4).map((s, i) => (
            <div
              key={s.k}
              style={{
                padding: "10px 14px",
                borderRight:
                  i % 2 === 0 ? `1px solid ${colors.ink}` : undefined,
                borderBottom:
                  i < 2 && stats.length > 2 ? `1px solid ${colors.ink}` : undefined,
                gridColumn: "auto",
              }}
            >
              <div
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 800,
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: fonts.mono,
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: colors.inkMute,
                  marginTop: 4,
                }}
              >
                {s.k}
              </div>
            </div>
          ))}
          {/* arrow cell */}
          <div
            style={{
              gridRow: "1 / span 2",
              gridColumn: "3",
              width: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: colors.paper,
              borderLeft: `1px solid ${colors.ink}`,
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 22,
            }}
          >
            →
          </div>
        </div>
      )}

      {description && (
        <div
          style={{
            padding: "12px 14px",
            fontFamily: fonts.mono,
            fontSize: 11,
            lineHeight: 1.55,
            color: colors.inkSoft,
            borderTop: `1px solid ${colors.ink}`,
          }}
        >
          {description}
        </div>
      )}
    </a>
  );
}

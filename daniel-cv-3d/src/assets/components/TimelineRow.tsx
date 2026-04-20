import type { ReactNode } from "react";
import { asset } from "../asset";
import { colors, fonts } from "../tokens";

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
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "96px 1fr 1fr 40px",
        gap: 24,
        padding: "22px 0",
        borderTop: `1px solid ${colors.ink}`,
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
        {logo ? (
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
              background: colors.paper,
            }}
          >
            <img
              src={asset(logo)}
              alt=""
              width={48}
              height={48}
              style={{ objectFit: "contain", filter: "grayscale(1)" }}
            />
          </span>
        ) : null}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 24,
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {org}
          </div>
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
      <div
        style={{
          alignSelf: "center",
          textAlign: "right",
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 22,
          color: colors.orange,
        }}
      >
        →
      </div>
    </div>
  );
}

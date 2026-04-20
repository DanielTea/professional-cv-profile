import { colors, fonts } from "../tokens";

type Props = { name: string; domain?: string; subtitle?: string };

/** Clearbit-logo chip with mono subtitle. */
export function CompanyBadge({ name, domain, subtitle }: Props) {
  const logo = domain ? `https://logo.clearbit.com/${domain}` : undefined;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        border: `1px solid ${colors.ink}`,
        background: colors.paper,
      }}
    >
      {logo ? (
        <img
          src={logo}
          alt={name}
          width={22}
          height={22}
          style={{ objectFit: "contain", filter: "grayscale(1) contrast(1.05)" }}
        />
      ) : (
        <span
          style={{
            width: 22,
            height: 22,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            border: `1px solid ${colors.ink}`,
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 10,
          }}
        >
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 13 }}>
          {name}
        </span>
        {subtitle && (
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 9,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: colors.inkMute,
            }}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}

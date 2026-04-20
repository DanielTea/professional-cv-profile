import { colors, fonts, radii } from "../tokens";

type Props = {
  quote: string;
  author: string;
  role: string;
  org?: string;
  code?: string;
};

/** Recommendation/testimonial card — large bracket mark, mono meta. */
export function QuoteCard({ quote, author, role, org, code }: Props) {
  return (
    <article
      style={{
        position: "relative",
        border: `1.5px solid ${colors.ink}`,
        borderRadius: radii.frame,
        background: colors.paper,
        padding: "22px 24px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: -18,
          left: 14,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 72,
          lineHeight: 1,
          color: colors.orange,
        }}
      >
        &ldquo;
      </span>
      {code && (
        <span
          style={{
            position: "absolute",
            top: -10,
            right: 14,
            background: colors.paper,
            padding: "0 6px",
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.2em",
            color: colors.inkMute,
          }}
        >
          {code}
        </span>
      )}
      <p
        style={{
          margin: "10px 0 0",
          fontFamily: fonts.display,
          fontWeight: 500,
          fontSize: 16,
          lineHeight: 1.45,
          color: colors.ink,
        }}
      >
        {quote}
      </p>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          paddingTop: 12,
          borderTop: `1px solid ${colors.ink}`,
        }}
      >
        <span style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 14 }}>
          {author}
        </span>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: colors.inkMute,
          }}
        >
          {role}
          {org ? ` · ${org}` : ""}
        </span>
      </div>
    </article>
  );
}

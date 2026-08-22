import { colors, fonts, gradients, radii } from "../tokens";

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
        // Same recipe the press plate and the mobile nav sheet use: the mesh
        // is translucent (every stop ≤0.12 alpha) and painted over solid
        // paper, so the card gains the site's layered gradient surface
        // without spending the contrast budget. Measured against the darkest
        // pixel the composited surface actually renders: ink 13.7:1 (from
        // 15.7:1 on flat paper) and inkMute 4.9:1 (from 5.7:1) — both still
        // clear of the 4.5:1 the AA body-text rule asks for.
        background: `${gradients.mesh}, ${colors.paper}`,
        padding: "22px 24px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        // Fill the <li> grid cell so cards in a row equalize height.
        flex: 1,
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: -18,
          left: 14,
          // The glyph overhangs the card's top rule; keep it above the mesh
          // wash painted on the surface below.
          zIndex: 1,
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 72,
          lineHeight: 1,
          // Accent sweep clipped to the glyph; solid orange stays as the
          // fallback for engines without background-clip: text.
          color: colors.orange,
          background: gradients.accent,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
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
      {/* A real <blockquote> so assistive tech announces this as a quotation
          rather than an anonymous run of text. */}
      <blockquote style={{ margin: "10px 0 0" }}>
        <p
          style={{
            margin: 0,
            fontFamily: fonts.display,
            fontWeight: 500,
            fontSize: 16,
            lineHeight: 1.45,
            color: colors.ink,
          }}
        >
          {quote}
        </p>
      </blockquote>
      <footer
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <span
          aria-hidden
          style={{
            display: "block",
            height: 1,
            background: gradients.rule,
            // 11px + the column's 2px gap = 13px (space.md) above the author.
            marginBottom: 11,
          }}
        />
        {/* <cite> names the source of the quote; reset the UA italic so it keeps
            the display face. */}
        <cite
          style={{
            fontFamily: fonts.display,
            fontWeight: 800,
            fontSize: 14,
            fontStyle: "normal",
          }}
        >
          {author}
        </cite>
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
      </footer>
    </article>
  );
}

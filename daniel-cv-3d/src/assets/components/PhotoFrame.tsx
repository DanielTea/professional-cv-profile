import { asset } from "../asset";
import { colors, fonts } from "../tokens";

type Props = {
  src: string;
  alt?: string;
  code?: string;
  caption?: string;
  width?: number;
  height?: number;
};

/** Portrait frame with corner brackets and mono caption. */
export function PhotoFrame({ src, alt = "", code, caption, width = 320, height = 420 }: Props) {
  return (
    <figure
      style={{
        position: "relative",
        width,
        margin: 0,
        background: colors.paperDim,
        border: `1.5px solid ${colors.ink}`,
        padding: 10,
      }}
    >
      {/* corner brackets */}
      {(
        [
          { top: -2, left: -2, d: "M0 10 V0 H10" },
          { top: -2, right: -2, d: "M0 0 H10 V10" },
          { bottom: -2, left: -2, d: "M0 0 V10 H10" },
          { bottom: -2, right: -2, d: "M10 0 V10 H0" },
        ] as const
      ).map((c, i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 10 10"
          style={{ position: "absolute", ...c }}
          aria-hidden
        >
          <path d={c.d} stroke={colors.ink} strokeWidth="2" fill="none" />
        </svg>
      ))}

      <img
        src={asset(src)}
        alt={alt}
        style={{
          display: "block",
          width: "100%",
          height,
          objectFit: "cover",
          filter: "grayscale(1) contrast(1.08)",
        }}
      />

      <figcaption
        style={{
          marginTop: 8,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: colors.inkMute,
        }}
      >
        <span>{caption ?? "SUBJECT / 01"}</span>
        <span>{code ?? "DT-001"}</span>
      </figcaption>
    </figure>
  );
}

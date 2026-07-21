import { colors, fonts } from "../tokens";

type Props = {
  text: string;
  en?: string;
};

/** Decorative non-Latin caption stacked over EN translation (Studio Innate). */
export function KatakanaTag({ text, en }: Props) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1.15 }}>
      <span
        style={{
          fontFamily: fonts.kana,
          fontSize: 12,
          color: colors.ink,
          letterSpacing: "0.08em",
        }}
      >
        {text}
      </span>
      {en && (
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 9,
            color: colors.inkMute,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {en}
        </span>
      )}
    </div>
  );
}

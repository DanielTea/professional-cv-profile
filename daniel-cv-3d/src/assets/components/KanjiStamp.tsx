import { colors, fonts } from "../tokens";

type Props = {
  jp: string;
  en: string;
  code?: string;
};

/** Stacked JP/EN stamp with hairline box (Studio Innate retro-future). */
export function KanjiStamp({ jp, en, code = "™ ®" }: Props) {
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 4,
        padding: "10px 14px",
        border: `1px solid ${colors.ink}`,
      }}
    >
      <span
        style={{
          fontFamily: fonts.kana,
          fontSize: 18,
          letterSpacing: "0.04em",
          color: colors.ink,
          lineHeight: 1,
        }}
      >
        {jp}
      </span>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: colors.inkMute,
        }}
      >
        {en}
      </span>
      <span
        style={{
          alignSelf: "flex-end",
          fontFamily: fonts.mono,
          fontSize: 9,
          letterSpacing: "0.2em",
          color: colors.inkMute,
        }}
      >
        {code}
      </span>
    </div>
  );
}

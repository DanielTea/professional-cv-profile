import { colors, fonts } from "../tokens";

type Props = {
  children: string | number;
  size?: number;
  tone?: "ink" | "orange";
};

/** Massive editorial numeral (POLYMER "48" / ChainGPT "07"). */
export function DisplayNumeral({ children, size = 180, tone = "ink" }: Props) {
  const color = tone === "orange" ? colors.orange : colors.ink;
  return (
    <div
      style={{
        fontFamily: fonts.display,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 0.85,
        letterSpacing: "-0.04em",
        color,
      }}
    >
      {children}
    </div>
  );
}

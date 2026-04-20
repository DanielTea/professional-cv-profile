import { colors, fonts } from "../tokens";

type Props = {
  label?: string;
  code?: string;
};

/** Hairline rule with optional mono label on left and code on right. */
export function SectionRule({ label, code }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: colors.inkMute,
        padding: "6px 0",
      }}
    >
      {label && <span>{label}</span>}
      <span style={{ flex: 1, height: 1, background: colors.ink }} />
      {code && <span>{code}</span>}
    </div>
  );
}

import { colors, fonts } from "../tokens";

type Props = {
  children: string;
  prefix?: string;
  tone?: "ink" | "orange" | "mute";
};

/** `// SA/CT_II` style mono stencil ID tag. */
export function FileTag({ children, prefix = "//", tone = "ink" }: Props) {
  const color =
    tone === "orange" ? colors.orange : tone === "mute" ? colors.inkMute : colors.ink;
  return (
    <span
      style={{
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color,
        display: "inline-flex",
        gap: 6,
      }}
    >
      <span style={{ opacity: 0.55 }}>{prefix}</span>
      <span>{children}</span>
    </span>
  );
}

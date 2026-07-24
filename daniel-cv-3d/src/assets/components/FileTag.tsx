import { colors, fonts } from "../tokens";

type Props = {
  children: string;
  prefix?: string;
  tone?: "ink" | "orange" | "mute";
};

/** `// SA/CT_II` style mono stencil ID tag. */
export function FileTag({ children, prefix = "//", tone = "ink" }: Props) {
  // 10px accent-toned label: `orangeEmber`, not `orange` — the tag is small
  // text on paper, and only the ember end of the sweep clears AA there.
  const color =
    tone === "orange" ? colors.orangeEmber : tone === "mute" ? colors.inkMute : colors.ink;
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

import { colors, fonts } from "../tokens";

type Props = {
  children: string;
  size?: number;
  underscore?: boolean;
  tone?: "ink" | "orange";
};

/** "PORT_FOLIO" style stencil display headline. Uses `text-shadow`-less outline trick. */
export function StencilTitle({ children, size = 96, underscore, tone = "ink" }: Props) {
  const color = tone === "orange" ? colors.orange : colors.ink;
  return (
    <h1
      style={{
        margin: 0,
        fontFamily: fonts.display,
        fontWeight: 900,
        fontSize: size,
        lineHeight: 0.9,
        letterSpacing: "-0.02em",
        color,
        textTransform: "uppercase",
        fontStretch: "condensed",
      }}
    >
      {underscore ? children.replace(" ", "_") : children}
    </h1>
  );
}

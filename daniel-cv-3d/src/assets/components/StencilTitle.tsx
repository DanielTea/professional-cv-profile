import { colors, fonts } from "../tokens";

type Props = {
  children: string;
  size?: number;
  underscore?: boolean;
  tone?: "ink" | "orange";
};

/** "PORT_FOLIO" style stencil display headline. Fluid-scales to mobile. */
export function StencilTitle({ children, size = 96, underscore, tone = "ink" }: Props) {
  const color = tone === "orange" ? colors.orange : colors.ink;
  // Fluid font: shrink to ~44% on narrow viewports, cap at the desktop `size`.
  const minSize = Math.max(32, Math.round(size * 0.36));
  const fluid = `clamp(${minSize}px, ${(size / 14.4).toFixed(2)}vw, ${size}px)`;
  return (
    <h1
      style={{
        margin: 0,
        fontFamily: fonts.display,
        fontWeight: 900,
        fontSize: fluid,
        lineHeight: 0.9,
        letterSpacing: "-0.02em",
        color,
        textTransform: "uppercase",
        fontStretch: "condensed",
        wordBreak: "break-word",
      }}
    >
      {underscore ? children.replace(" ", "_") : children}
    </h1>
  );
}

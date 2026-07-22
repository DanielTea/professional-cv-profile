import { colors, fonts, gradients } from "../tokens";

type Props = {
  children: string;
  size?: number;
  underscore?: boolean;
  tone?: "ink" | "orange" | "gradient";
  /**
   * Semantic element. Defaults to h2: section titles are subordinate to the
   * single page h1 (the hero name). Use "span" for lines composed inside a
   * heading rendered by the caller, or for purely decorative display type.
   */
  as?: "h1" | "h2" | "h3" | "span";
};

/** "PORT_FOLIO" style stencil display headline. Fluid-scales to mobile. */
export function StencilTitle({ children, size = 96, underscore, tone = "ink", as: Tag = "h2" }: Props) {
  const color = tone === "orange" ? colors.orange : colors.ink;
  // Fluid font: shrink to ~44% on narrow viewports, cap at the desktop `size`.
  const minSize = Math.max(32, Math.round(size * 0.36));
  const fluid = `clamp(${minSize}px, ${(size / 14.4).toFixed(2)}vw, ${size}px)`;
  // Gradient tone clips the accent sweep to the glyphs; `color` stays set as
  // an orange fallback for engines without background-clip: text.
  const gradientStyle =
    tone === "gradient"
      ? {
          background: gradients.accent,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }
      : undefined;
  return (
    <Tag
      style={{
        display: "block",
        margin: 0,
        fontFamily: fonts.display,
        fontWeight: 900,
        fontSize: fluid,
        lineHeight: 0.9,
        letterSpacing: "-0.02em",
        color: tone === "gradient" ? colors.orange : color,
        textTransform: "uppercase",
        fontStretch: "condensed",
        wordBreak: "break-word",
        ...gradientStyle,
      }}
    >
      {underscore ? children.replace(" ", "_") : children}
    </Tag>
  );
}

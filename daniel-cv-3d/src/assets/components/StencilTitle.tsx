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
  const text = underscore ? children.replace(" ", "_") : children;
  // Fluid font: shrink to ~44% on narrow viewports, cap at the desktop `size`.
  // The floor is capped by the longest unbreakable word so titles like
  // RECOMMENDATIONS shrink to fit a narrow phone instead of breaking mid-word
  // (display font ≈0.85em average uppercase advance; ~300px fits a 320px
  // viewport minus section padding).
  const longestWord = Math.max(...text.split(/\s+/).map((w) => w.length), 1);
  const fitFloor = Math.floor(300 / (longestWord * 0.85));
  const minSize = Math.max(20, Math.min(Math.max(32, Math.round(size * 0.36)), fitFloor));
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
      // Gradient headings carry a class that (motion permitting) gently drifts
      // the clipped accent sweep — see .dt-stencil-gradient in globals.css.
      className={tone === "gradient" ? "dt-stencil-gradient" : undefined}
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
      {text}
    </Tag>
  );
}

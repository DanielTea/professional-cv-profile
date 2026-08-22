type Props = {
  /** Glyph size relative to surrounding text. Defaults to 1em. */
  size?: number | string;
  /** Stroke color; defaults to currentColor so it inherits the text color. */
  color?: string;
  /** Stroke weight in viewBox units. */
  weight?: number;
};

/**
 * Inline printer mark drawn as SVG.
 *
 * Like {@link ArrowRight} and {@link ArrowUpRight}, this exists so the UI never
 * leans on a font to draw an icon. The footer's "Save as PDF" control used to
 * set the Unicode "⎙" (U+2399 PRINT SCREEN SYMBOL), which almost no shipping UI
 * font covers: the browser either falls out of JetBrains Mono into whatever
 * system face happens to have it — at a foreign weight and a non-mono advance —
 * or, where nothing has it at all, draws a tofu box next to the label. An
 * inline SVG renders identically everywhere and matches the techwear line
 * weight. Decorative: the button's own text label carries the meaning.
 */
export function Printer({
  size = "1em",
  color = "currentColor",
  weight = 2,
}: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={weight}
      strokeLinecap="square"
      strokeLinejoin="miter"
      style={{ display: "inline-block", verticalAlign: "-0.12em", flex: "none" }}
    >
      {/* Sheet feeding in from the top */}
      <path d="M7 9V3h10v6" />
      {/* Chassis — deliberately open along the bottom center so the outgoing
          sheet reads as passing through it rather than stacked on top. */}
      <path d="M7 17H3V9h18v8h-4" />
      {/* Printed sheet */}
      <path d="M7 14h10v7H7z" />
    </svg>
  );
}

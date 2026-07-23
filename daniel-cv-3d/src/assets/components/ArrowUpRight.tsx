type Props = {
  /** Glyph size relative to surrounding text. Defaults to 0.72em. */
  size?: number | string;
  /** Stroke color; defaults to currentColor so it inherits the text color. */
  color?: string;
};

/**
 * Inline north-east arrow drawn as SVG.
 *
 * We deliberately avoid the Unicode "↗" (U+2197): it carries an emoji
 * presentation, so iOS/Android render it as a colored arrow *emoji* instead of
 * a text glyph. An inline SVG can never be emojified and matches the techwear
 * line weight on every platform. Decorative — mark the parent aria-hidden or
 * give the link its own accessible label.
 */
export function ArrowUpRight({ size = "0.72em", color = "currentColor" }: Props) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="square"
      style={{ display: "inline-block", verticalAlign: "baseline", flex: "none" }}
    >
      <path d="M4.5 11.5 L11.5 4.5" />
      <path d="M6 4.5 H11.5 V10" />
    </svg>
  );
}

import { useId } from "react";
import { colors } from "../tokens";

type Props = {
  /** Glyph size relative to surrounding text. Defaults to 0.72em. */
  size?: number | string;
  /** Stroke color; defaults to currentColor so it inherits the text color. */
  color?: string;
  /** Stroke weight in viewBox units. Bump it for heavy display-size arrows. */
  weight?: number;
  /**
   * Paint the arrow with the signature orange→ember accent sweep instead of a
   * flat color. Mirrors the gradient-clipped display glyphs elsewhere on the
   * page (e.g. the timeline row arrow), but survives as SVG on every platform.
   */
  gradient?: boolean;
};

/**
 * Inline rightward arrow drawn as SVG.
 *
 * Like its sibling {@link ArrowUpRight}, this deliberately avoids the Unicode
 * "→" (U+2192): it carries an emoji variation, so iOS/Android can render it as
 * a colored arrow *emoji* instead of a text glyph, breaking the techwear line
 * weight. An inline SVG can never be emojified and matches the stroke on every
 * platform. Decorative — mark the parent aria-hidden or give the link its own
 * accessible label.
 */
export function ArrowRight({
  size = "0.72em",
  color = "currentColor",
  weight = 2,
  gradient = false,
}: Props) {
  // Unique per instance so multiple gradient arrows on a page never collide.
  const id = useId();
  const stroke = gradient ? `url(#${id})` : color;
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      strokeWidth={weight}
      strokeLinecap="square"
      style={{ display: "inline-block", verticalAlign: "baseline", flex: "none" }}
    >
      {gradient && (
        <defs>
          {/* Matches gradients.accent: orange → deep → ember, left to right. */}
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={colors.orange} />
            <stop offset="60%" stopColor={colors.orangeDeep} />
            <stop offset="100%" stopColor={colors.orangeEmber} />
          </linearGradient>
        </defs>
      )}
      <path d="M3 8 H12.5" />
      <path d="M8.5 4 L12.5 8 L8.5 12" />
    </svg>
  );
}

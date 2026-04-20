import { colors } from "../tokens";

type Props = {
  count?: number;
  size?: number;
  direction?: "right" | "left";
  color?: string;
  className?: string;
};

/** Stacked cyber chevrons — fading trail. */
export function Chevrons({
  count = 5,
  size = 14,
  direction = "right",
  color = colors.ink,
  className,
}: Props) {
  const w = size * 1.1;
  const total = count * w + size;
  return (
    <svg
      className={className}
      width={total}
      height={size * 1.6}
      viewBox={`0 0 ${total} ${size * 1.6}`}
      style={{ transform: direction === "left" ? "scaleX(-1)" : undefined }}
      role="presentation"
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => {
        const x = i * w;
        const opacity = 0.25 + (i / (count - 1 || 1)) * 0.75;
        return (
          <path
            key={i}
            d={`M${x} 1 L${x + size} ${size * 0.8} L${x} ${size * 1.6 - 1} L${x + 5} ${size * 1.6 - 1} L${x + size + 5} ${size * 0.8} L${x + 5} 1 Z`}
            fill={color}
            opacity={opacity}
          />
        );
      })}
    </svg>
  );
}

import { colors } from "../tokens";

type Props = {
  value: number; // 0..max
  max?: number;
  size?: number;
  gap?: number;
};

/** Filled-square rating used for proficiency (■ ■ ■ ■ □). */
export function RatingDots({ value, max = 5, size = 10, gap = 3 }: Props) {
  return (
    <span style={{ display: "inline-flex", gap }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            width: size,
            height: size,
            background: i < value ? colors.ink : "transparent",
            border: `1px solid ${colors.ink}`,
          }}
        />
      ))}
    </span>
  );
}

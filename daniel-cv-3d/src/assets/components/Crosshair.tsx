import { colors } from "../tokens";

type Props = { size?: number; color?: string; className?: string };

export function Crosshair({ size = 64, color = colors.ink, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke={color}
      strokeWidth={1.25}
      aria-hidden
    >
      <path d="M2 10 V2 H10 M54 2 H62 V10 M62 54 V62 H54 M10 62 H2 V54" />
      <circle cx="32" cy="32" r="10" />
      <path d="M32 14 V22 M32 50 V42 M14 32 H22 M50 32 H42" />
      <circle cx="32" cy="32" r="1.25" fill={color} stroke="none" />
    </svg>
  );
}

import { colors } from "../tokens";

type Name =
  | "cpu"
  | "beam"
  | "stack"
  | "flask"
  | "globe"
  | "wave"
  | "code"
  | "spark"
  | "node"
  | "ring";

type Props = { name: Name; size?: number; color?: string };

/** Minimal stroke pictograms used for competency categories. */
export function Pictogram({ name, size = 40, color = colors.ink }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 40 40",
    fill: "none",
    stroke: color,
    strokeWidth: 1.4,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "cpu":
      return (
        <svg {...common}>
          <rect x="10" y="10" width="20" height="20" />
          <rect x="15" y="15" width="10" height="10" />
          <path d="M4 14 H10 M4 20 H10 M4 26 H10 M30 14 H36 M30 20 H36 M30 26 H36 M14 4 V10 M20 4 V10 M26 4 V10 M14 30 V36 M20 30 V36 M26 30 V36" />
        </svg>
      );
    case "beam":
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="4" fill={color} stroke="none" />
          <circle cx="20" cy="20" r="10" />
          <circle cx="20" cy="20" r="16" strokeDasharray="2 4" />
          <path d="M20 2 V8 M20 32 V38 M2 20 H8 M32 20 H38" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <path d="M4 10 L20 4 L36 10 L20 16 Z" />
          <path d="M4 20 L20 14 L36 20" />
          <path d="M4 30 L20 24 L36 30" />
        </svg>
      );
    case "flask":
      return (
        <svg {...common}>
          <path d="M16 4 H24 M17 4 V16 L8 32 H32 L23 16 V4" />
          <path d="M12 24 H28" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="14" />
          <ellipse cx="20" cy="20" rx="14" ry="6" />
          <ellipse cx="20" cy="20" rx="6" ry="14" />
          <path d="M6 20 H34 M20 6 V34" />
        </svg>
      );
    case "wave":
      return (
        <svg {...common}>
          <path d="M4 20 Q10 10 16 20 T28 20 T40 20" />
          <path d="M4 28 Q10 18 16 28 T28 28" opacity="0.5" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M14 10 L6 20 L14 30 M26 10 L34 20 L26 30 M22 6 L18 34" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M20 4 L22 16 L34 18 L22 20 L20 32 L18 20 L6 18 L18 16 Z" fill={color} stroke="none" />
        </svg>
      );
    case "node":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="3" fill={color} stroke="none" />
          <circle cx="30" cy="10" r="3" fill={color} stroke="none" />
          <circle cx="10" cy="30" r="3" fill={color} stroke="none" />
          <circle cx="30" cy="30" r="3" fill={color} stroke="none" />
          <circle cx="20" cy="20" r="3" fill={color} stroke="none" />
          <path d="M10 10 L20 20 L30 10 M10 30 L20 20 L30 30" />
        </svg>
      );
    case "ring":
    default:
      return (
        <svg {...common}>
          <circle cx="20" cy="20" r="14" />
          <circle cx="20" cy="20" r="8" />
        </svg>
      );
  }
}

import { colors, fonts } from "../tokens";

type Props = {
  label: string;
  value: number; // 0..100
  code?: string;
};

/** Technical capability meter — label, notched track, numeric level. */
export function StatBar({ label, value, code }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 60px", gap: 14, alignItems: "center" }}>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: colors.ink,
        }}
      >
        {label}
      </span>
      <div
        style={{
          position: "relative",
          height: 10,
          background: colors.paperDim,
          border: `1px solid ${colors.ink}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: `${clamped}%`,
            background: colors.ink,
          }}
        />
        {/* notch marks every 10% */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `repeating-linear-gradient(to right, transparent 0, transparent calc(10% - 1px), ${colors.paper} calc(10% - 1px), ${colors.paper} 10%)`,
            mixBlendMode: "difference",
            opacity: 0.35,
          }}
        />
      </div>
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: "0.1em",
          color: colors.inkMute,
          textAlign: "right",
        }}
      >
        {code ?? `${clamped.toString().padStart(3, "0")}`}
      </span>
    </div>
  );
}

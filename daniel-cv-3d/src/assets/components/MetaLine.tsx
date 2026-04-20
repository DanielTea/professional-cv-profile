import { colors, fonts } from "../tokens";

type Item = { k: string; v: string };
type Props = {
  items: Item[];
  align?: "left" | "right";
};

/** Left-key / right-value mono meta row (Polymer sidebar style). */
export function MetaLine({ items, align = "left" }: Props) {
  return (
    <dl
      style={{
        margin: 0,
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "4px 18px",
        fontFamily: fonts.mono,
        fontSize: 10,
        letterSpacing: "0.08em",
        color: colors.ink,
        textAlign: align,
      }}
    >
      {items.map((it) => (
        <div
          key={it.k}
          style={{
            display: "contents",
          }}
        >
          <dt style={{ color: colors.inkMute, textTransform: "uppercase" }}>
            {it.k}
          </dt>
          <dd style={{ margin: 0, color: colors.ink }}>{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}

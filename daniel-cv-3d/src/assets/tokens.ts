// Design tokens distilled from /inspiration
// Aesthetic: techwear / cyber-brutalist / Swiss editorial on light paper

export const colors = {
  // Surfaces
  paper: "#EDEEF0",      // main light background (cool off-white)
  paperDim: "#D9DBDE",   // subtle panel tone
  paperWarm: "#F5F3EE",  // alt warm paper
  grid: "#C7CACD",       // grid hairlines / guides
  rule: "#1A1A1A",       // strong hairline on paper

  // Ink
  ink: "#141518",        // body text / near-black
  inkSoft: "#2A2C30",
  inkMute: "#6E7378",    // secondary/meta text

  // Signature accent
  orange: "#FF5A1F",     // primary accent (buttons, blocks)
  orangeDeep: "#E04A10",
  orangeEmber: "#B93B0B", // darkest end of the accent sweep
  orangeTint: "#FFD9C8",

  // Support
  lime: "#C9F04A",       // rare eco highlight (sparing)
  cobalt: "#1B3BE0",     // occasional contrast
} as const;

// Gradient layer — the art direction is evolving toward richer, layered
// color fields. Every gradient stays translucent over paper (or clips to
// display type) so ink contrast and legibility are never compromised.
export const gradients = {
  // Layered mesh backdrop for hero-scale surfaces; sits behind content.
  // Each field fades all the way out (stop at 100%) so no disc edges show.
  mesh: [
    "radial-gradient(50% 44% at 10% 6%, rgba(255, 90, 31, 0.12), transparent 100%)",
    "radial-gradient(48% 42% at 90% 16%, rgba(27, 59, 224, 0.06), transparent 100%)",
    "radial-gradient(40% 36% at 68% 92%, rgba(201, 240, 74, 0.10), transparent 100%)",
  ].join(", "),
  // Signature accent sweep: orange burning down to ember. Stays in one hue
  // family — orange blended into cobalt turns muddy purple in sRGB.
  accent: `linear-gradient(100deg, ${colors.orange} 0%, ${colors.orangeDeep} 60%, ${colors.orangeEmber} 100%)`,
  // Hairline edge for card rules and borders.
  edge: `linear-gradient(90deg, ${colors.orange} 0%, ${colors.orangeDeep} 60%, ${colors.orangeEmber} 100%)`,
  // Editorial hairline: an ember tip cooling into the ink rule. Fixed-px
  // Fibonacci stops (89/233) keep the glowing tip the same length on every
  // rule regardless of its width, like a fuse lit from the left.
  rule: `linear-gradient(90deg, ${colors.orange} 0%, ${colors.orangeEmber} 89px, ${colors.ink} 233px)`,
  // Translucent duotone wash that keys photography into the palette.
  wash: "linear-gradient(160deg, rgba(255, 90, 31, 0.14), rgba(27, 59, 224, 0.10))",
  // Depth field for the signature orange slab: ember pools in the lower-right
  // corner, a warm tint lifts the upper-left where the copy sits. Kept
  // translucent over solid orange so ink stays ≥4.5:1 everywhere.
  slab: [
    "radial-gradient(120% 100% at 88% 100%, rgba(185, 59, 11, 0.40), transparent 72%)",
    "radial-gradient(80% 70% at 6% 0%, rgba(255, 217, 200, 0.30), transparent 70%)",
  ].join(", "),
} as const;

export const fonts = {
  // Pair a technical mono with a heavy cyber-stencil display
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace',
  display:
    '"Orbitron", "Rajdhani", "Space Grotesk", "Helvetica Neue", Arial, sans-serif',
  // Japanese decorative tag (optional; system fallback chain)
  kana: '"Noto Sans Thai", "Thonburi", "Leelawadee UI", "Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif',
} as const;

export const radii = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  frame: "14px",   // rounded-rect panel frames from inspiration
} as const;

export const stroke = {
  hair: "0.75px",
  thin: "1px",
  std: "1.5px",
  bold: "2.5px",
} as const;

// Golden ratio (φ). Fibonacci numbers converge on φ as consecutive-term
// ratios (55/34 ≈ 1.618, 34/21 ≈ 1.619, ...), so the Fibonacci sequence
// gives a whole-pixel spacing rhythm that's genuinely golden throughout
// the layout — every step is ~φ× the previous one.
export const PHI = 1.6180339887;

export const space = {
  xxs: 3,
  xs: 5,
  sm: 8,
  md: 13,
  lg: 21,
  xl: 34,
  xxl: 55,
  xxxl: 89,
  xxxxl: 144,
} as const;

// Display-type scale: each step is the 24px base × φ, rounded to whole px.
export const displayType = {
  sm: 24,
  md: 39,
  lg: 63,
  xl: 102,
  xxl: 165,
} as const;

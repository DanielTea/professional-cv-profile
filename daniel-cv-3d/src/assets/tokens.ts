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
  orangeTint: "#FFD9C8",

  // Support
  lime: "#C9F04A",       // rare eco highlight (sparing)
  cobalt: "#1B3BE0",     // occasional contrast
} as const;

export const fonts = {
  // Pair a technical mono with a heavy cyber-stencil display
  mono: '"JetBrains Mono", "IBM Plex Mono", ui-monospace, Menlo, monospace',
  display:
    '"Orbitron", "Rajdhani", "Space Grotesk", "Helvetica Neue", Arial, sans-serif',
  // Japanese decorative tag (optional; system fallback chain)
  kana: '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", sans-serif',
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

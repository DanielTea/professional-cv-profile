/**
 * The dossier index — one ordered list of the page's numbered sections.
 *
 * The site reads as a technical dossier, and its section tags ("SEC_04 /
 * GITHUB TELEMETRY") are the index of that dossier: a visitor scrolling down
 * should see them count up. Each code used to be a hardcoded string inside its
 * own section file, so every reorder of `page.tsx` left the numbering behind.
 * It had drifted into 03 → 02 → 04 → 06 → 07 → 05 → 08 — two inversions, and
 * no SEC_01 on the page at all, even though the hero (DT-01) and the contact
 * slab (CH_01) both open their own series at 01.
 *
 * Numbering is now derived from the order below rather than written out seven
 * times, so the index can only drift if this one array does. Keep it in the
 * order the sections are rendered in `src/app/page.tsx`; the unnumbered hero
 * and contact blocks carry their own DT_ / CH_ codes and stay out of it.
 */
export const SECTION_INDEX = [
  { id: "work", label: "PORTFOLIO" },
  { id: "skills", label: "CORE CAPABILITIES" },
  { id: "experience", label: "TIMELINE" },
  { id: "github", label: "GITHUB TELEMETRY" },
  { id: "world", label: "FIELD PRESENCE" },
  { id: "recs", label: "PEER FEEDBACK" },
  { id: "news", label: "PRESS SIGNAL" },
] as const;

/** The `id` of a numbered section — the same anchor its <section> carries. */
export type SectionId = (typeof SECTION_INDEX)[number]["id"];

const TAGS: Record<string, string> = Object.fromEntries(
  SECTION_INDEX.map((section, i) => [
    section.id,
    `SEC_${String(i + 1).padStart(2, "0")} / ${section.label}`,
  ]),
);

/**
 * The FileTag body for a numbered section, e.g. `sectionTag("github")` →
 * "SEC_04 / GITHUB TELEMETRY". The id is the section's own anchor, so a tag
 * always names the block it sits in.
 */
export function sectionTag(id: SectionId): string {
  return TAGS[id];
}

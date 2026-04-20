"use client";
import {
  FileTag,
  Pictogram,
  SectionRule,
  StatBar,
  StencilTitle,
  colors,
  fonts,
} from "@/assets";

type Skill = { name: string; level: number };
type Group = {
  code: string;
  title: string;
  caption: string;
  icon: Parameters<typeof Pictogram>[0]["name"];
  skills: Skill[];
};

const GROUPS: Group[] = [
  {
    code: "C-01",
    title: "AI / ML",
    caption: "Neural nets, deep learning, production ML",
    icon: "beam",
    skills: [
      { name: "TensorFlow", level: 95 },
      { name: "PyTorch", level: 85 },
      { name: "Deep Learning", level: 92 },
      { name: "LLM Ops", level: 88 },
      { name: "Computer Vision", level: 84 },
    ],
  },
  {
    code: "C-02",
    title: "Data / Infra",
    caption: "Pipelines, warehouses, distributed compute",
    icon: "stack",
    skills: [
      { name: "PySpark", level: 85 },
      { name: "Databricks", level: 88 },
      { name: "Azure ML", level: 90 },
      { name: "AWS", level: 80 },
      { name: "Kubernetes", level: 78 },
    ],
  },
  {
    code: "C-03",
    title: "Engineering",
    caption: "Full-stack systems, APIs, TypeScript first",
    icon: "code",
    skills: [
      { name: "Python", level: 95 },
      { name: "TypeScript", level: 88 },
      { name: "Next.js / React", level: 88 },
      { name: "FastAPI", level: 85 },
      { name: "PostgreSQL", level: 88 },
    ],
  },
  {
    code: "C-04",
    title: "Leadership",
    caption: "Product, strategy, team building",
    icon: "node",
    skills: [
      { name: "Team Building", level: 88 },
      { name: "Product Strategy", level: 86 },
      { name: "Sales / BD", level: 80 },
      { name: "Technical Hiring", level: 85 },
      { name: "Roadmapping", level: 84 },
    ],
  },
];

export function Competencies() {
  return (
    <section id="skills" style={{ padding: "56px 48px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <FileTag>SEC_02 / CORE CAPABILITIES</FileTag>
          <StencilTitle size={96}>COMPETENCIES</StencilTitle>
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: fonts.mono,
            fontSize: 12,
            lineHeight: 1.55,
            color: colors.inkMute,
            maxWidth: 420,
            textAlign: "right",
          }}
        >
          Four vectors. Numeric confidence from self-assessment against
          shipped production systems — not a LinkedIn endorsement list.
        </p>
      </div>

      <SectionRule label="INDEX" code={`${GROUPS.length.toString().padStart(2, "0")} CATEGORIES`} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 0,
          border: `1px solid ${colors.ink}`,
        }}
      >
        {GROUPS.map((g, i) => (
          <article
            key={g.code}
            style={{
              padding: "24px 24px 28px",
              borderRight: i % 2 === 0 ? `1px solid ${colors.ink}` : undefined,
              borderTop: i >= 2 ? `1px solid ${colors.ink}` : undefined,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              background: colors.paper,
            }}
          >
            <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Pictogram name={g.icon} size={48} />
                <div>
                  <div
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      color: colors.inkMute,
                    }}
                  >
                    {g.code}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: fonts.display,
                      fontWeight: 900,
                      fontSize: 28,
                      letterSpacing: "-0.01em",
                      lineHeight: 1,
                    }}
                  >
                    {g.title.toUpperCase()}
                  </h3>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontFamily: fonts.mono,
                      fontSize: 11,
                      color: colors.inkMute,
                    }}
                  >
                    {g.caption}
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 900,
                  fontSize: 38,
                  color: colors.orange,
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </header>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {g.skills.map((s) => (
                <StatBar key={s.name} label={s.name} value={s.level} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

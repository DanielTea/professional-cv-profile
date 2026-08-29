"use client";
import { useIsMobile } from "@/lib/useIsMobile";
import { sectionTag } from "@/lib/sectionIndex";
import { FileTag, SectionRule, StencilTitle, TimelineRow, colors, gradients, space } from "@/assets";

type Role = {
  period: string;
  org: string;
  role: string;
  location?: string;
  stack?: string[];
  note: string;
  logo?: string;
};

const ROLES: Role[] = [
  {
    period: "2024 —",
    org: "control-f GmbH",
    role: "CEO & Managing Partner",
    location: "Berlin",
    logo: "/company_icons/control-f.svg",
    stack: ["AI Strategy", "Team Building", "Product", "Delivery"],
    note: "Building an AI product studio: cutting-edge AI, data science, and proprietary systems for enterprise clients worldwide.",
  },
  {
    period: "2023 —",
    org: "RoboWork",
    role: "Founder",
    location: "Berlin",
    stack: ["Custom AI", "Python", "ML", "Integrations"],
    note: "Tailor-made AI solutions for organizations. Seamless integration of ML into existing systems to optimize productivity and decision-making.",
  },
  {
    period: "2021 – 24",
    org: "Porsche AG",
    role: "Specialist · Data Science & AI Projects",
    location: "Weissach",
    logo: "/company_icons/Porsche.png",
    stack: ["PySpark", "Azure ML", "Cloudera", "Dataiku", "TensorFlow"],
    note: "Vehicle data pipelines on the Porsche Data Platform (Cloudera/AWS + SAP DWC). Operationalized data views, quality-driven analytics, stakeholder alignment.",
  },
  {
    period: "2020 – 21",
    org: "MBition GmbH",
    role: "Senior Product Owner · Mercedes-Benz Innovation Lab",
    location: "Berlin",
    logo: "/company_icons/mbition.webp",
    stack: ["MBUX", "Linux Kernel Virtualization", "Agile", "Jira"],
    note: "Led R&D on the next-generation Mercedes-Benz Infotainment System. Dynamic content platform integration and containerization for performance and scale.",
  },
  {
    period: "2019 – 20",
    org: "Daimler AG",
    role: "Technical Lead & Product Owner · AI & Digitalization",
    location: "Stuttgart",
    logo: "/company_icons/Daimler.png",
    stack: ["Python", "Docker", "Kubernetes", "Jenkins", "Azure"],
    note: "Microservice + ML architectures across cloud and on-prem. Project Owner for a 1TB+ procurement savings prediction pipeline for Daimler's procurement org.",
  },
  {
    period: "2019",
    org: "Daimler AG",
    role: "Project Coordinator · AI & Digitalization",
    location: "Stuttgart",
    logo: "/company_icons/Daimler.png",
    stack: ["Python", "Keras", "TensorFlow", "Azure", "Docker"],
    note: "Coordinated AI-enabled software projects. NLP models for text analysis and classification; managed Azure infra for scalable hosting.",
  },
  {
    period: "2018 – 19",
    org: "Tremer AI & Data Analytics",
    role: "Founder",
    location: "Stuttgart",
    stack: ["Consulting", "Python", "ML", "Data Viz"],
    note: "Freelance ML software development. Preprocessing and cleansing of large datasets, stakeholder-facing visualizations.",
  },
  {
    period: "2018 – 19",
    org: "Drees & Sommer",
    role: "Freelance Software Engineer",
    location: "Stuttgart",
    stack: ["TensorFlow (FaceNet)", "Keras", "Python", "Flask", "OAuth2"],
    note: "Facial-recognition room guidance system over multiple camera streams. Pathing algorithm and OAuth2-based LinkedIn crawler for embeddings.",
  },
  {
    period: "2017 – 18",
    org: "Porsche AG",
    role: "R&D · Bachelor Thesis",
    location: "Weissach",
    logo: "/company_icons/Porsche.png",
    stack: ["LSTMs", "CNNs", "VAE", "Keras", "TensorFlow"],
    note: "Thesis: \"A Deep-Learning Approach on Automotive Maneuver Detection.\" CAN-Bus preprocessing pipeline, classification across architectures, and VAE-based latent visualization. Earlier: live Jenkins analytics dashboard (d3.js + Flask).",
  },
  {
    period: "2017",
    org: "Porsche Cars NA",
    role: "Information Technology",
    location: "Atlanta",
    logo: "/company_icons/Porsche.png",
    stack: ["Python", "Scikit-learn", "Flask", "Hadoop", "PySpark"],
    note: "Anomaly detection monitoring tool (SVM pre-classifier + Isolation Forest). Python-based IT process automation. Cloudera Hadoop test-build on-prem.",
  },
  {
    period: "2013 – 17",
    org: "Porsche AG",
    role: "Decentralized Server Infrastructure",
    location: "Stuttgart",
    logo: "/company_icons/Porsche.png",
    stack: ["PostgreSQL", "Python", "Java", "SAP Crystal", "SQL"],
    note: "Dual-study program. Automated server installation, custom PostgreSQL databases, BI reporting, and change-management automation.",
  },
];

export function Experience() {
  const isMobile = useIsMobile();
  return (
    <section id="experience" aria-labelledby="experience-title" style={{ padding: isMobile ? `${space.xl}px ${space.md}px` : `${space.xxl}px`, maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ marginBottom: space.lg }}>
        <FileTag>{sectionTag("experience")}</FileTag>
        <StencilTitle id="experience-title" size={96}>EXPERIENCE</StencilTitle>
      </div>

      <SectionRule label="LOG" code={`${ROLES.length.toString().padStart(2, "0")} ENTRIES`} />

      <div
        style={{
          border: `1px solid ${colors.ink}`,
          padding: isMobile ? `0 ${space.md}px` : `${space.xs}px ${space.lg}px`,
          // Same recipe as the Competencies board, the quote cards and the
          // press plates: the mesh is translucent (every stop ≤0.12 alpha)
          // painted over solid paper, so the log gains the site's layered
          // gradient surface without spending the contrast budget. On the
          // composited surface ink reads 13.7:1 and inkMute 4.9:1, both clear
          // of the 4.5:1 AA body-text rule.
          //
          // Painted once here rather than per row: the mesh's stops are
          // percentages of its own box, so a per-row field would restamp the
          // same three pools eleven times and put a hard colour seam on every
          // separator. One field over the whole log keeps the eleven entries
          // reading as a single panel.
          background: `${gradients.mesh}, ${colors.paper}`,
        }}
      >
        {ROLES.map((r, i) => (
          <TimelineRow
            key={`${r.org}-${r.period}`}
            index={i + 1}
            period={r.period}
            org={r.org}
            role={r.role}
            location={r.location}
            stack={r.stack}
            logo={r.logo}
            // The panel's top border already closes the block; a fuse rule on
            // the first row would double it.
            divider={i > 0}
          >
            {r.note}
          </TimelineRow>
        ))}
      </div>
    </section>
  );
}

"use client";
import { FileTag, SectionRule, StencilTitle, TimelineRow } from "@/assets";

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
  return (
    <section id="experience" style={{ padding: "56px 48px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <FileTag>SEC_04 / TIMELINE</FileTag>
        <StencilTitle size={96}>EXPERIENCE</StencilTitle>
      </div>

      <SectionRule label="LOG" code={`${ROLES.length.toString().padStart(2, "0")} ENTRIES`} />

      <div>
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
          >
            {r.note}
          </TimelineRow>
        ))}
      </div>
    </section>
  );
}

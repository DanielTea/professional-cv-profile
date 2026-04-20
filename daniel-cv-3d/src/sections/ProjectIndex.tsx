"use client";
import { useMemo, useState } from "react";
import { useIsMobile } from "@/lib/useIsMobile";
import {
  FileTag,
  ProjectCard,
  SectionRule,
  StencilTitle,
  asset,
  colors,
  fonts,
  type ProjectStat,
} from "@/assets";

type Project = {
  id: string;
  category: "Enterprise" | "Research" | "Startup" | "Product";
  title: string;
  logo?: string;
  description: string;
  stats: ProjectStat[];
  href?: string;
  status?: string;
};

const PROJECTS: Project[] = [
  {
    id: "control-f",
    category: "Startup",
    title: "control-f",
    logo: "/company_icons/control-f.svg",
    description:
      "AI product studio for enterprise. CEO & Managing Partner · engineering, strategy, delivery.",
    stats: [
      { k: "Founded", v: "2024" },
      { k: "Base", v: "Berlin" },
      { k: "Role", v: "CEO" },
      { k: "Focus", v: "Applied AI" },
    ],
    href: "https://controlf.io",
    status: "LIVE",
  },
  {
    id: "robowork",
    category: "Startup",
    title: "RoboWork",
    description:
      "Custom AI software solutions. Tailor-made ML deployed into mid-market operations across DACH.",
    stats: [
      { k: "Founded", v: "2023" },
      { k: "Mode", v: "Bespoke" },
      { k: "Role", v: "Founder" },
      { k: "Base", v: "Berlin" },
    ],
    href: "https://robowork.solutions",
    status: "ACTIVE",
  },
  {
    id: "porsche-pipe",
    category: "Enterprise",
    title: "Porsche Vehicle Data Pipeline",
    logo: "/company_icons/Porsche.png",
    description:
      "PySpark pipeline for vehicle data on Porsche Data Platform (Cloudera/AWS) + Azure ML. R&D analytics and data views.",
    stats: [
      { k: "Stack", v: "PySpark" },
      { k: "Cloud", v: "Azure · AWS" },
      { k: "Tool", v: "Dataiku" },
      { k: "Years", v: "3" },
    ],
    status: "SHIPPED",
  },
  {
    id: "mbux",
    category: "Enterprise",
    title: "MBUX Next-Gen Infotainment",
    logo: "/company_icons/mbition.webp",
    description:
      "Senior Product Owner @ MBition (Mercedes-Benz Innovation Lab). Dynamic content platform + Linux kernel virtualization for containerized apps.",
    stats: [
      { k: "Scope", v: "Infotainment" },
      { k: "Stack", v: "Linux · K8s" },
      { k: "Method", v: "Agile" },
      { k: "Years", v: "1" },
    ],
    status: "DEPLOYED",
  },
  {
    id: "daimler-savings",
    category: "Enterprise",
    title: "Daimler Procurement Savings ML",
    logo: "/company_icons/Daimler.png",
    description:
      "Project Owner on a 1TB+ procurement dataset. Classification, processing, and savings prediction. Docker/K8s microservices on Azure + Jenkins CI/CD.",
    stats: [
      { k: "Data", v: "1TB+" },
      { k: "Stack", v: "Py · K8s" },
      { k: "Cloud", v: "Azure" },
      { k: "Role", v: "PO" },
    ],
    status: "SHIPPED",
  },
  {
    id: "face-guidance",
    category: "Product",
    title: "Facial Room Guidance",
    description:
      "Drees & Sommer: deep-learning room guidance using FaceNet over multiple camera streams. OAuth2 LinkedIn crawler + custom pathing algorithm.",
    stats: [
      { k: "Model", v: "FaceNet" },
      { k: "Stack", v: "TF · Keras" },
      { k: "API", v: "Flask" },
      { k: "Year", v: "2018" },
    ],
    status: "DELIVERED",
  },
  {
    id: "maneuver",
    category: "Research",
    title: "Automotive Maneuver Detection",
    logo: "/company_icons/Porsche.png",
    description:
      "Bachelor thesis @ Porsche AG: deep-learning maneuver classification on CAN-Bus data. LSTM, CNN, LSTM+CNN and a VAE for latent visualization.",
    stats: [
      { k: "Data", v: "CAN-Bus" },
      { k: "Models", v: "LSTM · CNN · VAE" },
      { k: "Stack", v: "Keras" },
      { k: "Venue", v: "HdM · Porsche" },
    ],
    status: "PUBLISHED",
  },
  {
    id: "pcna-anomaly",
    category: "Enterprise",
    title: "PCNA Data Stream Anomaly Detection",
    logo: "/company_icons/Porsche.png",
    description:
      "Porsche Cars North America (Atlanta): monitoring tool for incoming data streams. SVM pre-classifier + Isolation Forest with Flask. Hadoop/Cloudera evaluation build.",
    stats: [
      { k: "Models", v: "SVM · IF" },
      { k: "Stack", v: "Py · Flask" },
      { k: "Infra", v: "Hadoop" },
      { k: "Year", v: "2017" },
    ],
    status: "SHIPPED",
  },
];

const TABS = ["All", "Enterprise", "Startup", "Product", "Research"] as const;

export function ProjectIndex() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const isMobile = useIsMobile();
  const filtered = useMemo(
    () => (tab === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === tab)),
    [tab],
  );

  return (
    <section id="work" style={{ padding: isMobile ? "40px 16px" : "56px 48px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, gap: 16, flexWrap: "wrap" }}>
        <div>
          <FileTag>SEC_03 / PORTFOLIO</FileTag>
          <StencilTitle size={96} underscore>PROJECT_INDEX</StencilTitle>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: fonts.display,
              fontWeight: 900,
              fontSize: 72,
              lineHeight: 0.9,
              color: colors.ink,
            }}
          >
            {String(filtered.length).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: colors.inkMute,
            }}
          >
            Records in view
          </div>
        </div>
      </div>

      {/* filter tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          border: `1px solid ${colors.ink}`,
          width: "fit-content",
          marginBottom: 28,
        }}
      >
        {TABS.map((t, i) => {
          const active = t === tab;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "8px 18px",
                background: active ? colors.ink : "transparent",
                color: active ? colors.paper : colors.ink,
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                border: "none",
                borderRight: i < TABS.length - 1 ? `1px solid ${colors.ink}` : undefined,
                cursor: "pointer",
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      <SectionRule label="GRID" code={`${filtered.length} / ${PROJECTS.length}`} />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 20 : 28, marginTop: 28 }}>
        {filtered.map((p) => (
          <ProjectCard
            key={p.id}
            category={p.category}
            title={p.title}
            description={p.description}
            stats={p.stats}
            href={p.href}
            status={p.status}
            logo={
              p.logo ? (
                <img
                  src={asset(p.logo)}
                  alt=""
                  width={72}
                  height={72}
                  style={{ objectFit: "contain", filter: "grayscale(1)" }}
                />
              ) : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}

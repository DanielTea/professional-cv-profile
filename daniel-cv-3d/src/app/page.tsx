"use client";

import { NavBar, HazardTape, colors, gradients } from "@/assets";
import { Hero } from "@/sections/Hero";
import { Competencies } from "@/sections/Competencies";
import { ProjectIndex } from "@/sections/ProjectIndex";
import { Experience } from "@/sections/Experience";
import { GithubActivity } from "@/sections/GithubActivity";
import { GlobeSection } from "@/sections/GlobeSection";
import { Recommendations } from "@/sections/Recommendations";
import { Press } from "@/sections/Press";
import { Contact } from "@/sections/Contact";
import { FooterBlock } from "@/sections/FooterBlock";

export default function Home() {
  return (
    <main
      style={{
        // Background is drawn by the fixed ambient field below (over the paper
        // set on <body>), so the whole page shares one cohesive gradient wash.
        background: "transparent",
        color: colors.ink,
        minHeight: "100vh",
        position: "relative",
        zIndex: 0,
      }}
    >
      {/* Page-scale ambient gradient — fixed to the viewport, pinned behind all
          content (z-index -1), non-interactive. Translucent over the paper on
          <body>, so ink contrast is preserved while the flat backdrop gains a
          subtle, cohesive gradient atmosphere as you scroll. */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          background: gradients.field,
          pointerEvents: "none",
        }}
      />
      <a href="#top" className="dt-skip">
        Skip to content
      </a>
      <NavBar
        items={[
          { label: "Work", href: "#work" },
          { label: "Skills", href: "#skills" },
          { label: "Experience", href: "#experience" },
          { label: "Build Log", href: "#github" },
          { label: "Globe", href: "#world" },
          { label: "News", href: "#news" },
          { label: "Contact", href: "#contact" },
        ]}
      />
      <Hero />
      <HazardTape />
      <ProjectIndex />
      <HazardTape tone="orange" />
      <Competencies />
      <HazardTape />
      <Experience />
      <GithubActivity />
      <GlobeSection />
      <Recommendations />
      <Press />
      <Contact />
      <FooterBlock />
    </main>
  );
}

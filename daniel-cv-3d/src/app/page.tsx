"use client";

import { NavBar, HazardTape, colors } from "@/assets";
import { Hero } from "@/sections/Hero";
import { Competencies } from "@/sections/Competencies";
import { ProjectIndex } from "@/sections/ProjectIndex";
import { Experience } from "@/sections/Experience";
import { GithubActivity } from "@/sections/GithubActivity";
import { GlobeSection } from "@/sections/GlobeSection";
import { Recommendations } from "@/sections/Recommendations";
import { Contact } from "@/sections/Contact";
import { FooterBlock } from "@/sections/FooterBlock";

export default function Home() {
  return (
    <main
      style={{
        background: colors.paper,
        color: colors.ink,
        minHeight: "100vh",
      }}
    >
      <NavBar
        items={[
          { label: "Work", href: "#work" },
          { label: "Skills", href: "#skills" },
          { label: "Experience", href: "#experience" },
          { label: "Build Log", href: "#github" },
          { label: "Globe", href: "#world" },
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
      <Contact />
      <FooterBlock />
    </main>
  );
}

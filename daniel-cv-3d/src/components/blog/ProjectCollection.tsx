"use client";
import { useState } from "react";
import { curiosityProjects } from "@/data/projects";
import { BlogProjectCard } from "./ProjectCard";
import styles from "./Blog.module.css";

const categories = ["All projects", "AI & ML", "Engineering", "Data & place", "Developer tools"] as const;
export function ProjectCollection() {
  const [selected, setSelected] = useState<(typeof categories)[number]>("All projects");
  const visible = curiosityProjects.filter(p => selected === "All projects" || p.category === selected);
  return <>
    <div className={styles.filters} role="group" aria-label="Filter projects by topic">
      {categories.map(category => <button key={category} type="button" className={styles.filter} aria-pressed={selected === category} onClick={() => setSelected(category)}>{category} <span aria-hidden>({category === "All projects" ? curiosityProjects.length : curiosityProjects.filter(p => p.category === category).length})</span></button>)}
    </div>
    <p className="dt-sr-only" role="status">{visible.length} projects shown{selected !== "All projects" ? ` in ${selected}` : ""}.</p>
    <div className={styles.grid}>{visible.map(project => <BlogProjectCard key={project.slug} project={project} index={curiosityProjects.indexOf(project)} />)}</div>
  </>;
}

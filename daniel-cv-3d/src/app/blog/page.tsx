import type { Metadata } from "next";
import Link from "next/link";
import { asset } from "@/assets/asset";
import { curiosityProjects } from "@/data/projects";
import { ProjectCollection } from "@/components/blog/ProjectCollection";
import styles from "@/components/blog/Blog.module.css";

const description = "Curiosity projects by Daniel Tremer: an AI-agent check of a war reportage with satellite data, local AI agents, rocket simulations, language-model experiments, public World, Maritime and US dashboards, Berlin data and developer tools.";
export const metadata: Metadata = {
  title: "Curiosity Projects — Daniel Tremer",
  description,
  alternates: { canonical: asset("/blog/") },
  openGraph: { title: "Curiosity Projects — Daniel Tremer", description, url: asset("/blog/"), images: [{ url: asset(curiosityProjects[0].images[0].src), alt: curiosityProjects[0].images[0].alt }] },
  twitter: { card: "summary_large_image", title: "Curiosity Projects — Daniel Tremer", description, images: [asset(curiosityProjects[0].images[0].src)] },
};

export default function BlogIndex() {
  return <main id="blog-content" className={styles.container}>
    <div className={styles.hero}>
      <div className={styles.heroTop}><span className={styles.eyebrow}>Daniel Tremer / Project blog</span><span className={styles.eyebrow}>Experiments & field notes</span></div>
      <h1 className={styles.title}>BUILT OUT OF<br /><span className={styles.accent}>CURIOSITY.</span></h1>
      <div className={styles.heroBottom}><p className={styles.intro}>Sometimes the best reason to build something is to see what happens. A collection of side projects, open questions, and notes from following an idea.</p><div className={styles.countLabel}><span className={styles.counter}>{String(curiosityProjects.length).padStart(2, "0")}</span><span className={styles.eyebrow}>Open explorations</span></div></div>
    </div>
    <ProjectCollection />
    <footer className={styles.footer}><span>Independent projects. Explore the live dashboards and public project sources.</span><Link href="/">← Back to profile</Link></footer>
  </main>;
}

import Link from "next/link";
import { curiosityProjects } from "@/data/projects";
import { sectionTag } from "@/lib/sectionIndex";
import { BlogProjectCard } from "@/components/blog/ProjectCard";
import styles from "@/components/blog/Blog.module.css";

export function ProjectBlog() {
  return <section id="blog" aria-labelledby="project-blog-title" className={styles.section}>
    <div className={styles.sectionHeading}>
      <div>
        <span className={styles.eyebrow}>{sectionTag("blog")}</span>
        <h2 id="project-blog-title" className={styles.sectionTitle}>BUILT OUT OF<br /><span className={styles.accent}>CURIOSITY.</span></h2>
        <p className={styles.sectionIntro}>Small experiments, open questions, and things worth building just to find out. Notes from my projects in AI, engineering, and the world around me.</p>
      </div>
      <Link href="/blog/" className={styles.button}>Explore all {curiosityProjects.length} projects <span aria-hidden>↗</span></Link>
    </div>
    <div className={styles.grid}>{curiosityProjects.slice(0, 3).map((project, index) => <BlogProjectCard key={project.slug} project={project} index={index} />)}</div>
    <div className={styles.sectionFooter}><span>Project blog / experiments & field notes</span><span>AI · Engineering · Data · Developer tools</span></div>
  </section>;
}

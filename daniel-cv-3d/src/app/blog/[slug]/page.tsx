import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { asset } from "@/assets/asset";
import { curiosityProjects, projectUrl, readingMinutes } from "@/data/projects";
import { BlogProjectCard } from "@/components/blog/ProjectCard";
import { ProjectImage } from "@/components/blog/ProjectImage";
import styles from "@/components/blog/Blog.module.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return curiosityProjects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = curiosityProjects.find(p => p.slug === slug);
  if (!project) return {};
  const title = `${project.title} — Daniel Tremer’s Project Blog`;
  return {
    title, description: project.summary, alternates: { canonical: asset(`/blog/${slug}/`) },
    openGraph: { type: "article", title, description: project.summary, url: asset(`/blog/${slug}/`), authors: ["Daniel Tremer"], images: [{ url: asset(project.images[0].src), alt: project.images[0].alt }] },
    twitter: { card: "summary_large_image", title, description: project.summary, images: [asset(project.images[0].src)] },
  };
}

export default async function ProjectArticle({ params }: Props) {
  const { slug } = await params;
  const project = curiosityProjects.find(p => p.slug === slug);
  if (!project) notFound();
  const { destination } = project;
  const isDashboard = destination.kind === "dashboard";
  const isReport = destination.kind === "report";
  const linkLabel = destination.kind === "repository" ? "View on GitHub" : destination.label || (isDashboard ? "Open dashboard" : "Read the report");
  const [sourceText, sourceLink] = isDashboard
    ? ["Based on the public dashboard. Screenshots show a captured snapshot; the live view contains the latest published observations. ", "Explore the public dashboard"]
    : isReport
      ? ["Based on public satellite data, ship-tracking data and news reports. The full report lists every source and the method. ", "Read the full report"]
      : ["Based on the project’s public documentation and published outputs. ", "Read the README and explore the code"];
  const index = curiosityProjects.indexOf(project);
  const related = [...curiosityProjects.filter(p => p.slug !== slug && p.category === project.category), ...curiosityProjects.filter(p => p.slug !== slug && p.category !== project.category)].slice(0, 3);
  return <main id="blog-content" className={styles.container}>
    <nav aria-label="Breadcrumb" className={styles.breadcrumb}><Link href="/">Profile</Link><span aria-hidden>/</span><Link href="/blog/">Project blog</Link><span aria-hidden>/</span><span aria-current="page">{project.title}</span></nav>
    <article>
      <div className={styles.articleHead}>
        <div><span className={styles.eyebrow}>EXP_{String(index + 1).padStart(2, "0")} / {project.category}</span><h1 className={styles.articleTitle}>{project.title.split(/(?<=[a-z])(?=[A-Z])/).map((part, i) => <span key={i}>{i > 0 && <wbr />}{part}</span>)}</h1><p className={styles.subtitle}>{project.subtitle}</p><p className={styles.articleSummary}>{project.summary}</p></div>
        <aside className={styles.facts} aria-label="Project details"><dl><dt>Field notes by</dt><dd>Daniel Tremer · {readingMinutes(project)} min read</dd><dt>{isDashboard ? "Explore" : isReport ? "Data and tools" : "Built with"}</dt><dd><ul className={styles.tags}>{project.stack.map(tech => <li key={tech}>{tech}</li>)}</ul></dd></dl><a className={styles.button} href={projectUrl(project)} target="_blank" rel="noopener noreferrer">{linkLabel} ↗<span className="dt-sr-only"> (opens in a new tab)</span></a></aside>
      </div>
      <ProjectImage image={project.images[0]} priority />
      <div className={styles.articleBody}>
        <nav className={styles.contents} aria-label="In this story"><span className={styles.eyebrow}>In this story</span><ol>{project.sections.map((section, i) => <li key={section.title}><a href={`#part-${i + 1}`}>{section.title}</a></li>)}<li><a href="#takeaway">The takeaway</a></li></ol></nav>
        <div className={styles.prose}>
          <div className={styles.question}><span className={styles.eyebrow}>The question</span><p>{project.question}</p></div>
          {project.sections.map((section, i) => <section id={`part-${i + 1}`} key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
          <aside id="takeaway" className={styles.takeaway}><span className={styles.eyebrow}>The takeaway</span><p>{project.takeaway}</p></aside>
          <div className={styles.sourceNote}>{sourceText}<a href={projectUrl(project)} target="_blank" rel="noopener noreferrer">{sourceLink} ↗<span className="dt-sr-only"> (opens in a new tab)</span></a></div>
        </div>
      </div>
      {project.images.length > 1 && <div className={styles.gallery}>{project.images.slice(1).map(image => <ProjectImage key={image.src} image={image} />)}</div>}
    </article>
    <section className={styles.related} style={{ marginTop: 64 }} aria-labelledby="more-projects"><span className={styles.eyebrow}>Keep exploring</span><h2 id="more-projects">Another question to follow.</h2><div className={styles.grid}>{related.map(p => <BlogProjectCard key={p.slug} project={p} index={curiosityProjects.indexOf(p)} />)}</div></section>
    <footer className={styles.footer}><Link href="/blog/">← All curiosity projects</Link><Link href="/">Back to profile ↗</Link></footer>
  </main>;
}

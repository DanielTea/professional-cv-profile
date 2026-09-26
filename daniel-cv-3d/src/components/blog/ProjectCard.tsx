import Link from "next/link";
import { asset } from "@/assets/asset";
import { type CuriosityProject, readingMinutes } from "@/data/projects";
import styles from "./Blog.module.css";

export function BlogProjectCard({ project, index }: { project: CuriosityProject; index: number }) {
  const cover = project.images[0];
  return (
    <Link href={`/blog/${project.slug}/`} className={styles.card}>
      <div className={styles.cardMedia} data-kind={cover.kind}>
        <img src={asset(cover.src)} alt={cover.alt} width={960} height={600} loading="lazy" />
        <span className={styles.imageKind}>{cover.kind}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}><span>{project.category}</span><span>EXP_{String(index + 1).padStart(2, "0")}</span></div>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDescription}>{project.summary}</p>
        <div className={styles.cardFoot}><span>{readingMinutes(project)} min read</span><span>Read the story <span className={styles.arrow} aria-hidden>↗</span></span></div>
      </div>
    </Link>
  );
}

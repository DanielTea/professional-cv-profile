"use client";
import { useId, useRef } from "react";
import { asset } from "@/assets/asset";
import type { ProjectImage as ImageData } from "@/data/projects";
import styles from "./Blog.module.css";

export function ProjectImage({ image, priority = false }: { image: ImageData; priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const labelId = useId();
  return <figure className={styles.figure}>
    <button type="button" className={styles.imageButton} aria-label={`Enlarge image: ${image.alt}`} onClick={() => dialog.current?.showModal()}>
      <img src={asset(image.src)} alt={image.alt} width={1440} height={900} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
    </button>
    <figcaption className={styles.caption}><span>{image.caption} Click to enlarge.</span><a href={image.source} target="_blank" rel="noopener noreferrer">Image source ↗<span className="dt-sr-only"> (opens in a new tab)</span></a></figcaption>
    <dialog ref={dialog} className={styles.lightbox} aria-labelledby={labelId} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={styles.dialogTop}><span id={labelId} className={styles.eyebrow}>{image.kind}</span><button type="button" className={styles.close} onClick={() => dialog.current?.close()} autoFocus>Close ×</button></div>
      <img src={asset(image.src)} alt={image.alt} width={1440} height={900} loading="lazy" />
      <p className={styles.sourceNote}>{image.caption}</p>
    </dialog>
  </figure>;
}

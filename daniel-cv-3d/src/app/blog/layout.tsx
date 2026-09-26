import Link from "next/link";
import { Monogram } from "@/assets/components/Monogram";
import styles from "@/components/blog/Blog.module.css";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.shell}>
    <a href="#blog-content" className="dt-skip">Skip to content</a>
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.brand} aria-label="Daniel Tremer — back to profile"><Monogram size={32} /><span>DANIEL TREMER</span></Link>
        <nav aria-label="Blog navigation" className={styles.nav}><Link href="/">Profile</Link><Link href="/blog/">Project blog</Link><a href="https://github.com/DanielTea" target="_blank" rel="noopener noreferrer">GitHub ↗<span className="dt-sr-only"> (opens in a new tab)</span></a></nav>
      </div>
    </header>
    {children}
  </div>;
}

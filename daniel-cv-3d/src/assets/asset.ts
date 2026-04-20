// Prefix public asset paths with NEXT_PUBLIC_BASE_PATH so they work
// under a GitHub Pages sub-path (e.g. /professional-cv-profile) AND
// under local dev / Vercel root deployments (empty prefix).
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path) return path;
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

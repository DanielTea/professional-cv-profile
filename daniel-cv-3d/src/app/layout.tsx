import type { Metadata, Viewport } from "next";
import { Orbitron, Rajdhani, JetBrains_Mono } from "next/font/google";
import { basePath } from "@/assets/asset";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Daniel Tremer - AI & Software Engineer",
  description: "Professional portfolio showcasing AI, data science, and software engineering expertise. Managing Director at control-f GmbH, former Porsche AG Data Science Specialist.",
  keywords: [
    "Daniel Tremer",
    "AI Engineer",
    "Software Developer",
    "Machine Learning",
    "Data Science",
    "control-f GmbH",
    "Porsche AG",
    "Python",
    "JavaScript",
    "TypeScript"
  ],
  authors: [{ name: "Daniel Tremer" }],
  creator: "Daniel Tremer",
  metadataBase: new URL("https://danieltremer.com"),
  
  // Open Graph metadata (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://danieltremer.com",
    title: "Daniel Tremer - AI & Software Engineer",
    description: "Professional portfolio showcasing AI, data science, and software engineering expertise. Managing Director at control-f GmbH, former Porsche AG Data Science Specialist.",
    siteName: "Daniel Tremer Portfolio",
    images: [
      {
        url: "/social_preview.png",
        width: 1200,
        height: 630,
        alt: "Daniel Tremer - AI & Software Engineer Portfolio",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Daniel Tremer - AI & Software Engineer",
    description: "Professional portfolio showcasing AI, data science, and software engineering expertise. Managing Director at control-f GmbH, former Porsche AG Data Science Specialist.",
    images: ["/social_preview.png"],
    creator: "@TremerDaniel",
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Favicon and app icons — Next's basePath does not prefix metadata URLs,
  // so under the GitHub Pages sub-path these must carry it explicitly.
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: "any" },
      { url: `${basePath}/favicon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/favicon.png`, type: "image/png", sizes: "32x32" },
      { url: `${basePath}/favicon-16x16.png`, type: "image/png", sizes: "16x16" },
    ],
    shortcut: `${basePath}/favicon.ico`,
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  },

  // Web App Manifest
  manifest: `${basePath}/site.webmanifest`,
};

// Schema.org structured data (JSON-LD). Absolute URLs are pinned to the
// canonical production domain so search engines and AI crawlers resolve the
// Person → Organization graph regardless of where the static bundle is hosted.
// Every field here is asserted elsewhere on the page (Hero, Contact, metadata),
// so nothing is claimed that the visible CV doesn't already state.
const CANONICAL = "https://danieltremer.com";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${CANONICAL}/#daniel-tremer`,
      name: "Daniel Tremer",
      url: CANONICAL,
      image: `${CANONICAL}/social_preview.png`,
      jobTitle: "CEO & Managing Partner",
      description:
        "Machine learning engineer with 10+ years of data science and AI shipped at Porsche, Daimler, and Mercedes-Benz. CEO & Managing Partner at control-f GmbH.",
      email: "mailto:info@danieltremer.com",
      worksFor: {
        "@type": "Organization",
        name: "control-f GmbH",
        url: "https://www.controlf.io",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Data Science",
        "Software Engineering",
        "Large Language Models",
      ],
      sameAs: [
        "https://www.linkedin.com/in/daniel-tremer/",
        "https://github.com/DanielTea",
        "https://x.com/TremerDaniel",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${CANONICAL}/#website`,
      url: CANONICAL,
      name: "Daniel Tremer Portfolio",
      description:
        "Professional portfolio showcasing AI, data science, and software engineering expertise.",
      inLanguage: "en",
      about: { "@id": `${CANONICAL}/#daniel-tremer` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased" style={{ background: "#EDEEF0", color: "#141518" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}

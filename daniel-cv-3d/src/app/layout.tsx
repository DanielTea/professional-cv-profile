import type { Metadata } from "next";
import "./globals.css";

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
  
  // Favicon and app icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  
  // Web App Manifest
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

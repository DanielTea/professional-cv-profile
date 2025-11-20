import type { Metadata } from "next";
import { Orbitron, Rajdhani, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-[var(--color-background)] text-[var(--color-text-main)] font-sans selection:bg-[var(--color-volt)] selection:text-black">
        {children}
      </body>
    </html>
  );
}

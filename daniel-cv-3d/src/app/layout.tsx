import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
      title: "Your Name - AI & Software Engineer",
  description: "Professional portfolio showcasing AI, data science, and software engineering expertise. Managing Director at control-f GmbH, former Porsche AG Data Science Specialist.",
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

# Daniel Tremer - Industrial Sci-Fi 3D Portfolio

A high-performance, immersive 3D portfolio website inspired by **Industrial Sci-Fi** and **Cyberpunk** aesthetics (reminiscent of Marathon/Bungie design). This interactive portfolio showcases Daniel Tremer's professional experience, skills, and projects through technical visualizations and "utilitarian" UI.

## 🚀 Features

- **System HUD UI**: Custom navigation bar with data tickers, time synchronization, and technical readouts.
- **3D Drone Recon**: Interactive "Project Database" where users pilot a drone to explore project holographic platforms.
- **Neural Network Skills**: Interactive 3D visualization of technical skills as connected nodes with tactical data analysis HUD.
- **Mission Log Experience**: A "Data Rail" timeline showcasing career history with encrypted/decrypted visual effects.
- **Global Presence**: Interactive 3D wireframe globe with real-time location tracking (Berlin HQ) and HUD overlay plus color-coded mission markers (Atlanta, Stuttgart, Bangkok, Tokyo).
- **GitHub Operations**: Live "Command Center" style GitHub integration with cache-busting contribution charts.
- **Industrial Aesthetic**:
  - **Volt Green (#DFFF00)** accent color.
  - **Chamfered Edges** and technical borders.
  - **Scanlines & Vignettes** for CRT/Terminal feel.
  - **Monospace Data** overlays.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (Turbopack) with TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **3D Helpers**: React Three Drei for utilities
- **Animations**: Framer Motion (for UI) & GSAP (for sequences)
- **Styling**: Tailwind CSS v4 (Theme: Industrial/Technical)
- **Fonts**: Orbitron (Display), Rajdhani (UI), JetBrains Mono (Data)
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd daniel-cv-3d
   ```

2. **Install dependencies** (using pnpm)
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗 Project Structure

```
daniel-cv-3d/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Main terminal entry
│   │   ├── layout.tsx            # Root layout with font loaders
│   │   └── globals.css           # Tailwind v4 & Global FX (Scanlines)
│   └── components/
│       ├── Hero3D.tsx            # "Command Center" Hero
│       ├── ExperienceTimeline.tsx # "Mission Log" Timeline
│       ├── WorldMap3D.tsx        # "Global Presence" Map
│       ├── SkillsVisualization.tsx # "Neural Network" Skills
│       ├── ProjectShowcase.tsx   # "Drone Recon" Game
│       ├── Navbar.tsx            # "System HUD" Navigation
│       ├── Loader.tsx            # Loading State
│       ├── CompanyAnimations.tsx # Animated Company Logos
│       └── ScrollHighlight.tsx   # Scroll Interaction Helper
├── public/
│   └── profile.webp              # Profile assets
└── README.md                     # Documentation
```

## 🎨 Visual Language: "Industrial Data"

- **Primary Color**: Volt Green (`#DFFF00`) - Used for active states, cursors, and critical data.
- **Background**: Deep Black (`#050505`) with technical grids.
- **Typography**:
  - Headers: *Orbitron* (Uppercase, Bold)
  - UI Elements: *Rajdhani* (Semi-condensed)
  - Data/Code: *JetBrains Mono*
- **Motifs**: Chamfered corners, wireframes, scanlines, data tickers.

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Deploy on Vercel** (Settings are auto-detected)

---
*System Status: ONLINE // End of File*

## Curiosity project blog

`/blog/` lists thirteen personal projects and public dashboard views, with topic filters and statically exported
articles at `/blog/[slug]/`. The profile includes a three-project introduction
and a link to the full collection. World, Maritime, US Indicators and US History
each have a dedicated article and a public dashboard link.

Edit `src/data/projects.ts` to maintain descriptions, source links, technology
labels and article sections. Reading times and category counts are derived from
that data. Images live in `public/images/projects/`; `SOURCES.md` records their
provenance. Give every new image accurate alt text, a caption, a source link and
the appropriate kind (screenshot, documentation, render or research figure).
The article gallery opens images in a native dialog (Escape to close).

The blog shares `src/components/blog/Blog.module.css`, follows the existing
profile palette, and supports `NEXT_PUBLIC_BASE_PATH` for subpath deployments.
Run `pnpm exec tsc --noEmit` and `pnpm build` to validate the static routes.

Project destinations are explicitly typed as a public repository or a public
dashboard. Dashboard entries contain only the live URL; never add private
repository names, URLs or source files to the blog data or image assets. The
public dashboard URLs are shared with the profile in `src/lib/worldData.ts`.

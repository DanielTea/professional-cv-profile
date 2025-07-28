# Daniel Tremer - 3D Portfolio

A stunning 3D portfolio website built with Next.js, Three.js, and modern web technologies. This interactive portfolio showcases Daniel Tremer's professional experience, skills, and projects through immersive 3D visualizations.

## 🚀 Features

- **3D Hero Section**: Interactive floating elements and animated profile display
- **Experience Timeline**: Navigate through career milestones in 3D space
- **Skills Visualization**: Interactive spheres representing technical expertise
- **Project Showcase**: Floating project cards with detailed information
- **Responsive Design**: Optimized for all devices and screen sizes
- **Smooth Animations**: Powered by Framer Motion and GSAP
- **Modern UI**: Glass morphism effects and gradient designs
- **Professional Typography**: Inter font for optimal screen readability

## 🛠 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **3D Graphics**: Three.js with React Three Fiber
- **3D Helpers**: React Three Drei for utilities
- **Animations**: Framer Motion & GSAP
- **Styling**: Tailwind CSS
- **Typography**: Inter font (variable font support)
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd daniel-cv-3d
   ```

2. **Install dependencies**
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
│   │   ├── page.tsx              # Main page component
│   │   ├── layout.tsx            # Root layout
│   │   └── globals.css           # Global styles
│   └── components/
│       ├── Hero3D.tsx            # 3D hero section
│       ├── ExperienceTimeline.tsx # Career timeline
│       ├── SkillsVisualization.tsx # Skills showcase
│       ├── ProjectShowcase.tsx   # Projects display
│       ├── Navbar.tsx            # Navigation component
│       └── Loader.tsx            # Loading component
├── public/
│   └── profile.jpg               # Profile image
├── vercel.json                   # Vercel configuration
└── README.md                     # Project documentation
```

## 🎨 Components Overview

### Hero3D
- Interactive 3D floating elements
- Animated profile section with image
- Smooth scroll indicators
- Glass morphism design

### ExperienceTimeline
- 3D timeline cards floating in space
- Interactive career milestones
- Detailed company and role information
- Smooth transitions between experiences

### SkillsVisualization
- Skill spheres sized by proficiency level
- Interactive category switching
- 3D skill representations with animations
- Detailed skill breakdowns

### ProjectShowcase
- Floating project cards in 3D space
- Project details with technologies used
- Status indicators and impact metrics
- Links to live projects

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js and configure build settings
   - The site will be deployed instantly

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard
   - Configure DNS settings as instructed

### Manual Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 🎮 Interactive Features

- **Mouse Controls**: Drag to rotate 3D scenes
- **Scroll Zoom**: Use scroll wheel to zoom in/out
- **Click Interactions**: Click on 3D elements for details
- **Smooth Navigation**: Animated transitions between sections
- **Responsive Touch**: Touch gestures on mobile devices

## 🔧 Customization

### Adding New Skills
Edit `src/components/SkillsVisualization.tsx`:
```typescript
const skillCategories = [
  {
    id: 1,
    name: "Your Category",
    icon: YourIcon,
    color: "#yourcolor",
    skills: [
      { name: "Skill Name", level: 90, position: [x, y, z] }
    ]
  }
]
```

### Adding New Projects
Edit `src/components/ProjectShowcase.tsx`:
```typescript
const projects = [
  {
    id: 1,
    title: "Project Title",
    category: "Category",
    description: "Project description...",
    technologies: ["Tech1", "Tech2"],
    // ... other properties
  }
]
```

### Updating Experience
Edit `src/components/ExperienceTimeline.tsx`:
```typescript
const experiences = [
  {
    id: 1,
    company: "Company Name",
    role: "Your Role",
    period: "Date Range",
    // ... other properties
  }
]
```

## 🔤 Typography

This portfolio uses [Inter](https://github.com/rsms/inter), a high-quality typeface specifically designed for computer screens and used by companies like Mozilla, NASA, and Figma.

**Inter Font Benefits:**
- **Screen Optimized**: Designed specifically for digital interfaces
- **Variable Font**: Supports full weight spectrum (100-900) with optimal performance
- **Enhanced Readability**: Tall x-height for better mixed-case and lowercase text readability
- **OpenType Features**: Contextual alternates, slashed zero, tabular numbers
- **Professional Grade**: Used by leading tech companies and design systems

**Implementation:**
- Loaded from the official Inter CDN for optimal performance
- Variable font support with fallbacks for older browsers
- Enabled ligatures and contextual alternates for enhanced typography
- Consistent typography across all UI components and 3D text elements

## 📱 Performance Optimization

- **Dynamic Imports**: Components loaded only when needed
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic bundle optimization
- **3D Optimization**: Efficient Three.js rendering
- **Responsive Loading**: Adaptive loading based on device

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers with WebGL support

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About Daniel Tremer

Daniel Tremer is a Managing Director at control-f GmbH, with over 10 years of experience in AI, machine learning, and software development. He has worked with leading companies like Porsche AG, Mercedes-Benz, and founded multiple AI ventures.

**Connect with Daniel:**
- 🌐 Website: [danieltremer.com](https://danieltremer.com)
- 💼 LinkedIn: [daniel-tremer](https://www.linkedin.com/in/daniel-tremer/)
- 🐙 GitHub: [DanielTea](https://github.com/DanielTea)
- 📧 Email: info@danieltremer.com

---

Built with ❤️ using Next.js, Three.js, and modern web technologies.

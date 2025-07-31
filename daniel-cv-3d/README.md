# Daniel Tremer - 3D Portfolio

A stunning 3D portfolio website built with Next.js, Three.js, and modern web technologies. This interactive portfolio showcases Daniel Tremer's professional experience, skills, and projects through immersive 3D visualizations.

## 🚀 Features

- **3D Hero Section**: Interactive floating elements and animated profile display
- **GitHub Integration**: Real-time contribution chart and featured projects showcase
- **Experience Timeline**: Navigate through career milestones in 3D space
- **Skills Visualization**: Interactive spheres representing technical expertise
- **Interactive Platformer Game**: 2D-style game built with Three.js where users control a character to explore projects
- **Game-Based Project Showcase**: Jump into project panels to discover detailed information
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
- GitHub contribution chart integration
- Featured projects showcase with links
- Interactive project icons with hover effects
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

### ProjectShowcase (Interactive Platformer Game)
- **2D Platformer Game**: Control a character using arrow keys or WASD
- **Super Mario-style Physics**: Jump mechanics with gravity and ground collision
- **Project Platform Discovery**: Jump into project panels to view detailed information
- **Real-time Collision Detection**: Character interacts with project cards automatically
- **Game Controls**: Arrow keys/WASD for movement, Space/Up Arrow/W for jumping
- **Character Animation**: Animated game character with visual effects
- **3D Game Environment**: Ground platforms and background elements in 3D space
- **Seamless Integration**: Game mechanics smoothly integrated with project information display

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

## 🐙 GitHub Integration

The hero section features live GitHub integration that showcases Daniel's development activity:

### Contribution Chart
- **GitHub Green Theme**: Authentic GitHub-style contribution chart using original green (#239a3b) colors
- **Cache Busting**: URL cache busting with hourly refresh for up-to-date contribution data
- **Real-time Stats**: Dynamic stats widget showing contributions, stars, repos, and followers
- **GitHub API Integration**: Live data fetched from GitHub's public API for accurate statistics
- **Enhanced Styling**: Optimized brightness and contrast for dark theme compatibility
- **Perfect Fit**: Responsive design that scales perfectly on all devices

> **Note**: Chart refreshes hourly with cache busting. Stats are fetched from GitHub's public API. Private contributions are not visible due to API limitations.

### Featured Projects
- **rage-analytics**: Twitch Streamers Emotion Analysis - Original university project (16 ⭐, 5 🔀)
- **browser-use**: Make websites accessible for AI agents - Major open source contribution (66.6k ⭐, 7.7k 🔀)
- **generative-agents**: Interactive Human Behavior Simulacra - AI research contribution (979 ⭐, 162 🔀)
- **autoresearcher**: Automating scientific workflows with AI - Research automation tool (385 ⭐, 39 🔀)

### Features
- **Responsive Design**: Adapts to all screen sizes
- **Hover Effects**: Interactive project cards with scale animations
- **Direct Links**: Click any project to visit the GitHub repository
- **Technology Tags**: Shows primary language and star counts
- **Glass Morphism**: Consistent styling with the overall design theme

### Technical Implementation
- **Chart Service**: Uses [ghchart.rshah.org](https://ghchart.rshah.org) with GitHub's original green theme (#239a3b)
- **Cache Busting**: Client-side only URL parameters with timestamps for fresh data (hourly refresh)
- **SSR Compatibility**: Avoids hydration mismatches by initializing cache busting only on client side
- **GitHub API**: Real-time data fetching from GitHub's public REST API
- **React State Management**: useState and useEffect for dynamic stat updates
- **Error Handling**: Graceful fallbacks with skeleton loading states
- **Performance Optimization**: Lazy loading, efficient re-rendering, and minimal API calls

### Stats Widget Features
- **Live Data**: Fetches user stats, repository data, and star counts in real-time
- **Four Key Metrics**: Contributions, Total Stars, Public Repos, and Followers
- **Loading States**: Animated skeleton placeholders during data fetch
- **Responsive Grid**: Clean 4-column layout with proper spacing
- **Auto-refresh**: Hourly chart updates with maintained state persistence

## 🎮 Interactive Features

- **Platformer Game Controls**: Arrow keys or WASD for character movement
- **Jump Mechanics**: Space, Up Arrow, or W key for jumping with Super Mario-style physics
- **Mouse Controls**: Drag to rotate 3D scenes
- **Scroll Zoom**: Use scroll wheel to zoom in/out
- **Game Collision Detection**: Character automatically interacts with project panels
- **Click Interactions**: Click on 3D elements for details
- **GitHub Navigation**: Direct links to repositories and profile
- **Smooth Navigation**: Animated transitions between sections
- **Responsive Touch**: Touch gestures on mobile devices
- **Real-time Game Physics**: Gravity, friction, and boundary constraints

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
    position: [x, y, z] as [number, number, number], // Position in 3D game space
    // ... other properties
  }
]
```

### Customizing Game Mechanics
Edit `src/components/ProjectShowcase.tsx` to adjust game physics:
```typescript
// Game physics constants
const GRAVITY = -0.02          // Falling speed
const JUMP_FORCE = 0.4         // Jump strength  
const MOVE_SPEED = 0.15        // Character movement speed
const GROUND_Y = -3.5          // Ground level

// Collision detection distance
if (distance < 2.5) {          // Adjust collision sensitivity
  onCollision(project.id)
}
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

### Customizing GitHub Integration
Edit `src/components/Hero3D.tsx` to update GitHub information:

1. **Update GitHub Username**:
   ```typescript
   // Update both the chart URL and API calls
   src={`https://ghchart.rshah.org/239a3b/YOUR_USERNAME?cache=${chartKey}`}
   
   // Also update the API endpoints
   const userResponse = await fetch('https://api.github.com/users/YOUR_USERNAME')
   const reposResponse = await fetch('https://api.github.com/users/YOUR_USERNAME/repos?per_page=100')
   ```

2. **Customize Chart Theme**:
   ```typescript
   // GitHub's original green (current): 239a3b
   // Other popular options:
   // - GitHub dark green: 0d1117
   // - Blue theme: 2196F3  
   // - Purple theme: 8b5cf6
   // - Custom colors: any hex without #
   src={`https://ghchart.rshah.org/YOUR_COLOR/USERNAME?cache=${chartKey}`}
   ```

3. **Modify Stats Display**:
   ```typescript
   // Customize which stats to show in GitHubStatsWidget
   <div className="text-center">
     <div className="text-white font-semibold text-sm">{stats.yourCustomStat}</div>
     <div className="text-white/60 text-xs">Your Label</div>
   </div>
   ```

4. **Adjust Refresh Intervals**:
   ```typescript
   // Change chart refresh frequency (currently 1 hour)
   const interval = setInterval(() => {
     setChartKey(Date.now())
   }, 30 * 60 * 1000) // 30 minutes
   ```

5. **Update Featured Projects**:
   ```typescript
   // Update project links and information
   <motion.a href="https://github.com/YourUsername/your-repo">
   ```

6. **Customize Fallback Data**:
   ```typescript
   // Update fallback stats in case API fails
   setStats({
     totalContributions: YOUR_ESTIMATED_CONTRIBUTIONS,
     totalStars: YOUR_TOTAL_STARS,
     publicRepos: YOUR_REPO_COUNT,
     followers: YOUR_FOLLOWER_COUNT
   })
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

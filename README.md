# 🌌 Dev Multiverse - Nishit Bhardwaj's Portfolio

A futuristic, terminal-based portfolio website featuring an immersive galaxy theme with dual UI modes (Lumina & Nebula), interactive multiverse routing, and stunning animations.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.13-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

### 🎨 Dual Theme System
- **Lumina UI**: Bright, vibrant theme with cyan and pink accents
- **Nebula UI**: Dark, mysterious theme with purple and violet tones
- Seamless theme switching with smooth transitions
- Theme persistence across sessions

### 🖥️ Interactive Terminal
- Full-featured command-line interface
- Auto-completion and command history
- Custom ASCII art and animations
- Real-time command execution

### 🚀 Multiverse Navigation
- **Story Universe**: Personal journey and background
- **Mission Control**: Professional goals and objectives
- **Game Universe**: Interactive experiences
- **Mind Map**: Visual knowledge representation
- **API Documentation**: Technical documentation hub
- **Projects**: Portfolio showcase
- **Resume**: Professional experience
- **Contact**: Get in touch

### 🎭 Advanced UI/UX
- Smooth page transitions with Framer Motion
- Lottie animations for enhanced interactivity
- Responsive design for all devices
- Glassmorphism effects
- Dynamic gradient backgrounds
- Particle effects and animations

### 🤖 AI Chatbot
- Intelligent assistant for navigation
- Context-aware responses
- Floating chat interface
- Always accessible from any page


## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/NishitBhardwaj/My-Portfolio.git
cd My-Portfolio
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to explore the multiverse.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 🌌 Terminal Commands

| Command | Action |
|---------|--------|
| `help` | Display available commands |
| `story` | Navigate to Story Universe |
| `mission` | Navigate to Mission Control |
| `game` | Navigate to Game Universe |
| `map` | Navigate to Mind Map |
| `api` | Navigate to API Docs |
| `projects` | Display project portfolio |
| `about` | Show about information with avatar |
| `skills` | Display skills & technologies |
| `contact` | Open contact modal |
| `github` | Open GitHub in new tab |
| `resume` | Download resume PDF |
| `clear` | Clear terminal screen |
| `theme` | Toggle between Lumina and Nebula themes |

## 🎨 Theme Configuration

### Lumina Theme
- **Primary**: Cyan (#23f3ff)
- **Secondary**: Pink (#ff00e6)
- **Background**: Light gradients
- **Text**: Dark tones

### Nebula Theme
- **Primary**: Violet (#9d4edd)
- **Secondary**: Purple (#7209b7)
- **Background**: Dark galaxy (#2b0a3d → #0c2340)
- **Text**: Light tones with neon accents

## 📁 Project Structure

```
My-Portfolio/
├── public/
│   ├── resume.pdf          # Resume document
│   └── robots.txt          # SEO configuration
├── src/
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── api-docs/       # API documentation page
│   │   ├── contact/        # Contact page
│   │   ├── game/           # Game universe page
│   │   ├── map/            # Mind map page
│   │   ├── mission/        # Mission control page
│   │   ├── projects/       # Projects showcase
│   │   ├── resume/         # Resume page
│   │   ├── story/          # Story universe page
│   │   ├── terminal/       # Terminal interface
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── sitemap.ts      # Sitemap generation
│   ├── components/         # React components
│   └── lib/               # Utilities and constants
├── .eslintrc.js           # ESLint configuration
├── .gitignore             # Git ignore rules
├── next.config.mjs        # Next.js configuration
├── package.json           # Dependencies
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── vercel.json            # Vercel deployment config
```

## 🛠️ Tech Stack

### Core Framework
- **Next.js 16.1.1** - React framework with App Router and Turbopack
- **React 18.3.1** - UI library
- **TypeScript 5.6.3** - Type-safe JavaScript

### Styling & Animation
- **Tailwind CSS 3.4.13** - Utility-first CSS framework
- **Framer Motion 11.11.0** - Animation library
- **Lottie React 2.4.0** - Lottie animation support

### Additional Libraries
- **React Flow 11.11.4** - Interactive node-based graphs
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 🌐 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com):

1. **Push to GitHub**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. **Deploy to Vercel**
- Connect your GitHub repository to Vercel
- Vercel will automatically detect Next.js and configure the build
- Your site will be live at `https://your-project.vercel.app`

### Environment Variables
No environment variables are required for the basic setup.

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Laptops (1024px and up)
- 🖥️ Desktops (1280px and up)
- 🖥️ Large screens (1536px and up)

## 🎯 Performance

- ⚡ Turbopack for ultra-fast development builds
- 🚀 Optimized production builds with Next.js
- 📦 Code splitting and lazy loading
- 🖼️ Image optimization
- 🎨 CSS optimization with Tailwind

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/NishitBhardwaj/My-Portfolio/issues).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nishit Bhardwaj**

- GitHub: [@NishitBhardwaj](https://github.com/NishitBhardwaj)
- Portfolio: [Dev Multiverse](https://your-portfolio-url.vercel.app)

## 🙏 Acknowledgments

- Inspired by terminal-based interfaces and sci-fi aesthetics
- Built with modern web technologies
- Special thanks to the open-source community

---

<div align="center">
  <strong>Built with 💜 by Nishit Bhardwaj</strong>
  <br>
  <em>Exploring the multiverse, one commit at a time</em>
</div>

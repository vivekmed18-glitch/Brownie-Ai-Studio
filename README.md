# 🎬 brownieAI Studio

> **High-Craft AI Short-Form Video & Subtitle Editing Suite**  
> *Engineered with Vercel & Linear design craft density for short-form creators, podcasters, and video editors.*

---

## ✨ Overview

**brownieAI Studio** is a browser-based AI video captions and short-form editing suite built with **React 18**, **TypeScript**, and **Tailwind CSS**. It provides word-level transcript sync, customizable animated caption presets, dynamic aspect ratios, AI thumbnail generator hooks, and subtitle exporters (.SRT and millisecond JSON).

---

## 🔥 Key Features & Design Craft

- **🎨 Engineered Dark Depth UI**: Built on a 4-layer dark surface system (`#0A0A0B` app background, `#141416` glass panels, `#1C1C1F` elevated cards, and `rgba(255,255,255,0.06)` translucent hairlines).
- **⏱️ Tabular Monospace Timecodes**: High-precision tabular typography (`tabular-nums`) for timestamps across transcript editors and video player scrub bars.
- **✨ Signature Word-Chip Micro-Interactions**: Interactive word chips with hover scaling (`scale-[1.03]`), custom emphasis toggle, and an animated underline sweep (`@keyframes sweepUnderline`) synced to live video playback.
- **🏷️ Caption Style Presets**:
  - **Hormozi Kinetic**: Dynamic active word scale with glowing highlight background.
  - **Minimal Clean**: Subtitle overlay with clean typography.
  - **Neon Pop**: Bold neon border and drop-shadow animation.
  - **Box Highlight**: Rounded translucent highlight box behind active captions.
- **🖼️ AI Thumbnail Generator**: Instant hook generator and split-screen face swapper.
- **🛠️ Exporter Suite**: Export formatted `.SRT` files and raw millisecond JSON timestamp payloads.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vivekmed18-glitch/Brownie-Ai-Studio.git

# 2. Navigate into directory
cd Brownie-Ai-Studio

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Build for Production

```bash
# Type check and generate production bundle
npm run build

# Preview production build locally
npm run preview
```

Output files will be generated in the `dist/` directory, ready for deployment on GitHub Pages, Vercel, or Netlify.

---

## 🛠️ Project Structure

```text
brownie-ai-studio/
├── public/                 # Static media assets & sample video
├── src/
│   ├── components/         # React workspace components
│   │   ├── Header.tsx           # Machined header navigation & CTAs
│   │   ├── VideoStage.tsx       # Interactive HTML5 video canvas player
│   │   ├── TranscriptEditor.tsx # Word-level transcript chip matrix
│   │   ├── StylePicker.tsx      # Subtitle style preset customizer
│   │   ├── ThumbnailMaker.tsx   # AI thumbnail & hook generator
│   │   └── ToolsSuite.tsx       # Watermark cleaner & SRT exporter
│   ├── data/               # Preset definitions & initial transcript
│   ├── styles/             # Global CSS & Tailwind utilities
│   ├── types/              # TypeScript declarations
│   └── App.tsx             # Main workspace orchestrator
├── tailwind.config.js      # Custom theme color tokens & hairlines
├── vite.config.ts          # Vite build configuration
└── package.json            # Project dependencies & scripts
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Made with ❤️ by <strong>Vivek Medepalli</strong>
</p>

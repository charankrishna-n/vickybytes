# StreamVault — Live Event Streaming Platform




A modern live event streaming platform built with Next.js and React. Browse, search, and watch live and upcoming events across Tech, Music, and Gaming categories — with a real-time simulated live chat experience.

---

## Project Overview

StreamVault is a frontend-only streaming platform UI that includes:

- **Landing page** with a hero carousel, live events banner, and filterable event grid
- **Stream page** with a video player, event details, and a live chat panel
- **Live chat** with simulated incoming messages, emoji reactions, and auto-scroll
- **Responsive layout** that works across mobile, tablet, and desktop
- **Dark mode** design with glassmorphism effects and smooth animations

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework & routing |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations & transitions |
| Lucide React | Icons |
| Radix UI | Headless UI primitives |
| shadcn/ui | Component library |
| Google Fonts (Inter, Syne) | Typography |

---

## Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/StreamVault_Live.git

# 2. Navigate into the project
cd StreamVault_Live

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## Deployment Link

> https://vickybytes-one.vercel.app/

---

## Project Structure

```
StreamVault_Live/
├── app/
│   ├── globals.css       # Global styles & CSS variables
│   ├── layout.tsx        # Root layout with fonts
│   └── page.tsx          # Main page (all components)
├── components/
│   └── ui/               # shadcn/ui components
├── hooks/
│   └── use-mobile.ts     # Mobile detection hook
├── lib/
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

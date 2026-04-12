"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  Share2,
  Play,
  Users,
  Flame,
  Cpu,
  Music2,
  Gamepad2,
  Radio,
  X,
  Send,
  ChevronRight,
  Star,
  Eye,
  Bell,
  ArrowLeft,
  Volume2,
  Maximize2,
  Settings,
  ThumbsUp,
  Bookmark,
  TrendingUp,
  Calendar,
  Globe,
  Shield,
  Menu,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  viewers: string;
  image: string;
  tags: string[];
  isLive: boolean;
  host: string;
  duration: string;
  rating: number;
  description: string;
  color: string;
}

interface ChatMessage {
  id: number;
  user: string;
  avatar: string;
  message: string;
  time: string;
  color: string;
  badge?: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const EVENTS: Event[] = [
  {
    id: 1, title: "Next.js Conf 2026 — The Future of Web", category: "Tech",
    date: "Jan 15, 2026", viewers: "142K",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    tags: ["Next.js", "React", "Web"], isLive: true, host: "Vercel Team",
    duration: "3h 20m", rating: 4.9,
    description: "The biggest web development conference of 2026. Explore the latest in server components, edge computing, and AI-powered development.",
    color: "from-violet-600 to-indigo-600",
  },
  {
    id: 2, title: "Coachella Valley Music & Arts 2026", category: "Music",
    date: "Apr 10, 2026", viewers: "2.1M",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80",
    tags: ["Festival", "Live Music", "Art"], isLive: true, host: "Goldenvoice",
    duration: "8h", rating: 5.0,
    description: "The iconic music and arts festival returns with a lineup of the world's biggest artists across multiple stages.",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 3, title: "World Championship — Valorant Masters", category: "Gaming",
    date: "Feb 28, 2026", viewers: "890K",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    tags: ["Esports", "FPS", "Competitive"], isLive: false, host: "Riot Games",
    duration: "5h 45m", rating: 4.8,
    description: "Top esports teams compete in the pinnacle of tactical FPS competition for a $1M prize pool.",
    color: "from-rose-500 to-red-600",
  },
  {
    id: 4, title: "AI Summit: Building Tomorrow's Intelligence", category: "Tech",
    date: "Mar 5, 2026", viewers: "310K",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    tags: ["AI", "ML", "GPT"], isLive: true, host: "OpenAI",
    duration: "2h 10m", rating: 4.7,
    description: "Industry leaders discuss the trajectory of artificial intelligence, large language models, and ethical AI development.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 5, title: "Global EDM Night — Tomorrowland Digital", category: "Music",
    date: "Jan 22, 2026", viewers: "1.4M",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    tags: ["EDM", "Festival", "Dance"], isLive: false, host: "Tomorrowland",
    duration: "6h", rating: 4.9,
    description: "Experience the world's most iconic electronic music festival from the comfort of your home in immersive 4K quality.",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 6, title: "Minecraft Live: The Deep Dark Update", category: "Gaming",
    date: "Jan 30, 2026", viewers: "560K",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
    tags: ["Minecraft", "Mojang", "Sandbox"], isLive: false, host: "Mojang Studios",
    duration: "1h 45m", rating: 4.6,
    description: "Mojang reveals the most ambitious Minecraft update yet, bringing entirely new biomes and mechanics to the beloved game.",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 7, title: "SpaceX Starship — Mars Mission Briefing", category: "Tech",
    date: "Feb 14, 2026", viewers: "4.2M",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
    tags: ["Space", "SpaceX", "Mars"], isLive: false, host: "SpaceX",
    duration: "2h 30m", rating: 5.0,
    description: "Elon Musk and the SpaceX team reveal the detailed mission plan for humanity's first crewed Mars landing.",
    color: "from-slate-600 to-zinc-700",
  },
  {
    id: 8, title: "Jazz Fusion Night — Blue Note Sessions", category: "Music",
    date: "Jan 18, 2026", viewers: "78K",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    tags: ["Jazz", "Live", "Acoustic"], isLive: true, host: "Blue Note Records",
    duration: "3h", rating: 4.8,
    description: "World-class jazz musicians perform intimate live sets in one of New York's most storied venues.",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: 9, title: "League of Legends Worlds 2026 Finals", category: "Gaming",
    date: "Nov 15, 2026", viewers: "5.7M",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    tags: ["LoL", "Esports", "MOBA"], isLive: false, host: "Riot Games",
    duration: "4h 20m", rating: 5.0,
    description: "The championship match of the world's most-watched esports tournament, with teams from 14 regions competing for glory.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 10, title: "Apple WWDC 2026 — Developer Keynote", category: "Tech",
    date: "Jun 9, 2026", viewers: "1.8M",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    tags: ["Apple", "iOS", "macOS"], isLive: false, host: "Apple Inc.",
    duration: "2h", rating: 4.9,
    description: "Apple unveils the next generation of iOS, macOS, and visionOS with groundbreaking AI features and design updates.",
    color: "from-gray-500 to-slate-600",
  },
  {
    id: 11, title: "BTS World Tour: Beyond The Stars", category: "Music",
    date: "Mar 20, 2026", viewers: "7.3M",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
    tags: ["K-Pop", "Concert", "World Tour"], isLive: false, host: "HYBE Labels",
    duration: "3h 30m", rating: 5.0,
    description: "BTS returns with their most spectacular live show ever, featuring never-before-seen staging and an emotional farewell set.",
    color: "from-fuchsia-500 to-purple-600",
  },
  {
    id: 12, title: "Cyberpunk 2077 — Game of the Decade Awards", category: "Gaming",
    date: "Dec 10, 2026", viewers: "2.9M",
    image: "https://images.unsplash.com/photo-1535223289429-462029a86948?w=800&q=80",
    tags: ["Awards", "Gaming", "RPG"], isLive: false, host: "The Game Awards",
    duration: "4h", rating: 4.7,
    description: "The gaming industry's most prestigious awards ceremony, celebrating the best games, developers, and moments of the decade.",
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: 13, title: "Blockchain & Web3 Summit 2026", category: "Tech",
    date: "Apr 25, 2026", viewers: "220K",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    tags: ["Web3", "Crypto", "DeFi"], isLive: true, host: "Consensus",
    duration: "6h", rating: 4.5,
    description: "The leading blockchain conference brings together developers, investors, and regulators to shape the future of the decentralized web.",
    color: "from-orange-500 to-amber-600",
  },
  {
    id: 14, title: "Summer Solstice — Ambient Live Set", category: "Music",
    date: "Jun 21, 2026", viewers: "45K",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=80",
    tags: ["Ambient", "Electronic", "Chill"], isLive: true, host: "Nils Frahm",
    duration: "2h 15m", rating: 4.9,
    description: "Acclaimed composer Nils Frahm performs a specially crafted ambient live set to celebrate the longest day of the year.",
    color: "from-sky-400 to-blue-500",
  },
  {
    id: 15, title: "Fortnite OG — Battle Royale Championship", category: "Gaming",
    date: "May 5, 2026", viewers: "1.2M",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    tags: ["Fortnite", "Battle Royale", "Epic"], isLive: false, host: "Epic Games",
    duration: "8h", rating: 4.6,
    description: "The world's top Fortnite players compete in the original OG season format for a $10 million prize pool.",
    color: "from-violet-500 to-purple-600",
  },
];

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 1, user: "CosmicViewer", avatar: "C", message: "🔥 This stream is absolutely fire!", time: "2:41 PM", color: "from-violet-500 to-purple-600", badge: "Mod" },
  { id: 2, user: "TechEnthusiast", avatar: "T", message: "The production quality is insane, loving every second of this", time: "2:41 PM", color: "from-blue-500 to-cyan-500" },
  { id: 3, user: "StreamQueen", avatar: "S", message: "First time watching and I'm already hooked! ✨", time: "2:42 PM", color: "from-pink-500 to-rose-500", badge: "New" },
  { id: 4, user: "GlitchHunter", avatar: "G", message: "Can we get a clip of that last segment?? 👀", time: "2:42 PM", color: "from-green-500 to-emerald-500" },
  { id: 5, user: "QuantumPulse", avatar: "Q", message: "Been watching for 3 hours straight, worth every minute", time: "2:43 PM", color: "from-amber-500 to-orange-500" },
  { id: 6, user: "NebulaChild", avatar: "N", message: "PogChamp PogChamp PogChamp", time: "2:43 PM", color: "from-teal-500 to-cyan-600", badge: "Sub" },
  { id: 7, user: "ByteRider", avatar: "B", message: "This is legitimately one of the best live events I've watched all year", time: "2:44 PM", color: "from-indigo-500 to-blue-600" },
  { id: 8, user: "VoidWalker", avatar: "V", message: "🎉🎉🎉 Let's gooo!", time: "2:44 PM", color: "from-fuchsia-500 to-violet-600" },
];

const SIMULATED_MESSAGES = [
  { user: "StarDust99", message: "Holy moly this is incredible 🤯", color: "from-yellow-500 to-amber-600" },
  { user: "NeonKnight", message: "The hype is real! 🔥", color: "from-red-500 to-pink-600" },
  { user: "PixelWizard", message: "Best stream of 2026 no cap", color: "from-cyan-500 to-blue-600" },
  { user: "DataPhoenix", message: "Just shared this with my whole team", color: "from-green-500 to-teal-600" },
  { user: "EchoPrime", message: "LFG!!!! 🚀🚀🚀", color: "from-violet-500 to-indigo-600" },
  { user: "ZeroGravity", message: "Absolutely surreal quality here", color: "from-pink-500 to-fuchsia-600" },
  { user: "CoreShift", message: "Been waiting weeks for this 💜", color: "from-indigo-500 to-purple-600" },
  { user: "TurboStream", message: "The visuals alone make it worth it", color: "from-orange-500 to-red-600" },
];

const CATEGORIES = [
  { id: "all", label: "Trending", icon: TrendingUp },
  { id: "Tech", label: "Tech", icon: Cpu },
  { id: "Music", label: "Music", icon: Music2 },
  { id: "Gaming", label: "Gaming", icon: Gamepad2 },
];

// ─── Skeleton Card ────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-card animate-pulse">
      <div className="aspect-video bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded-lg w-3/4" />
        <div className="h-3 bg-muted rounded-lg w-1/2" />
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded-full w-16" />
          <div className="h-6 bg-muted rounded-full w-12" />
        </div>
      </div>
    </div>
  );
}

// ─── Live Badge ───────────────────────────────────────────────────────────────

function LiveBadge() {
  return (
    <span className="flex items-center gap-1.5 bg-live/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg flex-shrink-0">
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
      LIVE
    </span>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────
// On mobile/touch: action buttons always visible. On desktop: revealed on hover.

function EventCard({ event, onWatch, index }: { event: Event; onWatch: (e: Event) => void; index: number }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareTooltip, setShareTooltip] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden border border-border bg-card card-hover cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
        <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

        {/* Top-left badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
          {event.isLive && <LiveBadge />}
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-full">
            <Eye className="w-3 h-3" />
            {event.viewers}
          </span>
        </div>

        {/* Action buttons:
            - Mobile: always visible (opacity-100)
            - Desktop: shown on hover (opacity-0 → group-hover:opacity-100) */}
        <div className="absolute top-2.5 right-2.5 flex gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 active:scale-90
              ${liked ? "bg-rose-500 text-white shadow-lg shadow-rose-500/40" : "bg-black/60 text-white/80"}`}
          >
            <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${liked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 transition-all duration-200 active:scale-90
              ${bookmarked ? "bg-brand text-white shadow-lg shadow-brand/40" : "bg-black/60 text-white/80"}`}
          >
            <Bookmark className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${bookmarked ? "fill-current" : ""}`} />
          </button>
          <div className="relative">
            <button
              onClick={handleShare}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 text-white/80 transition-all duration-200 active:scale-90"
            >
              <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <AnimatePresence>
              {shareTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute right-0 top-9 bg-card border border-border text-xs text-foreground px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-10"
                >
                  Link copied! ✓
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Duration pill */}
        <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-0.5 rounded-md">
          {event.duration}
        </div>

        {/* Watch Now overlay — desktop hover only (touch users tap the card directly) */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={() => onWatch(event)}
            className={`flex items-center gap-2 bg-gradient-to-r ${event.color} text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-2xl
              transform scale-90 group-hover:scale-100 transition-all duration-300 hover:brightness-110 active:scale-95`}
          >
            <Play className="w-4 h-4 fill-current" />
            Watch Now
          </button>
        </div>
      </div>

      {/* Card body — tappable on mobile to open stream */}
      <div className="p-3 sm:p-4 space-y-2.5" onClick={() => onWatch(event)}>
        {/* Host row */}
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center text-white text-[9px] sm:text-[10px] font-bold flex-shrink-0`}>
            {event.host[0]}
          </div>
          <span className="text-xs text-muted-foreground truncate">{event.host}</span>
          <div className="ml-auto flex items-center gap-0.5 text-amber-400 flex-shrink-0">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-medium text-foreground">{event.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xs sm:text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        {/* Date + category */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            {event.date}
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 flex-shrink-0" />
            {event.category}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {event.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
              {tag}
            </span>
          ))}
        </div>

        {/* Mobile-only Watch Now button (always visible on small screens) */}
        <button
          onClick={(e) => { e.stopPropagation(); onWatch(event); }}
          className={`sm:hidden w-full flex items-center justify-center gap-2 bg-gradient-to-r ${event.color} text-white font-semibold text-xs py-2 rounded-xl shadow-lg active:scale-95 transition-transform`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Watch Now
        </button>
      </div>
    </motion.div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
// Mobile: hamburger-style collapsed. Tablet+: search bar always visible.

function Navbar({ searchQuery, onSearch, onHomeClick }: {
  searchQuery: string;
  onSearch: (q: string) => void;
  onHomeClick: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close notifications when clicking outside
  const notifRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass-strong shadow-2xl shadow-black/30" : "bg-transparent"}`}>
      <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 sm:h-16 gap-2 sm:gap-4">

          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="sm:hidden w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground flex-shrink-0"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Search bar — always visible on sm+ */}
          <div className="hidden sm:flex flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search events, artists, games..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-sm rounded-xl bg-muted/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all duration-200"
              />
              {searchQuery && (
                <button onClick={() => onSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Notification */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative w-9 h-9 rounded-xl glass border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-brand/30 transition-all duration-200"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-live rounded-full" />
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 8 }}
                    /* Right-align but clamp so it never overflows viewport on mobile */
                    className="absolute right-0 top-12 w-[calc(100vw-2rem)] max-w-xs sm:w-72 glass-strong border border-border rounded-2xl shadow-2xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Notifications</span>
                      <span className="text-xs bg-brand/20 text-brand-foreground px-2 py-0.5 rounded-full">3 new</span>
                    </div>
                    {[
                      { icon: Radio, text: "BTS World Tour goes LIVE in 2h", sub: "Music · 2 hours ago", color: "text-fuchsia-400" },
                      { icon: Gamepad2, text: "Valorant Masters Finals starting soon", sub: "Gaming · 4 hours ago", color: "text-rose-400" },
                      { icon: Cpu, text: "Apple WWDC keynote reminder set", sub: "Tech · 1 day ago", color: "text-blue-400" },
                    ].map((n, i) => (
                      <div key={i} className="flex gap-3 p-2 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                        <n.icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${n.color}`} />
                        <div>
                          <p className="text-xs font-medium text-foreground">{n.text}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{n.sub}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar / home */}
            <button
              onClick={onHomeClick}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-stream flex items-center justify-center text-white text-sm font-bold hover:scale-105 transition-transform active:scale-95"
            >
              A
            </button>
          </div>
        </div>

        {/* Mobile expandable search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="sm:hidden overflow-hidden pb-3"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search events, artists, games..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl bg-muted/80 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
                />
                {searchQuery && (
                  <button onClick={() => onSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

// ─── Chat Box ─────────────────────────────────────────────────────────────────

function ChatBox({ event }: { event: Event }) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [viewerCount, setViewerCount] = useState(parseInt(event.viewers) || 142000);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgCounterRef = useRef(100);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg = SIMULATED_MESSAGES[Math.floor(Math.random() * SIMULATED_MESSAGES.length)];
      setMessages((prev) => [...prev.slice(-50), {
        id: msgCounterRef.current++,
        user: randomMsg.user,
        avatar: randomMsg.user[0],
        message: randomMsg.message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        color: randomMsg.color,
      }]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount((prev) => Math.max(100, prev + Math.floor((Math.random() - 0.3) * 200)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev.slice(-50), {
      id: msgCounterRef.current++,
      user: "You", avatar: "Y",
      message: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      color: "from-brand to-stream",
      badge: "You",
    }]);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="flex flex-col h-full glass-strong border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-live rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-foreground">Live Chat</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span className="font-medium text-foreground">{viewerCount.toLocaleString()}</span>
          <span className="hidden xs:inline">watching</span>
        </div>
      </div>

      {/* Messages — flex-1 + min-h-0 ensures it fills available space and scrolls */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin px-3 py-3 space-y-2">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex gap-2 group"
            >
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${msg.color} flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 mt-0.5`}>
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <span className="text-xs font-semibold text-foreground">{msg.user}</span>
                  {msg.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0
                      ${msg.badge === "Mod" ? "bg-stream/20 text-stream" :
                        msg.badge === "Sub" ? "bg-brand/20 text-brand" :
                        msg.badge === "You" ? "bg-primary/20 text-primary" :
                        "bg-muted text-muted-foreground"}`}>
                      {msg.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed break-words">{msg.message}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick reactions */}
      <div className="px-3 py-2 border-t border-border flex gap-2 flex-wrap flex-shrink-0">
        {["🔥", "❤️", "👏", "🎉", "😮", "💜"].map((emoji) => (
          <button key={emoji} onClick={() => setInput((p) => p + emoji)} className="text-base hover:scale-125 transition-transform duration-150 active:scale-90 touch-manipulation">
            {emoji}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-border flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Say something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            maxLength={200}
            className="flex-1 min-w-0 text-sm px-3 py-2 rounded-xl bg-muted/60 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand/50 transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-stream flex items-center justify-center text-white shadow-lg shadow-brand/30 flex-shrink-0 transition-all duration-200 hover:scale-105 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 touch-manipulation"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Video Player ─────────────────────────────────────────────────────────────

function VideoPlayer({ event }: { event: Event }) {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showControls, setShowControls] = useState(true);

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-black/60 group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !playing && setShowControls(true)}
      onClick={() => setShowControls(true)}
    >
      {/* Player */}
      <div className="relative aspect-video bg-black">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-10`} />
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.3) 2px,rgba(0,0,0,0.3) 4px)" }} />

        {/* Center play */}
        <AnimatePresence>
          {!playing && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setPlaying(true)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-2xl glow-brand hover:scale-110 transition-transform duration-300 active:scale-90 touch-manipulation`}
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-current ml-1" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/20 text-sm font-medium tracking-widest uppercase">Live Preview</p>
          </div>
        )}

        {/* Live + viewers top-left */}
        <div className="absolute top-3 left-3 flex items-center gap-2 flex-wrap">
          {event.isLive && <LiveBadge />}
          <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-xs sm:text-sm px-2.5 py-1 rounded-full">
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="font-semibold">{event.viewers}</span>
          </div>
        </div>

        {/* Controls */}
        <AnimatePresence>
          {showControls && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              {/* Progress */}
              <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${event.color} rounded-full transition-all duration-300`} style={{ width: playing ? "42%" : "0%" }} />
              </div>
              {/* Controls row */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={() => setPlaying(!playing)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors touch-manipulation"
                >
                  {playing ? (
                    <div className="flex gap-0.5"><div className="w-1 h-3 bg-current rounded-sm" /><div className="w-1 h-3 bg-current rounded-sm" /></div>
                  ) : (
                    <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
                  )}
                </button>
                <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <span className="text-white/80 text-[10px] sm:text-xs font-mono hidden xs:block">
                  {playing ? "1:23:45" : "0:00:00"} / {event.duration}
                </span>
                <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                  <button className="hidden sm:flex w-9 h-9 rounded-xl glass border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Info panel below player */}
      <div className="p-4 sm:p-5 space-y-4 bg-card">
        {/* Title + actions */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              {event.title}
            </h1>
            <div className="flex items-center gap-3 mt-1.5 text-xs sm:text-sm text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-current" />{event.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 active:scale-95 touch-manipulation
                ${liked ? "bg-rose-500/20 border-rose-500/40 text-rose-400" : "glass border-border text-muted-foreground hover:text-foreground"}`}
            >
              <ThumbsUp className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">Like</span>
            </button>
            <button className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl glass border border-border text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-95">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Host */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 border border-border">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
            {event.host[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-foreground truncate">{event.host}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Shield className="w-3 h-3" />Verified Creator
            </div>
          </div>
          <button className={`px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r ${event.color} text-white text-xs font-semibold shadow-lg transition-all hover:brightness-110 active:scale-95 flex-shrink-0 touch-manipulation`}>
            Follow
          </button>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{event.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {event.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground hover:border-brand/40 hover:text-foreground transition-colors cursor-pointer">
              #{tag}
            </span>
          ))}
          <span className="text-xs font-medium px-2.5 sm:px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground">
            #{event.category}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [view, setView] = useState<"landing" | "stream">("landing");
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setHeroIndex((p) => (p + 1) % 3), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleWatch = (event: Event) => {
    setActiveEvent(event);
    setView("stream");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setView("landing");
    setActiveEvent(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredEvents = EVENTS.filter((e) => {
    const matchCat = activeCategory === "all" || e.category === activeCategory;
    const matchSearch = !searchQuery ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const heroEvents = EVENTS.slice(0, 3);
  const featuredHero = heroEvents[heroIndex];
  const liveEvents = EVENTS.filter((e) => e.isLive);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} onHomeClick={handleBack} />

      <AnimatePresence mode="wait">
        {/* ═══ LANDING ═══════════════════════════════════════════════════ */}
        {view === "landing" && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>

            {/* Hero — full-screen cinematic */}
            <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img src={featuredHero.image} alt={featuredHero.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuredHero.color} opacity-20`} />
                </motion.div>
              </AnimatePresence>

              <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-20 sm:pt-24">
                <div className="max-w-xl sm:max-w-2xl">
                  {/* Meta row */}
                  <motion.div key={`cat-${heroIndex}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                    {featuredHero.isLive && <LiveBadge />}
                    <span className="text-xs sm:text-sm font-medium text-muted-foreground">{featuredHero.category}</span>
                    <span className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{featuredHero.viewers} watching
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    key={`title-${heroIndex}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-foreground mb-3 sm:mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {featuredHero.title}
                  </motion.h1>

                  {/* Description — hidden on small mobile to save space */}
                  <motion.p key={`desc-${heroIndex}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="hidden sm:block text-sm sm:text-base text-muted-foreground leading-relaxed mb-5 sm:mb-6 max-w-lg">
                    {featuredHero.description}
                  </motion.p>

                  {/* CTAs */}
                  <motion.div key={`cta-${heroIndex}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleWatch(featuredHero)}
                      className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r ${featuredHero.color} text-white font-semibold text-sm sm:text-base shadow-2xl glow-brand transition-all duration-300 hover:scale-105 active:scale-95 hover:brightness-110 touch-manipulation`}
                    >
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                      Watch Now
                    </button>
                    <button className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl glass border border-border text-foreground font-medium text-sm sm:text-base transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95 touch-manipulation">
                      <Bell className="w-4 h-4" />
                      Remind Me
                    </button>
                  </motion.div>
                </div>

                {/* Carousel dots */}
                <div className="flex gap-2 mt-6 sm:mt-8">
                  {heroEvents.map((_, i) => (
                    <button key={i} onClick={() => setHeroIndex(i)} className={`h-1 rounded-full transition-all duration-300 ${i === heroIndex ? "w-8 bg-primary" : "w-3 bg-muted-foreground/40"}`} />
                  ))}
                </div>
              </div>
            </section>

            {/* Content area */}
            <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-20">

              {/* Live Right Now — horizontal scroll on mobile */}
              {!searchQuery && (
                <section className="mb-10 sm:mb-12">
                  <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="flex items-center gap-2 text-sm font-semibold text-live">
                      <span className="w-2 h-2 bg-live rounded-full animate-pulse" />
                      Live Right Now
                    </span>
                    <span className="text-xs text-muted-foreground">{liveEvents.length} streaming</span>
                  </div>
                  {/* On mobile: horizontal scroll. On md+: grid */}
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
                    {liveEvents.map((event, i) => (
                      <motion.div
                        key={event.id}
                        onClick={() => handleWatch(event)}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="relative flex items-center gap-3 p-3 rounded-xl glass-strong border border-border cursor-pointer group hover:border-brand/30 transition-all duration-300 hover:shadow-lg hover:shadow-brand/10 flex-shrink-0 w-64 sm:w-72 md:w-auto touch-manipulation"
                      >
                        <div className="relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="w-4 h-4 text-white fill-current" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">{event.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Eye className="w-3 h-3" />{event.viewers}
                          </p>
                        </div>
                        <LiveBadge />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* All Events section */}
              <section>
                {/* Header row — stacks on mobile */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-primary flex-shrink-0" />
                    <h2 className="text-lg sm:text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                      {searchQuery ? `Results for "${searchQuery}"` : "All Events"}
                    </h2>
                    {filteredEvents.length > 0 && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{filteredEvents.length}</span>
                    )}
                  </div>

                  {/* Filter tabs — horizontally scrollable on mobile */}
                  <div className="flex gap-1 p-1 rounded-xl bg-muted/60 border border-border w-fit overflow-x-auto max-w-full">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex-shrink-0 touch-manipulation
                            ${activeCategory === cat.id ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                        >
                          <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Grid:
                    mobile: 2 cols
                    sm: 2 cols
                    md: 3 cols
                    lg: 4 cols
                    xl: 5 cols */}
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                    {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
                  </div>
                ) : filteredEvents.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 sm:py-24 text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                      <Search className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No events found</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">Try adjusting your search or filter.</p>
                    <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} className="mt-4 text-sm text-primary hover:underline touch-manipulation">
                      Clear filters
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
                    {filteredEvents.map((event, index) => (
                      <EventCard key={event.id} event={event} onWatch={handleWatch} index={index} />
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Footer */}
            <footer className="border-t border-border py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
                <p className="text-xs text-muted-foreground">© 2026 All rights reserved.</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                  <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                  <a href="#" className="hover:text-foreground transition-colors">Help</a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}

        {/* ═══ STREAM PAGE ════════════════════════════════════════════════ */}
        {view === "stream" && activeEvent && (
          <motion.div key="stream" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="pt-14 sm:pt-16 min-h-screen">

            {/* Back */}
            <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
              <button onClick={handleBack} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group touch-manipulation">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Events
              </button>
            </div>

            <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 pb-12">
              {/* Stream layout:
                  Mobile/Tablet: vertical stack (video → chat)
                  Desktop lg+: side-by-side */}
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-5">
                {/* Video */}
                <div className="flex-1 min-w-0">
                  <VideoPlayer event={activeEvent} />
                </div>

                {/* Chat:
                    Mobile: fixed height 400px (scrollable)
                    Tablet: fixed height 480px
                    Desktop: fills sidebar height */}
                <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 h-[400px] sm:h-[480px] lg:h-auto lg:self-stretch" style={{ minHeight: "400px" }}>
                  {/* On lg+, stretch to match video height using a wrapper */}
                  <div className="h-full lg:min-h-[600px]">
                    <ChatBox event={activeEvent} />
                  </div>
                </div>
              </div>

              {/* Related events */}
              <div className="mt-8 sm:mt-10">
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <h2 className="text-base sm:text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                    More Events You&apos;ll Love
                  </h2>
                  <button onClick={handleBack} className="flex items-center gap-1 text-xs sm:text-sm text-primary hover:underline touch-manipulation">
                    View all <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                  {EVENTS
                    .filter((e) => e.id !== activeEvent.id && e.category === activeEvent.category)
                    .slice(0, 4)
                    .concat(EVENTS.filter((e) => e.id !== activeEvent.id && e.category !== activeEvent.category).slice(0, 2))
                    .slice(0, 5)
                    .map((event, i) => (
                      <EventCard key={event.id} event={event} onWatch={handleWatch} index={i} />
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

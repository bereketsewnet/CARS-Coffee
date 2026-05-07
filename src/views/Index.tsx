"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Leaf,
  Recycle,
  Users,
  BookOpen,
  ChevronDown,
  Calendar,
  Microscope,
  Handshake,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PartnersSection from "@/components/PartnersSection/PartnersSection";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { ImpactMetric } from "../../generated/prisma-client";

// Parse a value string like "1,200+", "34%", "8" into { target, suffix }
import CircularAnimation from "@/components/CircularAnimation";

function parseMetricValue(v: string): { target: number; suffix: string } {
  const clean = v.replace(/,/g, "");
  const m = clean.match(/^(\d+(?:\.\d+)?)(.*)/)
  if (!m) return { target: 0, suffix: v };
  return { target: parseFloat(m[1]), suffix: m[2] };
}

const FALLBACK_METRICS = [
  { target: 1200, suffix: "+", label: "Farmers Reached" },
  { target: 34,   suffix: "%", label: "Soil Fertility Gain" },
  { target: 8,    suffix: "",  label: "PhD Candidates" },
  { target: 42,   suffix: "%", label: "Waste Reduction" },
];

type Partner = {
  id: string;
  name: string;
  logoUrl: string | null;
  website: string | null;
  order: number;
  active: boolean;
};

type TeamPreviewMember = {
  id?: string;
  name: string;
  role: string;
  institution: string;
  imageUrl?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  website?: string | null;
};

const FALLBACK_TEAM_PREVIEW_MEMBERS: TeamPreviewMember[] = [
  {
    name: "Prof. Dr. Jan De Moor",
    role: "Principal Investigator (North)",
    institution: "University of Antwerp",
  },
  {
    name: "Prof. Dr. Tigist Alemu",
    role: "Principal Investigator (South)",
    institution: "Addis Ababa University",
  },
  {
    name: "Selamawit Tadesse",
    role: "PhD Candidate",
    institution: "AAU / UA Antwerp",
  },
  {
    name: "Thomas Claeys",
    role: "PhD Candidate",
    institution: "University of Antwerp",
  },
];

function initialsFromName(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

// ── Canvas constants ─────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 105;

function pad3(n: number): string {
  return String(n).padStart(3, "0");
}
function frameSrc(i: number): string {
  return `/hero3D/ezgif-frame-${pad3(i + 1)}.webp`;
}

// ── Coffee particle types ─────────────────────────────────────────────────────
type Particle = {
  id: number;
  type: "bean" | "cherry";
  x: number;        // vw %
  y: number;        // vh % baseline (no scroll)
  size: number;     // px
  rotation: number; // deg
  opacity: number;
  depth: number;    // 0.1 (far/slow) … 1.0 (near/fast) — parallax multiplier
  rotationSpeed: number; // deg per 100px scroll
};

// ── Per-section particle configs ──────────────────────────────────────────
// All particles are positioned at section edges to avoid covering essential
// content (text, images, cards). Coordinates are % within each section.
// depth drives parallax speed: 0.05 = barely moves (far), 0.65 = fastest (near)
const MISSION_PARTICLES: Particle[] = [
  { id: 101, type: "cherry", x:  3, y: 12, size: 26, rotation:  30, opacity: 0.28, depth: 0.60, rotationSpeed: 0 },
  { id: 102, type: "bean",   x: 94, y: 18, size: 22, rotation: 120, opacity: 0.24, depth: 0.12, rotationSpeed: 0 },
  { id: 103, type: "bean",   x:  4, y: 78, size: 18, rotation: 200, opacity: 0.22, depth: 0.38, rotationSpeed: 0 },
  { id: 104, type: "cherry", x: 95, y: 82, size: 20, rotation:  90, opacity: 0.26, depth: 0.55, rotationSpeed: 0 },
  { id: 105, type: "bean",   x:  8, y: 45, size: 14, rotation:  70, opacity: 0.18, depth: 0.08, rotationSpeed: 0 },
  { id: 106, type: "cherry", x: 90, y: 50, size: 16, rotation: 240, opacity: 0.20, depth: 0.45, rotationSpeed: 0 },
  { id: 107, type: "bean",   x:  2, y: 30, size: 12, rotation: 310, opacity: 0.16, depth: 0.06, rotationSpeed: 0 },
  { id: 108, type: "cherry", x: 97, y: 65, size: 14, rotation: 150, opacity: 0.18, depth: 0.28, rotationSpeed: 0 },
];

const PILLARS_PARTICLES: Particle[] = [
  { id: 201, type: "bean",   x:  2, y:  6, size: 28, rotation:  45, opacity: 0.22, depth: 0.65, rotationSpeed: 0 },
  { id: 202, type: "cherry", x: 96, y: 10, size: 22, rotation: 150, opacity: 0.26, depth: 0.10, rotationSpeed: 0 },
  { id: 203, type: "bean",   x:  3, y: 92, size: 20, rotation: 280, opacity: 0.20, depth: 0.42, rotationSpeed: 0 },
  { id: 204, type: "cherry", x: 97, y: 90, size: 26, rotation:   0, opacity: 0.24, depth: 0.58, rotationSpeed: 0 },
  { id: 205, type: "bean",   x:  6, y: 50, size: 14, rotation: 100, opacity: 0.18, depth: 0.07, rotationSpeed: 0 },
  { id: 206, type: "cherry", x: 94, y: 52, size: 16, rotation: 220, opacity: 0.20, depth: 0.33, rotationSpeed: 0 },
  { id: 207, type: "cherry", x:  5, y: 25, size: 12, rotation:  60, opacity: 0.18, depth: 0.50, rotationSpeed: 0 },
  { id: 208, type: "bean",   x: 92, y: 30, size: 14, rotation: 200, opacity: 0.18, depth: 0.15, rotationSpeed: 0 },
  { id: 209, type: "bean",   x:  8, y: 72, size: 12, rotation: 330, opacity: 0.16, depth: 0.22, rotationSpeed: 0 },
  { id: 210, type: "cherry", x: 91, y: 75, size: 14, rotation:  10, opacity: 0.20, depth: 0.62, rotationSpeed: 0 },
];

const DIAGRAM_PARTICLES: Particle[] = [
  { id: 301, type: "bean",   x:  3, y: 30, size: 22, rotation:  60, opacity: 0.22, depth: 0.55, rotationSpeed: 0 },
  { id: 302, type: "cherry", x: 96, y: 60, size: 24, rotation: 180, opacity: 0.24, depth: 0.08, rotationSpeed: 0 },
  { id: 303, type: "cherry", x:  5, y: 70, size: 14, rotation: 110, opacity: 0.20, depth: 0.40, rotationSpeed: 0 },
  { id: 304, type: "bean",   x: 94, y: 20, size: 14, rotation: 250, opacity: 0.18, depth: 0.18, rotationSpeed: 0 },
];

const IMPACT_PARTICLES: Particle[] = [
  { id: 401, type: "cherry", x:  6, y: 18, size: 22, rotation:  60, opacity: 0.26, depth: 0.60, rotationSpeed: 0 },
  { id: 402, type: "bean",   x: 92, y: 28, size: 18, rotation: 200, opacity: 0.22, depth: 0.09, rotationSpeed: 0 },
  { id: 403, type: "bean",   x:  4, y: 75, size: 24, rotation: 100, opacity: 0.24, depth: 0.48, rotationSpeed: 0 },
  { id: 404, type: "cherry", x: 94, y: 82, size: 20, rotation: 270, opacity: 0.22, depth: 0.25, rotationSpeed: 0 },
  { id: 405, type: "bean",   x:  2, y: 45, size: 12, rotation:  20, opacity: 0.16, depth: 0.06, rotationSpeed: 0 },
  { id: 406, type: "cherry", x: 97, y: 50, size: 14, rotation: 160, opacity: 0.20, depth: 0.35, rotationSpeed: 0 },
  { id: 407, type: "cherry", x:  8, y: 92, size: 12, rotation:  50, opacity: 0.18, depth: 0.55, rotationSpeed: 0 },
  { id: 408, type: "bean",   x: 90, y:  8, size: 14, rotation: 290, opacity: 0.18, depth: 0.14, rotationSpeed: 0 },
];

const NEWS_PARTICLES: Particle[] = [
  { id: 501, type: "bean",   x:  2, y:  8, size: 30, rotation:  30, opacity: 0.18, depth: 0.62, rotationSpeed: 0 },
  { id: 502, type: "cherry", x: 97, y: 14, size: 22, rotation: 180, opacity: 0.22, depth: 0.11, rotationSpeed: 0 },
  { id: 503, type: "cherry", x:  3, y: 92, size: 18, rotation:  90, opacity: 0.24, depth: 0.40, rotationSpeed: 0 },
  { id: 504, type: "bean",   x: 96, y: 80, size: 26, rotation: 220, opacity: 0.18, depth: 0.57, rotationSpeed: 0 },
  { id: 505, type: "bean",   x:  5, y: 40, size: 14, rotation: 130, opacity: 0.18, depth: 0.08, rotationSpeed: 0 },
  { id: 506, type: "cherry", x: 94, y: 45, size: 16, rotation: 300, opacity: 0.20, depth: 0.30, rotationSpeed: 0 },
  { id: 507, type: "cherry", x:  4, y: 65, size: 12, rotation:  20, opacity: 0.18, depth: 0.52, rotationSpeed: 0 },
  { id: 508, type: "bean",   x: 96, y: 60, size: 14, rotation: 250, opacity: 0.18, depth: 0.17, rotationSpeed: 0 },
];

const TEAM_PARTICLES: Particle[] = [
  { id: 601, type: "cherry", x:  3, y: 10, size: 24, rotation:  45, opacity: 0.24, depth: 0.58, rotationSpeed: 0 },
  { id: 602, type: "bean",   x: 95, y:  6, size: 20, rotation: 150, opacity: 0.22, depth: 0.10, rotationSpeed: 0 },
  { id: 603, type: "bean",   x:  4, y: 90, size: 22, rotation: 320, opacity: 0.20, depth: 0.44, rotationSpeed: 0 },
  { id: 604, type: "cherry", x: 96, y: 88, size: 18, rotation:  60, opacity: 0.24, depth: 0.62, rotationSpeed: 0 },
  { id: 605, type: "cherry", x:  6, y: 48, size: 14, rotation: 110, opacity: 0.20, depth: 0.07, rotationSpeed: 0 },
  { id: 606, type: "bean",   x: 93, y: 52, size: 16, rotation: 240, opacity: 0.18, depth: 0.28, rotationSpeed: 0 },
  { id: 607, type: "bean",   x:  2, y: 28, size: 12, rotation:  10, opacity: 0.16, depth: 0.50, rotationSpeed: 0 },
  { id: 608, type: "cherry", x: 97, y: 70, size: 12, rotation: 200, opacity: 0.18, depth: 0.16, rotationSpeed: 0 },
];

const CTA_PARTICLES: Particle[] = [
  { id: 701, type: "bean",   x:  4, y: 22, size: 26, rotation:  60, opacity: 0.24, depth: 0.55, rotationSpeed: 0 },
  { id: 702, type: "cherry", x: 93, y: 18, size: 24, rotation: 180, opacity: 0.28, depth: 0.09, rotationSpeed: 0 },
  { id: 703, type: "cherry", x:  5, y: 80, size: 20, rotation: 270, opacity: 0.24, depth: 0.42, rotationSpeed: 0 },
  { id: 704, type: "bean",   x: 95, y: 76, size: 22, rotation: 100, opacity: 0.22, depth: 0.63, rotationSpeed: 0 },
  { id: 705, type: "cherry", x:  2, y: 50, size: 14, rotation:  40, opacity: 0.20, depth: 0.12, rotationSpeed: 0 },
  { id: 706, type: "bean",   x: 97, y: 48, size: 14, rotation: 220, opacity: 0.18, depth: 0.35, rotationSpeed: 0 },
  { id: 707, type: "bean",   x:  8, y:  6, size: 12, rotation: 320, opacity: 0.18, depth: 0.56, rotationSpeed: 0 },
  { id: 708, type: "cherry", x: 90, y: 92, size: 14, rotation:  80, opacity: 0.20, depth: 0.08, rotationSpeed: 0 },
];

// ── Photorealistic coffee bean SVG ───────────────────────────────────────────
function BeanSVG({ size, depth }: { size: number; depth: number }) {
  // Colour palette shifts from pale tan (far) to very dark roast (near)
  const baseLight = depth > 0.45 ? "#3b1a0a" : depth > 0.22 ? "#5c3010" : "#8a5c30";
  const baseDark  = depth > 0.45 ? "#1a0800" : depth > 0.22 ? "#2e1406" : "#4a2e12";
  const highlight = depth > 0.45 ? "rgba(255,200,140,0.22)" : "rgba(255,210,160,0.15)";
  const id = `b${size}${Math.round(depth*100)}`;
  return (
    <svg width={size} height={Math.round(size * 1.6)} viewBox="0 0 40 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Radial gradient: lighter edge, dark centre for 3-D roundness */}
        <radialGradient id={`rg${id}`} cx="38%" cy="30%" r="62%">
          <stop offset="0%"   stopColor={baseLight} />
          <stop offset="55%"  stopColor={baseDark}  />
          <stop offset="100%" stopColor="#0d0400"   />
        </radialGradient>
        {/* Soft shadow behind the bean */}
        <radialGradient id={`sh${id}`} cx="50%" cy="90%" r="50%">
          <stop offset="0%"  stopColor="rgba(0,0,0,0.45)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      {/* Drop shadow */}
      <ellipse cx="20" cy="62" rx="14" ry="3" fill={`url(#sh${id})`} />
      {/* Bean body */}
      <ellipse cx="20" cy="31" rx="17" ry="27" fill={`url(#rg${id})`} />
      {/* Top specular gloss */}
      <ellipse cx="13" cy="18" rx="6" ry="4" fill={highlight} style={{ transform: "rotate(-20deg)", transformOrigin: "13px 18px" }} />
      {/* Centre crease — two close lines for depth */}
      <path d="M20 6 Q11 31 20 58" stroke="rgba(0,0,0,0.55)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M21 6 Q13 31 21 58" stroke="rgba(0,0,0,0.20)" strokeWidth="1.0" strokeLinecap="round" fill="none" />
      {/* Edge rim highlight */}
      <ellipse cx="20" cy="31" rx="17" ry="27" stroke={highlight} strokeWidth="1" fill="none" />
    </svg>
  );
}

// ── Photorealistic coffee cherry SVG ─────────────────────────────────────────
function CherrySVG({ size, depth }: { size: number; depth: number }) {
  // Real coffee cherries: vivid crimson-red with a slight orange tint at highlight
  const red   = depth > 0.45 ? "#a01010" : depth > 0.22 ? "#b52010" : "#8b1a0e";
  const dark  = depth > 0.45 ? "#4a0000" : depth > 0.22 ? "#600800" : "#400000";
  const id = `c${size}${Math.round(depth*100)}`;
  return (
    <svg width={Math.round(size * 2.4)} height={Math.round(size * 2.2)} viewBox="0 0 72 66" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Left cherry gradient */}
        <radialGradient id={`lrg${id}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#e84030" />
          <stop offset="40%"  stopColor={red}  />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
        {/* Right cherry gradient */}
        <radialGradient id={`rrg${id}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%"   stopColor="#e84030" />
          <stop offset="40%"  stopColor={red}  />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
        {/* Drop shadow */}
        <radialGradient id={`csh${id}`} cx="50%" cy="90%" r="50%">
          <stop offset="0%"  stopColor="rgba(0,0,0,0.4)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      {/* Stem — thin wiry branch */}
      <path d="M36 14 C36 8 30 3 22 2" stroke="#4a2c0a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M36 14 C36 8 42 3 50 2" stroke="#4a2c0a" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M36 14 C36 8 30 3 22 2" stroke="#8b5a1a" strokeWidth="0.8" strokeLinecap="round" fill="none" />
      {/* Shadow under both cherries */}
      <ellipse cx="20" cy="64" rx="13" ry="3" fill={`url(#csh${id})`} />
      <ellipse cx="52" cy="64" rx="13" ry="3" fill={`url(#csh${id})`} />
      {/* Left cherry */}
      <circle cx="20" cy="44" r="18" fill={`url(#lrg${id})`} />
      {/* left cherry navel dimple */}
      <circle cx="20" cy="60" r="2.5" fill="rgba(0,0,0,0.4)" />
      {/* left gloss */}
      <ellipse cx="13" cy="35" rx="5" ry="3.5" fill="rgba(255,255,255,0.28)" style={{ transform: "rotate(-30deg)", transformOrigin: "13px 35px" }} />
      {/* Right cherry */}
      <circle cx="52" cy="44" r="18" fill={`url(#rrg${id})`} />
      {/* right cherry navel dimple */}
      <circle cx="52" cy="60" r="2.5" fill="rgba(0,0,0,0.4)" />
      {/* right gloss */}
      <ellipse cx="45" cy="35" rx="5" ry="3.5" fill="rgba(255,255,255,0.28)" style={{ transform: "rotate(-30deg)", transformOrigin: "45px 35px" }} />
      {/* Join shadow between the two fruits */}
      <ellipse cx="36" cy="44" rx="4" ry="16" fill="rgba(0,0,0,0.18)" />
    </svg>
  );
}

// ── Particle keyframes — injected once at the top of the page ─────────────
function ParticleKeyframes() {
  return (
    <style>{`
      @keyframes particleFloat {
        0%   { translate: 0px 0px; }
        25%  { translate: 3px -8px; }
        50%  { translate: -2px -14px; }
        75%  { translate: -4px -6px; }
        100% { translate: 0px 0px; }
      }
      @keyframes particleDrift {
        0%   { translate: 0px 0px; }
        33%  { translate: -5px -10px; }
        66%  { translate: 4px -18px; }
        100% { translate: 0px 0px; }
      }
      @keyframes particleSway {
        0%   { translate: 0px 0px; }
        20%  { translate: 6px -5px; }
        50%  { translate: -3px -12px; }
        80%  { translate: 5px -8px; }
        100% { translate: 0px 0px; }
      }
    `}</style>
  );
}

// ── Section-level decorative particle layer with scroll parallax ──────────
// depth (0.05–0.65) controls scroll speed — low = far/slow, high = near/fast.
// CSS `translate` (standalone) drives the float animation independently of
// the JS-controlled `transform`, so both compose without conflict.
function SectionParticles({ particles }: { particles: Particle[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const nodes = container.querySelectorAll<HTMLElement>("[data-pid]");
    const pidMap = new Map(particles.map((p) => [p.id, p]));

    function tick() {
      const rect = container.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      nodes.forEach((el) => {
        const p = pidMap.get(Number(el.dataset.pid));
        if (!p) return;
        const ty = -(scrolled * p.depth * 0.18);
        el.style.transform = `rotate(${p.rotation}deg) translateY(${ty}px)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [particles]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {particles.map((p) => {
        const animName = p.id % 3 === 0 ? "particleDrift" : p.id % 3 === 1 ? "particleFloat" : "particleSway";
        const duration = 4 + (1 - p.depth) * 6;
        const delay = (p.id * 0.73) % 5;
        return (
          <div
            key={p.id}
            data-pid={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              transform: `rotate(${p.rotation}deg)`,
              willChange: "transform, translate",
              filter: `blur(${p.depth < 0.12 ? 1.5 : p.depth < 0.25 ? 0.5 : 0}px)`,
              animation: `${animName} ${duration.toFixed(1)}s ${delay.toFixed(1)}s ease-in-out infinite`,
            }}
          >
            {p.type === "bean" ? (
              <BeanSVG size={p.size} depth={p.depth} />
            ) : (
              <CherrySVG size={p.size} depth={p.depth} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Scroll-Driven Hero Section ───────────────────────────────────────────────────
function HeroSection({ t }: { t: Record<string, Record<string, string>> }) {
  // Refs for GSAP targets
  const sectionRef = useRef<HTMLDivElement>(null);   // outer 300vh scroll track
  const stickyRef = useRef<HTMLDivElement>(null);    // sticky 100vh viewport
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);     // State 1 container (stays put)
  const text2Ref = useRef<HTMLDivElement>(null);     // State 2 container
  const h1Ref = useRef<HTMLHeadingElement>(null);    // only the h1 fades out
  const sub1Ref = useRef<HTMLParagraphElement>(null); // subtitle fades out with h1
  const circleRef = useRef<HTMLDivElement>(null);     // circular animation fades out with h1
  const h2Ref = useRef<HTMLHeadingElement>(null);    // only the h2 fades in
  const sub2Ref = useRef<HTMLDivElement>(null);      // State 2 subtitle (now a grid div) fades in with h2
  const tagsRef = useRef<HTMLDivElement>(null);      // initial tags for entrance animation
  const btnsRef = useRef<HTMLDivElement>(null);      // initial buttons for entrance animation

  // Preloaded frame images
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const readyRef = useRef<boolean>(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  // Loading overlay state — shown until first frame is painted
  const [frameReady, setFrameReady] = useState(false);

  // ── Draw helper (cover-fill) ──────────────────────────────────────────
  function drawFrameAt(index: number) {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !ctx || !img?.naturalWidth) return;
    const scale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    );
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  }

  useEffect(() => {
    // Fix 2: force scroll to top on every page load / refresh
    // This prevents mid-scroll refreshes showing the wrong canvas frame
    if (typeof window !== 'undefined') {
      history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    // ── CRITICAL: hide State 2 elements immediately before any ScrollTrigger
    //    is created, to prevent the 1-second overlap flash on initial load
    gsap.set([h2Ref.current, sub2Ref.current], { opacity: 0, y: 120 });

    // ── INITIAL LOAD ENTRANCE ANIMATION ──────────────────────────────
    // Hide State 1 elements immediately so they can animate in smoothly
    const initialElements = [tagsRef.current, h1Ref.current, sub1Ref.current, btnsRef.current, circleRef.current];
    gsap.set(initialElements, { opacity: 0, y: 30 });

    // Trigger the staggered fade/slide-up
    gsap.to(initialElements, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2, // slight delay allows the page to settle and first frame to paint
    });

    // Fit canvas to container
    function fitCanvas() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (readyRef.current) drawFrameAt(0);
    }
    const ro = new ResizeObserver(() => {
      fitCanvas();
      ScrollTrigger.refresh();
    });
    ro.observe(canvas);
    fitCanvas();

    // ── Preload all frames ────────────────────────────────────────────
    const imgs: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = imgs;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameSrc(i);
      img.onload = () => {
        if (i === 0) {
          readyRef.current = true;
          fitCanvas();
          drawFrameAt(0);
          // Fix 1: Signal React that the first frame is ready so the
          // loading overlay can fade out immediately
          setFrameReady(true);
        }
      };
      // Fix 1: handle load failures gracefully — don't block the page
      img.onerror = () => {
        if (i === 0) setFrameReady(true);
      };
      imgs[i] = img;
    }

    // ── GSAP ScrollTrigger timeline ─────────────────────────────────────
    // Timeline normalized from 0.0 to 1.0
    //   Canvas frames : 0.0 → 1.0
    //   State 1 out   : 0.0 → 0.35 (first 35% of scroll)
    //   State 2 in    : 0.65 → 1.0 (last 35% of scroll)
    const frameProxy = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true, // instantly locked to scroll position with zero delay/lag
      },
    });

    // Canvas: smooth crawl across the full timeline (duration: 1)
    tl.to(
      frameProxy,
      {
        duration: 1,
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
        ease: "none",
        onUpdate: () => drawFrameAt(Math.round(frameProxy.frame)),
      },
      0
    );

    // H1 + subtitle: slow, smooth fade-out (ease: "none" ties it directly to scroll wheel)
    // Runs from 0.0 to 0.45 of the scrub timeline
    tl.to(
      [h1Ref.current, sub1Ref.current],
      { duration: 0.45, opacity: 0, y: -120, ease: "none", stagger: 0.05 },
      0
    );

    // Circle immediately fades out as soon as user starts scrolling
    tl.to(
      circleRef.current,
      { duration: 0.05, opacity: 0, y: -30, ease: "power2.out" },
      0
    );

    // H2 + subtitle: slow, smooth fade-in from bottom to center
    // Runs from 0.45 to 0.90 of the scrub timeline (immediately picks up after State 1)
    tl.fromTo(
      [h2Ref.current, sub2Ref.current],
      { opacity: 0, y: 120 },
      { duration: 0.45, opacity: 1, y: 0, ease: "none", stagger: 0.05 },
      0.45
    );

    return () => {
      tl.kill();
      ro.disconnect();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Outer section: tall scroll track (340vh)
    <div ref={sectionRef} style={{ height: "340vh" }}>

      {/* ── Fix 1: Full-page loading overlay — covers navbar + all content ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "hsl(20 15% 8%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          transition: "opacity 0.8s ease, visibility 0.8s ease",
          opacity: frameReady ? 0 : 1,
          visibility: frameReady ? "hidden" : "visible",
        }}
      >
        {/* CARES wordmark */}
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 36,
            fontWeight: 700,
            color: "hsl(40 20% 92%)",
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}>CARES</p>
          <p style={{
            fontSize: 11,
            color: "hsl(122 50% 38%)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginTop: 4,
          }}>Circular Coffee Economy</p>
        </div>
        {/* Animated coffee dots loader */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: i % 2 === 0 ? "hsl(122 50% 38%)" : "hsl(22 40% 40%)",
                animation: `coffeeLoader 1.2s ease-in-out ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
        <p style={{
          color: "hsl(40 10% 55%)",
          fontSize: 12,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}>Preparing Smooth experience…</p>
      </div>

      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Canvas background — z 0 */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            display: "block",
          }}
        />

        {/* Gradient overlays — z 1 */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-background"
          style={{ zIndex: 1 }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent"
          style={{ zIndex: 1 }}
        />

        {/* Partner logos column — top right of hero */}
        <div
          className="hidden lg:flex flex-col gap-2"
          style={{ position: "absolute", top: "6rem", right: "2rem", zIndex: 10 }}
        >
          {[
            { src: "/assets/VLIRUOS.jpg",                alt: "VLIR-UOS" },
            { src: "/assets/ADDIS ABABA UNIVERSITY.jpg", alt: "Addis Ababa University" },
            { src: "/assets/UNIVERSITY OF ANTWERP.jpg",  alt: "University of Antwerp" },
          ].map((logo) => (
            <div
              key={logo.alt}
              className="w-14 h-14 rounded-xl bg-white border border-white/60 shadow-lg overflow-hidden flex items-center justify-center p-1"
            >
              <img src={logo.src} alt={logo.alt} className="w-full h-full object-contain" draggable={false} />
            </div>
          ))}
        </div>

        {/* Spinning ring decoration — z 2 */}
        <div
          className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden xl:block"
          style={{ zIndex: 2 }}
        >
          <div className="w-full h-full rounded-full border border-leaf-bright/10 animate-spin-slow" />
          <div
            className="absolute inset-8 rounded-full border border-coffee/20"
            style={{ animation: "spin-slow 30s linear infinite reverse" }}
          />
          <div className="absolute inset-20 rounded-full border border-leaf-bright/15" />

        </div>

        {/* Tag — pinned just below navbar */}
        <div
          ref={tagsRef}
          className="absolute pointer-events-none px-4 md:px-6 container mx-auto left-0 right-0"
          style={{ top: "82px", zIndex: 4, opacity: 0, transform: "translateY(30px)" }}
        >
          <span className="tag-pill text-xs md:text-sm font-bold uppercase tracking-widest">
            {t.home.tagline}
          </span>
        </div>

        {/* ── STATE 1: Initial text block ── */}
        <div
          ref={text1Ref}
          className="pointer-events-none container mx-auto absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-4 md:px-6"
          style={{ zIndex: 3, paddingTop: "clamp(120px, 15vh, 180px)" }}
        >
          <div className="max-w-2xl flex-1 self-center w-full lg:w-auto">
            <div>
              <h1
                ref={h1Ref}
                className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug mb-3 md:mb-4"
                style={{ opacity: 0, transform: "translateY(30px)", letterSpacing: "0.05em" }}
              >
                {t.home.heroTitle1} {t.home.heroTitle2}
                <br className="hidden md:block" />
                <span className="text-gradient-green text-xl sm:text-3xl md:text-4xl lg:text-5xl block mt-1">CARES</span>
              </h1>
              <p
                ref={sub1Ref}
                className="text-sm md:text-base text-muted-foreground leading-relaxed mb-5 md:mb-7 max-w-xl"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                {t.home.heroSubtitle}
              </p>
              <div ref={btnsRef} className="pointer-events-auto flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-8" style={{ opacity: 0, transform: "translateY(30px)" }}>
                <Link
                  href="/project"
                  className="group inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-all duration-300 shadow-glow"
                >
                  {t.home.ctaExplore}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/research"
                  className="group inline-flex items-center gap-2 px-5 md:px-7 py-3 md:py-3.5 rounded-full font-semibold text-sm md:text-base border border-border text-foreground hover:border-leaf-bright hover:text-leaf-bright transition-all duration-300"
                >
                  {t.home.ctaResearch}
                  <BookOpen className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                </Link>
              </div>
            </div>
          </div>
          
          {/* Circular Animation Section - Attached to State 1 so it fades out on scroll */}
          <div ref={circleRef} className="hidden lg:block lg:flex-1 lg:max-w-xl self-center" style={{ opacity: 0, transform: "translateY(30px)" }}>
             <CircularAnimation />
          </div>
        </div>

        {/* ── STATE 2: Stats (enters from below as scroll progresses) ── */}
        <div
          ref={text2Ref}
          className="pointer-events-none container mx-auto absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 md:px-6"
          style={{ zIndex: 3, paddingTop: "clamp(120px, 15vh, 160px)" }}
        >
          <div className="max-w-4xl">
            <h2
              ref={h2Ref}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 md:mb-8"
              style={{ opacity: 0, transform: "translateY(120px)" }}
            >
              {t.home.heroImpactTitle}<br className="hidden md:block" />
              <span className="text-gradient-green">{t.home.heroImpactTitleBold}</span>
            </h2>
            {/* Stats: tightly packed flex on desktop, grid on mobile */}
            <div
              ref={sub2Ref}
              className="grid grid-cols-3 md:flex gap-4 md:gap-12 items-center"
              style={{ opacity: 0, transform: "translateY(120px)" }}
            >
              <div>
                <HeroCounter target={3} suffix="" label={t.home.statPillars} />
              </div>
              <div className="border-l border-border pl-4 md:pl-8">
                <HeroCounter target={2} suffix="" label={t.home.statCountries} />
              </div>
              <div className="border-l border-border pl-4 md:pl-8">
                <HeroCounter target={5} suffix="+" label={t.home.statYears} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue — z 3 */}
        <a
          href="#mission"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-leaf-bright transition-colors animate-bounce"
          style={{ zIndex: 3 }}
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}

// ── Static assets ─────────────────────────────────────────────────────────────
const soilImg = "/assets/soil-research.jpg";
const wasteImg = "/assets/waste-research.jpg";
const socioImg = "/assets/socio-economic.jpg";

function HeroCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-3xl md:text-4xl font-bold text-leaf-bright mb-1 font-serif">
        {count}{suffix}
      </span>
      <span className="text-muted-foreground text-xs md:text-sm uppercase tracking-wider font-semibold">
        {label}
      </span>
    </div>
  );
}

function CounterStat({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="stat-counter">
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground text-sm mt-1 font-sans">{label}</p>
    </div>
  );
}

const pillars = [
  {
    icon: Leaf,
      title: "Specialty Coffee",
      tag: "Pillar 1",
      description:
        "Premium Valorization methods like Anaerobic Fermentation and Artisanal Coffee Wine.",
      image: soilImg,
      color: "gradient-coffee",
      link: "/research#specialty-coffee",
    },
    {
      icon: Recycle,
      title: "Agro-Energy & Earth Care",
      tag: "Pillar 2",
      description:
        "Transforming coffee waste into Sustainable Bioenergy (Biogas) and Regenerative Biocompost.",
      image: wasteImg,
      color: "gradient-green",
      link: "/research#agro-energy",
    },
    {
      icon: Users,
      title: "Bio-Extracted Innovation",
      tag: "Pillar 3",
      description:
        "Developing Botanical Pesticides and High-Value Cosmetics from coffee cherry natural defenses.",
      image: socioImg,
      color: "gradient-green",
      link: "/research#bio-extraction",
      },
    ];

  type NewsSnippet = {
  id: string;
  title: string;
  date: Date | string;
  type: string;
  imageUrl?: string | null;
  excerpt?: string | null;
};

const STATIC_NEWS = [
  {
    id: "1",
    date: "Nov 2024",
    title: "Biochar Trials Show 34% Soil Fertility Improvement in Kaffa Zone",
    tag: "Research",
    image: null,
    excerpt:
      "New data from our 18-month longitudinal trial demonstrates significant improvements in soil organic carbon.",
  },
  {
    id: "2",
    date: "Oct 2024",
    title: "Circular Coffee Team Presents at AAU International Symposium",
    tag: "Event",
    image: null,
    excerpt:
      "Dr. Tadesse and Prof. Alemu presented findings to 400+ researchers and development professionals.",
  },
  {
    id: "3",
    date: "Sep 2024",
    title: "New Cooperative Partnership Signed with Yirgacheffe Farmers Union",
    tag: "Partnership",
    image: null,
    excerpt:
      "A formal MOU was signed to implement circular processing practices across 12 washing stations.",
  },
];

function toNewsRow(item: NewsSnippet) {
  const d = item.date instanceof Date ? item.date : new Date(item.date);
  const dateLabel = isNaN(d.getTime())
    ? String(item.date)
    : d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
  const tag = item.type === "EVENT" ? "Event" : "News";
  return {
    id: item.id,
    date: dateLabel,
    title: item.title,
    tag,
    image: item.imageUrl ?? null,
    excerpt: item.excerpt ?? null,
  };
}

export default function Index({
  partners = [],
  latestNews,
  impactMetrics,
  teamPreview,
}: {
  partners?: Partner[];
  latestNews?: NewsSnippet[];
  impactMetrics?: ImpactMetric[];
  teamPreview?: TeamPreviewMember[];
}) {
  const { t } = useLanguage();

  const previewTeamData = 
    teamPreview && teamPreview.length > 0 
      ? teamPreview 
      : FALLBACK_TEAM_PREVIEW_MEMBERS;

  // Build the 4 stats: use DB data if available, else fall back to hardcoded
  const stats =
    impactMetrics && impactMetrics.length > 0
      ? impactMetrics.slice(0, 4).map((m) => ({
          label: m.label,
          ...parseMetricValue(m.value),
        }))
      : FALLBACK_METRICS;

  const news =
    latestNews && latestNews.length > 0
      ? latestNews.map(toNewsRow)
      : STATIC_NEWS;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Single elements fade up smoothly when scrolling into view
      gsap.utils.toArray<HTMLElement>('.fade-up').forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" }
          }
        );
      });

      // Grid containers cascade their children smoothly one by one
      gsap.utils.toArray<HTMLElement>('.stagger-grid').forEach((grid) => {
        const items = grid.querySelectorAll('.stagger-item');
        gsap.fromTo(Array.from(items),
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.15,
            scrollTrigger: { trigger: grid, start: "top 85%" }
          }
        );
      });
    });

    return () => ctx.revert(); // Automatically cleans up triggers on unmount
  }, []);

  return (
    <div className="min-h-screen">
      <ParticleKeyframes />
      {/* Hero — scroll-scrubbed 3D canvas + two-state text */}
      <HeroSection t={t as unknown as Record<string, Record<string, string>>} />

      {/* Mission */}
      <section id="mission" className="py-24 relative overflow-hidden">
        <SectionParticles particles={MISSION_PARTICLES} />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="tag-pill mb-6 inline-block">{t.home.missionTitle}</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Waste → <span className="text-gradient-green">Value</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8" dangerouslySetInnerHTML={{ __html: t.home.missionBody }} />
          </div>
          <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border">
            <img src="/assets/IMAGE_1.jpg" alt="CARES Circular Economy Mission" className="w-full h-auto object-cover max-h-[600px]" />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-charcoal-mid relative overflow-hidden">
        <SectionParticles particles={PILLARS_PARTICLES} />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 fade-up">
            <span className="tag-pill mb-4 inline-block">
              Research Framework
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              {t.home.pillarsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-grid">
            {pillars.map((pillar) => (
              <Link
                href={pillar.link}
                key={pillar.title}
                className="pillar-hover group stagger-item"
              >
                <div className="rounded-2xl overflow-hidden shadow-card border border-border bg-card h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="tag-pill text-xs">{pillar.tag}</span>
                    </div>
                    <div
                      className={`absolute bottom-4 left-4 w-10 h-10 rounded-full ${pillar.color} flex items-center justify-center`}
                    >
                      <pillar.icon className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-xl font-semibold mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                      {pillar.description}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-leaf-bright text-sm font-medium">
                      {t.pillars.learnMore} <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          </div>
        </section>

        {/* Circular Economy Model Diagram (IMAGE 2) */}
        <section className="py-10 bg-charcoal-mid relative overflow-hidden">
          <SectionParticles particles={DIAGRAM_PARTICLES} />
          <div className="container mx-auto relative z-10">
            <div className="max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border fade-up">
              <img 
                src="/assets/IMAGE_2.jpg" 
                alt="Ethiopia Coffee Biorefinery Circular Economy Model" 
                className="w-full h-auto object-contain" 
              />
            </div>
          </div>
        </section>

      {/* Impact Stats */}
      <section className="py-24 relative overflow-hidden">
        <SectionParticles particles={IMPACT_PARTICLES} />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16 fade-up">
            <span className="tag-pill mb-4 inline-block">
              {t.home.impactSubtitle}
            </span>
            <h2 className="font-serif text-4xl font-bold">
              {t.home.impactTitle}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {stats.map((s) => (
              <CounterStat key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/impact"
              className="inline-flex items-center gap-2 text-leaf-bright hover:text-leaf-bright/80 font-medium transition-colors"
            >
              {t.home.impactLink} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 md:py-32 relative bg-charcoal-mid overflow-hidden border-t border-border">
        {/* Subtle premium background glow effects */}
        <div className="absolute top-0 left-1/4 w-full max-w-[600px] h-[600px] bg-leaf-bright/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full max-w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <SectionParticles particles={NEWS_PARTICLES} />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 fade-up">
            <div className="max-w-xl">
              <span className="text-leaf-bright text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
                {t.home.latestSubtitle}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {t.home.latestTitle}
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
            >
              {t.home.allUpdates}{" "}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Premium Inspired Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-grid">
            {news.map((item) => {
              // Dynamically assign themes based on the tag (Event vs News vs Partnership)
              const isEvent = item.tag === "Event";
              const isPartnership = item.tag === "Partnership";

              const themeColor = isEvent
                ? "text-amber-500"
                : isPartnership
                  ? "text-blue-400"
                  : "text-leaf-bright";

              const themeBg = isEvent
                ? "bg-amber-500/10"
                : isPartnership
                  ? "bg-blue-400/10"
                  : "bg-leaf-bright/10";

              const themeHoverGlow = isEvent
                ? "group-hover:bg-amber-500/5"
                : isPartnership
                  ? "group-hover:bg-blue-400/5"
                  : "group-hover:bg-leaf-bright/5";

              // Icon logic
              const Icon = isEvent ? Calendar : isPartnership ? Handshake : Microscope;

              return (
                <Link
                  key={item.id}
                  href={`/news/${encodeURIComponent(item.id)}`}
                  className="group stagger-item flex flex-col p-8 rounded-3xl bg-charcoal border border-border hover:border-border/80 shadow-sm transition-all duration-500 relative overflow-hidden"
                >
                  {/* Subtle top interior glow on hover */}
                  <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${themeHoverGlow} to-transparent opacity-0 transition-opacity duration-500 pointer-events-none`} />

                  {/* Optional faded background image if an image exists */}
                  {item.image && (
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                      <img src={item.image} alt="" className="w-full h-full object-cover grayscale mix-blend-overlay" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Icon + Tag */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-12 h-12 rounded-full ${themeBg} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${themeColor}`} strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className={`block text-sm font-bold tracking-wide ${themeColor}`}>
                          {item.tag}
                        </span>
                        <span className="block text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                          {item.date}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-semibold text-2xl leading-snug mb-4 text-foreground group-hover:text-leaf-bright transition-colors">
                      {item.title}
                    </h3>

                    {/* Excerpt */}
                    {item.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-10 line-clamp-3 font-sans">
                        {item.excerpt}
                      </p>
                    )}

                    {/* Footer / Read More linked text */}
                    <div className="mt-auto pt-6 border-t border-border">
                      <div className={`flex items-center gap-2 text-sm font-bold tracking-wide ${themeColor}`}>
                        {t.common.readMore}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 md:hidden text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-white transition-colors group"
            >
              {t.home.allUpdates}{" "}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-24 border-t border-border relative overflow-hidden">
        <SectionParticles particles={TEAM_PARTICLES} />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 fade-up">
            <div className="max-w-xl">
              <span className="tag-pill mb-4 inline-block">Team Preview</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Meet Our Core Researchers
              </h2>
              <p className="text-muted-foreground mt-4">
                A quick look at our multidisciplinary team. Tap any profile to explore the full team page.
              </p>
            </div>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group"
            >
              View Full Team
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-grid">
            {previewTeamData.map((member) => (
              <div
                key={member.name}
                className="stagger-item glass-card rounded-2xl overflow-hidden border border-border pillar-hover group flex flex-col"
              >
                <Link href="/team" className="aspect-[4/3] w-full bg-card/50 overflow-hidden block">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full gradient-green flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                      <span className="font-serif font-bold text-5xl text-foreground/80">
                        {initialsFromName(member.name)}
                      </span>
                    </div>
                  )}
                </Link>
                <div className="p-5 flex flex-col flex-grow">
                  <Link href="/team">
                    <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-leaf-bright transition-colors">
                      {member.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gradient-green font-semibold mt-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 mb-4 flex-grow">
                    {member.institution}
                  </p>
                  
                  {/* Social Media Links */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0077b5] transition-colors" title="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#1DA1F2] transition-colors" title="Twitter">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#E1306C] transition-colors" title="Instagram">
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {member.website && (
                      <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" title="Website">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersSection partners={partners as any} />

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 md:px-6 relative overflow-hidden">
        <SectionParticles particles={CTA_PARTICLES} />
        <div className="container mx-auto relative z-10">
          <div className="relative rounded-[2.5rem] overflow-hidden p-12 md:p-24 text-center bg-[#0a0a0a] border border-border shadow-2xl fade-up">
            {/* Cinematic background gradients */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-coffee/10 via-transparent to-leaf-bright/5 pointer-events-none" />
            
            {/* Soft isolated radial blurs */}
            <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-coffee/20 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[70%] bg-leaf-bright/15 blur-[130px] rounded-full pointer-events-none mix-blend-screen" />
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight tracking-tight">
                {t.home.ctaTitle}
              </h2>
              <p className="text-muted-foreground md:text-lg mb-12 max-w-xl leading-relaxed">
                {t.home.ctaSubtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 rounded-full font-bold text-sm md:text-base bg-[#2a8043] text-white hover:bg-[#349e53] transition-all duration-300 shadow-[0_0_40px_rgba(42,128,67,0.2)] hover:shadow-[0_0_50px_rgba(42,128,67,0.4)] hover:-translate-y-1"
                >
                  Get Involved
                </Link>
                <Link
                  href="/library"
                  className="group w-full sm:w-auto px-8 md:px-10 py-3.5 md:py-4 rounded-full font-semibold text-sm md:text-base border border-border bg-[#141414] text-foreground hover:bg-[#1a1a1a] hover:border-leaf-bright/40 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1"
                >
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-leaf-bright transition-colors duration-300" />
                  {t.home.ctaLibrary}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


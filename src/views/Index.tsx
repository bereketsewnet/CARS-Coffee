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
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PartnersSection from "@/components/PartnersSection/PartnersSection";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { ImpactMetric } from "../../generated/prisma-client";

// Parse a value string like "1,200+", "34%", "8" into { target, suffix }
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

// ── Canvas constants ─────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 105;

function pad3(n: number): string {
  return String(n).padStart(3, "0");
}
function frameSrc(i: number): string {
  return `/hero3D/ezgif-frame-${pad3(i + 1)}.webp`;
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
    const initialElements = [tagsRef.current, h1Ref.current, sub1Ref.current, btnsRef.current];
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
            fontFamily: "'Playfair Display', serif",
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

        {/* ── STATE 1: Initial text block ── */}
        <div
          ref={text1Ref}
          className="pointer-events-none container mx-auto absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 md:px-6"
          style={{ zIndex: 3, paddingTop: "clamp(120px, 15vh, 160px)" }}
        >
          <div className="max-w-3xl">
            <div ref={tagsRef} className="inline-flex flex-wrap items-center gap-2 mb-4 md:mb-6" style={{ opacity: 0, transform: "translateY(30px)" }}>
                <span className="tag-pill text-sm md:text-base font-bold bg-white/10 uppercase tracking-widest">{t.home.tagline}</span>
            </div>
            <h1
              ref={h1Ref}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              {t.home.heroTitle1} {t.home.heroTitle2}
              <br className="hidden md:block" />
              <span className="text-gradient-green text-3xl sm:text-5xl md:text-6xl lg:text-7xl block mt-2">CARES</span>
            </h1>
            <p
              ref={sub1Ref}
              className="text-base md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-10 max-w-2xl"
              style={{ opacity: 0, transform: "translateY(30px)" }}
            >
              {t.home.heroSubtitle}
            </p>
            {/* Fix 3: Buttons with arrow hover animation */}
            <div ref={btnsRef} className="pointer-events-auto flex flex-wrap gap-3 md:gap-4" style={{ opacity: 0, transform: "translateY(30px)" }}>
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

        {/* ── STATE 2: Stats (enters from below as scroll progresses) ── */}
        <div
          ref={text2Ref}
          className="pointer-events-none container mx-auto absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 md:px-6"
          style={{ zIndex: 3, paddingTop: "clamp(120px, 15vh, 160px)" }}
        >
          <div className="max-w-4xl">
            <h2
              ref={h2Ref}
              className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6 md:mb-8"
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
      <span className="text-4xl md:text-5xl font-bold text-leaf-bright mb-1 font-serif">
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
}: {
  partners?: Partner[];
  latestNews?: NewsSnippet[];
  impactMetrics?: ImpactMetric[];
}) {
  const { t } = useLanguage();

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
      {/* Hero — scroll-scrubbed 3D canvas + two-state text */}
      <HeroSection t={t as unknown as Record<string, Record<string, string>>} />

      {/* Mission */}
      <section id="mission" className="py-24">
        <div className="container mx-auto">
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
      <section className="py-24 bg-charcoal-mid">
        <div className="container mx-auto">
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
        <section className="py-10 bg-charcoal-mid">
          <div className="container mx-auto">
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
      <section className="py-24">
        <div className="container mx-auto">
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

      {/* Partners */}
      <PartnersSection />

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 md:px-6">
        <div className="container mx-auto">
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


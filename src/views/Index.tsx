"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  Recycle,
  Users,
  TrendingUp,
  BookOpen,
  ChevronDown,
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
  const sub2Ref = useRef<HTMLParagraphElement>(null); // State 2 subtitle fades in with h2

  // Preloaded frame images
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const readyRef = useRef<boolean>(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

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
        }
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
    // Outer section: tall scroll track (240vh = the absolute sweet spot for moderate scroll speeds)
    <div ref={sectionRef} style={{ height: "340vh" }}>
      {/* Sticky viewport: stays fixed while user scrolls through the 300vh */}
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

        {/* ── STATE 1: Initial text block (visible on load, fades out on scroll) ── */}
        <div
          ref={text1Ref}
          className="container mx-auto absolute inset-x-0 top-1/2 -translate-y-1/2 pt-24"
          style={{ zIndex: 3 }}
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="tag-pill">VLIR-UOS Cooperation</span>
              <span className="tag-pill tag-coffee">Ethiopia × Belgium</span>
            </div>
            <h1
              ref={h1Ref}
              className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6"
            >
              {t.home.heroTitle1} {t.home.heroTitle2}
              <br />
              <span className="text-gradient-green">CARES</span>
            </h1>
            <p
              ref={sub1Ref}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl"
            >
              {t.home.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/project"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-all duration-200 shadow-glow"
              >
                {t.home.ctaExplore} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border border-border text-foreground hover:border-leaf-bright/50 transition-all duration-200"
              >
                {t.home.ctaResearch} <BookOpen className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── STATE 2: Replacement text (enters from below as scroll progresses) ── */}
        <div
          ref={text2Ref}
          className="container mx-auto absolute inset-x-0 top-1/2 -translate-y-1/2 pt-24"
          style={{ zIndex: 3 }}
        >
          <div className="max-w-3xl">
            <h2
              ref={h2Ref}
              className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6"
              style={{ opacity: 0, transform: "translateY(120px)" }}
            >
              From{" "}
              <span className="text-gradient-green">Waste</span>
              <br />
              to Circular Value
            </h2>
            <p
              ref={sub2Ref}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
              style={{ opacity: 0, transform: "translateY(120px)" }}
            >
              Ethiopian coffee holds the birthplace of arabica — yet its processing
              leaves behind husks, pulp, and wastewater. CARES converts these
              by-products into biochar, compost, and biorefinery products that
              restore soils and uplift farming communities across the Kaffa and
              Yirgacheffe regions.
            </p>
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
    title: "Soil Health",
    tag: "Pillar 1",
    description:
      "Composting coffee husk, biochar research, and soil fertility trials to restore Ethiopian farmlands.",
    image: soilImg,
    color: "gradient-green",
    link: "/research#soil",
  },
  {
    icon: Recycle,
    title: "Waste Valorization",
    tag: "Pillar 2",
    description:
      "Transforming coffee pulp and wastewater into valuable biorefinery products.",
    image: wasteImg,
    color: "gradient-coffee",
    link: "/research#waste",
  },
  {
    icon: Users,
    title: "Socio-Economic Impact",
    tag: "Pillar 3",
    description:
      "Empowering smallholder farmers, cooperatives, and promoting gender & youth inclusion.",
    image: socioImg,
    color: "gradient-green",
    link: "/research#socio",
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
  return (
    <div className="min-h-screen">
      {/* Hero — scroll-scrubbed 3D canvas + two-state text */}
      <HeroSection t={t as unknown as Record<string, Record<string, string>>} />

      {/* Mission */}
      <section id="mission" className="py-24">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <span className="tag-pill mb-6 inline-block">Our Mission</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Waste → <span className="text-gradient-green">Value</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Ethiopia is the birthplace of coffee — yet the processing
              generates enormous quantities of husks, pulp, and wastewater that
              pollute rivers and degrade soils. The Circular Coffee project
              brings together researchers from{" "}
              <strong className="text-foreground">
                AAU (Addis Ababa University)
              </strong>{" "}
              and the{" "}
              <strong className="text-foreground">University of Antwerp</strong>{" "}
              to close this loop.
            </p>
            <div className="section-divider" />
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 bg-charcoal-mid">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="tag-pill mb-4 inline-block">
              Research Framework
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold">
              {t.home.pillarsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <Link
                href={pillar.link}
                key={pillar.title}
                className="pillar-hover group"
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

      {/* Impact Stats */}
      <section className="py-24">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="tag-pill mb-4 inline-block">
              Measurable Change
            </span>
            <h2 className="font-serif text-4xl font-bold">
              Impact at a Glance
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
              View full impact report <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-charcoal-mid">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="tag-pill mb-3 inline-block">Latest</span>
              <h2 className="font-serif text-4xl font-bold">
                {t.home.latestTitle}
              </h2>
            </div>
            <Link
              href="/news"
              className="hidden md:flex items-center gap-1 text-leaf-bright hover:text-leaf-bright/80 font-medium transition-colors text-sm"
            >
              All news <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link
                key={item.id}
                href={`/news/${encodeURIComponent(item.id)}`}
                className="glass-card rounded-2xl border border-border overflow-hidden pillar-hover group flex flex-col"
              >
                {/* Image / placeholder */}
                <div className="h-44 bg-gradient-to-br from-charcoal-mid to-charcoal overflow-hidden flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full gradient-green flex items-center justify-center text-2xl shadow-glow">
                        {item.tag === "Event"
                          ? "📅"
                          : item.tag === "Partnership"
                            ? "🤝"
                            : "🔬"}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="tag-pill text-xs">{item.tag}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-base leading-snug mb-2 group-hover:text-leaf-bright transition-colors flex-1">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                      {item.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-1 text-xs text-leaf-bright pt-2 border-t border-border mt-auto">
                    {t.common.readMore} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 md:hidden text-center">
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-leaf-bright font-medium text-sm"
            >
              All news <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersSection />

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto">
          <div
            className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border-gradient shadow-elevated"
            style={{ background: "var(--gradient-hero)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-leaf/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-coffee/20 blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
                Join the Circular Economy
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                Whether you're a researcher, farmer, policy maker, or
                development professional — there's a role for you in this story.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-full font-semibold bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-all shadow-glow"
                >
                  Get Involved
                </Link>
                <Link
                  href="/library"
                  className="px-8 py-3.5 rounded-full font-semibold border border-border text-foreground hover:border-leaf-bright/50 transition-all"
                >
                  <TrendingUp className="inline w-4 h-4 mr-2" />
                  Publications
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

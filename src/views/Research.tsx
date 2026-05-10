"use client";

import { useState } from "react";
import { Leaf, Recycle, Users, ChevronDown, ChevronUp, BookOpen, FlaskConical } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Publication } from "../../generated/prisma-client";

type ResearchMember = { id: string; name: string; role: string | null };
type ResearchProject = { id: string; pillar: string; title: string; description: string | null; members?: ResearchMember[] };

// ── Static fallback data ─────────────────────────────────────────────────────

// Replaced by inline definitions below.

const STATIC_PUBS: Record<string, string[]> = {
  SOIL_HEALTH: [
    "Tadesse et al. (2023) — Compost Amendment Effect on Soil Carbon in Ethiopian Coffee Farms",
    "Van der Berg et al. (2024) — Biochar Yield Optimization from Coffee Husk Pyrolysis",
  ],
  WASTE_VALORIZATION: [
    "Getachew et al. (2024) — Anaerobic Digestion of Coffee Pulp in Small-Scale Digesters",
    "Muijs & Lemma (2023) — Constructed Wetland Performance for Coffee Wastewater",
  ],
  SOCIO_ECONOMIC: [
    "Desta et al. (2024) — Income Effects of Circular Practices on Sidama Coffee Farmers",
    "Claeys et al. (2023) — Gender Dimensions of Coffee Value Chain Innovation in Ethiopia",
  ],
};

// Replaced by inline definitions inside components.

function formatPub(p: Publication): string {
  const authorShort = (p.authors || "").split(",")[0].trim() + ((p.authors || "").includes(",") ? " et al." : "");
  return `${authorShort} (${p.year}) — ${p.title}`;
}

// ── Pillar config (decorative / structural) ──────────────────────────────────

// Decorative slots — icon/color/image assigned by position, not by DB key
const PILLAR_DECORATION = [
  { id: "soil",  icon: Leaf,    image: "/assets/research-soil.webp",  color: "#9B1B1B" },
  { id: "waste", icon: Recycle, image: "/assets/research-waste.webp", color: "#4ade80" },
  { id: "socio", icon: Users,   image: "/assets/research-socio.webp", color: "#F97316" },
];

// Static fallback pillars (used only when DB has no pillar rows at all)
const BASE_PILLARS = [
  { key: "SOIL_HEALTH",        title: "Valorization & Specialty Coffee" },
  { key: "WASTE_VALORIZATION", title: "Circular Agro-Energy & Earth Care" },
  { key: "SOCIO_ECONOMIC",     title: "Bio-Extracted Innovation" },
];

// ── PillarCard ────────────────────────────────────────────────────────────────

interface TopicItem {
  title: string;
  desc: string;
  members?: ResearchMember[];
}

interface PillarSection {
  key: string;
  id: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  image: string;
  color: string;
  title: string;
  tag: string;
  tagline: string;
  layman: string;
}

interface PillarCardProps {
  pillar: PillarSection;
  topics: TopicItem[];
  pubLines: string[];
  emptyState?: boolean;
}


const LEFT_TOPIC_LIMIT = 5;

function TopicCard({ topic }: { topic: TopicItem }) {
  return (
    <div className="glass-card rounded-xl p-5 border border-border">
      <h4 className="font-serif font-semibold text-base mb-2">{topic.title}</h4>
      <p className="text-muted-foreground text-sm leading-relaxed">{topic.desc}</p>
      {topic.members && topic.members.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Users className="w-3 h-3" /> Researchers
          </p>
          <ul className="space-y-1">
            {topic.members.map((m) => (
              <li key={m.id} className="text-xs text-muted-foreground">
                {m.name}
                {m.role && <span className="text-muted-foreground/60"> — {m.role}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function PillarCard({ pillar, topics, pubLines, layman, emptyState }: PillarCardProps & { layman: string }) {
  const [showLayman, setShowLayman] = useState(false);
  const { t } = useLanguage();
  const Icon = pillar.icon;
  const c = pillar.color;

  const leftTopics  = topics.slice(0, LEFT_TOPIC_LIMIT);
  const rightTopics = topics.slice(LEFT_TOPIC_LIMIT);

  return (
    <section id={pillar.id} className="py-20 scroll-mt-24">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* ── Left column ── */}
          <div>
            <span
              className="mb-4 inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
              style={{ background: `${c}22`, color: c, border: `1px solid ${c}55` }}
            >
              {pillar.tag}
            </span>
            <h2 className="font-serif text-4xl font-bold mb-2 flex items-center gap-2">
              <Icon className="w-8 h-8" style={{ color: c }} />
              <span style={{ color: c }}>{pillar.title}</span>
            </h2>
            <p className="text-muted-foreground mb-8">{pillar.tagline}</p>

            {/* First 5 topics */}
            <div className="space-y-5">
              {emptyState ? (
                <div className="glass-card rounded-xl p-5 border border-dashed border-border text-center">
                  <FlaskConical className="w-6 h-6 mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground text-sm">
                    No research projects published for this pillar yet.
                  </p>
                </div>
              ) : (
                leftTopics.map((topic) => <TopicCard key={topic.title} topic={topic} />)
              )}
            </div>

            {/* Plain-language toggle */}
            <button
              onClick={() => setShowLayman(!showLayman)}
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-leaf-bright transition-colors"
            >
              {showLayman ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showLayman ? t.research.hide : t.research.show} {t.research.summary}
            </button>

            {showLayman && (
              <div className="mt-3 p-4 rounded-xl bg-accent/30 border border-border text-sm text-muted-foreground leading-relaxed animate-fade-in">
                {layman}
              </div>
            )}
          </div>

          {/* ── Right column ── */}
          <div className="flex flex-col gap-5">
            {/* Descriptive image */}
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img src={pillar.image} alt={pillar.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-charcoal/40" />
            </div>

            {/* Related publications */}
            {pubLines.length > 0 && (
              <div className="glass-card rounded-xl p-5 border border-border">
                <h4 className="font-serif font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {pillar.title}
                  <span className="opacity-60">— {t.research.relatedPubs}</span>
                </h4>
                <ul className="space-y-2">
                  {pubLines.map((pub) => (
                    <li key={pub} className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                      <span className="w-1.5 h-1.5 rounded-full bg-leaf-bright mt-2 shrink-0" />
                      <span className="group-hover:underline">{pub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Overflow topic cards (6th, 7th, 8th …) */}
            {rightTopics.map((topic) => <TopicCard key={topic.title} topic={topic} />)}
          </div>

        </div>
      </div>
      <div className="container mx-auto mt-16">
        <div className="section-divider" />
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Research({
  projects,
  publications,
  pillarContents,
}: {
  projects?: ResearchProject[] | null;
  publications?: Publication[] | null;
  pillarContents?: any[] | null;
}) {
  const { t } = useLanguage();

  const STATIC_TAGS = [t.research.p1, t.research.p2, t.research.p3];
  const STATIC_TAGLINES = [t.research.soilTag, t.research.wasteTag, t.research.socioTag];
  const STATIC_LAYMAN = [t.research.laymanSoil, t.research.laymanWaste, t.research.laymanSocio];

  // Build pillar sections from DB when available, otherwise fall back to hardcoded BASE_PILLARS.
  // KEY POINT: use the DB pillar.pillar string as the key so project/publication filtering works.
  const PILLARS: PillarSection[] = (pillarContents && pillarContents.length > 0)
    ? pillarContents.map((dbPillar, i) => {
        const dec = PILLAR_DECORATION[i % PILLAR_DECORATION.length];
        return {
          key: dbPillar.pillar,           // actual DB key — must match ResearchProject.pillar
          id: dec.id,
          icon: dec.icon,
          image: dec.image,
          color: dec.color,
          title: dbPillar.title,
          tag: STATIC_TAGS[i] ?? t.research.p1,
          tagline: dbPillar.tagline || STATIC_TAGLINES[i] || "",
          layman: dbPillar.laymanDesc || STATIC_LAYMAN[i] || "",
        };
      })
    : BASE_PILLARS.map((base, i) => {
        const dec = PILLAR_DECORATION[i];
        return {
          key: base.key,
          id: dec.id,
          icon: dec.icon,
          image: dec.image,
          color: dec.color,
          title: base.title,
          tag: STATIC_TAGS[i] ?? t.research.p1,
          tagline: STATIC_TAGLINES[i] ?? "",
          layman: STATIC_LAYMAN[i] ?? "",
        };
      });

  const STATIC_TOPICS: Record<string, TopicItem[]> = {
    SOIL_HEALTH: [
      { title: t.research.t1, desc: t.research.d1 },
      { title: t.research.t2, desc: t.research.d2 },
      { title: t.research.t3, desc: t.research.d3 },
    ],
    WASTE_VALORIZATION: [
      { title: t.research.t4, desc: t.research.d4 },
      { title: t.research.t5, desc: t.research.d5 },
      { title: t.research.t6, desc: t.research.d6 },
    ],
    SOCIO_ECONOMIC: [
      { title: t.research.t7, desc: t.research.d7 },
      { title: t.research.t8, desc: t.research.d8 },
      { title: t.research.t9, desc: t.research.d9 },
    ],
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-3/5 xl:w-2/3 flex items-center justify-end">
          <img src="/assets/page-bg/research.webp" alt="" className="h-full w-full object-contain object-right" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(15,10,5,0.45)" }} />
          <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,0.6) 50%, transparent 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,1) 38%, rgba(15,12,8,0.75) 52%, rgba(15,12,8,0.2) 70%, transparent 100%)" }} />
        <div className="container mx-auto relative z-10">
          <span className="tag-pill mb-4 inline-block">{t.research.heroSub}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            {t.research.heroTitle1} <span className="text-gradient-green">{t.research.heroTitle2}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t.research.heroDesc}
          </p>
          {/* Pillar nav anchors */}
          <div className="flex flex-wrap gap-3 mt-6">
            {PILLARS.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full transition-all"
                style={{ background: `${p.color}22`, color: p.color, border: `1px solid ${p.color}55` }}
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pillar sections */}
      {PILLARS.map((pillar) => {
        // projects === null/undefined → DB unavailable → use static topics
        // projects is array → DB available → show DB topics (or empty state)
        const dbAvailable = projects != null;
        const pillarProjects = dbAvailable
          ? projects.filter((pr) => pr.pillar === pillar.key)
          : null;

        const dbTopics: TopicItem[] | null =
          pillarProjects && pillarProjects.length > 0
            ? pillarProjects.map((pr) => ({
                title: pr.title,
                desc: pr.description || "Detailed description for this project has not yet been published.",
                members: pr.members ?? [],
              }))
            : pillarProjects !== null
            ? null  // DB available but no projects for this pillar → empty state
            : STATIC_TOPICS[pillar.key]; // DB unavailable → static fallback

        // Publications — DB publications for this pillar, fallback to static if none
        const pubAvailable = publications != null;
        const pillarPubs = pubAvailable
          ? publications.filter((pub) => pub.pillar === pillar.key)
          : null;
        const staticPubFallback = STATIC_PUBS[pillar.key] ?? [];
        const dbPubs =
          pillarPubs && pillarPubs.length > 0
            ? pillarPubs.map(formatPub)
            : pillarPubs !== null
            ? []                  // DB available but no publications for this pillar
            : staticPubFallback;  // DB unavailable → static fallback

        return (
          <PillarCard
            key={pillar.key}
            pillar={pillar}
            topics={dbTopics ?? []}
            pubLines={dbPubs}
            layman={pillar.layman}
            emptyState={dbTopics === null}
          />
        );
      })}
    </div>
  );
}






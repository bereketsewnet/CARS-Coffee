"use client";

import { useState } from "react";
import { Leaf, Recycle, Users, ChevronDown, ChevronUp, BookOpen, FlaskConical } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { ResearchProject, Publication } from "../../generated/prisma-client";

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
  const authorShort = p.authors.split(",")[0].trim() + (p.authors.includes(",") ? " et al." : "");
  return `${authorShort} (${p.year}) — ${p.title}`;
}

// ── Pillar config (decorative / structural) ──────────────────────────────────

const BASE_PILLARS = [
  {
    key: "SOIL_HEALTH",
    id: "soil",
    icon: Leaf,
    image: "/assets/research-soil.webp",
    accentColor: "text-leaf-bright",
    tagClass: "",
    title: "Valorization & Specialty Coffee",
  },
  {
    key: "WASTE_VALORIZATION",
    id: "waste",
    icon: Recycle,
    image: "/assets/research-waste.webp",
    accentColor: "text-coffee-light",
    tagClass: "tag-coffee",
    title: "Agro-Energy & Earth Care",
  },
  {
    key: "SOCIO_ECONOMIC",
    id: "socio",
    icon: Users,
    image: "/assets/research-socio.webp",
    accentColor: "text-leaf-bright",
    tagClass: "",
    title: "Bio-Extracted Innovation",
  },
] as const;

// ── PillarCard ────────────────────────────────────────────────────────────────

interface PillarCardProps {
  pillar: typeof BASE_PILLARS[number] & { tag: string; tagline: string; title: string };
  topics: { title: string; desc: string }[];
  pubLines: string[];
  emptyState?: boolean; // true when DB is connected but no projects for this pillar yet
}

function PillarCard({ pillar, topics, pubLines, layman, emptyState }: PillarCardProps & { layman: string }) {
  const [showLayman, setShowLayman] = useState(false);
  const { t } = useLanguage();
  const Icon = pillar.icon;

  return (
    <section id={pillar.id} className="py-20 scroll-mt-24">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left – content */}
          <div>
            <span className={`tag-pill mb-4 inline-block ${pillar.tagClass}`}>{pillar.tag}</span>
            <h2 className="font-serif text-4xl font-bold mb-2 flex items-center gap-2">
              <Icon className={`w-8 h-8 ${pillar.accentColor}`} />
              {pillar.title}
            </h2>
            <p className="text-muted-foreground mb-8">{pillar.tagline}</p>

            {/* Topics */}
            <div className="space-y-5">
              {emptyState ? (
                /* DB connected but no projects added for this pillar yet */
                <div className="glass-card rounded-xl p-5 border border-dashed border-border text-center">
                  <FlaskConical className="w-6 h-6 mx-auto mb-2 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground text-sm">
                    No research projects published for this pillar yet.
                  </p>
                </div>
              ) : (
                topics.map((topic) => (
                  <div key={topic.title} className="glass-card rounded-xl p-5 border border-border">
                    <h4 className="font-serif font-semibold text-base mb-2">{topic.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{topic.desc}</p>
                  </div>
                ))
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

          {/* Right – image + publications */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated mb-6">
              <img src={pillar.image} alt={pillar.title} className="w-full h-72 object-cover" />
              <div className="absolute inset-0 bg-charcoal/40" />
            </div>

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
}: {
  // null  = DB unavailable (error/disabled) – show full static fallback
  // []    = DB connected but no records yet – show DB-driven empty state per pillar
  // [...] = DB data – show real projects
  projects?: ResearchProject[] | null;
  publications?: Publication[] | null;
}) {
  const { t } = useLanguage();

  const PILLARS = [
    {
      ...BASE_PILLARS[0],
      tag: t.home.p1,
      tagline: t.research.soilTag,
    },
    {
      ...BASE_PILLARS[1],
      tag: t.home.p2,
      tagline: t.research.wasteTag,
    },
    {
      ...BASE_PILLARS[2],
      tag: t.home.p3,
      tagline: t.research.socioTag,
    },
  ];

  const STATIC_TOPICS: Record<string, { title: string; desc: string }[]> = {
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

  const LAYMAN: Record<string, string> = {
    SOIL_HEALTH: t.research.laymanSoil,
    WASTE_VALORIZATION: t.research.laymanWaste,
    SOCIO_ECONOMIC: t.research.laymanSocio,
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/page-bg/research.webp')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,12,8,0.97) 0%, rgba(15,12,8,0.97) 55%, rgba(15,12,8,0.5) 80%, rgba(15,12,8,0.05) 100%)' }} />
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
              <a key={p.id} href={`#${p.id}`} className={`tag-pill hover:bg-leaf/30 transition-colors ${p.tagClass}`}>
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

        const dbTopics: { title: string; desc: string }[] | null =
          pillarProjects && pillarProjects.length > 0
            ? pillarProjects.map((pr) => ({
                title: pr.title,
                desc:
                  pr.description ||
                  "Detailed description for this project has not yet been published.",
              }))
            : pillarProjects !== null
            ? null  // DB available but no projects for this pillar → empty state
            : STATIC_TOPICS[pillar.key]; // DB unavailable → static fallback

        // Publications — DB publications for this pillar, fallback to static if none
        const pubAvailable = publications != null;
        const pillarPubs = pubAvailable
          ? publications.filter((pub) => pub.pillar === pillar.key)
          : null;
        const dbPubs =
          pillarPubs && pillarPubs.length > 0
            ? pillarPubs.map(formatPub)
            : pillarPubs !== null
            ? []  // DB available but no publications for this pillar
            : STATIC_PUBS[pillar.key]; // DB unavailable → static fallback

        return (
          <PillarCard
            key={pillar.key}
            pillar={pillar}
            topics={dbTopics ?? []}          // null → [] triggers empty-state in PillarCard
            pubLines={dbPubs}
            layman={LAYMAN[pillar.key]}
            emptyState={dbTopics === null}   // true when DB up but pillar has no projects
          />
        );
      })}
    </div>
  );
}

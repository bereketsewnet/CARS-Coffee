"use client";

import { ArrowRight, Target, GitBranch, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const FRAMEWORK_STEPS = [
  { step: "01", label: "Bean Harvest",                          icon: "☕" },
  { step: "02", label: "Specialty Coffee Advanced Processing",   icon: "♻" },
  { step: "03", label: "Circular Agro-Energy & Earth Care",      icon: "🌿" },
  { step: "04", label: "Bio-Extracted Innovation Products",      icon: "🧪" },
  { step: "05", label: "Soil Enrichment",                        icon: "🌱" },
  { step: "06", label: "Better Crops",                           icon: "🌾" },
];

const STATIC_GOALS = [
  "Develop biochar and compost from coffee husk to improve soil fertility in smallholder farms",
  "Valorize coffee pulp and wastewater through biorefinery and treatment technologies",
  "Assess socio-economic impacts on coffee farmers and cooperatives",
  "Build local capacity through PhD training and knowledge transfer",
  "Create actionable policy briefs for national agricultural bodies",
  "Establish gender-inclusive and youth-focused extension programs",
];

const STATIC_WPS = [
  { wpId: "WP1", title: "Project Coordination",      lead: "UA Antwerp" },
  { wpId: "WP2", title: "Soil Health Research",      lead: "CTBE-AAU & UA" },
  { wpId: "WP3", title: "Waste Valorization",        lead: "CTBE-AAU" },
  { wpId: "WP4", title: "Socio-Economic Assessment", lead: "CTBE-AAU & IFPRI" },
  { wpId: "WP5", title: "Dissemination & Capacity",  lead: "All Partners" },
];

const STATIC_INFO = {
  vlirTitle:    "What is VLIR-UOS?",
  vlirP1:       "VLIR-UOS (Flemish Interuniversity Council – University Development Cooperation) supports partnerships between Flemish universities and institutions in the Global South. These \"Institutional University Cooperation\" projects build lasting academic and research capacity.",
  vlirP2:       "The Circular Coffee project is part of this framework, bringing together expertise in agronomy, food science, environmental engineering, and development economics.",
  problemTitle: "The Problem",
  problemList:  "Ethiopia produces ~400,000 tons of coffee waste annually\nCoffee husk & pulp pollute rivers and degrade farm soils\nSmalkholder farmers lose an estimated 30% of potential income\nNo integrated circular economy model exists at farm level\nLimited access to research-backed composting and valorization techniques",
};

type InfoRow = { vlirTitle: string; vlirP1: string; vlirP2: string; problemTitle: string; problemList: string } | null;
type GoalRow = { id: string; text: string; order: number };
type WpRow   = { id: string; wpId: string; title: string; lead: string; order: number };

export default function TheProject({
  info,
  goals: dbGoals,
  workPackages: dbWps,
}: {
  info?: InfoRow;
  goals?: GoalRow[];
  workPackages?: WpRow[];
}) {
  const { t } = useLanguage();

  const projectInfo = info ?? STATIC_INFO;
  const problemBullets = projectInfo.problemList
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const goalTexts = dbGoals && dbGoals.length > 0 ? dbGoals.map((g) => g.text) : STATIC_GOALS;
  const workPkgs  = dbWps   && dbWps.length   > 0 ? dbWps                      : STATIC_WPS;

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-3/5 xl:w-2/3 flex items-center justify-end">
          <img src="/assets/page-bg/the-project.webp" alt="" className="h-full w-full object-contain object-right" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(15,10,5,0.45)" }} />
          <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,0.6) 50%, transparent 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,1) 38%, rgba(15,12,8,0.75) 52%, rgba(15,12,8,0.2) 70%, transparent 100%)" }} />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="tag-pill mb-4 inline-block">{t.project.heroSub}</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              {t.project.heroTitle1}{" "}<span className="text-gradient-green">{t.project.heroTitle2}</span>{" "}{t.project.heroTitle3}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{t.project.heroDesc}</p>
          </div>
        </div>
      </section>

      {/* What is VLIR-UOS */}
      <section className="py-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="tag-pill mb-4 inline-block">{t.project.vlirSub}</span>
            <h2 className="font-serif text-3xl font-bold mb-5">{projectInfo.vlirTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{projectInfo.vlirP1}</p>
            <p className="text-muted-foreground leading-relaxed">{projectInfo.vlirP2}</p>
          </div>
          <div className="glass-card rounded-2xl p-8 border border-border">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive text-sm">!</span>
              {projectInfo.problemTitle}
            </h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              {problemBullets.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Circular Economy Model — 6 static stages */}
      <section className="py-20 bg-charcoal-mid">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="tag-pill mb-4 inline-block">{t.project.frameworkSub}</span>
            <h2 className="font-serif text-4xl font-bold">{t.project.frameworkTitle}</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {FRAMEWORK_STEPS.map((item, i) => (
                <div key={item.step} className="relative">
                  <div className="glass-card rounded-xl p-5 text-center border border-border h-full flex flex-col items-center">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div className="text-xs text-leaf-bright font-mono mb-1">{item.step}</div>
                    <p className="text-xs font-medium text-foreground leading-snug">{item.label}</p>
                  </div>
                  {i < FRAMEWORK_STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-2 z-10 -translate-y-1/2 w-4 h-4 rounded-full bg-leaf-bright items-center justify-center">
                      <ArrowRight className="w-2.5 h-2.5 text-background" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives & Work Packages */}
      <section className="py-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <span className="tag-pill mb-4 inline-block">{t.project.objSub}</span>
            <h2 className="font-serif text-3xl font-bold mb-6">
              <Target className="inline w-7 h-7 mr-2 text-leaf-bright" />
              {t.project.objTitle}
            </h2>
            <ul className="space-y-4">
              {goalTexts.map((text, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-leaf-bright mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="tag-pill tag-coffee mb-4 inline-block">{t.project.structSub}</span>
            <h2 className="font-serif text-3xl font-bold mb-6">
              <GitBranch className="inline w-7 h-7 mr-2 text-coffee-light" />
              {t.project.structTitle}
            </h2>
            <div className="space-y-3">
              {workPkgs.map((wp) => (
                <div key={wp.wpId} className="glass-card rounded-xl p-4 border border-border flex items-center gap-4">
                  <span className="tag-coffee font-mono text-xs shrink-0">{wp.wpId}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{wp.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.project.lead} {wp.lead}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

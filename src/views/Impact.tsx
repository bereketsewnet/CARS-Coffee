"use client";

import { Quote, Users, Briefcase, TrendingUp, Handshake, Leaf, Target, Globe } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { ImpactMetric } from "../../generated/prisma-client";
import type { LucideIcon } from "lucide-react";

const AREA_ICON_MAP: Record<string, LucideIcon> = {
  Users, Briefcase, TrendingUp, Handshake, Leaf, Target, Globe,
};
import dynamic from "next/dynamic";
import PartnersSection from "@/components/PartnersSection/PartnersSection";

const ProjectMap = dynamic(() => import("@/components/ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-border bg-muted animate-pulse" style={{ height: 480 }} />
  ),
});

type MetricDisplay = { value: string; label: string; sub: string };


type HeadingProp = { tag: string; title: string; subtitle: string } | null;

export default function Impact({
  metrics: dbMetrics,
  partners = [],
  impactSection = null,
  impactAreas = [],
  heading,
}: {
  metrics?: ImpactMetric[];
  partners?: any[];
  impactSection?: { tag: string; title: string } | null;
  impactAreas?: any[];
  heading?: HeadingProp;
}) {
  const { t } = useLanguage();

  const staticMetrics: MetricDisplay[] = [
    { value: "1,240", label: t.impact.m1l, sub: t.impact.m1s },
    { value: "340", label: t.impact.m2l, sub: t.impact.m2s },
    { value: "680", label: t.impact.m3l, sub: t.impact.m3s },
    { value: "22%", label: t.impact.m4l, sub: t.impact.m4s },
  ];

  const testimonials = [
    {
      quote: t.impact.t1q,
      name: t.impact.t1n,
      role: t.impact.t1r,
    },
    {
      quote: t.impact.t2q,
      name: t.impact.t2n,
      role: t.impact.t2r,
    },
  ];

  const metrics: MetricDisplay[] =
    dbMetrics && dbMetrics.length > 0
      ? dbMetrics.map((m) => ({ value: m.value, label: m.label, sub: m.notes ?? "" }))
      : staticMetrics;
  return (
    <div className="min-h-screen pt-24">
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-3/5 xl:w-2/3 flex items-center justify-end">
          <img src="/assets/page-bg/impact.webp" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(15,10,5,0.45)" }} />
          <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,0.6) 50%, transparent 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,1) 38%, rgba(15,12,8,0.75) 52%, rgba(15,12,8,0.2) 70%, transparent 100%)" }} />
        <div className="container mx-auto relative z-10">
          <span className="tag-pill mb-4 inline-block">{heading?.tag ?? t.impact.heroSub}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            {heading ? heading.title : <>{t.impact.heroTitle1} <span className="text-gradient-green">{t.impact.heroTitle2}</span></>}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {heading?.subtitle ?? t.impact.heroDesc}
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-serif text-4xl font-bold">{t.impact.metricsTitle}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="glass-card rounded-2xl p-6 border border-border text-center pillar-hover">
                <div className="font-serif text-3xl font-bold text-leaf-bright mb-1">{m.value}</div>
                <p className="text-sm font-semibold text-foreground">{m.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Socioeconomic Impact */}
      {(() => {
        const sectionTag   = impactSection?.tag   ?? "Socioeconomic Transformation";
        const sectionTitle = impactSection?.title ?? "Cultivating Community & Equitable Growth";
        const areas = impactAreas;
        if (areas.length === 0) return null;
        return (
          <section className="py-20 border-t border-border">
            <div className="container mx-auto">
              <div className="text-center mb-14">
                <span className="tag-pill mb-4 inline-block">{sectionTag}</span>
                <h2 className="font-serif text-4xl md:text-5xl font-bold">{sectionTitle}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {areas.map((area) => {
                  const Icon = AREA_ICON_MAP[area.icon] ?? Users;
                  return (
                    <div key={area.id} className="glass-card p-6 rounded-xl border border-border flex gap-4 items-start">
                      <div className="bg-leaf-bright/10 p-3 rounded-lg text-leaf-bright shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl font-semibold mb-2">{area.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{area.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Testimonials */}
      <section className="py-20 bg-charcoal-mid">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="tag-pill mb-4 inline-block">{t.impact.voicesSub}</span>
            <h2 className="font-serif text-4xl font-bold">{t.impact.voicesTitle}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <div key={t.name} className="glass-card rounded-2xl p-8 border border-border">
                <Quote className="w-8 h-8 text-leaf-bright/40 mb-4" />
                <p className="text-foreground text-base leading-relaxed mb-6 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center text-foreground font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <PartnersSection partners={partners} />

      {/* Interactive Map */}
      <section className="py-20 bg-charcoal-mid">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <span className="tag-pill mb-4 inline-block">{t.impact.fieldSub}</span>
            <h2 className="font-serif text-4xl font-bold mb-3">
              {t.impact.fieldTitle1} <span className="text-gradient-green">{t.impact.fieldTitle2}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              {t.impact.fieldDesc}
            </p>
          </div>
          <ProjectMap />
        </div>
      </section>
    </div>
  );
}

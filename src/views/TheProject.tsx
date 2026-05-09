"use client";

import { ArrowRight, Download, Target, GitBranch, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function TheProject() {
  const { t } = useLanguage();

  const objectives = t.project.objList;

  const workPackages = [
    { id: "WP1", title: t.project.wpTitles[0], color: "tag-coffee", lead: "UA Antwerp" },
    { id: "WP2", title: t.project.wpTitles[1], color: "tag-pill", lead: "CTBE-AAU & UA" },
    { id: "WP3", title: t.project.wpTitles[2], color: "tag-pill", lead: "CTBE-AAU" },
    { id: "WP4", title: t.project.wpTitles[3], color: "tag-pill", lead: "CTBE-AAU & IFPRI" },
    { id: "WP5", title: t.project.wpTitles[4], color: "tag-coffee", lead: "All Partners" },
  ];

  const frameworkSteps = [
    { step: "01", label: t.project.steps[0], icon: "☕" },
    { step: "02", label: t.project.steps[1], icon: "♻" },
    { step: "03", label: t.project.steps[2], icon: "🌿" },
    { step: "04", label: t.project.steps[3], icon: "🌱" },
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/page-bg/the-project.webp')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,12,8,0.97) 0%, rgba(15,12,8,0.97) 55%, rgba(15,12,8,0.5) 80%, rgba(15,12,8,0.05) 100%)' }} />
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="tag-pill mb-4 inline-block">{t.project.heroSub}</span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
              {t.project.heroTitle1}{" "}<span className="text-gradient-green">{t.project.heroTitle2}</span>{" "}{t.project.heroTitle3}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t.project.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* What is VLIR-UOS */}
      <section className="py-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="tag-pill mb-4 inline-block">{t.project.vlirSub}</span>
            <h2 className="font-serif text-3xl font-bold mb-5">{t.project.vlirTitle}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {t.project.vlirP1}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t.project.vlirP2}
            </p>
            {/* <a href="#" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-sm font-semibold border border-border text-foreground hover:border-leaf-bright/50 transition-all">
              <Download className="w-4 h-4" /> {t.project.downloadBrief}
            </a> */}
          </div>

          {/* Problem statement */}
          <div className="glass-card rounded-2xl p-8 border border-border">
            <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive text-sm">!</span>
              {t.project.problemTitle}
            </h3>
            <ul className="space-y-3 text-muted-foreground text-sm">
              {t.project.problemList.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Circular Economy Model */}
      <section className="py-20 bg-charcoal-mid">
        <div className="container mx-auto">
          <div className="text-center mb-14">
            <span className="tag-pill mb-4 inline-block">{t.project.frameworkSub}</span>
            <h2 className="font-serif text-4xl font-bold">{t.project.frameworkTitle}</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {frameworkSteps.map((item, i) => (
                <div key={item.step} className="relative">
                  <div className="glass-card rounded-xl p-5 text-center border border-border h-full">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div className="text-xs text-leaf-bright font-mono mb-1">{item.step}</div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:flex absolute top-1/2 -right-2 z-10 -translate-y-1/2 w-4 h-4 rounded-full bg-leaf-bright items-center justify-center">
                      <ArrowRight className="w-2.5 h-2.5 text-background" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <span className="tag-pill mb-4 inline-block">{t.project.objSub}</span>
            <h2 className="font-serif text-3xl font-bold mb-6">
              <Target className="inline w-7 h-7 mr-2 text-leaf-bright" />
              {t.project.objTitle}
            </h2>
            <ul className="space-y-4">
              {objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-leaf-bright mt-0.5 shrink-0" />
                  <span className="text-muted-foreground text-sm leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Work Packages */}
          <div>
            <span className="tag-pill tag-coffee mb-4 inline-block">{t.project.structSub}</span>
            <h2 className="font-serif text-3xl font-bold mb-6">
              <GitBranch className="inline w-7 h-7 mr-2 text-coffee-light" />
              {t.project.structTitle}
            </h2>
            <div className="space-y-3">
              {workPackages.map((wp) => (
                <div key={wp.id} className="glass-card rounded-xl p-4 border border-border flex items-center gap-4">
                  <span className={`${wp.color} font-mono text-xs shrink-0`}>{wp.id}</span>
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

"use client";

import { useState } from "react";
import { Linkedin, Globe, Twitter, Instagram, Link as LinkIcon, Building2 } from "lucide-react";
import type { Collaborator } from "../../generated/prisma-client";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const ROLE_ORDER = ["Executive Dean", "Vice Executive Dean", "CTBE-CARES-Support"];

const COLORS = ["gradient-green", "gradient-coffee"];

function initialsFromName(name: string) {
  return name.split(" ").filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join("");
}

function CollaboratorCard({ c, idx, categoryLabel }: { c: Collaborator; idx: number; categoryLabel: string }) {
  const color = COLORS[idx % COLORS.length];
  const [expanded, setExpanded] = useState(false);
  const LIMIT = 120;
  const isLong = (c.bio?.length ?? 0) > LIMIT;

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-border pillar-hover flex flex-col h-full group">
      {/* Photo or gradient initials */}
      <div className="aspect-square w-full relative overflow-hidden bg-card/50 flex-shrink-0">
        {c.imageUrl ? (
          <img
            src={c.imageUrl}
            alt={c.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full ${color} flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}>
            <span className="font-serif font-bold text-5xl text-foreground mix-blend-soft-light opacity-80">
              {initialsFromName(c.name)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-80" />

        {/* Social icons */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {c.linkedin && (
            <a href={c.linkedin} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#0077b5] transition-all shadow-sm">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {c.twitter && (
            <a href={c.twitter} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-black transition-all shadow-sm">
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {c.instagram && (
            <a href={c.instagram} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#E1306C] transition-all shadow-sm">
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {c.website && (
            <a href={c.website} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-leaf transition-all shadow-sm">
              <LinkIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-6 flex flex-col flex-1 relative z-10 bg-background/40 backdrop-blur-sm -mt-2">
        <div className="mb-4">
          <h3 className="font-serif font-bold text-xl leading-tight mb-1 group-hover:text-leaf-bright transition-colors">
            {c.name}
          </h3>
          {c.role && <p className="text-sm font-medium text-gradient-green">{c.role}</p>}
        </div>
        <div className="flex-1 space-y-3">
          {c.organisation && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="text-sm truncate">{c.organisation}</span>
            </div>
          )}
          {c.country && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-4 h-4 shrink-0" />
              <span className="text-sm">{c.country}</span>
            </div>
          )}
          {c.bio && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {expanded || !isLong ? c.bio : `${c.bio.slice(0, LIMIT)}…`}
              {isLong && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="ml-1 text-leaf-bright hover:underline text-xs font-medium"
                >
                  {expanded ? "See less" : "See more"}
                </button>
              )}
            </p>
          )}
        </div>
        <div className="mt-5 pt-4 border-t border-border/50">
          <span className="tag-pill text-xs shadow-sm bg-card/80 backdrop-blur-sm">
            {categoryLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Collaborations({ collaborators }: { collaborators: Collaborator[] | null }) {
  const { t } = useLanguage();

  const CATEGORY_LABELS: Record<string, string> = {
    GOVERNMENT: t.coordinators.catGov,
    SPONSOR:    t.coordinators.catSponsor,
    NGO:        t.coordinators.catNgo,
    ACADEMIC:   t.coordinators.catAcademic,
    INDUSTRY:   t.coordinators.catIndustry,
    OTHER:      t.coordinators.catOther,
  };

  const active = (collaborators ?? []).filter((c) => c.active);

  const groups = ROLE_ORDER.map((role) => ({
    role,
    members: active
      .filter((c) => c.role === role)
      .sort((a, b) => a.order - b.order),
  })).filter((g) => g.members.length > 0);

  // Collaborators with no matching role go into a catch-all group
  const ungrouped = active
    .filter((c) => !ROLE_ORDER.includes(c.role ?? ""))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        {/* Image pinned to the right, fully visible, not cropped */}
        <div className="absolute inset-y-0 right-0 w-3/5 xl:w-2/3 flex items-center justify-end">
          <img
            src="/assets/page-bg/Coordinators.webp"
            alt=""
            className="h-full w-full object-cover"
          />
          {/* Medium brown overlay on entire image */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(15,10,5,0.45)" }}
          />
          {/* Left-edge blend into dark background */}
          <div
            className="absolute inset-y-0 left-0 w-2/5 pointer-events-none"
            style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,0.6) 50%, transparent 100%)" }}
          />
        </div>
        {/* Main left-to-right shadow covering the text area */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,1) 38%, rgba(15,12,8,0.75) 52%, rgba(15,12,8,0.2) 70%, transparent 100%)" }}
        />
        <div className="container mx-auto relative z-10">
          <span className="tag-pill mb-4 inline-block">{t.coordinators.heroSub}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            <span className="text-gradient-green">{t.coordinators.heroTitle2}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t.coordinators.heroDesc}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="py-20">
        <div className="container mx-auto space-y-16">
          {groups.length === 0 && ungrouped.length === 0 ? (
            <p className="text-center text-muted-foreground py-24 text-lg">
              {t.coordinators.comingSoon}
            </p>
          ) : (
            <>
              {groups.map((g) => (
                <div key={g.role}>
                  <h2 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-8 h-1 rounded-full bg-leaf inline-block" />
                    {g.role}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {g.members.map((c, i) => (
                      <CollaboratorCard key={c.id} c={c} idx={i} categoryLabel={CATEGORY_LABELS[c.category] ?? c.category} />
                    ))}
                  </div>
                </div>
              ))}
              {ungrouped.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                    <span className="w-8 h-1 rounded-full bg-leaf inline-block" />
                    Other Coordinators
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ungrouped.map((c, i) => (
                      <CollaboratorCard key={c.id} c={c} idx={i} categoryLabel={CATEGORY_LABELS[c.category] ?? c.category} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Linkedin, Globe, Twitter, Instagram, Link as LinkIcon, Building2 } from "lucide-react";
import type { Collaborator } from "../../generated/prisma-client";

const CATEGORY_LABELS: Record<string, string> = {
  GOVERNMENT: "Government Officials",
  SPONSOR:    "Sponsors & Funders",
  NGO:        "NGO & Civil Society",
  ACADEMIC:   "Academic Partners",
  INDUSTRY:   "Industry Partners",
  OTHER:      "Other Partners",
};

const CATEGORY_ORDER = ["GOVERNMENT", "SPONSOR", "NGO", "ACADEMIC", "INDUSTRY", "OTHER"];

const COLORS = ["gradient-green", "gradient-coffee"];

function initialsFromName(name: string) {
  return name.split(" ").filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join("");
}

function CollaboratorCard({ c, idx }: { c: Collaborator; idx: number }) {
  const color = COLORS[idx % COLORS.length];
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-border pillar-hover flex flex-col h-full group">
      {/* Photo or gradient initials */}
      <div className="aspect-[4/3] w-full relative overflow-hidden bg-card/50 flex-shrink-0">
        {c.imageUrl ? (
          <img
            src={c.imageUrl}
            alt={c.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{c.bio}</p>
          )}
        </div>
        <div className="mt-5 pt-4 border-t border-border/50">
          <span className="tag-pill text-xs shadow-sm bg-card/80 backdrop-blur-sm">
            {CATEGORY_LABELS[c.category] ?? c.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Collaborations({ collaborators }: { collaborators: Collaborator[] | null }) {
  const groups = CATEGORY_ORDER.map((cat) => ({
    cat,
    label: CATEGORY_LABELS[cat],
    members: (collaborators ?? []).filter((c) => c.category === cat && c.active),
  })).filter((g) => g.members.length > 0);

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/page-bg/team.webp')" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,12,8,0.97) 0%, rgba(15,12,8,0.97) 55%, rgba(15,12,8,0.5) 80%, rgba(15,12,8,0.05) 100%)" }} />
        <div className="container mx-auto relative z-10">
          <span className="tag-pill mb-4 inline-block">Partner Coordination</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Our <span className="text-gradient-green">Collaborators</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Government officials, sponsors, civil society partners, and supporters who make the CARES mission possible.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="py-20">
        <div className="container mx-auto space-y-16">
          {groups.length === 0 ? (
            <p className="text-center text-muted-foreground py-24 text-lg">
              Collaborator profiles are coming soon.
            </p>
          ) : (
            groups.map((g) => (
              <div key={g.cat}>
                <h2 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 rounded-full bg-leaf inline-block" />
                  {g.label}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {g.members.map((c, i) => (
                    <CollaboratorCard key={c.id} c={c} idx={i} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

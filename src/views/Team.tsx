"use client";

import { Linkedin, Globe, Twitter, Instagram, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { TeamMember as DbMember } from "../../generated/prisma-client";

interface TeamMember {
  name: string;
  title: string;
  institution: string;
  focus: string;
  role: "PI" | "Co-Supervisor" | "PhD" | "Research Assistant";
  initials: string;
  color: string;
  imageUrl?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  website?: string | null;
}

const COLORS = ["gradient-green", "gradient-coffee"];

function deriveCategory(role: string): TeamMember["role"] {
  const r = role.toLowerCase();
  if (r.includes("principal")) return "PI";
  if (r.includes("co-supervisor") || r.includes("co supervisor"))
    return "Co-Supervisor";
  if (r.includes("phd") || r.includes("candidate") || r.includes("researcher"))
    return "PhD";
  return "Research Assistant";
}

function dbToMember(m: DbMember, idx: number): TeamMember {
  const initials = m.name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");
  return {
    name: m.name,
    title: m.role,
    institution: m.institution,
    focus: m.bio ?? m.role,
    role: deriveCategory(m.role),
    initials,
    color: COLORS[idx % COLORS.length],
    imageUrl: m.imageUrl ?? null,
    linkedin: (m as any).linkedin ?? null,
    twitter: (m as any).twitter ?? null,
    instagram: (m as any).instagram ?? null,
    website: (m as any).website ?? null,
  };
}

const staticTeam: TeamMember[] = [
  {
    name: "Prof. Dr. Jan De Moor",
    title: "Principal Investigator (North)",
    institution: "University of Antwerp",
    focus: "Circular Bioeconomy & Waste Valorization",
    role: "PI",
    initials: "JD",
    color: "gradient-green",
  },
  {
    name: "Prof. Dr. Tigist Alemu",
    title: "Principal Investigator (South)",
    institution: "Addis Ababa University",
    focus: "Soil Science & Agroecology",
    role: "PI",
    initials: "TA",
    color: "gradient-coffee",
  },
  {
    name: "Dr. Lena Verheyden",
    title: "Co-Supervisor",
    institution: "University of Antwerp",
    focus: "Environmental Engineering & Biorefinery",
    role: "Co-Supervisor",
    initials: "LV",
    color: "gradient-green",
  },
  {
    name: "Dr. Mulugeta Bekele",
    title: "Co-Supervisor",
    institution: "Hawassa University",
    focus: "Agricultural Economics",
    role: "Co-Supervisor",
    initials: "MB",
    color: "gradient-coffee",
  },
  {
    name: "Selamawit Tadesse",
    title: "PhD Candidate",
    institution: "AAU / UA Antwerp",
    focus: "Coffee Husk Compost Trials",
    role: "PhD",
    initials: "ST",
    color: "gradient-green",
  },
  {
    name: "Robel Getachew",
    title: "PhD Candidate",
    institution: "Addis Ababa University",
    focus: "Anaerobic Digestion Systems",
    role: "PhD",
    initials: "RG",
    color: "gradient-coffee",
  },
  {
    name: "Amina Desta",
    title: "PhD Candidate",
    institution: "AAU / IFPRI",
    focus: "Gender & Value Chain Analysis",
    role: "PhD",
    initials: "AD",
    color: "gradient-green",
  },
  {
    name: "Thomas Claeys",
    title: "PhD Candidate",
    institution: "University of Antwerp",
    focus: "Biochar Characterization",
    role: "PhD",
    initials: "TC",
    color: "gradient-coffee",
  },
];

const roleOrder = ["PI", "Co-Supervisor", "PhD", "Research Assistant"] as const;

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-border pillar-hover flex flex-col h-full group">
      <div className="aspect-[4/3] w-full relative overflow-hidden bg-card/50 flex-shrink-0">
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full ${member.color} flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}
          >
            <span className="font-serif font-bold text-5xl text-foreground mix-blend-soft-light opacity-80 shadow-sm">
              {member.initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent opacity-80" />
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#0077b5] transition-all shadow-sm">
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {member.twitter && (
             <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-black transition-all shadow-sm">
             <Twitter className="w-4 h-4" />
           </a>
          )}
          {member.instagram && (
            <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#E1306C] transition-all shadow-sm">
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {member.website && (
            <a href={member.website} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-leaf transition-all shadow-sm">
              <LinkIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1 relative z-10 bg-background/40 backdrop-blur-sm -mt-2">
        <div className="mb-4">
          <h3 className="font-serif font-bold text-xl leading-tight mb-1 group-hover:text-leaf-bright transition-colors">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-gradient-green">{member.title}</p>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe className="w-4 h-4 shrink-0" />
            <span className="text-sm truncate">
              {member.institution}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {member.focus}
          </p>
        </div>
        <div className="mt-5 pt-4 border-t border-border/50 flex items-start">
          <span className="tag-pill text-xs shadow-sm bg-card/80 backdrop-blur-sm">{member.role}</span>
        </div>
      </div>
    </div>
  );
}

export default function Team({ members: dbMembers }: { members?: DbMember[] | null }) {
  const { t } = useLanguage();

  const roleLabels = {
    PI: t.team.pi,
    "Co-Supervisor": t.team.coSupervise,
    PhD: t.team.phd,
    "Research Assistant": t.team.ra,
  };

  // null or undefined = DB unavailable → show static fallback
  // [] = DB connected but no active members
  // [...] = show DB members
  const team: TeamMember[] =
    dbMembers != null && dbMembers.length > 0
      ? dbMembers.map(dbToMember)
      : dbMembers == null
      ? staticTeam   // DB unavailable → static
      : [];          // DB up but no active members
  return (
    <div className="min-h-screen pt-24">
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/page-bg/team.webp')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,12,8,0.97) 0%, rgba(15,12,8,0.97) 55%, rgba(15,12,8,0.5) 80%, rgba(15,12,8,0.05) 100%)' }} />
        <div className="container mx-auto relative z-10">
          <span className="tag-pill mb-4 inline-block">{t.team.heroSub}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            {t.team.heroTitle1} <span className="text-gradient-green">{t.team.heroTitle2}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t.team.heroDesc}
          </p>
        </div>
      </section>

      <div className="py-20">
        <div className="container mx-auto space-y-16">
          {roleOrder.map((role) => {
            const members = team.filter((m) => m.role === role);
            if (!members.length) return null;
            return (
              <div key={role}>
                <h2 className="font-serif text-2xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 rounded-full bg-leaf inline-block" />
                  {roleLabels[role]}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {members.map((m) => (
                    <MemberCard key={m.name} member={m} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

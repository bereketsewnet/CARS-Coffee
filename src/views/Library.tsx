"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  ExternalLink,
  FileText,
  BookOpen,
  FileBarChart,
  Presentation,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Publication as DbPub } from "../../generated/prisma-client";

type PubType = "All" | "Journal" | "Policy Brief" | "Manual" | "Poster" | "Conference" | "Report";

const TYPE_MAP: Record<string, PubType> = {
  JOURNAL: "Journal",
  POLICY_BRIEF: "Policy Brief",
  MANUAL: "Manual",
  CONFERENCE: "Conference",
  REPORT: "Report",
};

type PubRow = {
  id: string;
  title: string;
  authors: string;
  year: number;
  type: PubType;
  pillar: string | null;
  doi: string | null;
  url: string | null;
  pdfUrl: string | null;
};

function dbToPubRow(p: DbPub): PubRow {
  return {
    id: p.id,
    title: p.title,
    authors: p.authors,
    year: p.year,
    type: TYPE_MAP[p.type] ?? "Journal",
    pillar: p.pillar ?? null,
    doi: p.doi,
    url: p.url,
    pdfUrl: (p as any).pdfUrl ?? null,
  };
}

const typeIcon = {
  Journal: BookOpen,
  "Policy Brief": FileBarChart,
  Manual: FileText,
  Poster: Presentation,
  Conference: Presentation,
  Report: FileBarChart,
};

type HeadingProp = { tag: string; title: string; subtitle: string } | null;

export default function Library({
  publications: dbPublications,
  pillarContents = [],
  heading,
}: {
  publications?: DbPub[];
  pillarContents?: Array<{ pillar: string; title: string }>;
  heading?: HeadingProp;
}) {
  const { t } = useLanguage();

  const publications: PubRow[] = (dbPublications ?? []).map(dbToPubRow);

  // Map DB pillar key → display title (e.g. "SOIL1234" → "Soil Health & Biochar")
  const pillarLabelMap: Record<string, string> = Object.fromEntries(
    pillarContents.map((pc) => [pc.pillar, pc.title])
  );
  function pillarLabel(key: string | null) {
    if (!key) return null;
    return pillarLabelMap[key] ?? key;
  }

  const typeLabels: Record<PubType, string> = {
    All: t.library.types.all,
    Journal: t.library.types.journal,
    "Policy Brief": t.library.types.policy,
    Manual: t.library.types.manual,
    Poster: t.library.types.poster,
    Conference: t.library.types.conference,
    Report: t.library.types.report,
  };

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<PubType>("All");
  const [pillarFilter, setPillarFilter] = useState<string>("All");
  const [yearFilter, setYearFilter] = useState("All");

  const filtered = publications.filter((p) => {
    const q = query.toLowerCase();
    const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.authors.toLowerCase().includes(q);
    const matchesType = typeFilter === "All" || p.type === typeFilter;
    const matchesPillar = pillarFilter === "All" || p.pillar === pillarFilter;
    const matchesYear = yearFilter === "All" || p.year.toString() === yearFilter;
    return matchesQuery && matchesType && matchesPillar && matchesYear;
  });

  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [query, typeFilter, pillarFilter, yearFilter]);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const types: PubType[] = [
    "All",
    ...(Array.from(new Set(publications.map((p) => p.type))).sort() as PubType[]),
  ];

  // Build pillar filter options from actual DB publication pillar values, in pillarContents order
  const pubPillarKeys = new Set(publications.map((p) => p.pillar).filter(Boolean) as string[]);
  const orderedPillarKeys = pillarContents
    .map((pc) => pc.pillar)
    .filter((k) => pubPillarKeys.has(k));
  // Include any pillar keys in publications not covered by pillarContents
  const extraKeys = [...pubPillarKeys].filter((k) => !orderedPillarKeys.includes(k));
  const allPillarKeys = ["All", ...orderedPillarKeys, ...extraKeys];

  const years = [
    "All",
    ...Array.from(new Set(publications.map((p) => p.year.toString()))).sort((a, b) => Number(b) - Number(a)),
  ];

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-3/5 xl:w-2/3 flex items-center justify-end">
          <img src="/assets/page-bg/library.webp" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(15,10,5,0.45)" }} />
          <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,0.6) 50%, transparent 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,1) 38%, rgba(15,12,8,0.75) 52%, rgba(15,12,8,0.2) 70%, transparent 100%)" }} />
        <div className="container mx-auto relative z-10">
          <span className="tag-pill mb-4 inline-block">{heading?.tag ?? t.library.heroSub}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            {heading ? heading.title : <>{t.library.heroTitle1} <span className="text-gradient-green">{t.library.heroTitle2}</span></>}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {heading?.subtitle ?? t.library.heroDesc}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          {/* Search & Filters */}
          <div className="glass-card rounded-2xl p-6 border border-border mb-8">
            <div className="relative mb-5">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t.library.searchPlaceholder}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-leaf/50"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
                  Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {types.map((tKey) => (
                    <button
                      key={tKey}
                      onClick={() => setTypeFilter(tKey)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${typeFilter === tKey ? "bg-leaf text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                    >
                      {typeLabels[tKey]}
                    </button>
                  ))}
                </div>
              </div>
              {allPillarKeys.length > 1 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
                    Research Pillar
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {allPillarKeys.map((k) => (
                      <button
                        key={k}
                        onClick={() => setPillarFilter(k)}
                        className={`text-xs px-3 py-1.5 rounded-full transition-colors ${pillarFilter === k ? "bg-leaf text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                      >
                        {k === "All" ? t.library.pillars.all : (pillarLabelMap[k] ?? k)}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
                  Year
                </p>
                <div className="flex flex-wrap gap-2">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setYearFilter(y)}
                      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${yearFilter === y ? "bg-coffee text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <p className="text-sm text-muted-foreground mb-5">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="space-y-4">
            {paged.map((pub) => {
              const Icon = typeIcon[pub.type] || FileText;
              const externalHref = pub.doi
                ? `https://doi.org/${pub.doi}`
                : (pub.url ?? null);
              return (
                <div
                  key={pub.title}
                  className="glass-card rounded-xl p-5 border border-border hover:border-leaf-bright/30 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-leaf-bright" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {pub.pillar && <span className="tag-pill text-xs">{pillarLabel(pub.pillar)}</span>}
                        <span className="tag-pill tag-coffee text-xs">
                          {typeLabels[pub.type]}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {pub.year}
                        </span>
                        {pub.pdfUrl && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-leaf/10 text-leaf-bright border border-leaf/20 font-medium">
                            PDF
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif font-semibold text-base text-foreground group-hover:text-leaf-bright transition-colors mb-1">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {pub.authors}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {externalHref && (
                        <a
                          href={externalHref}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-leaf-bright"
                          title={t.library.viewDoc}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {pub.pdfUrl ? (
                        <a
                          href={pub.pdfUrl}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg hover:bg-leaf/20 transition-colors text-leaf-bright hover:text-leaf-bright"
                          title={t.library.download}
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      ) : (
                        <button
                          disabled
                          className="p-2 rounded-lg text-muted-foreground/30 cursor-not-allowed"
                          title="No PDF available"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Pagination */}
            {pageCount > 1 && filtered.length > 0 && (
              <div className="flex items-center justify-center gap-1 pt-10">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  aria-label="Previous page"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: pageCount }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      pageCount <= 7 ||
                      p === 1 ||
                      p === pageCount ||
                      Math.abs(p - currentPage) <= 1,
                  )
                  .reduce<(number | "...")[]>((acc, p) => {
                    if (
                      acc.length > 0 &&
                      typeof acc[acc.length - 1] === "number" &&
                      p - (acc[acc.length - 1] as number) > 1
                    )
                      acc.push("...");
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === "..." ? (
                      <span
                        key={`d${i}`}
                        className="w-9 h-9 flex items-center justify-center text-muted-foreground text-sm"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p as number)}
                        aria-current={p === currentPage ? "page" : undefined}
                        className={`inline-flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-lg text-sm font-medium transition-colors ${
                          p === currentPage
                            ? "bg-leaf text-secondary-foreground"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(pageCount, p + 1))
                  }
                  disabled={currentPage >= pageCount}
                  aria-label="Next page"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No publications match your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

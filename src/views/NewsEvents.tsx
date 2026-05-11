"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, ChevronLeft, ChevronRight, Microscope, Handshake, Newspaper, Leaf } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { NewsEvent as DbNewsEvent } from "../../generated/prisma-client";

type Timing = "all" | "upcoming" | "past";

type NewsTag =
  | "ACADEMIC_AND_CAPACITY"
  | "FIELDWORK_AND_SOCIETAL"
  | "GOVERNANCE_AND_PARTNERSHIP"
  | "ADMINISTRATIVE"
  | "OPEN_CALLS";

const TAG_LABELS: Record<string, string> = {
  ACADEMIC_AND_CAPACITY: "Academic & Capacity Building",
  FIELDWORK_AND_SOCIETAL: "Fieldwork & Societal Uptake",
  GOVERNANCE_AND_PARTNERSHIP: "Governance & Partnership",
  ADMINISTRATIVE: "Administrative Updates",
  OPEN_CALLS: "Open Calls & Opportunities",
};

const TAG_FILTER_OPTIONS: { value: NewsTag | null; label: string }[] = [
  { value: null, label: "All" },
  { value: "ACADEMIC_AND_CAPACITY", label: "Academic & Capacity" },
  { value: "FIELDWORK_AND_SOCIETAL", label: "Fieldwork & Societal" },
  { value: "GOVERNANCE_AND_PARTNERSHIP", label: "Governance & Partnership" },
  { value: "ADMINISTRATIVE", label: "Administrative" },
  { value: "OPEN_CALLS", label: "Open Calls" },
];

const TYPE_LABELS: Record<string, string> = {
  FIELD_NEWS: "Field News",
  ACADEMIC_NEWS: "Academic News",
  EVENT: "Event",
};

type PostItem = {
  id: string;
  title: string;
  date: string;
  type: string;
  tag: string | null;
  excerpt: string | null;
  upcoming: boolean;
  image: string | null;
};

function dbToPost(item: DbNewsEvent): PostItem {
  return {
    id: item.id,
    title: item.title,
    date:
      item.date instanceof Date
        ? item.date.toISOString().split("T")[0]
        : String(item.date),
    type: item.type,
    tag: (item as any).tag ?? null,
    excerpt: item.excerpt,
    upcoming: item.status === "UPCOMING",
    image: item.imageUrl ?? null,
  };
}

function typeTheme(type: string) {
  if (type === "EVENT") return {
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    hoverGlow: "group-hover:bg-amber-500/5",
    Icon: Calendar,
  };
  if (type === "ACADEMIC_NEWS") return {
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    hoverGlow: "group-hover:bg-blue-400/5",
    Icon: Microscope,
  };
  // FIELD_NEWS default
  return {
    color: "text-leaf-bright",
    bg: "bg-leaf-bright/10",
    hoverGlow: "group-hover:bg-leaf-bright/5",
    Icon: Leaf,
  };
}

type HeadingProp = { tag: string; title: string; subtitle: string } | null;

export default function NewsEvents({
  items: dbItems,
  heading,
}: {
  items?: DbNewsEvent[];
  heading?: HeadingProp;
}) {
  const { t } = useLanguage();

  const posts: PostItem[] = (dbItems ?? []).map(dbToPost);

  const [selectedTag, setSelectedTag] = useState<NewsTag | null>(null);
  const [timing, setTiming] = useState<Timing>("all");

  const filtered = posts.filter((p) => {
    const matchTag = selectedTag === null || p.tag === selectedTag;
    const matchTiming =
      timing === "all" || (timing === "upcoming" ? p.upcoming : !p.upcoming);
    return matchTag && matchTiming;
  });

  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag, timing]);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-3/5 xl:w-2/3 flex items-center justify-end">
          <img src="/assets/page-bg/news.webp" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(15,10,5,0.45)" }} />
          <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,0.6) 50%, transparent 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,1) 38%, rgba(15,12,8,0.75) 52%, rgba(15,12,8,0.2) 70%, transparent 100%)" }} />
        <div className="container mx-auto relative z-10">
          <span className="tag-pill mb-4 inline-block">{heading?.tag ?? t.news.heroSub}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            {heading ? heading.title : <>{t.news.heroTitle1} <span className="text-gradient-green">{t.news.heroTitle2}</span></>}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {heading?.subtitle ?? t.news.heroDesc}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="flex flex-col gap-4 mb-10">
            {/* Timing filter */}
            <div className="flex gap-2">
              {(["all", "upcoming", "past"] as Timing[]).map((tim) => (
                <button
                  key={tim}
                  onClick={() => setTiming(tim)}
                  className={`text-sm px-4 py-2 rounded-full capitalize transition-colors ${timing === tim ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {tim === "all" ? t.news.all : tim === "upcoming" ? t.news.upcoming : t.news.past}
                </button>
              ))}
            </div>

            {/* Tag filter */}
            <div className="flex flex-wrap gap-2">
              {TAG_FILTER_OPTIONS.map(({ value, label }) => (
                <button
                  key={label}
                  onClick={() => setSelectedTag(value)}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-colors ${selectedTag === value ? "bg-leaf text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  <Tag className="w-3 h-3" /> {label}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((post) => {
              const { color, bg, hoverGlow, Icon } = typeTheme(post.type);

              return (
                <Link
                  key={post.id}
                  href={`/news/${encodeURIComponent(post.id)}`}
                  className="group flex flex-col p-8 rounded-3xl bg-charcoal border border-border hover:border-border/80 shadow-sm transition-all duration-500 relative overflow-hidden h-full"
                >
                  {/* Subtle top interior glow on hover */}
                  <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${hoverGlow} to-transparent opacity-0 transition-opacity duration-500 pointer-events-none`} />

                  {/* Optional faded background image if an image exists */}
                  {post.image && (
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                      <img src={post.image} alt="" className="w-full h-full object-cover grayscale mix-blend-overlay" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Icon + Type + Date */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${color}`} strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className={`block text-sm font-bold tracking-wide ${color}`}>
                          {TYPE_LABELS[post.type] ?? post.type}
                        </span>
                        <div className="flex gap-2 items-center mt-0.5">
                          <span className="block text-xs text-muted-foreground uppercase tracking-wider">
                            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                          {post.upcoming && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-leaf/20 text-leaf-bright border border-leaf/30 uppercase tracking-widest font-bold">
                              Upcoming
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-semibold text-2xl leading-snug mb-4 text-foreground group-hover:text-leaf-bright transition-colors">
                      {post.title}
                    </h3>

                    {/* Tag pill */}
                    {post.tag && (
                      <span className="inline-block mb-4 text-xs px-2.5 py-1 rounded-full bg-muted border border-border text-muted-foreground w-fit">
                        {TAG_LABELS[post.tag] ?? post.tag}
                      </span>
                    )}

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-10 line-clamp-3 font-sans">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Footer / Read More linked text */}
                    <div className="mt-auto pt-6 border-t border-border">
                      <div className={`flex items-center gap-2 text-sm font-bold tracking-wide ${color}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

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

          {posts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-lg font-medium mb-2">No news published yet.</p>
              <p className="text-sm">Check back soon for project updates and events.</p>
            </div>
          )}
          {posts.length > 0 && filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p>No posts match your current filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

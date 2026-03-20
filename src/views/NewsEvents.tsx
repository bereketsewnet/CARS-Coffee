"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Tag, ArrowRight, ChevronLeft, ChevronRight, Microscope, Handshake, Newspaper } from "lucide-react";
import type { NewsEvent as DbNewsEvent } from "../../generated/prisma-client";

type Category =
  | "All"
  | "Research"
  | "Event"
  | "Partnership"
  | "Policy"
  | "News";
type Timing = "all" | "upcoming" | "past";

type PostItem = {
  id: string;
  title: string;
  date: string;
  category: Category;
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
    category: item.type === "EVENT" ? "Event" : "News",
    excerpt: item.excerpt,
    upcoming: item.status === "UPCOMING",
    image: item.imageUrl ?? null,
  };
}



const categoryColors: Record<string, string> = {
  All: "",
  Research: "tag-pill",
  Event: "tag-coffee",
  Partnership: "tag-pill",
  Policy: "tag-coffee",
  News: "tag-pill",
};

export default function NewsEvents({
  items: dbItems,
}: {
  items?: DbNewsEvent[];
}) {
  const posts: PostItem[] = (dbItems ?? []).map(dbToPost);

  const categories: Category[] = [
    "All",
    ...(Array.from(new Set(posts.map((p) => p.category))) as Category[]),
  ];
  const [cat, setCat] = useState<Category>("All");
  const [timing, setTiming] = useState<Timing>("all");

  const filtered = posts.filter((p) => {
    const matchCat = cat === "All" || p.category === cat;
    const matchTiming =
      timing === "all" || (timing === "upcoming" ? p.upcoming : !p.upcoming);
    return matchCat && matchTiming;
  });

  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [cat, timing]);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE) || 1;
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="min-h-screen pt-24">
      <section className="py-20 bg-charcoal-mid relative overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/page-bg/news.webp')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(15,12,8,0.97) 0%, rgba(15,12,8,0.97) 55%, rgba(15,12,8,0.5) 80%, rgba(15,12,8,0.05) 100%)' }} />
        <div className="container mx-auto relative z-10">
          <span className="tag-pill mb-4 inline-block">Stay Updated</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            News &amp; <span className="text-gradient-green">Events</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Project milestones, field stories, upcoming events, and policy
            updates.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center mb-10">
            <div className="flex gap-2">
              {(["all", "upcoming", "past"] as Timing[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTiming(t)}
                  className={`text-sm px-4 py-2 rounded-full capitalize transition-colors ${timing === t ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="h-5 w-px bg-border hidden sm:block" />
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-colors ${cat === c ? "bg-leaf text-secondary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  <Tag className="w-3 h-3" /> {c}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((post) => {
              const isEvent = post.category === "Event";
              const isPartnership = post.category === "Partnership";
              const isResearch = post.category === "Research";

              const themeColor = isEvent
                ? "text-amber-500"
                : isPartnership
                  ? "text-blue-400"
                  : isResearch
                    ? "text-leaf-bright"
                    : "text-purple-400"; // default for News/Policy

              const themeBg = isEvent
                ? "bg-amber-500/10"
                : isPartnership
                  ? "bg-blue-400/10"
                  : isResearch
                    ? "bg-leaf-bright/10"
                    : "bg-purple-400/10";

              const themeHoverGlow = isEvent
                ? "group-hover:bg-amber-500/5"
                : isPartnership
                  ? "group-hover:bg-blue-400/5"
                  : isResearch
                    ? "group-hover:bg-leaf-bright/5"
                    : "group-hover:bg-purple-400/5";

              // Icon logic
              const Icon = isEvent ? Calendar : isPartnership ? Handshake : isResearch ? Microscope : Newspaper;

              return (
                <Link
                  key={post.id}
                  href={`/news/${encodeURIComponent(post.id)}`}
                  className="group flex flex-col p-8 rounded-3xl bg-charcoal border border-border hover:border-border/80 shadow-sm transition-all duration-500 relative overflow-hidden h-full"
                >
                  {/* Subtle top interior glow on hover */}
                  <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${themeHoverGlow} to-transparent opacity-0 transition-opacity duration-500 pointer-events-none`} />

                  {/* Optional faded background image if an image exists */}
                  {post.image && (
                    <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                      <img src={post.image} alt="" className="w-full h-full object-cover grayscale mix-blend-overlay" />
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Icon + Tag */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-12 h-12 rounded-full ${themeBg} flex items-center justify-center shrink-0`}>
                        <Icon className={`w-5 h-5 ${themeColor}`} strokeWidth={2.5} />
                      </div>
                      <div>
                        <span className={`block text-sm font-bold tracking-wide ${themeColor}`}>
                          {post.category}
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

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-10 line-clamp-3 font-sans">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Footer / Read More linked text */}
                    <div className="mt-auto pt-6 border-t border-border">
                      <div className={`flex items-center gap-2 text-sm font-bold tracking-wide ${themeColor}`}>
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

"use client";

import Link from "next/link";
import { Calendar, Tag, MapPin, ArrowLeft, Clock } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function NewsDetailView({ item }: { item: any }) {
  const { t } = useLanguage();

  const isUpcoming = item.status === "UPCOMING";
  const isEvent = item.type === "EVENT";
  const categoryLabel = isEvent ? t.newsDetail.eventStr : t.newsDetail.newsStr;

  const formattedDate =
    item.date instanceof Date
      ? item.date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : String(item.date);

  const paragraphs = item.content
    ? item.content
        .split(/\n\n+/)
        .map((p: string) => p.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      {/* Premium Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-b border-border/40">
        {/* Dynamic Background */}
        {item.imageUrl ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.imageUrl})` }}
            />
            <div className="absolute inset-0 bg-background/80" style={{ backdropFilter: "blur(40px)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-charcoal-mid" />
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-leaf-bright/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
          </>
        )}
        
        <div className="container mx-auto max-w-4xl relative z-10 px-4 md:px-8 lg:px-0">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-leaf-bright transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            {t.newsDetail.back}
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`tag-pill flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase ${isEvent ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' : 'text-leaf-bright bg-leaf-bright/10 border-leaf-bright/20'}`}>
              <Tag className="w-3.5 h-3.5" /> {categoryLabel}
            </span>
            {isUpcoming && (
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-leaf/20 text-leaf-bright border border-leaf/30 uppercase tracking-widest font-bold">
                {t.newsDetail.upcomingStr}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-showcase font-bold leading-tight mb-8 text-foreground">
            {item.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-muted-foreground border-l-2 border-border pl-4">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-leaf-bright" />
              {formattedDate}
            </span>
            {item.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-leaf-bright" />
                {item.location}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-leaf-bright" />
              {isEvent ? (isUpcoming ? t.newsDetail.upcomingEvent : t.newsDetail.pastEvent) : t.newsDetail.published}
            </span>
          </div>
        </div>
      </section>

      {/* Floating Cover Image */}
      {item.imageUrl && (
        <div className="container mx-auto max-w-5xl px-4 md:px-8 -mt-16 md:-mt-24 relative z-20 mb-16 lg:mb-24">
          <div className="rounded-3xl overflow-hidden border border-border/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] h-[400px] md:h-[500px] lg:h-[600px] group bg-charcoal">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out group-hover:scale-110"
            />
          </div>
        </div>
      )}

      {/* Story Body */}
      <section className={`pb-20 ${!item.imageUrl ? "pt-20" : ""}`}>
        <div className="container mx-auto max-w-3xl px-4 md:px-8">
          {item.excerpt && (
            <p className="text-xl md:text-3xl text-foreground font-serif leading-relaxed mb-16 border-l-4 border-leaf-bright pl-6 md:pl-8 italic">
              {item.excerpt}
            </p>
          )}

          {paragraphs.length > 0 ? (
            <div className="space-y-8">
              {paragraphs.map((para: string, i: number) => (
                <p 
                  key={i} 
                  className={`text-muted-foreground leading-relaxed ${i === 0 && !item.excerpt ? "text-xl md:text-2xl text-foreground font-medium" : "text-lg"}`}
                >
                  {para}
                </p>
              ))}
            </div>
          ) : (
            !item.excerpt && (
              <div className="text-center py-24 bg-charcoal-mid/50 rounded-3xl border border-border/50 backdrop-blur-sm">
                <p className="text-muted-foreground italic text-lg">
                  {t.newsDetail.unpub}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Footer nav */}
      <div className="container mx-auto max-w-3xl px-4 md:px-8">
        <div className="pt-10 border-t border-border/50">
          <Link
            href="/news"
            className="inline-flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-leaf-bright hover:text-white transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-leaf-bright/10 flex items-center justify-center transition-colors group-hover:bg-leaf-bright/30">
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            </div>
            {t.newsDetail.returnToDir}
          </Link>
        </div>
      </div>
    </div>
  );
}

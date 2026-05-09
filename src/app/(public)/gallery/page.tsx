"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import { Folder, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface GalleryImage {
  id: number;
  filename: string;
  url: string;
  title: string;
  category: string;
  date: string;
  caption: string;
}

// 1. Memoized Filmstrip Track to absolutely prevent React from re-rendering it 
// and dropping frames when currentIndex ticks over.
const FilmstripGrid = memo(({ 
  images, 
  filmstripRef, 
  handleMouseDown, 
  handleMouseMove, 
  handleMouseUpOrLeave, 
  isDraggingRef,
  setCurrentIndex
}: any) => {
  return (
    <div 
      ref={filmstripRef}
      className="w-full overflow-x-hidden flex gap-4 pb-2"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      style={{ 
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        cursor: isDraggingRef.current ? "grabbing" : "grab"
      }}
    >
      {[...images, ...images].map((img: GalleryImage, i: number) => {
        const actualIndex = i % images.length;
        return (
          <div 
            key={`${img.id}-${i}`}
            data-index={actualIndex}
            onClick={() => {
              if (isDraggingRef.current) return;
              setCurrentIndex(actualIndex);
            }}
            className="thumb-item flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden relative cursor-pointer transition-all duration-300 opacity-50 saturate-50 hover:opacity-100"
          >
            <img src={img.url} alt="thumb" loading="lazy" className="w-full h-full object-cover pointer-events-none select-none" />
          </div>
        );
      })}
    </div>
  );
});
FilmstripGrid.displayName = "FilmstripGrid";

export default function GalleryPage() {
  const { t, lang } = useLanguage();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Layout Refs
  const viewportRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const [isFilmstripHovered, setIsFilmstripHovered] = useState(false);
  const [isMainHovered, setIsMainHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleViewportMouseMove = (e: React.MouseEvent) => {
    if (!viewportRef.current) return;
    const rect = viewportRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 5,
      y:  (x / (rect.width  / 2)) * 5,
    });
  };

  const handleViewportMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsMainHovered(false);
  };

  useEffect(() => {
    fetch("/cares-gallery/images.json")
      .then((r) => r.json())
      .then((files: string[]) => {
        const parsed = files.map((f, i) => ({
          id: i,
          filename: f,
          url: "/cares-gallery/" + encodeURIComponent(f),
          title: t.gallery.fieldRecord + " " + f.replace(/\.(webp|jpg|png|jpeg)$/i, "").replace(/[-_]/g, " ").toUpperCase(),
          category: "SURVEY DATA",
          date: "2026-ARCHIVE",
          caption: t.gallery.caption
        }));
        setImages(parsed);
      })
      .catch((err) => console.error("Failed to load gallery images", err));
  }, [t.gallery]);

  // 1. Native DOM class injection to avoid React layout thrashing on tick
  useEffect(() => {
    if (!filmstripRef.current || images.length === 0) return;
    const thumbs = filmstripRef.current.querySelectorAll('.thumb-item');
    thumbs.forEach((t) => {
      const idx = parseInt(t.getAttribute('data-index') || '-1', 10);
      if (idx === currentIndex) {
        t.classList.add('border-2', 'border-leaf-bright', 'saturate-110', 'brightness-110', 'shadow-glow');
        t.classList.remove('opacity-50', 'saturate-50');
      } else {
        t.classList.remove('border-2', 'border-leaf-bright', 'saturate-110', 'brightness-110', 'shadow-glow');
        t.classList.add('opacity-50', 'saturate-50');
      }
    });
  }, [currentIndex, images.length]);

  // 2. Auto-Advance Timer for Main Image (Separate from smooth scroll)
  useEffect(() => {
    if (images.length === 0 || isFilmstripHovered || isMainHovered) return;
    const autoAdvance = setInterval(() => {
       setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(autoAdvance);
  }, [images.length, isFilmstripHovered, isMainHovered]);

  // 3. Infinite Auto-Scrolling & Drag Logic for Filmstrip ONLY
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  useEffect(() => {
    if (isFilmstripHovered || images.length === 0) return;
    let animationFrameId: number;
    
    const scroll = () => {
      if (filmstripRef.current && !isDraggingRef.current) {
        filmstripRef.current.scrollLeft += 0.5;
        // Snap back instantly if we reach the end of the original set
        if (filmstripRef.current.scrollLeft >= filmstripRef.current.scrollWidth / 2) {
           filmstripRef.current.scrollLeft -= filmstripRef.current.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };
    
    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFilmstripHovered, images.length]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!filmstripRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - filmstripRef.current.offsetLeft;
    scrollLeftRef.current = filmstripRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || !filmstripRef.current) return;
    e.preventDefault();
    const x = e.pageX - filmstripRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    filmstripRef.current.scrollLeft = scrollLeftRef.current - walk;
    
    if (filmstripRef.current.scrollLeft <= 0) {
       filmstripRef.current.scrollLeft += filmstripRef.current.scrollWidth / 2;
       startXRef.current = e.pageX - filmstripRef.current.offsetLeft;
       scrollLeftRef.current = filmstripRef.current.scrollLeft;
    }
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-background text-leaf-bright flex items-center justify-center font-mono text-lg pt-24 animate-pulse">
        {t.gallery.init}
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="min-h-screen bg-background text-foreground pt-24">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide default scrollbars */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: hsl(var(--muted)); border-radius: 4px; }
      `}} />

      {/* GALLERY HEADER SECTION — matches News & Events layout */}
      <section className="py-20 bg-charcoal-mid mb-12 relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-3/5 xl:w-2/3 flex items-center justify-end">
          <img src="/assets/page-bg/gallery.webp" alt="" className="h-full w-full object-contain object-right" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(15,10,5,0.45)" }} />
          <div className="absolute inset-y-0 left-0 w-2/5 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,0.6) 50%, transparent 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(15,12,8,1) 0%, rgba(15,12,8,1) 38%, rgba(15,12,8,0.75) 52%, rgba(15,12,8,0.2) 70%, transparent 100%)" }} />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <span className="tag-pill mb-4 inline-block">{t.gallery.pill}</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-foreground">
            {t.gallery.title1} <span className="text-gradient-green">&amp;</span> {t.gallery.title2}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {t.gallery.desc}
          </p>
        </div>
      </section>

      <section className="px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto w-full h-auto lg:h-[72vh]">

        {/* LEFT PANE (Visuals + Filmstrip Container) */}
        <main className="w-full lg:w-[76%] flex flex-col h-[52vh] lg:h-full relative rounded-2xl overflow-hidden glass-card shadow-card bg-charcoal-mid/40 border border-border">
          
          {/* Viewport — full-bleed cover image, no dead space */}
          <div
            ref={viewportRef}
            className="flex-1 w-full relative overflow-hidden z-10"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.6s ease" : "transform 0.1s ease",
              willChange: "transform",
            }}
            onMouseMove={(e) => { setIsMainHovered(true); handleViewportMouseMove(e); }}
            onMouseLeave={handleViewportMouseLeave}
          >
            {/* Full-bleed image */}
            <Image
              src={currentImage.url}
              alt={currentImage.title}
              fill
              className="object-cover transition-opacity duration-700"
              priority
            />

            {/* Soft vignette so arrows stay readable */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

            {/* Prev arrow */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 border border-white/20 text-white hover:bg-black/80 hover:border-leaf-bright/60 hover:text-leaf-bright transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {/* Next arrow */}
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 border border-white/20 text-white hover:bg-black/80 hover:border-leaf-bright/60 hover:text-leaf-bright transition-all duration-200 backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image counter badge */}
            <div className="absolute bottom-4 left-4 z-20 font-mono text-xs text-white/70 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-white font-semibold">{currentIndex + 1}</span>
              <span className="mx-1 opacity-50">/</span>
              {images.length} {t.gallery.records}
            </div>
          </div>

          {/* Filmstrip */}
          <footer
            className="h-36 w-full bg-charcoal-light/10 border-t border-border px-4 pt-3 pb-2 flex flex-col justify-center relative z-20 backdrop-blur-sm"
            onMouseEnter={() => setIsFilmstripHovered(true)}
            onMouseLeave={() => {
              setIsFilmstripHovered(false);
              handleMouseUpOrLeave();
            }}
          >
            <div className="flex justify-end items-center mb-2 px-1">
              <span className={`text-[10px] font-mono flex items-center gap-2 ${isFilmstripHovered || isMainHovered ? "text-muted-foreground" : "text-leaf-bright"} uppercase tracking-wider`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isFilmstripHovered || isMainHovered ? "bg-muted-foreground" : "bg-leaf-bright animate-pulse"}`} />
                {isFilmstripHovered || isMainHovered ? t.gallery.syncPaused : t.gallery.syncActive}
              </span>
            </div>
            
            {/* Track (Memoized to isolate 190-node React render cycle from Scroll Frame logic) */}
            <FilmstripGrid 
               images={images}
               filmstripRef={filmstripRef}
               handleMouseDown={handleMouseDown}
               handleMouseMove={handleMouseMove}
               handleMouseUpOrLeave={handleMouseUpOrLeave}
               isDraggingRef={isDraggingRef}
               setCurrentIndex={setCurrentIndex}
            />
          </footer>
        </main>

        {/* RIGHT PANE (Context) */}
        <aside className="w-full lg:w-1/4 h-auto lg:h-full bg-card rounded-2xl flex flex-col relative z-20 shadow-card border border-border">
          <div className="p-6 lg:p-8 shrink-0 flex flex-col h-full bg-gradient-to-b from-charcoal-mid/20 to-transparent">
            
            <div className="flex items-center gap-2 text-leaf-bright text-xs font-bold tracking-wider uppercase mb-6 bg-leaf-bright/10 w-fit px-3 py-1 rounded-sm border border-leaf-bright/20">
              <Folder className="w-4 h-4" />
              {currentImage.category}
            </div>
            
            <h2 className="font-serif text-2xl font-bold mb-3 text-foreground leading-snug">
              {currentImage.title}
            </h2>
            
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-6">
              <Calendar className="w-4 h-4" />
              {currentImage.date}
            </div>
            
            <div className="w-full h-px bg-border my-6" />
            
            <p className="text-sm text-foreground/80 leading-relaxed font-light">
              {currentImage.caption}
            </p>

            <div className="mt-auto pt-8">
               <p className="text-xs text-muted-foreground italic">
                 {t.gallery.contextDesc}
               </p>
            </div>
          </div>
        </aside>

      </div>
      </section>

      {/* ADDITIONAL CREATIVE CONTENT SECION */}
      <section className="max-w-7xl mx-auto w-full mt-16 pb-16">
        <div className="mb-10 text-center lg:text-left">
          <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-3 tracking-tight">{t.gallery.overviewTitle}</h3>
          <p className="text-muted-foreground max-w-2xl text-base">{t.gallery.overviewDesc}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-2xl border border-border shadow-card hover:border-leaf-bright/30 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-leaf-bright/10 text-leaf-bright flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">{t.gallery.valTitle}</h4>
            <p className="text-sm text-foreground/70 leading-relaxed font-light">
              {t.gallery.valDesc}
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border border-border shadow-card hover:border-leaf-bright/30 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-leaf-bright/10 text-leaf-bright flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">{t.gallery.dataTitle}</h4>
            <p className="text-sm text-foreground/70 leading-relaxed font-light">
              {lang === 'am' ? "" : "Over "} {images.length} {t.gallery.dataDesc}
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border border-border shadow-card hover:border-leaf-bright/30 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-leaf-bright/10 text-leaf-bright flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">{t.gallery.netTitle}</h4>
            <p className="text-sm text-foreground/70 leading-relaxed font-light">
              {t.gallery.netDesc}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

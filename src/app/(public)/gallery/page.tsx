"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import Image from "next/image";
import { Folder, Calendar } from "lucide-react";

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
            className="thumb-item flex-shrink-0 w-36 h-20 rounded-lg overflow-hidden relative cursor-pointer transition-all duration-300 opacity-50 saturate-50 hover:opacity-100"
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
          title: "Field Record: " + f.replace(/\.(webp|jpg|png|jpeg)$/i, "").replace(/[-_]/g, " ").toUpperCase(),
          category: "SURVEY DATA",
          date: "2026-ARCHIVE",
          caption: "Captured field telemetry representing elements of the circular coffee supply chain framework."
        }));
        setImages(parsed);
      })
      .catch((err) => console.error("Failed to load gallery images", err));
  }, []);

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
        INITIALIZING ARCHIVE...
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

      {/* GALLERY HEADER SECION */}
      <section className="py-20 bg-charcoal-mid mb-12">
        <div className="container mx-auto px-4 lg:px-0 max-w-7xl">
          <span className="tag-pill mb-4 inline-block">Field Archive</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 text-foreground">
            CARES <span className="text-gradient-green">&amp;</span> Gallery
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Visual documentation of field research, telemetry captures, and circular economy implementation across the Ethiopian coffee supply chain architecture.
          </p>
        </div>
      </section>

      <section className="px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full h-auto lg:h-[70vh]">
        
        {/* LEFT PANE (Visuals + Filmstrip Container) */}
        <main className="w-full lg:w-3/4 flex flex-col h-[50vh] lg:h-full relative rounded-2xl overflow-hidden glass-card shadow-card bg-charcoal-mid/40 border border-border">
          
          {/* Viewport (Top 75%) */}
          <div 
            ref={viewportRef}
            className="flex-1 w-full h-full relative flex items-center justify-center p-4 lg:p-12 overflow-hidden z-10"
            style={{ perspective: "1200px" }}
            onMouseMove={(e) => { setIsMainHovered(true); handleViewportMouseMove(e); }}
            onMouseLeave={handleViewportMouseLeave}
          >
            <div 
              className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-black/60 border border-border"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02,1.02,1.02)`,
                transition: tilt.x === 0 && tilt.y === 0 ? "transform 0.6s ease" : "transform 0.1s ease",
                willChange: "transform"
              }}
            >
              {/* Constrained Blurred Background Fill - Note: Removed 'key' prop to prevent unmount frame drops */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-105 transition-all duration-700"
                style={{ backgroundImage: `url(${currentImage.url})` }}
              />
              
              {/* Main Crisp Image Layer - Note: Removed 'key' prop to prevent unmount frame drops */}
              <Image 
                src={currentImage.url} 
                alt={currentImage.title} 
                fill 
                className="object-contain transition-opacity duration-700 z-10 relative drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* Filmstrip (Bottom 25%) */}
          <footer 
            className="h-40 w-full bg-charcoal-light/10 border-t border-border p-4 flex flex-col justify-center relative z-20 backdrop-blur-sm"
            onMouseEnter={() => setIsFilmstripHovered(true)}
            onMouseLeave={() => {
              setIsFilmstripHovered(false);
              handleMouseUpOrLeave();
            }}
          >
            <div className="flex justify-between items-end mb-3 px-2">
              <span className="text-xs font-mono text-muted-foreground tracking-widest leading-none">
                <span className="text-foreground">{currentIndex + 1}</span> / {images.length} RECORDS
              </span>
              <span className={`text-[10px] font-mono flex items-center gap-2 ${isFilmstripHovered || isMainHovered ? "text-muted-foreground" : "text-leaf-bright"} uppercase tracking-wider`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isFilmstripHovered || isMainHovered ? "bg-muted-foreground" : "bg-leaf-bright animate-pulse"}`} />
                {isFilmstripHovered || isMainHovered ? "SYNC PAUSED" : "AUTO-SYNC ACTIVE"}
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
                 Explore the field records capturing crucial elements of the resilient circular supply chain matrix.
               </p>
            </div>
          </div>
        </aside>

      </div>
      </section>

      {/* ADDITIONAL CREATIVE CONTENT SECION */}
      <section className="max-w-7xl mx-auto w-full mt-16 pb-16">
        <div className="mb-10 text-center lg:text-left">
          <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-3 tracking-tight">Archive Context Overview</h3>
          <p className="text-muted-foreground max-w-2xl text-base">Key strategic pillars from our field telemetry operations in the Ethiopian landscape.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-8 rounded-2xl border border-border shadow-card hover:border-leaf-bright/30 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-leaf-bright/10 text-leaf-bright flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">Valorization Scope</h4>
            <p className="text-sm text-foreground/70 leading-relaxed font-light">
              Transforming biological waste metrics actively analyzed in our latest research batch. Quantifying pulp conversions directly from raw farm origins.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border border-border shadow-card hover:border-leaf-bright/30 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-leaf-bright/10 text-leaf-bright flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">Dataset Coverage</h4>
            <p className="text-sm text-foreground/70 leading-relaxed font-light">
              Over {images.length} direct architectural telemetry captures forming our predictive circular grid model spanning 4 primary districts.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl border border-border shadow-card hover:border-leaf-bright/30 transition-colors duration-300">
            <div className="w-12 h-12 rounded-xl bg-leaf-bright/10 text-leaf-bright flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h4 className="text-xl font-bold text-foreground mb-3">Network Synergy</h4>
            <p className="text-sm text-foreground/70 leading-relaxed font-light">
              Connecting localized agricultural outputs to high-value bio-conversion pipelines utilizing real-time sensor evaluations.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

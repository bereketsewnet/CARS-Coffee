"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Navbar() {
  const [open, setOpen] = useState(false);
  // Default TRUE so non-home pages are always solid from first render
  const [scrolled, setScrolled] = useState(true);
  const pathname = usePathname();
  const { t, lang, toggle } = useLanguage();
  const isHome = pathname === "/";

  const navItems = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.project, path: "/project" },
    { label: t.nav.research, path: "/research" },
    { label: t.nav.team, path: "/team" },
    { label: t.nav.collaborations, path: "/collaborations" },
    { label: t.nav.impact, path: "/impact" },
    { label: t.nav.library, path: "/library" },
    { label: t.nav.news, path: "/news" },
    { label: t.nav.gallery, path: "/gallery" },
    { label: t.nav.contact, path: "/contact" },
  ];

  useEffect(() => {
    if (!isHome) {
      // Non-home pages: transparent at top, solid after any scroll
      const onScroll = () => setScrolled(window.scrollY > 10);
      setScrolled(window.scrollY > 10);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    // Home page: transparent until the 2.4× hero is fully scrolled past
    const heroHeight = window.innerHeight * 2.4;
    const onScroll = () => setScrolled(window.scrollY > heroHeight);
    setScrolled(window.scrollY > heroHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group py-1.5">
          <div className="w-14 h-14 rounded-xl bg-[#1a2e1a] border border-leaf-bright/30 overflow-hidden shrink-0 shadow-glow flex items-center justify-center">
            <Image
              src="/assets/header logo.jpg"
              alt="CARES Logo"
              width={56}
              height={56}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <span className="font-serif font-bold text-2xl leading-none block" style={{ color: "#D4AF37" }}>
              CARES
            </span>
            <span className="text-sm tracking-wide font-bold text-leaf-bright">
              Circular Economy Research
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1 py-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  pathname === item.path
                    ? "text-leaf-bright"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-leaf-bright rounded-full" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3 py-4">
          {/* Language toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-border text-muted-foreground hover:text-foreground hover:border-leaf-bright/50 transition-all duration-200"
          >
            <span className={lang === "en" ? "text-leaf-bright" : "text-muted-foreground"}>EN</span>
            <span className="text-border">|</span>
            <span className={lang === "am" ? "text-leaf-bright" : "text-muted-foreground"}>አማ</span>
          </button>
          <Link
            href="/contact"
            className="px-5 py-2 rounded-full text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-all duration-200 shadow-glow"
          >
            {t.nav.getInvolved}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-md text-foreground hover:text-leaf-bright transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass-card mt-2 mx-4 rounded-xl p-4 border border-border animate-fade-in">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? "bg-accent text-leaf-bright"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 flex flex-col gap-2">
              <button
                onClick={toggle}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg text-sm border border-border text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className={lang === "en" ? "font-bold text-leaf-bright" : ""}>English</span>
                <span className="text-border">|</span>
                <span className={lang === "am" ? "font-bold text-leaf-bright" : ""}>አማርኛ</span>
              </button>
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors"
              >
                {t.nav.getInvolved}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

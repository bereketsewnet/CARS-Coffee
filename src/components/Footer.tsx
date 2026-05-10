"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, ExternalLink, Linkedin, Youtube, Instagram, Globe, Music2, Facebook } from "lucide-react";

function XIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.738l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { getSiteContactInfo } from "@/lib/actions/siteContact";
import type { SiteContactInfo } from "../../generated/prisma-client";

const SOCIAL_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  linkedin:  { icon: Linkedin,  color: "#0A66C2" },
  youtube:   { icon: Youtube,   color: "#FF0000" },
  twitter:   { icon: XIcon,     color: "#ffffff" },
  facebook:  { icon: Facebook,  color: "#1877F2" },
  instagram: { icon: Instagram, color: "#E1306C" },
  tiktok:    { icon: Music2,    color: "#69C9D0" },
  website:   { icon: Globe,     color: "#4ade80" },
};

export function Footer() {
  const { t } = useLanguage();
  const [info, setInfo] = useState<SiteContactInfo | null>(null);

  useEffect(() => {
    getSiteContactInfo().then(setInfo);
  }, []);

  const generalEmail = info?.generalEmail || "info@circularcoffee.org";
  
  // Create short versions of locations for the footer
  const northLocFull = info?.northLocation || "Prinsstraat 13, 2000 Antwerp, Belgium";
  const southLocFull = info?.southLocation || "King George VI Street, Addis Ababa, Ethiopia";
  
  // Extract just the university name roughly
  const northLocShort = northLocFull.includes(",") ? northLocFull.split(",").pop()?.trim() || "Antwerp" : "Antwerp";
  const southLocShort = southLocFull.includes(",") ? southLocFull.split(",").pop()?.trim() || "Addis Ababa" : "Addis Ababa";

  const socialLinks = Object.entries(SOCIAL_ICONS).flatMap(([key, meta]) => {
    const url = info?.[key as keyof SiteContactInfo] as string | null | undefined;
    return url ? [{ key, url, ...meta }] : [];
  });

  return (
    <footer className="border-t border-border bg-charcoal-mid mt-0">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-24 h-24 rounded-xl bg-[#1a2e1a] border border-leaf-bright/30 overflow-hidden shrink-0 shadow-glow flex items-center justify-center">
                <Image
                  src="/assets/header logo.jpg"
                  alt="CARES Logo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                {[
                  { first: "C", rest: "OFFEE" },
                  { first: "A", rest: "DVANCEMENT" },
                  { first: "R", rest: "ESILIENCE" },
                  { first: "E", rest: "QUITY" },
                  { first: "S", rest: "USTAINABILITY" },
                ].map(({ first, rest }) => (
                  <span key={first} className="text-[13px] font-bold tracking-wider leading-tight">
                    <span style={{ color: "#D4AF37" }}>{first}</span>
                    <span className="text-leaf-bright">{rest}</span>
                  </span>
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="tag-pill">VLIR-UOS</span>
              <span className="tag-pill tag-coffee">Ethiopia</span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "#D4AF3722", color: "#D4AF37", border: "1px solid #D4AF3755" }}>Belgium</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ["The Project", "/project"],
                ["Research & Pillars", "/research"],
                ["Our Team", "/team"],
                ["Impact", "/impact"],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-muted-foreground hover:text-leaf-bright transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ["Publications Library", "/library"],
                ["News & Events", "/news"],
                ["Contact Us", "/contact"],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link
                    href={path}
                    className="text-muted-foreground hover:text-leaf-bright transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.vliruos.be"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-leaf-bright transition-colors flex items-center gap-1"
                >
                  VLIR-UOS Website <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 text-leaf-bright shrink-0" />
                <a href={`mailto:${generalEmail}`} className="hover:text-leaf-bright transition-colors">
                  {generalEmail}
                </a>
              </li>
              {info?.primaryPhone && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 mt-0.5 text-leaf-bright shrink-0" />
                  <a href={`tel:${info.primaryPhone}`} className="hover:text-leaf-bright transition-colors">
                    {info.primaryPhone}
                  </a>
                </li>
              )}
              {info?.secondaryPhone && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 mt-0.5 text-leaf-bright shrink-0" />
                  <a href={`tel:${info.secondaryPhone}`} className="hover:text-leaf-bright transition-colors">
                    {info.secondaryPhone}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-leaf-bright shrink-0" />
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf-bright mt-1.5 shrink-0" />
                    <span>College of Technology and Built Environment, Addis Ababa University (CTBE-AAU)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-leaf-bright mt-1.5 shrink-0" />
                    <span>University of Antwerp - Belgium</span>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="mt-5">
                <p className="text-xs text-muted-foreground mb-3 uppercase tracking-widest">
                  Follow Us
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {socialLinks.map(({ key, url, icon: Icon, color }) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted/80 hover:bg-muted border border-transparent hover:border-border transition-all duration-200 group"
                    >
                      <Icon className="w-4 h-4 transition-colors opacity-80 group-hover:opacity-100" style={{ color }} />
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Partners */}
            {socialLinks.length === 0 && (
              <div className="mt-5">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-widest">
                  Partners
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">CTBE-AAU</span>
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">UA Antwerp</span>
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">VLIR-UOS</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="section-divider my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} CARES Project. VLIR-UOS Cooperation Programme.</p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p>{t.footer.fundeBy}</p>
            <p>
              {t.footer.developedBy}{" "}
              <a
                href="https://wubsites.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-leaf-bright hover:underline transition-colors"
              >
                Wubsites
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

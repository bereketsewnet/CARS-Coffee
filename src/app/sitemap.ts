import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cares-center.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`,               lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE_URL}/project`,         lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/research`,        lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/team`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/collaborations`,  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/impact`,          lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/library`,         lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/news`,            lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE_URL}/gallery`,         lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`,         lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];

  return staticRoutes;
}

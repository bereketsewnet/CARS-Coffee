import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import Index from "@/views/Index";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Home | CARES Circular Coffee Project – Ethiopia & Belgium",
  description:
    "CARES turns Ethiopia's coffee waste into green energy, bio-pesticides, and cosmetics. A 4-year VLIR-UOS north–south research programme empowering smallholder farmers and women's cooperatives.",
  keywords: [
    "circular coffee Ethiopia", "coffee waste valorization", "VLIR-UOS project",
    "Sidama coffee", "Yirgacheffe", "biorefinery Ethiopia", "green energy coffee",
    "smallholder farmers", "women cooperatives Ethiopia", "CARES project",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "CARES | Circular Coffee Project – Beyond the Bean",
    description:
      "Empowering Ethiopian coffee communities through circular economy research. VLIR-UOS funded partnership between University of Antwerp and Addis Ababa University.",
    url: "/",
    images: [{ url: "/assets/CARES_LOGO.png", alt: "CARES Circular Coffee Project" }],
  },
};

export const dynamic = "force-dynamic";
const DB_DISABLED = process.env.DB_DISABLED === "true";

export default async function HomePage() {
  noStore();
  if (DB_DISABLED) {
    return <Index partners={[]} latestNews={[]} impactMetrics={[]} homeContent={null} />;
  }

  let partners: Awaited<ReturnType<typeof prisma.partner.findMany>> = [];
  let latestNews: Awaited<ReturnType<typeof prisma.newsEvent.findMany>> = [];
  let impactMetrics: Awaited<ReturnType<typeof prisma.impactMetric.findMany>> = [];
  let teamPreview: Awaited<ReturnType<typeof prisma.teamMember.findMany>> = [];
  let homeContent: Awaited<ReturnType<typeof prisma.homeContent.findFirst>> = null;

  try {
    [partners, latestNews, impactMetrics, teamPreview, homeContent] = await Promise.all([
      prisma.partner.findMany({
        where: { active: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
      }),
      prisma.newsEvent.findMany({
        where: { status: { not: "DRAFT" }, featured: true },
        orderBy: { featuredOrder: "asc" },
        take: 3,
      }).then(async (featured) => {
        if (featured.length > 0) return featured;
        return prisma.newsEvent.findMany({
          where: { status: { not: "DRAFT" } },
          orderBy: { date: "desc" },
          take: 3,
        });
      }),
      prisma.impactMetric.findMany({ orderBy: { createdAt: "asc" }, take: 4 }),
      prisma.teamMember.findMany({
        where: { active: true, featured: true },
        orderBy: { featuredOrder: "asc" },
        take: 4,
      }).then(async (featured) => {
        if (featured.length > 0) return featured;
        return prisma.teamMember.findMany({ where: { active: true }, orderBy: { createdAt: "asc" }, take: 4 });
      }),
      prisma.homeContent.findFirst(),
    ]);
  } catch (error) {
    console.error("Failed to load homepage data from database", error);
  }

  return (
    <Index
      partners={partners}
      latestNews={latestNews}
      impactMetrics={impactMetrics}
      teamPreview={teamPreview}
      homeContent={homeContent}
    />
  );
}

import { unstable_noStore as noStore } from "next/cache";
import Index from "@/views/Index";
import prisma from "@/lib/prisma";

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

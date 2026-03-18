import Index from "@/views/Index";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const DB_DISABLED = process.env.DB_DISABLED === "true";

export default async function HomePage() {
  if (DB_DISABLED) {
    return <Index partners={[]} latestNews={[]} impactMetrics={[]} />;
  }

  let partners: Awaited<ReturnType<typeof prisma.partner.findMany>> = [];
  let latestNews: Awaited<ReturnType<typeof prisma.newsEvent.findMany>> = [];
  let impactMetrics: Awaited<
    ReturnType<typeof prisma.impactMetric.findMany>
  > = [];

  try {
    [partners, latestNews, impactMetrics] = await Promise.all([
      prisma.partner.findMany({
        where: { active: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
      }),
      prisma.newsEvent.findMany({
        where: { status: { not: "DRAFT" } },
        orderBy: { date: "desc" },
        take: 3,
      }),
      prisma.impactMetric.findMany({
        orderBy: { createdAt: "asc" },
        take: 4,
      }),
    ]);
  } catch (error) {
    console.error("Failed to load homepage data from database", error);
  }

  return (
    <Index
      partners={partners}
      latestNews={latestNews}
      impactMetrics={impactMetrics}
    />
  );
}

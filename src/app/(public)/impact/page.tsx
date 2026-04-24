import type { Metadata } from "next";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Impact from "@/views/Impact";

export const metadata: Metadata = {
  title: "Impact & Stakeholders | Circular Coffee",
  description:
    "Measurable outcomes on soil, waste, and livelihoods — and the partners making it possible.",
};

export default async function ImpactPage() {
  if (DB_DISABLED) {
    return <Impact metrics={[]} partners={[]} />;
  }

  let metrics: Awaited<ReturnType<typeof prisma.impactMetric.findMany>> = [];
  let partners: any[] = [];

  try {
    [metrics, partners] = await Promise.all([
      prisma.impactMetric.findMany({
        orderBy: { createdAt: "asc" },
      }),
      prisma.partner.findMany({
        where: { active: true },
        orderBy: { order: "asc" },
      })
    ]);
  } catch (error) {
    console.error("Failed to load impact page data from database", error);
  }

  return <Impact metrics={metrics} partners={partners} />;
}

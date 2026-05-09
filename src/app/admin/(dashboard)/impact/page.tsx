import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ImpactCrud from "@/components/admin/ImpactCrud";

export const metadata: Metadata = { title: "Impact | Circular Coffee Admin" };

export const dynamic = "force-dynamic";

export default async function ImpactPage() {
  const [metrics, pillarContents, impactSection, impactAreas] = await Promise.all([
    prisma.impactMetric.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.pillarContent.findMany(),
    prisma.impactSection.findFirst(),
    prisma.impactArea.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Impact</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit the socioeconomic section, impact area cards, and key metrics.
        </p>
      </div>
      <ImpactCrud
        items={metrics}
        pillarContents={pillarContents}
        impactSection={impactSection}
        impactAreas={impactAreas}
      />
    </div>
  );
}

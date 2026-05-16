import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ImpactCrud from "@/components/admin/ImpactCrud";

export const metadata: Metadata = { title: "Impact | Circular Coffee Admin" };

export const dynamic = "force-dynamic";

const SEED_TESTIMONIALS = [
  {
    quote: "Since using the compost from our processing station, my yield has grown. I no longer need to buy expensive chemical fertilizer.",
    name: "Birtukan Lemma",
    role: "Coffee Farmer, Kaffa Zone",
    order: 1,
  },
  {
    quote: "The biogas system has changed how we process coffee. We save money on firewood and the smell from the pulp pond is gone.",
    name: "Girma Tesfaye",
    role: "Cooperative Manager, Yirgacheffe",
    order: 2,
  },
];

export default async function ImpactPage() {
  const [metrics, pillarContents, impactSection, impactAreas, testimonialCount] = await Promise.all([
    prisma.impactMetric.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.pillarContent.findMany(),
    prisma.impactSection.findFirst(),
    prisma.impactArea.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.count(),
  ]);

  // Auto-seed on first visit
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({ data: SEED_TESTIMONIALS });
  }

  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Impact</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit the socioeconomic section, impact area cards, key metrics, and testimonials.
        </p>
      </div>
      <ImpactCrud
        items={metrics}
        pillarContents={pillarContents}
        impactSection={impactSection}
        impactAreas={impactAreas}
        testimonials={testimonials}
      />
    </div>
  );
}

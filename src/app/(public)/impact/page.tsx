import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Impact from "@/views/Impact";

export const metadata: Metadata = {
  title: "Impact & Stakeholders | CARES Circular Coffee",
  description:
    "Measurable outcomes of the CARES project on soil fertility, coffee waste reduction, and smallholder farmer livelihoods — and the stakeholders making circular change possible.",
  keywords: [
    "CARES impact", "coffee waste reduction", "soil fertility Ethiopia",
    "smallholder farmer livelihoods", "circular economy impact", "VLIR-UOS outcomes",
    "coffee sustainability metrics", "women empowerment Ethiopia",
  ],
  alternates: { canonical: "/impact" },
  openGraph: {
    title: "Impact & Stakeholders | CARES",
    description: "Measurable circular economy outcomes on soil, waste, and livelihoods in Ethiopian coffee communities.",
    url: "/impact",
    images: [{ url: "/assets/page-bg/impact.webp", alt: "CARES Impact and Stakeholders" }],
  },
};

export default async function ImpactPage() {
  noStore();
  if (DB_DISABLED) {
    return <Impact metrics={[]} partners={[]} />;
  }

  let metrics: Awaited<ReturnType<typeof prisma.impactMetric.findMany>> = [];
  let partners: any[] = [];
  let impactSection: any = null;
  let impactAreas: any[] = [];
  let heading = null;
  let testimonials: Awaited<ReturnType<typeof prisma.testimonial.findMany>> = [];

  try {
    [metrics, partners, impactSection, impactAreas, heading, testimonials] = await Promise.all([
      prisma.impactMetric.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.partner.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
      prisma.impactSection.findFirst(),
      prisma.impactArea.findMany({ orderBy: { order: "asc" } }),
      prisma.pageHeading.findUnique({ where: { page: "impact" } }),
      prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch (error) {
    console.error("Failed to load impact page data from database", error);
  }

  return <Impact metrics={metrics} partners={partners} impactSection={impactSection} impactAreas={impactAreas} heading={heading} testimonials={testimonials} />;
}

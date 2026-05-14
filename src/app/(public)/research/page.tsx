import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import type { Publication } from "../../../../generated/prisma-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Research from "@/views/Research";

export const metadata: Metadata = {
  title: "Research & Pillars | CARES Circular Coffee",
  description:
    "Three interconnected research pillars — soil health, waste valorization, and socio-economic impact — forming the scientific backbone of the CARES Circular Coffee project in Ethiopia.",
  keywords: [
    "coffee research pillars", "soil health biochar", "waste valorization coffee",
    "socio-economic coffee Ethiopia", "circular agro-energy", "bio-extracted products",
    "CARES research", "specialty coffee processing",
  ],
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research & Pillars | CARES Circular Coffee",
    description: "Soil health, waste valorization, and socio-economic research pillars of the CARES project.",
    url: "/research",
    images: [{ url: "/assets/page-bg/research.webp", alt: "CARES Research Pillars" }],
  },
};

export default async function ResearchPage() {
  noStore();
  if (DB_DISABLED) {
    // DB explicitly disabled — use static fallback (pass undefined)
    return <Research />;
  }

  // null = DB unavailable (error), [] = DB connected but empty
    let pillarContents: any[] | null = null;
  let projects: any[] | null = null;
  let publications: Publication[] | null = null;
  let heading = null;

  try {
    [pillarContents, projects, publications, heading] = await Promise.all([
      prisma.pillarContent.findMany({}),
      prisma.researchProject.findMany({
        where: { status: { not: "PAUSED" } },
        orderBy: { order: "asc" },
        include: { members: { orderBy: { order: "asc" } } },
      }),
      prisma.publication.findMany({
        where: { status: "PUBLISHED", pillar: { not: null } },
        orderBy: { year: "desc" },
      }),
      prisma.pageHeading.findUnique({ where: { page: "research" } }),
    ]);
  } catch (error) {
    console.error("[ResearchPage] DB fetch failed — falling back to static data", error);
  }

  return <Research projects={projects} publications={publications} pillarContents={pillarContents} heading={heading} />;
}


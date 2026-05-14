import type { Metadata } from "next";
import TheProject from "@/views/TheProject";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "The Circular Coffee Project | CARES – VLIR-UOS Research Programme",
  description:
    "A 4-year north–south cooperative research programme funded by VLIR-UOS, bringing together Belgium and Ethiopia to build a circular coffee economy through biorefinery, soil enrichment, and socio-economic empowerment.",
  keywords: [
    "circular coffee project", "VLIR-UOS", "biorefinery Ethiopia", "coffee waste",
    "soil enrichment", "work packages", "CARES project goals", "north south cooperation",
    "University of Antwerp", "Addis Ababa University", "CTBE-AAU",
  ],
  alternates: { canonical: "/project" },
  openGraph: {
    title: "The Circular Coffee Project | CARES",
    description: "Transforming Ethiopia's coffee waste into green energy and bio-products through VLIR-UOS funded research.",
    url: "/project",
    images: [{ url: "/assets/page-bg/the-project.webp", alt: "The Circular Coffee Project" }],
  },
};

export const dynamic = "force-dynamic";

export default async function ProjectPage() {
  noStore();
  let info = null;
  let goals: { id: string; text: string; order: number }[] = [];
  let workPackages: { id: string; wpId: string; title: string; lead: string; order: number }[] = [];
  let problemGroups: { id: string; title: string; order: number; bullets: { id: string; text: string; order: number }[] }[] = [];
  let heading = null;
  try {
    [info, goals, workPackages, problemGroups, heading] = await Promise.all([
      prisma.projectInfo.findFirst(),
      prisma.projectGoal.findMany({ orderBy: { order: "asc" } }),
      prisma.workPackage.findMany({ orderBy: { order: "asc" } }),
      prisma.projectProblemGroup.findMany({
        orderBy: { order: "asc" },
        include: { bullets: { orderBy: { order: "asc" } } },
      }),
      prisma.pageHeading.findUnique({ where: { page: "project" } }),
    ]);
  } catch {
    // DB unavailable — views will use static fallback
  }
  return <TheProject info={info} goals={goals} workPackages={workPackages} problemGroups={problemGroups} heading={heading} />;
}

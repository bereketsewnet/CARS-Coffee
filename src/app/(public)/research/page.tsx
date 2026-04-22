import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import type { ResearchProject, Publication } from "../../../../generated/prisma-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Research from "@/views/Research";

export const metadata: Metadata = {
  title: "Research & Pillars | Circular Coffee",
  description:
    "Three interconnected research areas forming the scientific backbone of the Circular Coffee project.",
};

export default async function ResearchPage() {
  if (DB_DISABLED) {
    // DB explicitly disabled — use static fallback (pass undefined)
    return <Research />;
  }

  // null = DB unavailable (error), [] = DB connected but empty
  let projects: ResearchProject[] | null = null;
  let publications: Publication[] | null = null;

  try {
    [projects, publications] = await Promise.all([
      prisma.researchProject.findMany({
        where: { status: { not: "PAUSED" } },
        orderBy: { createdAt: "asc" },
      }),
      prisma.publication.findMany({
        where: { status: "PUBLISHED", pillar: { not: null } },
        orderBy: { year: "desc" },
      }),
    ]);
  } catch (error) {
    console.error("[ResearchPage] DB fetch failed — falling back to static data", error);
    // Leave projects/publications as null so Research.tsx shows static fallback
  }

  return <Research projects={projects} publications={publications} />;
}

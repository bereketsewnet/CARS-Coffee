import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ResearchCrud from "@/components/admin/ResearchCrud";

export const metadata: Metadata = { title: "Research | Circular Coffee Admin" };
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ResearchPage() {
  const [projects, pillarContents] = await Promise.all([
    prisma.researchProject.findMany({
      orderBy: { order: "asc" },
      include: { members: { orderBy: { order: "asc" } } },
    }),
    prisma.pillarContent.findMany({ orderBy: { pillar: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Research</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage research pillars, topics, and researchers.
        </p>
      </div>
      <ResearchCrud items={projects} pillarContents={pillarContents} />
    </div>
  );
}

import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProjectCrud from "@/components/admin/ProjectCrud";

export const metadata: Metadata = { title: "The Project | CARES Admin" };
export const dynamic = "force-dynamic";

export default async function AdminProjectPage() {
  const [info, goals, workPackages] = await Promise.all([
    prisma.projectInfo.findFirst(),
    prisma.projectGoal.findMany({ orderBy: { order: "asc" } }),
    prisma.workPackage.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">The Project</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage the VLIR-UOS section, project goals, and work packages.
        </p>
      </div>
      <ProjectCrud info={info} goals={goals} workPackages={workPackages} />
    </div>
  );
}

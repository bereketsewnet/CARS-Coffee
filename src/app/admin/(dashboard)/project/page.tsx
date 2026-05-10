import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProjectCrud from "@/components/admin/ProjectCrud";

export const metadata: Metadata = { title: "The Project | CARES Admin" };
export const dynamic = "force-dynamic";

const DEFAULT_PROBLEM_GROUPS = [
  {
    title: "Environmental Impact",
    order: 0,
    bullets: [
      { text: "Ethiopia produces ~400,000 tons of coffee waste annually", order: 0 },
      { text: "Coffee husk & pulp pollute rivers and degrade farm soils", order: 1 },
    ],
  },
  {
    title: "Economic Challenges",
    order: 1,
    bullets: [
      { text: "Smallholder farmers lose an estimated 30% of potential income", order: 0 },
      { text: "No integrated circular economy model exists at farm level", order: 1 },
      { text: "Limited access to research-backed composting and valorization techniques", order: 2 },
    ],
  },
];

export default async function AdminProjectPage() {
  const [info, goals, workPackages, existingGroups] = await Promise.all([
    prisma.projectInfo.findFirst(),
    prisma.projectGoal.findMany({ orderBy: { order: "asc" } }),
    prisma.workPackage.findMany({ orderBy: { order: "asc" } }),
    prisma.projectProblemGroup.findMany({
      orderBy: { order: "asc" },
      include: { bullets: { orderBy: { order: "asc" } } },
    }),
  ]);

  // Auto-seed default problem groups on first visit
  if (existingGroups.length === 0) {
    await Promise.all(
      DEFAULT_PROBLEM_GROUPS.map((g) =>
        prisma.projectProblemGroup.create({
          data: {
            title: g.title,
            order: g.order,
            bullets: { create: g.bullets },
          },
        })
      )
    );
  }

  const problemGroups =
    existingGroups.length > 0
      ? existingGroups
      : await prisma.projectProblemGroup.findMany({
          orderBy: { order: "asc" },
          include: { bullets: { orderBy: { order: "asc" } } },
        });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">The Project</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage the project page content, problem statement, goals, and work packages.
        </p>
      </div>
      <ProjectCrud info={info} goals={goals} workPackages={workPackages} problemGroups={problemGroups} />
    </div>
  );
}

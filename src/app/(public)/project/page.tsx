import TheProject from "@/views/TheProject";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

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

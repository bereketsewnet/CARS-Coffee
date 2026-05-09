import TheProject from "@/views/TheProject";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectPage() {
  noStore();
  let info = null;
  let goals: { id: string; text: string; order: number }[] = [];
  let workPackages: { id: string; wpId: string; title: string; lead: string; order: number }[] = [];
  try {
    [info, goals, workPackages] = await Promise.all([
      prisma.projectInfo.findFirst(),
      prisma.projectGoal.findMany({ orderBy: { order: "asc" } }),
      prisma.workPackage.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch {
    // DB unavailable — views will use static fallback
  }
  return <TheProject info={info} goals={goals} workPackages={workPackages} />;
}

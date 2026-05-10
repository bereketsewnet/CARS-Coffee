"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./guard";

const revalidateAll = () => { revalidatePath("/admin/project"); revalidatePath("/project"); };

// ── Project Info ──────────────────────────────────────────────────────────────

export async function upsertProjectInfo(form: FormData) {
  await requireAdmin();
  const heroTitle    = (form.get("heroTitle")    as string)?.trim();
  const heroSubtitle = (form.get("heroSubtitle") as string)?.trim();
  const vlirTitle    = (form.get("vlirTitle")    as string)?.trim();
  const vlirP1       = (form.get("vlirP1")       as string)?.trim();
  const vlirP2Title  = (form.get("vlirP2Title")  as string)?.trim();
  const vlirP2       = (form.get("vlirP2")       as string)?.trim();
  if (!vlirTitle || !vlirP1 || !vlirP2) {
    return { error: "Title and both paragraphs are required." };
  }
  const data = { heroTitle, heroSubtitle, vlirTitle, vlirP1, vlirP2Title, vlirP2 };
  const existing = await prisma.projectInfo.findFirst();
  if (existing) {
    await prisma.projectInfo.update({ where: { id: existing.id }, data });
  } else {
    await prisma.projectInfo.create({ data: data as any });
  }
  revalidateAll();
  return { success: true };
}

// ── Problem Groups ────────────────────────────────────────────────────────────

export async function upsertProblemGroup(form: FormData) {
  await requireAdmin();
  const id    = (form.get("id")    as string) || null;
  const title = (form.get("title") as string)?.trim();
  if (!title) return { error: "Group title is required." };

  const bullets: string[] = [];
  let i = 0;
  while (form.get(`bullet_${i}`) !== null) {
    const text = (form.get(`bullet_${i}`) as string)?.trim();
    if (text) bullets.push(text);
    i++;
  }

  if (id) {
    await prisma.projectProblemGroup.update({
      where: { id },
      data: {
        title,
        bullets: {
          deleteMany: {},
          create: bullets.map((text, order) => ({ text, order })),
        },
      },
    });
  } else {
    const max = await prisma.projectProblemGroup.aggregate({ _max: { order: true } });
    await prisma.projectProblemGroup.create({
      data: {
        title,
        order: (max._max.order ?? 0) + 1,
        bullets: { create: bullets.map((text, order) => ({ text, order })) },
      },
    });
  }
  revalidateAll();
  return { success: true };
}

export async function deleteProblemGroup(id: string) {
  await requireAdmin();
  await prisma.projectProblemGroup.delete({ where: { id } });
  revalidateAll();
}

// ── Project Goals ─────────────────────────────────────────────────────────────

export async function createProjectGoal(form: FormData) {
  await requireAdmin();
  const text = (form.get("text") as string)?.trim();
  if (!text) return { error: "Goal text is required." };
  const max = await prisma.projectGoal.aggregate({ _max: { order: true } });
  await prisma.projectGoal.create({ data: { text, order: (max._max.order ?? 0) + 1 } });
  revalidateAll();
  return { success: true };
}

export async function updateProjectGoal(id: string, form: FormData) {
  await requireAdmin();
  const text = (form.get("text") as string)?.trim();
  if (!text) return { error: "Goal text is required." };
  await prisma.projectGoal.update({ where: { id }, data: { text } });
  revalidateAll();
  return { success: true };
}

export async function deleteProjectGoal(id: string) {
  await requireAdmin();
  await prisma.projectGoal.delete({ where: { id } });
  revalidateAll();
}

// ── Work Packages ─────────────────────────────────────────────────────────────

export async function createWorkPackage(form: FormData) {
  await requireAdmin();
  const wpId  = (form.get("wpId")  as string)?.trim();
  const title = (form.get("title") as string)?.trim();
  const lead  = (form.get("lead")  as string)?.trim();
  if (!wpId || !title || !lead) return { error: "WP ID, title, and lead are required." };
  const max = await prisma.workPackage.aggregate({ _max: { order: true } });
  await prisma.workPackage.create({ data: { wpId, title, lead, order: (max._max.order ?? 0) + 1 } });
  revalidateAll();
  return { success: true };
}

export async function updateWorkPackage(id: string, form: FormData) {
  await requireAdmin();
  const wpId  = (form.get("wpId")  as string)?.trim();
  const title = (form.get("title") as string)?.trim();
  const lead  = (form.get("lead")  as string)?.trim();
  if (!wpId || !title || !lead) return { error: "WP ID, title, and lead are required." };
  await prisma.workPackage.update({ where: { id }, data: { wpId, title, lead } });
  revalidateAll();
  return { success: true };
}

export async function deleteWorkPackage(id: string) {
  await requireAdmin();
  await prisma.workPackage.delete({ where: { id } });
  revalidateAll();
}

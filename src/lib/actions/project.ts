"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./guard";

const revalidateAll = () => { revalidatePath("/admin/project"); revalidatePath("/project"); };

// ── Project Info (VLIR-UOS section) ──────────────────────────────────────────

export async function upsertProjectInfo(form: FormData) {
  await requireAdmin();
  const vlirTitle    = (form.get("vlirTitle")    as string)?.trim();
  const vlirP1       = (form.get("vlirP1")       as string)?.trim();
  const vlirP2       = (form.get("vlirP2")       as string)?.trim();
  const problemTitle = (form.get("problemTitle") as string)?.trim();
  const problemList  = (form.get("problemList")  as string)?.trim();
  if (!vlirTitle || !vlirP1 || !vlirP2 || !problemTitle || !problemList) {
    return { error: "All fields are required." };
  }
  const existing = await prisma.projectInfo.findFirst();
  if (existing) {
    await prisma.projectInfo.update({
      where: { id: existing.id },
      data: { vlirTitle, vlirP1, vlirP2, problemTitle, problemList },
    });
  } else {
    await prisma.projectInfo.create({
      data: { vlirTitle, vlirP1, vlirP2, problemTitle, problemList },
    });
  }
  revalidateAll();
  return { success: true };
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

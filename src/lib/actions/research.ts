"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./guard";

export type ResearchFormState = { error?: string; success?: boolean };

export async function createResearchProject(
  _prev: ResearchFormState,
  form: FormData
): Promise<ResearchFormState> {
  await requireAdmin();
  try {
    if (!form.get("title") || !form.get("pillar")) {
      return { error: "Title and pillar are required." };
    }
    await prisma.researchProject.create({
      data: {
        title: form.get("title") as string,
        pillar: form.get("pillar") as string,
        status: (form.get("status") as any ?? "ACTIVE"),
        lead: (form.get("lead") as string) || undefined,
        description: (form.get("description") as string) || undefined,
        startDate: form.get("startDate") ? new Date(form.get("startDate") as string) : undefined,
        endDate: form.get("endDate") ? new Date(form.get("endDate") as string) : undefined,
      },
    });
    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to create research project." };
  }
}

export async function updateResearchProject(
  id: string,
  _prev: ResearchFormState,
  form: FormData
): Promise<ResearchFormState> {
  await requireAdmin();
  try {
    await prisma.researchProject.update({
      where: { id },
      data: {
        title: form.get("title") as string,
        pillar: form.get("pillar") as string,
        status: form.get("status") as any,
        lead: (form.get("lead") as string) || null,
        description: (form.get("description") as string) || null,
        startDate: form.get("startDate") ? new Date(form.get("startDate") as string) : null,
        endDate: form.get("endDate") ? new Date(form.get("endDate") as string) : null,
      },
    });
    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to update research project." };
  }
}

export async function deleteResearchProject(id: string): Promise<void> {
  await requireAdmin();
  await prisma.researchProject.delete({ where: { id } });
  revalidatePath("/admin/research");
  revalidatePath("/research");
}


export async function updatePillarContent(_prev: ResearchFormState, id: string, form: FormData): Promise<ResearchFormState> {
  await requireAdmin();
  try {
    await prisma.pillarContent.update({
      where: { id },
      data: {
        title: form.get("title") as string,
        tagline: form.get("tagline") as string,
        laymanDesc: (form.get("laymanDesc") as string) || undefined,
      },
    });
    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "Failed to update pillar content." };
  }
}

export async function createPillarContent(_prev: ResearchFormState, form: FormData): Promise<ResearchFormState> {
  await requireAdmin();
  try {
    const title = form.get('title') as string;
    const pillarStr = title.replace(/\s+/g, '_').toUpperCase() + Math.random().toString().slice(2,6);
    await prisma.pillarContent.create({
      data: {
        pillar: pillarStr,
        title,
        tagline: (form.get('tagline') as string) || '',
        laymanDesc: (form.get('laymanDesc') as string) || undefined,
      }
    });
    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to create pillar.' };
  }
}

export async function deletePillarContent(id: string): Promise<ResearchFormState> {
  await requireAdmin();
  try {
    await prisma.pillarContent.delete({ where: { id } });
    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true };
  } catch (e: any) {
    console.error(e);
    return { error: 'Failed to delete pillar. Ensure no dependencies remain.' };
  }
}

// ── Research Topic Members ────────────────────────────────────────────────────

export async function createResearchTopicMember(projectId: string, form: FormData): Promise<ResearchFormState> {
  await requireAdmin();
  try {
    const name = form.get("name") as string;
    if (!name) return { error: "Name is required." };
    await prisma.researchTopicMember.create({
      data: {
        projectId,
        name,
        role: (form.get("role") as string) || undefined,
        order: Number(form.get("order") || 0),
      },
    });
    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "Failed to create researcher." };
  }
}

export async function updateResearchTopicMember(id: string, form: FormData): Promise<ResearchFormState> {
  await requireAdmin();
  try {
    await prisma.researchTopicMember.update({
      where: { id },
      data: {
        name: form.get("name") as string,
        role: (form.get("role") as string) || null,
        order: Number(form.get("order") || 0),
      },
    });
    revalidatePath("/admin/research");
    revalidatePath("/research");
    return { success: true };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || "Failed to update researcher." };
  }
}

export async function deleteResearchTopicMember(id: string): Promise<void> {
  await requireAdmin();
  await prisma.researchTopicMember.delete({ where: { id } });
  revalidatePath("/admin/research");
  revalidatePath("/research");
}

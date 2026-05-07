"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./guard";

export type TeamFormState = { error?: string; success?: boolean };

function formatActionError(error: unknown, fallback: string): string {
  if (error instanceof Error) return `${fallback} ${error.message}`;
  return fallback;
}

export async function createTeamMember(
  _prev: TeamFormState,
  form: FormData
): Promise<TeamFormState> {
  await requireAdmin();
  try {
    if (!form.get("name") || !form.get("role") || !form.get("institution")) {
      return { error: "Name, role and institution are required." };
    }
    await prisma.teamMember.create({
      data: {
        name: form.get("name") as string,
        role: form.get("role") as string,
        institution: form.get("institution") as string,
        country: (form.get("country") as string) || "",
        pillar: (form.get("pillar") as any) || null,
        bio: (form.get("bio") as string) || null,
        linkedin: (form.get("linkedin") as string) || null,
        twitter: (form.get("twitter") as string) || null,
        instagram: (form.get("instagram") as string) || null,
        website: (form.get("website") as string) || null,
        email: (form.get("email") as string) || null,
        imageUrl: (form.get("imageUrl") as string) || null,
        active: form.get("active") === "true",
        order: Number(form.get("order")) || 0,
      },
    });
    revalidatePath("/admin/team");
    revalidatePath("/team");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: formatActionError(e, "Failed to create team member.") };
  }
}

export async function updateTeamMember(
  id: string,
  _prev: TeamFormState,
  form: FormData
): Promise<TeamFormState> {
  await requireAdmin();
  try {
    await prisma.teamMember.update({
      where: { id },
      data: {
        name: form.get("name") as string,
        role: form.get("role") as string,
        institution: form.get("institution") as string,
        country: (form.get("country") as string) || "",
        pillar: (form.get("pillar") as any) || null,
        bio: (form.get("bio") as string) || null,
        linkedin: (form.get("linkedin") as string) || null,
        twitter: (form.get("twitter") as string) || null,
        instagram: (form.get("instagram") as string) || null,
        website: (form.get("website") as string) || null,
        email: (form.get("email") as string) || null,
        imageUrl: (form.get("imageUrl") as string) || null,
        active: form.get("active") === "true",
        order: Number(form.get("order")) || 0,
      },
    });
    revalidatePath("/admin/team");
    revalidatePath("/team");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: formatActionError(e, "Failed to update team member.") };
  }
}

export async function deleteTeamMember(id: string): Promise<void> {
  await requireAdmin();
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/admin/team");
  revalidatePath("/team");
}

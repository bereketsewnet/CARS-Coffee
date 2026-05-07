"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./guard";

export type CollaboratorFormState = { error?: string; success?: boolean };

function fmt(e: unknown, msg: string) {
  return e instanceof Error ? `${msg} ${e.message}` : msg;
}

export async function createCollaborator(
  _prev: CollaboratorFormState,
  form: FormData
): Promise<CollaboratorFormState> {
  await requireAdmin();
  try {
    if (!form.get("name")) {
      return { error: "Full name is required." };
    }
    await prisma.collaborator.create({
      data: {
        name:         form.get("name") as string,
        role:         (form.get("role") as string) || "",
        organisation: (form.get("organisation") as string) || "",
        country:      (form.get("country") as string) || "",
        category:     (form.get("category") as any) || "OTHER",
        bio:          (form.get("bio") as string) || null,
        email:        (form.get("email") as string) || null,
        imageUrl:     (form.get("imageUrl") as string) || null,
        linkedin:     (form.get("linkedin") as string) || null,
        twitter:      (form.get("twitter") as string) || null,
        instagram:    (form.get("instagram") as string) || null,
        website:      (form.get("website") as string) || null,
        order:        Number(form.get("order")) || 0,
        active:       form.get("active") === "true",
      },
    });
    revalidatePath("/admin/collaborations");
    revalidatePath("/collaborations");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: fmt(e, "Failed to create collaborator.") };
  }
}

export async function updateCollaborator(
  id: string,
  _prev: CollaboratorFormState,
  form: FormData
): Promise<CollaboratorFormState> {
  await requireAdmin();
  try {
    await prisma.collaborator.update({
      where: { id },
      data: {
        name:         form.get("name") as string,
        role:         form.get("role") as string,
        organisation: form.get("organisation") as string,
        country:      (form.get("country") as string) || "",
        category:     (form.get("category") as any) || "OTHER",
        bio:          (form.get("bio") as string) || null,
        email:        (form.get("email") as string) || null,
        imageUrl:     (form.get("imageUrl") as string) || null,
        linkedin:     (form.get("linkedin") as string) || null,
        twitter:      (form.get("twitter") as string) || null,
        instagram:    (form.get("instagram") as string) || null,
        website:      (form.get("website") as string) || null,
        order:        Number(form.get("order")) || 0,
        active:       form.get("active") === "true",
      },
    });
    revalidatePath("/admin/collaborations");
    revalidatePath("/collaborations");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: fmt(e, "Failed to update collaborator.") };
  }
}

export async function deleteCollaborator(id: string): Promise<void> {
  await requireAdmin();
  await prisma.collaborator.delete({ where: { id } });
  revalidatePath("/admin/collaborations");
  revalidatePath("/collaborations");
}

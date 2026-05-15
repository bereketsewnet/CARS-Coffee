"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./guard";
import { GALLERY_LIMIT } from "@/lib/galleryConstants";

export async function addGalleryImage(url: string, filename: string) {
  await requireAdmin();
  const total = await prisma.galleryImage.count();
  if (total >= GALLERY_LIMIT) {
    return { error: `Gallery limit of ${GALLERY_LIMIT} images reached. Delete some before adding more.` };
  }
  const maxOrder = await prisma.galleryImage.aggregate({ _max: { order: true } });
  await prisma.galleryImage.create({
    data: { url, filename, active: true, order: (maxOrder._max.order ?? 0) + 1 },
  });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

export async function deleteGalleryImage(id: string) {
  await requireAdmin();
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

export async function toggleGalleryImage(id: string, active: boolean) {
  await requireAdmin();
  await prisma.galleryImage.update({ where: { id }, data: { active } });
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return { success: true };
}

"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./guard";

export type NewsFormState = { error?: string; success?: boolean };

export async function createNewsEvent(
  _prev: NewsFormState,
  form: FormData,
): Promise<NewsFormState> {
  await requireAdmin();
  try {
    if (!form.get("title") || !form.get("date")) {
      return { error: "Title and date are required." };
    }
    if (!form.get("tag")) {
      return { error: "Tag is required." };
    }
    await prisma.newsEvent.create({
      data: {
        title: form.get("title") as string,
        type: form.get("type") as any,
        date: new Date(form.get("date") as string),
        status: (form.get("status") as any) ?? "DRAFT",
        excerpt: (form.get("excerpt") as string) || undefined,
        content: (form.get("content") as string) || undefined,
        location: (form.get("location") as string) || undefined,
        imageUrl: (form.get("imageUrl") as string) || undefined,
        tag: (form.get("tag") as any) || undefined,
        featured: form.get("featured") === "true",
        featuredOrder: form.get("featuredOrder") ? Number(form.get("featuredOrder")) : null,
      },
    });
    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to create news/event." };
  }
}

export async function updateNewsEvent(
  id: string,
  _prev: NewsFormState,
  form: FormData,
): Promise<NewsFormState> {
  await requireAdmin();
  try {
    await prisma.newsEvent.update({
      where: { id },
      data: {
        title: form.get("title") as string,
        type: form.get("type") as any,
        date: new Date(form.get("date") as string),
        status: form.get("status") as any,
        excerpt: (form.get("excerpt") as string) || undefined,
        content: (form.get("content") as string) || undefined,
        location: (form.get("location") as string) || undefined,
        imageUrl: (form.get("imageUrl") as string) || null,
        tag: (form.get("tag") as any) || null,
        featured: form.get("featured") === "true",
        featuredOrder: form.get("featuredOrder") ? Number(form.get("featuredOrder")) : null,
      },
    });
    revalidatePath("/admin/news");
    revalidatePath("/news");
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    console.error(e);
    return { error: "Failed to update news/event." };
  }
}

export async function deleteNewsEvent(id: string): Promise<void> {
  await requireAdmin();
  await prisma.newsEvent.delete({ where: { id } });
  revalidatePath("/admin/news");
  revalidatePath("/news");
  revalidatePath("/");
}

export async function setFeaturedNews(
  id: string,
  featured: boolean,
  featuredOrder: number | null,
): Promise<void> {
  await requireAdmin();
  await prisma.newsEvent.update({
    where: { id },
    data: { featured, featuredOrder },
  });
  revalidatePath("/admin/news");
  revalidatePath("/");
}

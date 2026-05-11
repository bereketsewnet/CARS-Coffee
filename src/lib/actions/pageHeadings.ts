"use server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./guard";

const PAGE_PATHS: Record<string, string> = {
  project:        "/project",
  research:       "/research",
  team:           "/team",
  collaborations: "/collaborations",
  impact:         "/impact",
  library:        "/library",
  news:           "/news",
  gallery:        "/gallery",
  contact:        "/contact",
};

export async function upsertPageHeading(page: string, form: FormData) {
  await requireAdmin();
  const tag      = (form.get("tag")      as string)?.trim() ?? "";
  const title    = (form.get("title")    as string)?.trim() ?? "";
  const subtitle = (form.get("subtitle") as string)?.trim() ?? "";

  await prisma.pageHeading.upsert({
    where:  { page },
    update: { tag, title, subtitle },
    create: { page, tag, title, subtitle },
  });

  revalidatePath("/admin/headings");
  if (PAGE_PATHS[page]) revalidatePath(PAGE_PATHS[page]);
  return { success: true };
}

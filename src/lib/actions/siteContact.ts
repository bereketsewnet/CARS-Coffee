"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSiteContactInfo() {
  const info = await prisma.siteContactInfo.findFirst();
  return info;
}

export async function upsertSiteContactInfo(formData: FormData) {
  const data = {
    generalEmail:   (formData.get("generalEmail")   as string) || null,
    researchEmail:  (formData.get("researchEmail")  as string) || null,
    mediaEmail:     (formData.get("mediaEmail")     as string) || null,
    primaryPhone:   (formData.get("primaryPhone")   as string) || null,
    secondaryPhone: (formData.get("secondaryPhone") as string) || null,
    northLocation:  (formData.get("northLocation")  as string) || null,
    southLocation:  (formData.get("southLocation")  as string) || null,
    linkedin:       (formData.get("linkedin")       as string) || null,
    youtube:        (formData.get("youtube")        as string) || null,
    twitter:        (formData.get("twitter")        as string) || null,
    facebook:       (formData.get("facebook")       as string) || null,
    instagram:      (formData.get("instagram")      as string) || null,
    tiktok:         (formData.get("tiktok")         as string) || null,
    website:        (formData.get("website")        as string) || null,
  };

  const existing = await prisma.siteContactInfo.findFirst();

  if (existing) {
    await prisma.siteContactInfo.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteContactInfo.create({ data });
  }

  revalidatePath("/contact");
  revalidatePath("/admin/contact");
  return { success: true };
}

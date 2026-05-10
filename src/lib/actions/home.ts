"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertHomeContent(form: FormData) {
  const existing = await prisma.homeContent.findFirst();

  const data = {
    heroTitle1:      (form.get("heroTitle1") as string)?.trim()      || "Beyond the Bean: Empowering",
    heroTitle2:      (form.get("heroTitle2") as string)?.trim()      || "Communities Through Coffee Innovation",
    heroSubtitle:    (form.get("heroSubtitle") as string)?.trim()    || "",
    impactTitle:     (form.get("impactTitle") as string)?.trim()     || "Delivering",
    impactTitleBold: (form.get("impactTitleBold") as string)?.trim() || " Circular Impact",
    stat1Value:  parseInt(form.get("stat1Value") as string)  || 3,
    stat1Suffix: (form.get("stat1Suffix") as string) ?? "",
    stat1Label:  (form.get("stat1Label") as string)?.trim()  || "Research Pillars",
    stat2Value:  parseInt(form.get("stat2Value") as string)  || 2,
    stat2Suffix: (form.get("stat2Suffix") as string) ?? "",
    stat2Label:  (form.get("stat2Label") as string)?.trim()  || "Countries",
    stat3Value:  parseInt(form.get("stat3Value") as string)  || 5,
    stat3Suffix: (form.get("stat3Suffix") as string) ?? "+",
    stat3Label:  (form.get("stat3Label") as string)?.trim()  || "Years Impact",
  };

  if (existing) {
    await prisma.homeContent.update({ where: { id: existing.id }, data });
  } else {
    await prisma.homeContent.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/home");
  return { success: true };
}

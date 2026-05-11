import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import GalleryContent from "./GalleryContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | Circular Coffee",
  description: "Visual documentation of field research, laboratory work, and circular economy implementation.",
};

export default async function GalleryPage() {
  noStore();
  let heading = null;
  try {
    heading = await prisma.pageHeading.findUnique({ where: { page: "gallery" } });
  } catch {
    // DB unavailable — client component will use i18n fallback
  }
  return <GalleryContent heading={heading} />;
}

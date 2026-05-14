import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import GalleryContent from "./GalleryContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Field Gallery | CARES Circular Coffee",
  description:
    "Visual archive of field research, laboratory work, and circular economy implementation across the Ethiopian coffee supply chain in Sidama and Yirgacheffe.",
  keywords: [
    "CARES gallery", "coffee field research photos", "Ethiopia coffee farm photos",
    "circular economy Ethiopia photos", "coffee laboratory research", "Sidama coffee",
  ],
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Field Gallery | CARES Circular Coffee",
    description: "Visual documentation of field research and circular economy implementation in Ethiopian coffee communities.",
    url: "/gallery",
    images: [{ url: "/assets/page-bg/gallery.webp", alt: "CARES Field Research Gallery" }],
  },
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

import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import prisma from "@/lib/prisma";
import GalleryCrud from "@/components/admin/GalleryCrud";

export const metadata: Metadata = { title: "Gallery | Circular Coffee Admin" };

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  // Auto-seed existing public/cares-gallery images on first visit
  const count = await prisma.galleryImage.count();
  if (count === 0) {
    const galleryDir = path.join(process.cwd(), "public", "cares-gallery");
    try {
      const files = fs.readdirSync(galleryDir).filter((f) =>
        /\.(webp|jpg|jpeg|png|gif)$/i.test(f)
      );
      if (files.length > 0) {
        await prisma.galleryImage.createMany({
          data: files.map((filename, i) => ({
            filename,
            url: `/cares-gallery/${filename}`,
            active: true,
            order: i + 1,
          })),
          skipDuplicates: true,
        });
      }
    } catch {
      // public/cares-gallery not found — skip seeding
    }
  }

  const images = await prisma.galleryImage.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Gallery</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage photos shown in the public gallery. Limit: 100 images. Toggle visibility or delete as needed.
        </p>
      </div>
      <GalleryCrud images={images} />
    </div>
  );
}

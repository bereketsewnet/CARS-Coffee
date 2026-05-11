import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Library from "@/views/Library";

export const metadata: Metadata = {
  title: "Research Library | Circular Coffee",
  description:
    "Browse, filter, and download all research outputs from the Circular Coffee project.",
};

export default async function LibraryPage() {
  noStore();
  if (DB_DISABLED) {
    return <Library publications={[]} pillarContents={[]} />;
  }

  let publications: Awaited<ReturnType<typeof prisma.publication.findMany>> = [];
  let pillarContents: Awaited<ReturnType<typeof prisma.pillarContent.findMany>> = [];
  let heading = null;

  try {
    [publications, pillarContents, heading] = await Promise.all([
      prisma.publication.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ year: "desc" }, { createdAt: "desc" }],
      }),
      prisma.pillarContent.findMany({}),
      prisma.pageHeading.findUnique({ where: { page: "library" } }),
    ]);
  } catch (error) {
    console.error("Failed to load library page data from database", error);
  }

  return <Library publications={publications} pillarContents={pillarContents} heading={heading} />;
}

import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Library from "@/views/Library";

export const metadata: Metadata = {
  title: "Research Library & Publications | CARES Circular Coffee",
  description:
    "Browse, filter, and download all scientific publications, policy briefs, and field manuals from the CARES Circular Coffee project — covering soil health, biorefinery, and socio-economic research.",
  keywords: [
    "CARES publications", "circular coffee research papers", "coffee biorefinery publications",
    "soil health publications Ethiopia", "policy briefs coffee", "VLIR-UOS publications",
    "open access coffee research", "coffee waste research journal",
  ],
  alternates: { canonical: "/library" },
  openGraph: {
    title: "Research Library | CARES Circular Coffee",
    description: "All scientific publications, policy briefs, and field manuals from the CARES project.",
    url: "/library",
    images: [{ url: "/assets/page-bg/library.webp", alt: "CARES Research Library" }],
  },
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

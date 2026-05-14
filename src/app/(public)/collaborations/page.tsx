import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import Collaborations from "@/views/Collaborations";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const DB_DISABLED = process.env.DB_DISABLED === "true";

export const metadata: Metadata = {
  title: "CTBE Coordinators & Partners | CARES Circular Coffee",
  description:
    "Government officials, academic institutions, NGOs, sponsors, and civil society partners coordinating the CARES circular coffee research programme in Ethiopia and Belgium.",
  keywords: [
    "CARES coordinators", "CTBE partners", "circular coffee partners",
    "Ethiopian government coffee", "NGO coffee Ethiopia", "VLIR-UOS partners",
    "academic collaboration coffee", "civil society Ethiopia",
  ],
  alternates: { canonical: "/collaborations" },
  openGraph: {
    title: "Coordinators & Partners | CARES",
    description: "Meet the government, NGO, and academic partners coordinating the CARES circular coffee programme.",
    url: "/collaborations",
    images: [{ url: "/assets/page-bg/collaborations.webp", alt: "CARES Coordinators and Partners" }],
  },
};

export default async function CollaborationsPage() {
  noStore();
  if (DB_DISABLED) {
    return <Collaborations collaborators={null} />;
  }

  let collaborators = null;
  let heading = null;
  try {
    [collaborators, heading] = await Promise.all([
      prisma.collaborator.findMany({
        where: { active: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
      }),
      prisma.pageHeading.findUnique({ where: { page: "collaborations" } }),
    ]);
  } catch (error) {
    console.error("[CollaborationsPage] DB fetch failed", error);
  }

  return <Collaborations collaborators={collaborators} heading={heading} />;
}

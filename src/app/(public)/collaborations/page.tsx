import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import Collaborations from "@/views/Collaborations";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const DB_DISABLED = process.env.DB_DISABLED === "true";

export const metadata: Metadata = {
  title: "Coordinators | CARES",
  description: "Government officials, sponsors, NGO partners and other coordinators supporting the CARES circular coffee project.",
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

import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import Collaborations from "@/views/Collaborations";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const DB_DISABLED = process.env.DB_DISABLED === "true";

export const metadata: Metadata = {
  title: "Collaborations | CARES",
  description: "Government officials, sponsors, NGO partners and other collaborators supporting the CARES circular coffee project.",
};

export default async function CollaborationsPage() {
  if (DB_DISABLED) {
    return <Collaborations collaborators={null} />;
  }

  let collaborators = null;
  try {
    collaborators = await prisma.collaborator.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { name: "asc" }],
    });
  } catch (error) {
    console.error("[CollaborationsPage] DB fetch failed", error);
  }

  return <Collaborations collaborators={collaborators} />;
}

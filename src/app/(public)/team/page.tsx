import type { Metadata } from "next";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Team from "@/views/Team";

export const metadata: Metadata = {
  title: "Our Team | Circular Coffee",
  description:
    "A multidisciplinary research team spanning soil science, environmental engineering, economics, and gender studies.",
};

export default async function TeamPage() {
  if (DB_DISABLED) {
    return <Team members={[]} />;
  }

  let members: Awaited<ReturnType<typeof prisma.teamMember.findMany>> = [];

  try {
    members = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Failed to load team page data from database", error);
  }

  return <Team members={members} />;
}

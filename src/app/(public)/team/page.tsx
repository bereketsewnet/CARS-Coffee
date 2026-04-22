import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import type { TeamMember as DbMember } from "../../../../generated/prisma-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Team from "@/views/Team";

export const metadata: Metadata = {
  title: "Our Team | Circular Coffee",
  description:
    "A multidisciplinary research team spanning soil science, environmental engineering, economics, and gender studies.",
};

export default async function TeamPage() {
  if (DB_DISABLED) {
    return <Team />;
  }

  // null = DB unavailable, [] = DB connected but no active members
  let members: DbMember[] | null = null;

  try {
    members = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("[TeamPage] DB fetch failed — falling back to static data", error);
  }

  return <Team members={members} />;
}

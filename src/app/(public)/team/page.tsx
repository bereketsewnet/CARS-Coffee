import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import type { TeamMember as DbMember } from "../../../../generated/prisma-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const DB_DISABLED = process.env.DB_DISABLED === "true";
import Team from "@/views/Team";

export const metadata: Metadata = {
  title: "Our Research Team | CARES Circular Coffee",
  description:
    "A multidisciplinary team spanning soil science, environmental engineering, economics, and gender studies from Ethiopia and Belgium, united by the CARES circular coffee mission.",
  keywords: [
    "CARES research team", "Ethiopian researchers", "Belgian researchers",
    "soil science team", "circular economy researchers", "VLIR-UOS team",
    "Addis Ababa University researchers", "University of Antwerp researchers",
  ],
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Research Team | CARES",
    description: "Meet the multidisciplinary researchers behind the CARES Circular Coffee Project.",
    url: "/team",
    images: [{ url: "/assets/page-bg/team.webp", alt: "CARES Research Team" }],
  },
};

export default async function TeamPage() {
  noStore();
  if (DB_DISABLED) {
    return <Team />;
  }

  // null = DB unavailable, [] = DB connected but no active members
  let members: DbMember[] | null = null;
  let heading = null;

  try {
    [members, heading] = await Promise.all([
      prisma.teamMember.findMany({
        where: { active: true },
        orderBy: [{ order: "asc" }, { name: "asc" }],
      }),
      prisma.pageHeading.findUnique({ where: { page: "team" } }),
    ]);
  } catch (error) {
    console.error("[TeamPage] DB fetch failed — falling back to static data", error);
  }

  return <Team members={members} heading={heading} />;
}

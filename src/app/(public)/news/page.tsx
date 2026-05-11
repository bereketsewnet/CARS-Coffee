import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
const DB_DISABLED = process.env.DB_DISABLED === "true";
import NewsEvents from "@/views/NewsEvents";

export const metadata: Metadata = {
  title: "News & Events | Circular Coffee",
  description:
    "Project milestones, field stories, upcoming events, and policy updates.",
};

export default async function NewsPage() {
  noStore();
  if (DB_DISABLED) {
    return <NewsEvents items={[]} />;
  }

  let items: Awaited<ReturnType<typeof prisma.newsEvent.findMany>> = [];
  let heading = null;

  try {
    [items, heading] = await Promise.all([
      prisma.newsEvent.findMany({
        where: { status: { not: "DRAFT" } },
        orderBy: { date: "desc" },
      }),
      prisma.pageHeading.findUnique({ where: { page: "news" } }),
    ]);
  } catch (error) {
    console.error("Failed to load news page data from database", error);
  }

  return <NewsEvents items={items} heading={heading} />;
}

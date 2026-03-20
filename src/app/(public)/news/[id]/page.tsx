import type { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import NewsDetailView from "@/views/NewsDetail";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const item = await prisma.newsEvent.findUnique({ where: { id: decodedId } })
    ?? await prisma.newsEvent.findFirst({ where: { title: decodedId } });
  if (!item) return { title: "Not Found | Circular Coffee" };
  return {
    title: `${item.title} | Circular Coffee`,
    description: item.excerpt ?? undefined,
    openGraph: item.imageUrl ? { images: [item.imageUrl] } : undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);
  const item = await prisma.newsEvent.findUnique({ where: { id: decodedId } })
    ?? await prisma.newsEvent.findFirst({ where: { title: decodedId } });

  if (!item) notFound();

  return <NewsDetailView item={item} />;
}

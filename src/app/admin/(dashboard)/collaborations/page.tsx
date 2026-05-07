import { Suspense } from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import CollaboratorsCrud from "@/components/admin/CollaboratorsCrud";
import PaginationNav from "@/components/ui/PaginationNav";

export const metadata: Metadata = { title: "Coordinators | Circular Coffee Admin" };
export const dynamic = "force-dynamic";
export const revalidate = 0;

const PAGE_SIZE = 12;

export default async function CollaborationsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: rawPage } = await searchParams;
  const page = Math.max(1, Number(rawPage) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const [collaborators, total] = await Promise.all([
    prisma.collaborator.findMany({
      orderBy: [{ order: "asc" }, { name: "asc" }],
      skip,
      take: PAGE_SIZE,
    }),
    prisma.collaborator.count(),
  ]);
  const pageCount = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Coordinators</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage government officials, sponsors, NGO partners and other coordinators.{" "}
          <span className="text-muted-foreground/60 font-normal">{total} total</span>
        </p>
      </div>
      <CollaboratorsCrud items={collaborators} />
      <Suspense>
        <PaginationNav page={page} pageCount={pageCount} />
      </Suspense>
    </div>
  );
}

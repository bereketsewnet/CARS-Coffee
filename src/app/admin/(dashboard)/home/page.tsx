import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import HomeCrud from "@/components/admin/HomeCrud";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  noStore();
  const homeContent = await prisma.homeContent.findFirst().catch(() => null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold">Home Page — Hero Content</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit the hero titles, description, and circular stats shown on the public home page.
        </p>
      </div>
      <HomeCrud homeContent={homeContent} />
    </div>
  );
}

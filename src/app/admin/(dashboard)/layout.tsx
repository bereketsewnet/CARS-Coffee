import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | CARES",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user?.id },
    select: { name: true, email: true },
  });

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      <AdminSidebar user={dbUser || session.user} />
      <main className="flex-1 h-full overflow-y-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

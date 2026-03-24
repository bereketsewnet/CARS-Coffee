import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileForm from "./ProfileForm";

export const metadata = { title: "Account Settings" };

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/admin/login");

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true },
  });

  const defaultName = dbUser?.name ?? session.user.name ?? "";
  const defaultEmail = dbUser?.email ?? session.user.email ?? "";

  return (
    <ProfileForm
      defaultName={defaultName}
      defaultEmail={defaultEmail}
    />
  );
}

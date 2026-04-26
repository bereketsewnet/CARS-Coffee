import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ContactInfoCrud from "@/components/admin/ContactInfoCrud";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Contact Info | Circular Coffee Admin" };

export default async function AdminContactPage() {
  const info = await prisma.siteContactInfo.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Contact Info</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage institutional emails, office locations, and social media links displayed on the Contact page.
        </p>
      </div>
      <ContactInfoCrud info={info} />
    </div>
  );
}

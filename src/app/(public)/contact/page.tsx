import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import Contact from "@/views/Contact";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us | Circular Coffee",
  description: "Whether you're a researcher, farmer, funder, or curious mind — we'd love to hear from you.",
};

export default async function ContactPage() {
  noStore();
  let heading = null;
  try {
    heading = await prisma.pageHeading.findUnique({ where: { page: "contact" } });
  } catch {
    // DB unavailable — view will use i18n fallback
  }
  return <Contact heading={heading} />;
}

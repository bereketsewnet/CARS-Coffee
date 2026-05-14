import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "@/lib/prisma";
import Contact from "@/views/Contact";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us | CARES Circular Coffee Project",
  description:
    "Get in touch with the CARES Circular Coffee research team. We welcome researchers, farmers, funders, media, and partners interested in circular economy and sustainable coffee.",
  keywords: [
    "contact CARES", "contact circular coffee", "coffee research contact",
    "VLIR-UOS contact", "Ethiopia research collaboration", "coffee sustainability partnership",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | CARES Circular Coffee",
    description: "Reach out to the CARES team — researchers, farmers, funders and partners welcome.",
    url: "/contact",
    images: [{ url: "/assets/page-bg/contact.webp", alt: "Contact CARES Research Team" }],
  },
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

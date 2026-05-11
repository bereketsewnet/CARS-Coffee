import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import PageHeadingsCrud from "@/components/admin/PageHeadingsCrud";

export const metadata: Metadata = { title: "Page Headings | CARES Admin" };
export const dynamic = "force-dynamic";

const DEFAULTS = [
  { page: "project",        tag: "About the Project",  title: "The Circular Coffee Project",  subtitle: "A 4-year north–south cooperative research programme funded by VLIR-UOS, bringing together expertise from Belgium and Ethiopia to build a circular coffee economy." },
  { page: "research",       tag: "Academic Research",  title: "Research & Pillars",            subtitle: "Three interconnected research areas forming the scientific backbone of the Circular Coffee project." },
  { page: "team",           tag: "The People",         title: "Our Research Team",             subtitle: "A multidisciplinary team spanning soil science, environmental engineering, economics, and gender studies from Ethiopia and Belgium." },
  { page: "collaborations", tag: "CTBE-Coordination", title: "Our CTBE-Coordination",        subtitle: "Government officials, sponsors, civil society partners, and supporters who make the CARES mission possible." },
  { page: "impact",         tag: "Real-World Change",  title: "Impact & Stakeholders",         subtitle: "Measurable outcomes on soil, waste, and livelihoods — and the partners making it possible." },
  { page: "library",        tag: "Knowledge Base",     title: "Resource Library",              subtitle: "Scientific publications, policy briefs, and field manuals produced across the lifetime of the CARES project." },
  { page: "news",           tag: "Stay Updated",       title: "News & Events",                 subtitle: "Project milestones, field stories, upcoming events, and policy updates." },
  { page: "gallery",        tag: "Field Archive",      title: "CARES Gallery",                 subtitle: "Visual documentation of field research, laboratory work, and circular economy implementation across the Ethiopian coffee supply chain." },
  { page: "contact",        tag: "Get In Touch",       title: "Contact Us",                    subtitle: "Whether you're a researcher, farmer, funder, or curious mind — we'd love to hear from you." },
];

export default async function AdminHeadingsPage() {
  const existing = await prisma.pageHeading.findMany();
  const existingPages = new Set(existing.map((h) => h.page));

  // Auto-seed any missing pages with defaults
  const missing = DEFAULTS.filter((d) => !existingPages.has(d.page));
  if (missing.length > 0) {
    await prisma.pageHeading.createMany({ data: missing });
  }

  const headings = await prisma.pageHeading.findMany({
    orderBy: { page: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-foreground">Page Headings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Edit the tag pill, title, and subtitle shown in the hero section of each public page.
        </p>
      </div>
      <PageHeadingsCrud headings={headings} />
    </div>
  );
}

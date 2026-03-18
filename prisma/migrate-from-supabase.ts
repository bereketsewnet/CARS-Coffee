/**
 * migrate-from-supabase.ts
 * ─────────────────────────────────────────────────────────────────
 * One-time script: reads every row from the old Supabase (PostgreSQL)
 * database and inserts it into the new local MySQL database via Prisma.
 *
 * Run with:
 *   npx tsx prisma/migrate-from-supabase.ts
 *
 * Requirements:
 *   - XAMPP MySQL must be running
 *   - MySQL database "care_coffee" must exist
 *   - prisma migrate dev must have been run first (tables must exist)
 * ─────────────────────────────────────────────────────────────────
 */

import { Pool } from "pg";
import { PrismaClient } from "../generated/prisma-client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as dotenv from "dotenv";

// ── Load env ──────────────────────────────────────────────────────
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const pool = new Pool({
  host: "aws-1-eu-north-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
  user: "postgres.pvznvxfyyngdughhjwhx",
  password: "G21030278n@T",
  ssl: { rejectUnauthorized: false },
  max: 3,
});

// ── Target: new MySQL DB via Prisma ────────────────────────────────
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

// Helper: run a raw SELECT on Supabase
async function fetchAll<T>(sql: string): Promise<T[]> {
  const { rows } = await pool.query(sql);
  return rows as T[];
}

async function main() {
  console.log("🚀 Starting migration from Supabase → MySQL...\n");

  // ── 1. Users ────────────────────────────────────────────────────
  console.log("📦 Migrating Users...");
  const users = await fetchAll<{
    id: string; email: string; name: string | null; passwordHash: string;
    role: string; createdAt: Date; updatedAt: Date;
  }>(`SELECT id, email, name, "passwordHash", role, "createdAt", "updatedAt" FROM "User"`);

  for (const u of users) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: { email: u.email, name: u.name, passwordHash: u.passwordHash, role: u.role as "ADMIN" | "SUPER_ADMIN" },
      create: { id: u.id, email: u.email, name: u.name, passwordHash: u.passwordHash, role: u.role as "ADMIN" | "SUPER_ADMIN", createdAt: new Date(u.createdAt), updatedAt: new Date(u.updatedAt) },
    });
  }
  console.log(`  ✅ ${users.length} users migrated`);

  // ── 2. PasswordResetTokens ─────────────────────────────────────
  console.log("📦 Migrating PasswordResetTokens...");
  const tokens = await fetchAll<{
    id: string; userId: string; token: string; expiresAt: Date;
    used: boolean; createdAt: Date;
  }>(`SELECT id, "userId", token, "expiresAt", used, "createdAt" FROM "PasswordResetToken"`);

  for (const t of tokens) {
    await prisma.passwordResetToken.upsert({
      where: { id: t.id },
      update: { token: t.token, used: t.used },
      create: { id: t.id, userId: t.userId, token: t.token, expiresAt: new Date(t.expiresAt), used: t.used, createdAt: new Date(t.createdAt) },
    });
  }
  console.log(`  ✅ ${tokens.length} password reset tokens migrated`);

  // ── 3. Publications ────────────────────────────────────────────
  console.log("📦 Migrating Publications...");
  const pubs = await fetchAll<{
    id: string; title: string; authors: string; year: number; type: string;
    pillar: string | null; status: string; abstract: string | null;
    url: string | null; doi: string | null; pdfUrl: string | null;
    createdAt: Date; updatedAt: Date;
  }>(`SELECT id, title, authors, year, type, pillar, status, abstract, url, doi, "pdfUrl", "createdAt", "updatedAt" FROM "Publication"`);

  for (const p of pubs) {
    await prisma.publication.upsert({
      where: { id: p.id },
      update: { title: p.title, authors: p.authors, year: p.year, type: p.type as any, pillar: p.pillar as any, status: p.status as any, abstract: p.abstract, url: p.url, doi: p.doi, pdfUrl: p.pdfUrl },
      create: { id: p.id, title: p.title, authors: p.authors, year: p.year, type: p.type as any, pillar: p.pillar as any, status: p.status as any, abstract: p.abstract, url: p.url, doi: p.doi, pdfUrl: p.pdfUrl, createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt) },
    });
  }
  console.log(`  ✅ ${pubs.length} publications migrated`);

  // ── 4. TeamMembers ─────────────────────────────────────────────
  console.log("📦 Migrating TeamMembers...");
  const team = await fetchAll<{
    id: string; name: string; role: string; institution: string; country: string;
    pillar: string | null; bio: string | null; email: string | null;
    imageUrl: string | null; active: boolean; createdAt: Date; updatedAt: Date;
  }>(`SELECT id, name, role, institution, country, pillar, bio, email, "imageUrl", active, "createdAt", "updatedAt" FROM "TeamMember"`);

  for (const m of team) {
    await prisma.teamMember.upsert({
      where: { id: m.id },
      update: { name: m.name, role: m.role, institution: m.institution, country: m.country, pillar: m.pillar as any, bio: m.bio, email: m.email, imageUrl: m.imageUrl, active: m.active },
      create: { id: m.id, name: m.name, role: m.role, institution: m.institution, country: m.country, pillar: m.pillar as any, bio: m.bio, email: m.email, imageUrl: m.imageUrl, active: m.active, createdAt: new Date(m.createdAt), updatedAt: new Date(m.updatedAt) },
    });
  }
  console.log(`  ✅ ${team.length} team members migrated`);

  // ── 5. NewsEvents ──────────────────────────────────────────────
  console.log("📦 Migrating NewsEvents...");
  const news = await fetchAll<{
    id: string; title: string; type: string; date: Date; status: string;
    excerpt: string | null; content: string | null; location: string | null;
    imageUrl: string | null; createdAt: Date; updatedAt: Date;
  }>(`SELECT id, title, type, date, status, excerpt, content, location, "imageUrl", "createdAt", "updatedAt" FROM "NewsEvent"`);

  for (const n of news) {
    await prisma.newsEvent.upsert({
      where: { id: n.id },
      update: { title: n.title, type: n.type as any, date: new Date(n.date), status: n.status as any, excerpt: n.excerpt, content: n.content, location: n.location, imageUrl: n.imageUrl },
      create: { id: n.id, title: n.title, type: n.type as any, date: new Date(n.date), status: n.status as any, excerpt: n.excerpt, content: n.content, location: n.location, imageUrl: n.imageUrl, createdAt: new Date(n.createdAt), updatedAt: new Date(n.updatedAt) },
    });
  }
  console.log(`  ✅ ${news.length} news/events migrated`);

  // ── 6. ResearchProjects ────────────────────────────────────────
  console.log("📦 Migrating ResearchProjects...");
  const projects = await fetchAll<{
    id: string; title: string; pillar: string; status: string;
    lead: string | null; description: string | null;
    startDate: Date | null; endDate: Date | null; createdAt: Date; updatedAt: Date;
  }>(`SELECT id, title, pillar, status, lead, description, "startDate", "endDate", "createdAt", "updatedAt" FROM "ResearchProject"`);

  for (const rp of projects) {
    await prisma.researchProject.upsert({
      where: { id: rp.id },
      update: { title: rp.title, pillar: rp.pillar as any, status: rp.status as any, lead: rp.lead, description: rp.description, startDate: rp.startDate ? new Date(rp.startDate) : null, endDate: rp.endDate ? new Date(rp.endDate) : null },
      create: { id: rp.id, title: rp.title, pillar: rp.pillar as any, status: rp.status as any, lead: rp.lead, description: rp.description, startDate: rp.startDate ? new Date(rp.startDate) : null, endDate: rp.endDate ? new Date(rp.endDate) : null, createdAt: new Date(rp.createdAt), updatedAt: new Date(rp.updatedAt) },
    });
  }
  console.log(`  ✅ ${projects.length} research projects migrated`);

  // ── 7. ContactMessages ─────────────────────────────────────────
  console.log("📦 Migrating ContactMessages...");
  const msgs = await fetchAll<{
    id: string; name: string; email: string; organisation: string | null;
    subject: string; body: string; read: boolean; archived: boolean; createdAt: Date;
  }>(`SELECT id, name, email, organisation, subject, body, read, archived, "createdAt" FROM "ContactMessage"`);

  for (const msg of msgs) {
    await prisma.contactMessage.upsert({
      where: { id: msg.id },
      update: { name: msg.name, email: msg.email, organisation: msg.organisation, subject: msg.subject, body: msg.body, read: msg.read, archived: msg.archived },
      create: { id: msg.id, name: msg.name, email: msg.email, organisation: msg.organisation, subject: msg.subject, body: msg.body, read: msg.read, archived: msg.archived, createdAt: new Date(msg.createdAt) },
    });
  }
  console.log(`  ✅ ${msgs.length} contact messages migrated`);

  // ── 8. NewsletterSubscribers ───────────────────────────────────
  console.log("📦 Migrating NewsletterSubscribers...");
  const subs = await fetchAll<{
    id: string; email: string; name: string | null; source: string | null;
    active: boolean; createdAt: Date; updatedAt: Date;
  }>(`SELECT id, email, name, source, active, "createdAt", "updatedAt" FROM "NewsletterSubscriber"`);

  for (const s of subs) {
    await prisma.newsletterSubscriber.upsert({
      where: { id: s.id },
      update: { email: s.email, name: s.name, source: s.source, active: s.active },
      create: { id: s.id, email: s.email, name: s.name, source: s.source, active: s.active, createdAt: new Date(s.createdAt), updatedAt: new Date(s.updatedAt) },
    });
  }
  console.log(`  ✅ ${subs.length} newsletter subscribers migrated`);

  // ── 9. Partners ────────────────────────────────────────────────
  console.log("📦 Migrating Partners...");
  const partners = await fetchAll<{
    id: string; name: string; logoUrl: string | null; website: string | null;
    order: number; active: boolean; createdAt: Date; updatedAt: Date;
  }>(`SELECT id, name, "logoUrl", website, "order", active, "createdAt", "updatedAt" FROM "Partner"`);

  for (const p of partners) {
    await prisma.partner.upsert({
      where: { id: p.id },
      update: { name: p.name, logoUrl: p.logoUrl, website: p.website, order: p.order, active: p.active },
      create: { id: p.id, name: p.name, logoUrl: p.logoUrl, website: p.website, order: p.order, active: p.active, createdAt: new Date(p.createdAt), updatedAt: new Date(p.updatedAt) },
    });
  }
  console.log(`  ✅ ${partners.length} partners migrated`);

  // ── 10. ImpactMetrics ──────────────────────────────────────────
  console.log("📦 Migrating ImpactMetrics...");
  const metrics = await fetchAll<{
    id: string; label: string; value: string; pillar: string | null;
    year: number; notes: string | null; createdAt: Date; updatedAt: Date;
  }>(`SELECT id, label, value, pillar, year, notes, "createdAt", "updatedAt" FROM "ImpactMetric"`);

  for (const m of metrics) {
    await prisma.impactMetric.upsert({
      where: { id: m.id },
      update: { label: m.label, value: m.value, pillar: m.pillar as any, year: m.year, notes: m.notes },
      create: { id: m.id, label: m.label, value: m.value, pillar: m.pillar as any, year: m.year, notes: m.notes, createdAt: new Date(m.createdAt), updatedAt: new Date(m.updatedAt) },
    });
  }
  console.log(`  ✅ ${metrics.length} impact metrics migrated`);

  console.log("\n🎉 Migration from Supabase → MySQL complete!");
  console.log("   All data has been copied to your local MySQL database.\n");
}

main()
  .catch((e) => {
    console.error("\n❌ Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
    await prisma.$disconnect();
  });

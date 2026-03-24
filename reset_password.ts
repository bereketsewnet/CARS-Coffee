import { PrismaClient } from "./generated/prisma-client/index.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Resetting all ADMIN passwords to 'admin123'...");
  const passwordHash = await bcrypt.hash("admin123", 12);
  await prisma.user.updateMany({
    where: { role: "ADMIN" },
    data: { passwordHash }
  });
  console.log("✅ Password successfully reset!");
}

main().catch(console.error).finally(() => prisma.$disconnect());

const { PrismaClient } = require("./generated/prisma-client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
  const users = await prisma.user.findMany();
  console.log("USERS:", JSON.stringify(users, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());

import { PrismaClient } from "../../generated/prisma-client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Singleton pattern — prevent multiple Prisma Client instances in dev (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL environment variable is not set. Add it to .env.local"
    );
  }
  // PrismaMariaDb accepts a connection string (mysql://...) or PoolConfig
  const adapter = new PrismaMariaDb(connectionString);
  return new PrismaClient({ adapter });
}

export const prisma =
  process.env.NODE_ENV === "production"
    ? makePrismaClient()
    : (globalForPrisma.prisma ?? (globalForPrisma.prisma = makePrismaClient()));

export default prisma;

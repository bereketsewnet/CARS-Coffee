import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// Load from .env.local first (Next.js convention), then fall back to .env
config({ path: ".env.local" });
config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Prisma 7: URL must be in prisma.config.ts, NOT in schema.prisma
    // Local XAMPP: mysql://root@localhost:3306/care_coffee
    // cPanel production: mysql://db_user:db_password@localhost:3306/db_name
    url: process.env["DATABASE_URL"]!,
  },
});

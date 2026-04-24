import { PrismaClient } from "./generated/prisma-client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function migrate() {
  const pillars = [
    {
      pillar: "SOIL_HEALTH",
      title: "Soil Health & Regeneration",
      tagline: "Using robust scientific data to build lasting resilience in vulnerable regions.",
      laymanDesc: "We explore how restoring degraded coffee lands can significantly boost both the bean's cup quality and overall output. By integrating bio-fermentation waste into natural fertilizers..."
    },
    {
      pillar: "WASTE_VALORIZATION",
      title: "Waste Valorization",
      tagline: "Transforming organic by-products into high-value secondary resources.",
      laymanDesc: "Coffee processing typically leaves behind huge amounts of unused cherry pulp and mucilage, which can pollute local water systems if left untreated. Our studies show..."
    },
    {
      pillar: "SOCIO_ECONOMIC",
      title: "Socio-Economic Systems",
      tagline: "Strengthening community-level economic models.",
      laymanDesc: "Beyond the agronomy, sustainable coffee must financially empower its farmers. We quantify differences in living wages, study gender equity in land ownership..."
    }
  ];

  for (const p of pillars) {
    await prisma.pillarContent.upsert({
      where: { pillar: p.pillar as any },
      update: {},
      create: p
    });
  }
  console.log("Done moving 3 Pillars to DB!");
}
migrate().catch(console.error);

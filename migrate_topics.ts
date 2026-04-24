import { PrismaClient } from "./generated/prisma-client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function migrate() {
  const topics = [
    { title: "Anaerobic Fermentation Processes", desc: "Optimizing controlled oxygen-free fermentation...", pillar: "SOIL_HEALTH" },
    { title: "Artisanal Coffee Wine Production", desc: "Testing scalable low-cost methods for transforming coffee pulp...", pillar: "SOIL_HEALTH" },
    { title: "Premium Bean Valorization", desc: "Improving specialty market scores through precision drying...", pillar: "SOIL_HEALTH" },
    { title: "Sustainable Bioenergy Systems", desc: "Developing localized anaerobic digesters to power processing equipment...", pillar: "WASTE_VALORIZATION" },
    { title: "Soil Health Enhancement", desc: "Creating nutrient-dense bio-fertilizers from composted husk...", pillar: "WASTE_VALORIZATION" },
    { title: "Water Recycling Mechanisms", desc: "Filtering mucilage wash-water using natural sand...", pillar: "WASTE_VALORIZATION" },
    { title: "Botanical Pesticides", desc: "Extracting defensive compounds from coffee cascara...", pillar: "SOCIO_ECONOMIC" },
    { title: "High-Value Cosmetics", desc: "Isolating coffee oils and antioxidants for the skincare industry...", pillar: "SOCIO_ECONOMIC" },
    { title: "Biochemical Extraction Efficiency", desc: "Standardizing extraction techniques to ensure high yields...", pillar: "SOCIO_ECONOMIC" }
  ];

  for (const t of topics) {
    await prisma.researchProject.create({
      data: {
        title: t.title,
        description: t.desc,
        pillar: t.pillar as any,
        status: "ACTIVE",
        lead: "Admin Imported"
      }
    });
  }
  console.log("Done moving 9 topics to DB!");
}
migrate().catch(console.error);

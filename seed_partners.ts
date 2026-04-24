import { PrismaClient } from "./generated/prisma-client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const partners = [
  {
    name: "Ethiolab",
    logoUrl: "/assets/Ethiolab.jpg",
    isHorizontal: true,
    description: "Provides laboratory testing, quality control, and scientific analysis for coffee byproducts.",
    role: "lab",
    website: "https://ethiolab.et/",
  },
  {
    name: "VLIR-UOS",
    logoUrl: "/assets/VLIRUOS.jpg",
    isHorizontal: true,
    description: "The Flemish interuniversity council funding the north-south research collaboration between Belgium and Ethiopia.",
    role: "research",
    website: "https://www.vliruos.be/",
  },
  {
    name: "Life Agro",
    logoUrl: "/assets/Life_Agro_Coffee_Quality_Control_Training_Institute_LIFE_AGRO.jpg",
    isHorizontal: false,
    description: "A coffee training center focusing on capacity building, quality control, and sustainable agricultural practices.",
    role: "research",
  },
  {
    name: "Hafursa Cooperative",
    logoUrl: "/assets/Hafursa Cooperative.jpg",
    isHorizontal: false,
    description: "A local Ethiopian coffee cooperative in Yirgacheffe supplying raw materials and community insight.",
    role: "farmer",
  },
  {
    name: "Ethiomama Coffee",
    logoUrl: "/assets/Ethiomama Coffee.jpg",
    isHorizontal: false,
    description: "An Ethiopian coffee producer focusing on sustainable processing and female empowerment.",
    role: "farmer",
  },
  {
    name: "Addis Ababa University",
    logoUrl: "/assets/ADDIS ABABA UNIVERSITY.jpg",
    isHorizontal: false,
    description: "Leading the local academic research on transforming coffee waste into value.",
    role: "university",
    website: "https://www.aau.edu.et/",
  },
  {
    name: "University of Antwerp",
    logoUrl: "/assets/UNIVERSITY OF ANTWERP.jpg",
    isHorizontal: true,
    description: "Providing international research expertise in circular economy and bio-engineering.",
    role: "university",
    website: "https://www.uantwerpen.be/en/",
  },
  {
    name: "Belgian Development Cooperation",
    logoUrl: "/assets/BELGIUM DEVELOPMENT COOPERATION.jpg",
    isHorizontal: true,
    description: "Supports sustainable development initiatives and international collaboration in Ethiopia.",
    role: "ngo",
    website: "https://www.enabel.be/",
  },
  {
    name: "Ethiopian Coffee and Tea Authority",
    logoUrl: "/assets/Ethiopian Coffee and Tea Authority-ECTA.jpg",
    isHorizontal: true,
    description: "Provides policy guidance and sector leadership for Ethiopia's coffee and tea value chains.",
    role: "other",
    website: "https://ethiocta.gov.et/",
  },
  {
    name: "Ethiopian Conformity Assessment Enterprise",
    logoUrl: "/assets/Ethiopian Conformity Assessment Enterprise-ECAE.jpg",
    isHorizontal: true,
    description: "Ensures conformity assessment, certification, and quality standards for coffee products.",
    role: "lab",
    website: "https://ecae.org.et/",
  },
  {
    name: "Ethiopian Society of Chemical Engineers",
    logoUrl: "/assets/Ethiopian Society of Chemical Engineers.jpg",
    isHorizontal: true,
    description: "Brings chemical engineering expertise to valorize coffee waste into new materials and products.",
    role: "research",
    website: "https://www.eschenew.com/",
  },
  {
    name: "New Millennium Women Empowerment Organization",
    logoUrl: "/assets/New Millennium Women Empowerment Organization-NMWEO.jpg",
    isHorizontal: true,
    description: "Partners on gender-inclusive value chains and community impact in the circular coffee economy.",
    role: "ngo",
    website: "https://nmweo.org/",
  },
  {
    name: "Kawet Coffee",
    logoUrl: "/assets/kawetcoffee.jpg",
    isHorizontal: true,
    description: "A valuable partner integrating sustainable and circular practices in coffee processing and production.",
    role: "other",
    website: "https://www.kawetcoffee.com/",
  },
];

async function main() {
  const existing = await prisma.partner.count();
  if (existing > 0) {
    console.log("Partners already exist, skipping seed.");
    return;
  }
  
  for (let i = 0; i < partners.length; i++) {
    await prisma.partner.create({
      data: {
        ...partners[i],
        order: i,
      },
    });
  }
  console.log("Seeded", partners.length, "partners");
}
main().catch(console.error);

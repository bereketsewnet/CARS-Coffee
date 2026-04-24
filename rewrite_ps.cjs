const fs = require('fs');
let file = 'src/components/PartnersSection/PartnersSection.tsx';
let txt = fs.readFileSync(file, 'utf8');

// Replace standard imports
txt = txt.replace(/import AddisAbabaUniversity[\s\S]*?import KawetCoffee from "@/assets\/kawetcoffee.jpg";/, '');

// Change interface Partner
let intPartner = `export interface Partner {
  id: string;
  name: string;
  logoUrl?: string; // from db
  img?: string;     // from old static
  isHorizontal: boolean;
  description?: string;
  context?: string;
  role?: PartnerRole | string;
  website?: string;
}`;
txt = txt.replace(/export interface Partner \{[\s\S]*?\}/, intPartner);

// Remove static array
txt = txt.replace(/const partners: Partner\[\] = \[[\s\S]*?\];\n/, '');

// Add React.FC signature with partners prop
txt = txt.replace(/export const PartnersSection: React\.FC = \(\) => \{/, 'export const PartnersSection: React.FC<{ partners?: Partner[] }> = ({ partners = [] }) => {\n  // Early return if empty\n  if (!partners || partners.length === 0) return null;');

// Inside askGeminiAPI, partner.context -> partner.description ?? partner.context
txt = txt.replace(/Context about this partner: \$\{partner\.context\}\./, 'Context about this partner: ${partner.description ?? partner.context ?? "A valued partner"}.');

// Fix img rendering in PartnersSection Component
txt = txt.replace(/src=\{p\.img\}/g, 'src={p.logoUrl ?? p.img}');

// Fix "context" rendering inside component modal
txt = txt.replace(/\{selectedPartner\.context\}/, '{selectedPartner.description ?? selectedPartner.context}');

// Remove hardcoded Gemini prompt static dependency if any... wait, none

fs.writeFileSync(file, txt);
console.log("Rewrite completed");

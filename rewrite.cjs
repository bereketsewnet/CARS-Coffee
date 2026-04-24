const fs = require('fs');
let file = 'src/components/PartnersSection/PartnersSection.tsx';
let txt = fs.readFileSync(file, 'utf8');

// Replace standard imports
txt = txt.replace(/import AddisAbabaUniversity[\s\S]*?import KawetCoffee from "@\/assets\/kawetcoffee\.jpg";/, '');

// Change interface Partner
let intPartner = `export interface Partner {
  id: string;
  name: string;
  logoUrl?: string; // from db
  img?: string;     // from old static
  isHorizontal: boolean;
  description: string | null;
  context?: string;
  role?: PartnerRole | string | null;
  website: string | null;
}`;
txt = txt.replace(/export interface Partner \{[\s\S]*?\}/, intPartner);

// Remove static array
txt = txt.replace(/const partners: Partner\[\] = \[[\s\S]*?\];/m, '');

// Add parameter to function
txt = txt.replace(/export const PartnersSection: React\.FC = \(\) => \{/, 'export const PartnersSection: React.FC<{ partners?: Partner[] }> = ({ partners = [] }) => {\n  if (!partners || partners.length === 0) return null;');

// Inside askGeminiAPI, update string templating context
txt = txt.replace(/Context about this partner: \$\{partner\.context\}\./, 'Context about this partner: ${partner.description ?? partner.context ?? "A valued partner"}.');

// Fix img rendering in PartnersSection Component
txt = txt.replace(/src=\{p\.img\}/g, 'src={p.logoUrl ?? p.img ?? ""}');
txt = txt.replace(/src=\{selectedPartner\.img\}/g, 'src={selectedPartner.logoUrl ?? selectedPartner.img ?? ""}');

// Fix "context" rendering inside component modal
txt = txt.replace(/\{selectedPartner\.context\}/g, '{selectedPartner.description ?? selectedPartner.context}');

fs.writeFileSync(file, txt);
console.log("Rewrite completed");

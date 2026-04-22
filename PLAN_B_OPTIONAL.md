# 🎨 Plan B: Optional / Design Polish Implementation

This plan covers the visual "vibes", colors, and mild layout adjustments that are nice-to-have but shouldn't block the core project timelines.

## 1. Color Palette Integration
**Target Files:** `tailwind.config.ts`
Add their requested brand colors to the Tailwind theme configuration:
* `background`: Deep Coffee Black (`#171412`)
* `surface`: Roasted Bean (`#241E1A`)
* `text-main`: Unbleached Cream (`#F2EBD9`)
* `accent-red`: Fermented Cherry Red (`#8C2F39`) - Apply to Pillar 1 buttons/highlights.
* `accent-green`: Mossy Green (`#4A6B53`) - Apply to Pillar 2 buttons/highlights.

## 2. Image Curation (Shot List Guide)
Search for or filter existing assets (in `public/`) to match the client's highly specific "Shot List":
* **Hero:** Wide sweeping landscape in Sidama/Yirgacheffe at golden hour.
* **Specialty Coffee:** Macro shot of dark red cherries in water.
* **Bio-Energy:** Crumbling soil with a green sprout.
* **Cosmetics:** Flat-lay of raw, dried coffee cascara.
* **Impact:** Authentic smiling group shots of women from the cooperatives.

## 3. Typography & Sizing Adjustments
**Target Files:** `src/components/Navbar.tsx`, `src/views/Index.tsx`
* Safely increase the max-width or height of the `IMAGE 3 LOGO` in the Navbar using Tailwind responsive classes (e.g., `md:h-16 lg:h-20`).
* Slightly bump up the text size for "CARES" and "Circular Economy Research" titles, ensuring it remains mobile-friendly (e.g., `text-2xl md:text-4xl lg:text-5xl`).

## 4. Known Pushbacks (Do Not Implement)
* **Custom Animations:** Ignore the request for complex animations on the "Join" section to save development time and keep page performance high.
* **Arbitrary Font Sizing:** Do not force giant font sizes that break mobile responsiveness, stick to the Tailwind design system.
* **Sentence-Level Coloring:** Avoid painting individual sentences multiple colors; rely on the global Tailwind theme for web accessibility.
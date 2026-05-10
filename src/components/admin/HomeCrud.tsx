"use client";

import { useState } from "react";
import { upsertHomeContent } from "@/lib/actions/home";

const inputCls = "w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-leaf-bright/40";
const textareaCls = inputCls + " resize-y min-h-[80px]";
const labelCls = "block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1.5";

type HomeContent = {
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  impactTitle: string;
  impactTitleBold: string;
  stat1Value: number; stat1Suffix: string; stat1Label: string;
  stat2Value: number; stat2Suffix: string; stat2Label: string;
  stat3Value: number; stat3Suffix: string; stat3Label: string;
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function StatRow({ n, data }: { n: 1 | 2 | 3; data: HomeContent }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Field label={`Stat ${n} — Value`}>
        <input type="number" name={`stat${n}Value`} defaultValue={(data as any)[`stat${n}Value`]} className={inputCls} />
      </Field>
      <Field label="Suffix">
        <input name={`stat${n}Suffix`} defaultValue={(data as any)[`stat${n}Suffix`]} className={inputCls} placeholder="+ or %" />
      </Field>
      <Field label="Label">
        <input name={`stat${n}Label`} defaultValue={(data as any)[`stat${n}Label`]} className={inputCls} />
      </Field>
    </div>
  );
}

export default function HomeCrud({ homeContent }: { homeContent: HomeContent | null }) {
  const defaults: HomeContent = homeContent ?? {
    heroTitle1: "Beyond the Bean: Empowering",
    heroTitle2: "Communities Through Coffee Innovation",
    heroSubtitle: "We turn coffee waste into wealth. Our project empowers local farmers and women's cooperatives in Sidama and Yirgacheffe by creating green energy, bio-pesticides, and premium cosmetics—proving that zero-waste agriculture leads to thriving communities.",
    impactTitle: "Delivering",
    impactTitleBold: " Circular Impact",
    stat1Value: 3, stat1Suffix: "", stat1Label: "Research Pillars",
    stat2Value: 2, stat2Suffix: "", stat2Label: "Countries",
    stat3Value: 5, stat3Suffix: "+", stat3Label: "Years Impact",
  };

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true); setError(null); setSaved(false);
    try {
      const result = await upsertHomeContent(new FormData(e.currentTarget));
      if ((result as any).success) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ── Hero Section ── */}
      <section className="glass-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-serif text-lg font-semibold">Hero Text (State 1)</h2>
        <p className="text-xs text-muted-foreground -mt-2">The first screen the visitor sees before scrolling.</p>

        <Field label="Title Line 1">
          <input name="heroTitle1" defaultValue={defaults.heroTitle1} className={inputCls} />
        </Field>
        <Field label="Title Line 2 (green text)">
          <input name="heroTitle2" defaultValue={defaults.heroTitle2} className={inputCls} />
        </Field>
        <Field label="Subtitle / Description">
          <textarea name="heroSubtitle" defaultValue={defaults.heroSubtitle} className={textareaCls} />
        </Field>
      </section>

      {/* ── Impact Section (State 2) ── */}
      <section className="glass-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-serif text-lg font-semibold">Impact Heading (State 2)</h2>
        <p className="text-xs text-muted-foreground -mt-2">Shown as the visitor scrolls down through the hero.</p>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Title (white)">
            <input name="impactTitle" defaultValue={defaults.impactTitle} className={inputCls} />
          </Field>
          <Field label="Title Bold (green)">
            <input name="impactTitleBold" defaultValue={defaults.impactTitleBold} className={inputCls} />
          </Field>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="glass-card rounded-2xl border border-border p-6 space-y-5">
        <h2 className="font-serif text-lg font-semibold">Circular Stats (3 counters)</h2>
        <p className="text-xs text-muted-foreground -mt-2">Displayed beneath the impact heading — e.g. "3 Research Pillars", "5+ Years".</p>

        <StatRow n={1} data={defaults} />
        <StatRow n={2} data={defaults} />
        <StatRow n={3} data={defaults} />
      </section>

      {/* ── Save ── */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-leaf-bright text-background font-semibold text-sm disabled:opacity-50 transition-opacity"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
        {saved && <span className="text-leaf-bright text-sm font-medium">✓ Saved successfully</span>}
        {error && <span className="text-destructive text-sm">{error}</span>}
      </div>
    </form>
  );
}

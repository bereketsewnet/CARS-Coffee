"use client";
import React, { useState, useTransition, useEffect } from "react";
import { Save, Loader2, CheckCircle, Type } from "lucide-react";
import { upsertPageHeading } from "@/lib/actions/pageHeadings";
import { Field, inputCls, textareaCls } from "./CrudHelpers";

type HeadingRow = { page: string; tag: string; title: string; subtitle: string };

const PAGE_CONFIG = [
  { page: "project",        label: "The Project" },
  { page: "research",       label: "Research & Pillars" },
  { page: "team",           label: "Team" },
  { page: "collaborations", label: "Coordinators" },
  { page: "impact",         label: "Impact" },
  { page: "library",        label: "Library" },
  { page: "news",           label: "News & Events" },
  { page: "gallery",        label: "Gallery" },
  { page: "contact",        label: "Contact" },
];

function PageHeadingForm({ row }: { row: HeadingRow }) {
  const [tag,      setTag]      = useState(row.tag);
  const [title,    setTitle]    = useState(row.title);
  const [subtitle, setSubtitle] = useState(row.subtitle);
  const [pending,  startTransition] = useTransition();
  const [saved,    setSaved]    = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  useEffect(() => { setTag(row.tag); setTitle(row.title); setSubtitle(row.subtitle); }, [row]);
  useEffect(() => {
    if (saved) { const t = setTimeout(() => setSaved(false), 3000); return () => clearTimeout(t); }
  }, [saved]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await upsertPageHeading(row.page, fd);
      if ((res as any)?.error) setError((res as any).error);
      else setSaved(true);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Tag pill">
          <input
            name="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className={inputCls}
            placeholder="e.g. About the Project"
          />
        </Field>
        <Field label="Page title">
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputCls}
            placeholder="e.g. The Circular Coffee Project"
          />
        </Field>
      </div>
      <Field label="Subtitle">
        <textarea
          name="subtitle"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          rows={2}
          className={textareaCls}
          placeholder="Short description shown below the title…"
        />
      </Field>
      {error && <p className="text-xs text-rose-400">{error}</p>}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-sm font-semibold disabled:opacity-50"
        >
          {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          {pending ? "Saving…" : "Save"}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-leaf-bright text-sm font-medium">
            <CheckCircle className="w-4 h-4" /> Saved!
          </span>
        )}
      </div>
    </form>
  );
}

export default function PageHeadingsCrud({ headings }: { headings: HeadingRow[] }) {
  const map = Object.fromEntries(headings.map((h) => [h.page, h]));

  return (
    <div className="space-y-6">
      {PAGE_CONFIG.map(({ page, label }) => {
        const row = map[page] ?? { page, tag: "", title: "", subtitle: "" };
        return (
          <div key={page} className="glass-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-serif font-bold text-base flex items-center gap-2">
              <Type className="w-4 h-4 text-leaf-bright" />
              {label}
            </h2>
            <PageHeadingForm row={row} />
          </div>
        );
      })}
    </div>
  );
}

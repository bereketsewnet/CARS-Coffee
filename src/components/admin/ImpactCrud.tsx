"use client";
import React, { useState, useTransition } from "react";
import { Plus, Pencil, Trash2, BarChart3, TrendingUp, Users, Leaf, TreePine, Briefcase, Handshake, Target, Globe, Save, CheckCircle, Loader2 } from "lucide-react";
import type { ImpactMetric, PillarContent, ImpactArea, ImpactSection, Testimonial } from "../../../generated/prisma-client";
import type { LucideIcon } from "lucide-react";
import {
  createImpactMetric, updateImpactMetric, deleteImpactMetric,
  upsertImpactSection, createImpactArea, updateImpactArea, deleteImpactArea,
  createTestimonial, updateTestimonial, deleteTestimonial,
} from "@/lib/actions/impact";
import { TESTIMONIAL_LIMIT } from "@/lib/galleryConstants";
import {
  Field,
  inputCls,
  selectCls,
  textareaCls,
  CrudModal,
  ConfirmDeleteDialog,
  SubmitBtn,
} from "./CrudHelpers";

const iconMap: Record<string, LucideIcon> = {
  "Farmers Reached": Users,
  "Tonnes Composted": Leaf,
  "Ha Under Circular Practice": TreePine,
  "Average Income Increase": TrendingUp,
};
const colorMap: Record<string, string> = {
  "Farmers Reached": "text-sky-400",
  "Tonnes Composted": "text-leaf-bright",
  "Ha Under Circular Practice": "text-amber-400",
  "Average Income Increase": "text-purple-400",
};

const AREA_ICON_OPTIONS: { value: string; label: string; Icon: LucideIcon }[] = [
  { value: "Users",      label: "People / Community",  Icon: Users },
  { value: "Briefcase",  label: "Jobs / Work",          Icon: Briefcase },
  { value: "TrendingUp", label: "Growth / Revenue",     Icon: TrendingUp },
  { value: "Handshake",  label: "Partnership",          Icon: Handshake },
  { value: "Leaf",       label: "Environment",          Icon: Leaf },
  { value: "Target",     label: "Goals / Impact",       Icon: Target },
  { value: "Globe",      label: "Global / Reach",       Icon: Globe },
];

const AREA_ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
  AREA_ICON_OPTIONS.map(({ value, Icon }) => [value, Icon])
);

// ── Section header edit form ──────────────────────────────────────────────────

function SectionHeaderForm({ section }: { section: ImpactSection | null }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (saved) { const t = setTimeout(() => setSaved(false), 3000); return () => clearTimeout(t); }
  }, [saved]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = await upsertImpactSection(fd);
      if (res?.error) setError(res.error);
      else setSaved(true);
    });
  }

  return (
    <div className="glass-card rounded-2xl border border-border p-6 space-y-4">
      <h2 className="font-serif font-bold text-lg">Socioeconomic Section Header</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Section tag (small label above title)">
          <input name="tag" defaultValue={section?.tag ?? "Socioeconomic Transformation"} className={inputCls} placeholder="Socioeconomic Transformation" />
        </Field>
        <Field label="Section title (large heading)">
          <input name="title" defaultValue={section?.title ?? "Cultivating Community & Equitable Growth"} className={inputCls} placeholder="Cultivating Community & Equitable Growth" />
        </Field>
        {error && <p className="text-xs text-rose-400">{error}</p>}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={pending} className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-sm font-semibold disabled:opacity-50">
            {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {pending ? "Saving…" : "Save Header"}
          </button>
          {saved && <span className="flex items-center gap-1.5 text-leaf-bright text-sm font-medium"><CheckCircle className="w-4 h-4" /> Saved!</span>}
        </div>
      </form>
    </div>
  );
}

// ── Impact area cards CRUD ────────────────────────────────────────────────────

function ImpactAreaCrud({ areas: initial }: { areas: ImpactArea[] }) {
  const [areas, setAreas] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<ImpactArea | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ImpactArea | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  React.useEffect(() => { setAreas(initial); }, [initial]);

  function close() { setMode(null); setEditing(null); setError(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      if (editing) {
        const res = await updateImpactArea(editing.id, fd);
        if (res?.error) { setError(res.error); return; }
        setAreas((prev) => prev.map((a) => a.id === editing.id
          ? { ...a, title: fd.get("title") as string, description: fd.get("description") as string, icon: fd.get("icon") as string }
          : a
        ));
      } else {
        const res = await createImpactArea(fd);
        if (res?.error) { setError(res.error); return; }
        // Reload to get server-generated id + order
        window.location.reload();
        return;
      }
      close();
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteImpactArea(deleteTarget.id);
      setAreas((prev) => prev.filter((a) => a.id !== deleteTarget.id));
      setDeleteTarget(null);
    });
  }

  return (
    <div className="glass-card rounded-2xl border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif font-bold text-lg">Impact Area Cards</h2>
        <button onClick={() => { setEditing(null); setMode("add"); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-xs font-semibold">
          <Plus className="w-3.5 h-3.5" /> Add Card
        </button>
      </div>

      <div className="space-y-2">
        {areas.map((area) => {
          const Icon = AREA_ICON_MAP[area.icon] ?? Users;
          return (
            <div key={area.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/40 border border-border/50 group">
              <div className="bg-leaf-bright/10 p-2 rounded-lg text-leaf-bright shrink-0 mt-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{area.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{area.description}</p>
              </div>
              <div className="flex gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing(area); setMode("edit"); }} className="text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteTarget(area)} className="text-muted-foreground hover:text-rose-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          );
        })}
        {areas.length === 0 && (
          <p className="text-sm text-muted-foreground italic text-center py-4">No cards yet. Add one above.</p>
        )}
      </div>

      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Impact Card" : "Add Impact Card"}>
        <form key={editing?.id ?? "new-area"} onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title" required>
            <input name="title" defaultValue={editing?.title ?? ""} required className={inputCls} placeholder="Women's Economic Empowerment & Cooperatives" />
          </Field>
          <Field label="Description" required>
            <textarea name="description" defaultValue={editing?.description ?? ""} required rows={3} className={textareaCls} placeholder="Describe this impact area…" />
          </Field>
          <Field label="Icon">
            <select name="icon" defaultValue={editing?.icon ?? "Users"} className={selectCls}>
              {AREA_ICON_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Order (lower = first)">
            <input name="order" type="number" defaultValue={editing?.order ?? areas.length} className={inputCls} min={0} />
          </Field>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending} label={editing ? "Save Changes" : "Add Card"} />
        </form>
      </CrudModal>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        label={`"${deleteTarget?.title ?? ""}"`}
        pending={deletePending}
      />
    </div>
  );
}


// ── Testimonial CRUD ─────────────────────────────────────────────────────────

function TestimonialCrud({ testimonials: initial }: { testimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = React.useState(initial);
  const [mode, setMode] = React.useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = React.useState<Testimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = React.useState<Testimonial | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  React.useEffect(() => { setTestimonials(initial); }, [initial]);

  function close() { setMode(null); setEditing(null); setError(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = editing
        ? await updateTestimonial(editing.id, fd)
        : await createTestimonial(fd);
      if (res?.error) { setError(res.error); return; }
      window.location.reload();
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteTestimonial(deleteTarget.id);
      setTestimonials((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
    });
  }

  const atLimit = testimonials.length >= TESTIMONIAL_LIMIT;

  return (
    <div className="glass-card rounded-2xl border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif font-bold text-lg">Testimonials</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Max {TESTIMONIAL_LIMIT} — shown on the public Impact page.</p>
        </div>
        {!atLimit && (
          <button
            onClick={() => { setEditing(null); setMode("add"); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        )}
      </div>

      <div className="space-y-3">
        {testimonials.map((item) => (
          <div key={item.id} className="p-4 rounded-xl bg-muted/40 border border-border/50 group relative">
            <p className="text-sm text-foreground italic line-clamp-2 mb-2">"{item.quote}"</p>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full gradient-green flex items-center justify-center text-foreground font-bold text-xs shrink-0">
                {item.name[0]}
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setEditing(item); setMode("edit"); }} className="text-muted-foreground hover:text-foreground p-1"><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={() => setDeleteTarget(item)} className="text-muted-foreground hover:text-rose-400 p-1"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="text-sm text-muted-foreground italic text-center py-4">No testimonials yet.</p>
        )}
      </div>

      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Testimonial" : "Add Testimonial"}>
        <form key={editing?.id ?? "new-testimonial"} onSubmit={handleSubmit} className="space-y-4">
          <Field label="Quote" required>
            <textarea name="quote" defaultValue={editing?.quote ?? ""} required rows={4} className={textareaCls} placeholder="What the person said…" />
          </Field>
          <Field label="Name" required>
            <input name="name" defaultValue={editing?.name ?? ""} required className={inputCls} placeholder="Birtukan Lemma" />
          </Field>
          <Field label="Role / Title" required>
            <input name="role" defaultValue={editing?.role ?? ""} required className={inputCls} placeholder="Coffee Farmer, Kaffa Zone" />
          </Field>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending} label={editing ? "Save Changes" : "Add Testimonial"} />
        </form>
      </CrudModal>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        label={`"${deleteTarget?.name ?? ""}"`}
        pending={deletePending}
      />
    </div>
  );
}

export default function ImpactCrud({
  items: initial,
  pillarContents = [],
  impactSection = null,
  impactAreas = [],
  testimonials = [],
}: {
  items: ImpactMetric[];
  pillarContents?: PillarContent[];
  impactSection?: ImpactSection | null;
  impactAreas?: ImpactArea[];
  testimonials?: Testimonial[];
}) {
  const [items, setItems] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<ImpactMetric | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ImpactMetric | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  React.useEffect(() => { setItems(initial); }, [initial]);
  function openAdd() { setEditing(null); setError(null); setMode("add"); }
  function openEdit(m: ImpactMetric) { setEditing(m); setError(null); setMode("edit"); }
  function close() { setMode(null); setEditing(null); setError(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      try {
        const res = editing
          ? await updateImpactMetric(editing.id, {}, fd)
          : await createImpactMetric({}, fd);
        if (res.error) setError(res.error);
        else close();
      } catch (e) { console.error(e); }
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      try {
        await deleteImpactMetric(deleteTarget.id);
        setDeleteTarget(null);
      } catch (e) { console.error(e); }
    });
  }

  return (
    <>
      {/* Socioeconomic section header + cards */}
      <SectionHeaderForm section={impactSection} />
      <ImpactAreaCrud areas={impactAreas} />
      <TestimonialCrud testimonials={testimonials} />

      {/* Impact metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((m) => {
          const Icon = iconMap[m.label] ?? BarChart3;
          const color = colorMap[m.label] ?? "text-leaf-bright";
          return (
            <div key={m.id} className="glass-card rounded-xl border border-border p-5 space-y-3 relative group">
              <div className={"w-8 h-8 rounded-lg bg-muted flex items-center justify-center " + color}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
              {m.notes && <p className="text-xs text-muted-foreground">{m.notes}</p>}
              <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(m)} className="text-muted-foreground hover:text-foreground transition-colors p-1"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteTarget(m)} className="text-muted-foreground hover:text-rose-400 transition-colors p-1"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          );
        })}
        <button
          onClick={openAdd}
          className="glass-card rounded-xl border border-dashed border-border p-5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-leaf-bright hover:border-leaf-bright/40 transition-colors"
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs font-medium">Add Metric</span>
        </button>
      </div>

      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Impact Metric" : "Add Impact Metric"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Label" required>
              <input name="label" defaultValue={editing?.label ?? ""} required className={inputCls} placeholder="Farmers Reached" />
            </Field>
            <Field label="Value" required>
              <input name="value" defaultValue={editing?.value ?? ""} required className={inputCls} placeholder="1,240" />
            </Field>
            <Field label="Year" required>
              <input name="year" type="number" defaultValue={editing?.year ?? new Date().getFullYear()} required className={inputCls} min={2015} max={2035} />
            </Field>
            <Field label="Research Pillar">
              <select name="pillar" defaultValue={editing?.pillar ?? ""} className={selectCls}>
                <option value="">� None �</option>
                {pillarContents.map((p) => <option key={p.pillar} value={p.pillar}>{p.title}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Notes">
                <textarea name="notes" defaultValue={editing?.notes ?? ""} rows={2} className={textareaCls} placeholder="Context note (optional)" />
              </Field>
            </div>
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending} label={editing ? "Save Changes" : "Add Metric"} />
        </form>
      </CrudModal>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        label={deleteTarget?.label || ""}
        pending={deletePending}
      />
    </>
  );
}
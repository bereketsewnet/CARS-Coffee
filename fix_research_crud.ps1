$text = @'
"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { ResearchProject } from "../../../generated/prisma-client";
import {
  createResearchProject,
  updateResearchProject,
  deleteResearchProject,
  updatePillarContent,
  createPillarContent,
  deletePillarContent,
} from "@/lib/actions/research";
import { Field, inputCls, selectCls, textareaCls, CrudModal, ConfirmDeleteDialog, SubmitBtn } from "./CrudHelpers";

const STATUS_COLORS: Record<string, string> = { ACTIVE: "text-leaf-bright bg-leaf/10 border-leaf/20", COMPLETED: "text-muted-foreground bg-muted border-border", PAUSED: "text-amber-400 bg-amber-400/10 border-amber-400/20" };
const PILLAR_COLORS = ["text-amber-400 bg-amber-400/10 border-amber-400/20", "text-leaf-bright bg-leaf/10 border-leaf/20", "text-sky-400 bg-sky-400/10 border-sky-400/20", "text-purple-400 bg-purple-400/10 border-purple-400/20", "text-rose-400 bg-rose-400/10 border-rose-400/20"];

function toDateInput(d: Date | string | null | undefined): string { if (!d) return ""; const dt = d instanceof Date ? d : new Date(d); return dt.toISOString().split("T")[0]; }

export default function ResearchCrud({ items: initial, pillarContents = [] }: { items: ResearchProject[], pillarContents?: any[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<ResearchProject | null>(null);
  const [editingPillar, setEditingPillar] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<ResearchProject | null>(null);
  const [pillarMode, setPillarMode] = useState<"add" | "edit" | null>(null);
  const [deletePillarTarget, setDeletePillarTarget] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  React.useEffect(() => { setItems(initial); }, [initial]);

  function close() { setMode(null); setEditing(null); setEditingPillar(null); setPillarMode(null); setError(null); }

  function handlePillarSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      try {
        const res = (pillarMode === "edit" && editingPillar?.id) ? await updatePillarContent({}, editingPillar.id, fd) : await createPillarContent({}, fd);
        if (res.error) setError(res.error); else { close(); router.refresh(); }
      } catch (err) { console.error(err); }
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      try {
        const res = editing ? await updateResearchProject(editing.id, {}, fd) : await createResearchProject({}, fd);
        if (res.error) setError(res.error); else { close(); router.refresh(); }
      } catch (e) { console.error(e); }
    });
  }

  function handleDelete() { if (!deleteTarget) return; startDeleteTransition(async () => { try { await deleteResearchProject(deleteTarget.id); setDeleteTarget(null); router.refresh(); } catch (e) { console.error(e); } }); }
  function handleDeletePillar() { if (!deletePillarTarget) return; startDeleteTransition(async () => { try { await deletePillarContent(deletePillarTarget.id); setDeletePillarTarget(null); router.refresh(); } catch (e) { console.error(e); } }); }

  const pillarStats = pillarContents.map((dbPillar, i) => {
    const pp = items.filter((p) => p.pillar === dbPillar.pillar);
    return { dbPillar, key: dbPillar.pillar, name: dbPillar.title, color: PILLAR_COLORS[i % PILLAR_COLORS.length], projects: pp.length, active: pp.filter((p) => p.status === "ACTIVE").length, lead: pp[0]?.lead ?? "—" };
  });

  const getPillarName = (key: string) => pillarContents?.find((p) => p.pillar === key)?.title ?? key;

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-serif">Research Pillars</h2>
        <button onClick={() => setPillarMode("add")} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-sm font-semibold shadow-glow"><Plus className="w-4 h-4" /> Add Pillar</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {pillarStats.map((p) => (
          <div key={p.key} className="glass-card rounded-xl border border-border p-5 space-y-3 relative group">
            <div className="flex items-center justify-between">
              <span className={	ext-xs px-2 py-0.5 rounded-full border font-medium }>{p.name}</span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditingPillar(p.dbPillar); setPillarMode("edit"); }} className="text-muted-foreground hover:text-leaf-bright transition-colors" title="Edit"><Pencil className="w-4 h-4 cursor-pointer" /></button>
                <button onClick={() => setDeletePillarTarget(p.dbPillar)} className="text-muted-foreground hover:text-rose-400 transition-colors" title="Delete"><Trash2 className="w-4 h-4 cursor-pointer" /></button>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div><p className="text-2xl font-bold text-foreground">{p.projects}</p><p className="text-xs text-muted-foreground">total projects</p></div>
              <div className="text-right"><p className="text-sm font-semibold text-leaf-bright">{p.active} active</p></div>
            </div>
            <p className="text-xs text-muted-foreground">Lead: {p.lead}</p>
          </div>
        ))}
        {pillarStats.length === 0 && <div className="col-span-full py-8 text-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">No research pillars created yet. Add one to get started.</div>}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold font-serif">Research Projects</h2>
        <button disabled={pillarContents.length === 0} onClick={() => { setEditing(null); setMode("add"); }} className="disabled:opacity-50 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:-translate-y-0.5 transition-transform text-sm font-semibold shadow-glow"><Plus className="w-4 h-4" /> New Project</button>
      </div>

      <div className="glass-card rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-3 border-b border-border font-medium text-sm text-muted-foreground">All Projects</div>
        <ul>
          {items.map((proj) => (
            <li key={proj.id} className="px-5 py-4 border-b border-border/50 last:border-b-0 hover:bg-muted/20 transition-colors flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0"><p className="font-medium text-foreground truncate">{proj.title}</p><p className="text-xs text-muted-foreground mt-0.5">{proj.lead ? Lead:  : ""}</p></div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="tag-pill text-xs hidden sm:inline">{getPillarName(proj.pillar)}</span>
                <span className={	ext-xs px-2 py-0.5 rounded-full border font-medium }>{proj.status.charAt(0) + proj.status.slice(1).toLowerCase()}</span>
                <button onClick={() => { setEditing(proj); setMode("edit"); }} className="text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => setDeleteTarget(proj)} className="text-muted-foreground hover:text-rose-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </li>
          ))}
          {items.length === 0 && <li className="px-5 py-8 text-center text-muted-foreground text-sm">No research projects yet.</li>}
        </ul>
      </div>

      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Research Project" : "New Research Project"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><Field label="Title" required><input name="title" defaultValue={editing?.title ?? ""} required className={inputCls} placeholder="Project title" /></Field></div>
            <Field label="Research Pillar" required><select name="pillar" defaultValue={editing?.pillar ?? pillarContents[0]?.pillar} required className={selectCls}>{pillarContents.map((p) => <option key={p.pillar} value={p.pillar}>{p.title}</option>)}</select></Field>
            <Field label="Status" required><select name="status" defaultValue={editing?.status ?? "ACTIVE"} required className={selectCls}><option value="ACTIVE">Active</option><option value="PAUSED">Paused</option><option value="COMPLETED">Completed</option></select></Field>
            <Field label="Lead Researcher"><input name="lead" defaultValue={editing?.lead ?? ""} className={inputCls} placeholder="Dr. Name" /></Field>
            <div className="hidden sm:block" />
            <Field label="Start Date"><input name="startDate" type="date" defaultValue={toDateInput(editing?.startDate)} className={inputCls} /></Field>
            <Field label="End Date"><input name="endDate" type="date" defaultValue={toDateInput(editing?.endDate)} className={inputCls} /></Field>
            <div className="sm:col-span-2"><Field label="Description"><textarea name="description" defaultValue={editing?.description ?? ""} rows={3} className={textareaCls} placeholder="Project description…" /></Field></div>
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending} label={editing ? "Save Changes" : "Create Project"} />
        </form>
      </CrudModal>

      <CrudModal open={pillarMode !== null} onClose={close} title={pillarMode === "edit" ? Edit Pillar () : "New Pillar"}>
        <form onSubmit={handlePillarSubmit} className="space-y-4">
          <Field label="Title" required><input name="title" defaultValue={editingPillar?.title ?? ""} required className={inputCls} placeholder="Pillar Title" /></Field>
          <Field label="Tagline" required><textarea name="tagline" defaultValue={editingPillar?.tagline ?? ""} required rows={2} className={textareaCls} placeholder="Short subtitle..." /></Field>
          <Field label="Layman Description"><textarea name="laymanDesc" defaultValue={editingPillar?.laymanDesc ?? ""} rows={4} className={textareaCls} placeholder="Plain-English explanation..." /></Field>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending} label={pillarMode === "edit" ? "Save Content" : "Create Pillar"} />
        </form>
      </CrudModal>

      <ConfirmDeleteDialog open={deleteTarget !== null} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} label={""} pending={deletePending} />
      <ConfirmDeleteDialog open={deletePillarTarget !== null} onClose={() => setDeletePillarTarget(null)} onConfirm={handleDeletePillar} label={"" pillar?} pending={deletePending} />
    </>
  );
}
'@
Set-Content -Path "src/components/admin/ResearchCrud.tsx" -Value $text


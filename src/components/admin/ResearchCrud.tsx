"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, Users, Layers } from "lucide-react";
import type { ResearchProject, ResearchTopicMember } from "../../../generated/prisma-client";
import {
  createResearchProject, updateResearchProject, deleteResearchProject,
  updatePillarContent, createPillarContent, deletePillarContent,
  createResearchTopicMember, updateResearchTopicMember, deleteResearchTopicMember,
} from "@/lib/actions/research";
import { Field, inputCls, selectCls, textareaCls, CrudModal, ConfirmDeleteDialog, SubmitBtn } from "./CrudHelpers";

type ProjectWithMembers = ResearchProject & { members: ResearchTopicMember[] };

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: "text-leaf-bright bg-leaf/10 border-leaf/20",
  COMPLETED: "text-muted-foreground bg-muted border-border",
  PAUSED: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

function toDateInput(d: Date | string | null | undefined): string {
  if (!d) return "";
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toISOString().split("T")[0];
}

// ── Members sub-CRUD ──────────────────────────────────────────────────────────

function MembersCrud({ projectId, members: initial }: { projectId: string; members: ResearchTopicMember[] }) {
  const router = useRouter();
  const [members, setMembers] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<ResearchTopicMember | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ResearchTopicMember | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  // Sync when server data updates (after router.refresh())
  React.useEffect(() => { setMembers(initial); }, [initial]);

  function close() { setMode(null); setEditing(null); setError(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      if (editing) {
        const res = await updateResearchTopicMember(editing.id, fd);
        if (res?.error) { setError(res.error); return; }
        // Update local state immediately
        setMembers((prev) => prev.map((m) => m.id === editing.id
          ? { ...m, name: fd.get("name") as string, role: (fd.get("role") as string) || null }
          : m
        ));
      } else {
        const res = await createResearchTopicMember(projectId, fd);
        if (res?.error) { setError(res.error); return; }
        router.refresh(); // need server-generated id
      }
      close();
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteResearchTopicMember(deleteTarget.id);
      setMembers((prev) => prev.filter((m) => m.id !== deleteTarget.id));
      setDeleteTarget(null);
    });
  }

  return (
    <div className="pl-4 mt-3 border-l-2 border-border/40 space-y-1">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5 uppercase tracking-widest">
          <Users className="w-3 h-3" /> Researchers
        </span>
        <button
          onClick={() => { setEditing(null); setMode("add"); }}
          className="text-xs flex items-center gap-1 px-2 py-0.5 rounded bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors"
        >
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>

      {members.length === 0 && (
        <p className="text-xs text-muted-foreground italic py-1">No researchers added yet.</p>
      )}

      {members.map((m) => (
        <div key={m.id} className="flex items-center gap-2 py-1 group rounded px-1 hover:bg-muted/30 transition-colors">
          <span className="text-xs text-foreground flex-1">
            {m.name}
            {m.role && <span className="text-muted-foreground ml-1.5">({m.role})</span>}
          </span>
          <button
            onClick={() => { setEditing(m); setMode("edit"); }}
            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all"
          >
            <Pencil className="w-3 h-3" />
          </button>
          <button
            onClick={() => setDeleteTarget(m)}
            className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-rose-400 transition-all"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      ))}

      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Researcher" : "Add Researcher"}>
        <form key={editing?.id ?? "new-member"} onSubmit={handleSubmit} className="space-y-4">
          <Field label="Name" required>
            <input name="name" defaultValue={editing?.name ?? ""} required className={inputCls} placeholder="Dr. Full Name" />
          </Field>
          <Field label="Role / Title">
            <input name="role" defaultValue={editing?.role ?? ""} className={inputCls} placeholder="Lead Researcher, PhD Student…" />
          </Field>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending} label={editing ? "Save Changes" : "Add Researcher"} />
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

// ── Topics + Members for one pillar ──────────────────────────────────────────

function PillarTopics({
  pillarKey,
  allProjects,
}: {
  pillarKey: string;
  allProjects: ProjectWithMembers[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState(() => allProjects.filter((p) => p.pillar === pillarKey));
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<ProjectWithMembers | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectWithMembers | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  // Sync when server data updates (after router.refresh())
  React.useEffect(() => {
    setProjects(allProjects.filter((p) => p.pillar === pillarKey));
  }, [allProjects, pillarKey]);

  function toggle(id: string) {
    setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function close() { setMode(null); setEditing(null); setError(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("pillar", pillarKey);
    setError(null);
    startTransition(async () => {
      if (editing) {
        const res = await updateResearchProject(editing.id, {}, fd);
        if (res?.error) { setError(res.error); return; }
        // Update local state immediately
        setProjects((prev) => prev.map((p) => p.id === editing.id
          ? {
              ...p,
              title: fd.get("title") as string,
              status: (fd.get("status") as any) || p.status,
              lead: (fd.get("lead") as string) || null,
              description: (fd.get("description") as string) || null,
            }
          : p
        ));
      } else {
        const res = await createResearchProject({}, fd);
        if (res?.error) { setError(res.error); return; }
        router.refresh(); // need server-generated id + members array
      }
      close();
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteResearchProject(deleteTarget.id);
      setProjects((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setExpanded((s) => { const n = new Set(s); n.delete(deleteTarget.id); return n; });
      setDeleteTarget(null);
    });
  }

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
          Topics ({projects.length})
        </span>
        <button
          onClick={() => { setEditing(null); setMode("add"); }}
          className="text-xs flex items-center gap-1 px-2.5 py-1 rounded bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors font-semibold"
        >
          <Plus className="w-3 h-3" /> Add Topic
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-sm text-muted-foreground italic py-2 pl-1">No topics yet. Add one above.</p>
      )}

      {projects.map((proj) => (
        <div key={proj.id} className="rounded-lg border border-border/60 bg-muted/20 overflow-hidden">
          <div
            className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-muted/40 transition-colors"
            onClick={() => toggle(proj.id)}
          >
            {expanded.has(proj.id)
              ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            }
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{proj.title}</p>
              {proj.lead && <p className="text-xs text-muted-foreground">Lead: {proj.lead}</p>}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium hidden sm:inline ${STATUS_COLORS[proj.status] ?? STATUS_COLORS.PAUSED}`}>
              {proj.status.charAt(0) + proj.status.slice(1).toLowerCase()}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setEditing(proj); setMode("edit"); }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setDeleteTarget(proj); }}
              className="text-muted-foreground hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {expanded.has(proj.id) && (
            <div className="px-3 pb-3 border-t border-border/30 bg-muted/10">
              {proj.description && (
                <p className="text-xs text-muted-foreground mt-2 mb-1 leading-relaxed">{proj.description}</p>
              )}
              <MembersCrud projectId={proj.id} members={proj.members} />
            </div>
          )}
        </div>
      ))}

      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Topic" : "Add Topic"}>
        <form key={editing?.id ?? "new-topic"} onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title" required>
            <input name="title" defaultValue={editing?.title ?? ""} required className={inputCls} placeholder="Topic title" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Status" required>
              <select name="status" defaultValue={editing?.status ?? "ACTIVE"} required className={selectCls}>
                <option value="ACTIVE">Active</option>
                <option value="PAUSED">Paused</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </Field>
            <Field label="Lead Researcher">
              <input name="lead" defaultValue={editing?.lead ?? ""} className={inputCls} placeholder="Dr. Name" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date">
              <input name="startDate" type="date" defaultValue={toDateInput(editing?.startDate)} className={inputCls} />
            </Field>
            <Field label="End Date">
              <input name="endDate" type="date" defaultValue={toDateInput(editing?.endDate)} className={inputCls} />
            </Field>
          </div>
          <Field label="Description">
            <textarea name="description" defaultValue={editing?.description ?? ""} rows={3} className={textareaCls} placeholder="Topic description…" />
          </Field>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending} label={editing ? "Save Changes" : "Add Topic"} />
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

// ── Main ResearchCrud ─────────────────────────────────────────────────────────

export default function ResearchCrud({
  items,
  pillarContents: initialPillars = [],
}: {
  items: ProjectWithMembers[];
  pillarContents?: any[];
}) {
  const router = useRouter();
  const [pillarContents, setPillarContents] = useState(initialPillars);
  const [editingPillar, setEditingPillar] = useState<any>(null);
  const [pillarMode, setPillarMode] = useState<"add" | "edit" | null>(null);
  const [deletePillarTarget, setDeletePillarTarget] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  // Sync when server data updates (after router.refresh())
  React.useEffect(() => { setPillarContents(initialPillars); }, [initialPillars]);

  function closeModal() { setPillarMode(null); setEditingPillar(null); setError(null); }

  function handlePillarSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      if (pillarMode === "edit" && editingPillar?.id) {
        const res = await updatePillarContent({}, editingPillar.id, fd);
        if (res.error) { setError(res.error); return; }
        // Update local state immediately so the title/tagline change is visible right away
        setPillarContents((prev) => prev.map((p) => p.id === editingPillar.id
          ? { ...p, title: fd.get("title") as string, tagline: fd.get("tagline") as string, laymanDesc: (fd.get("laymanDesc") as string) || p.laymanDesc }
          : p
        ));
      } else {
        const res = await createPillarContent({}, fd);
        if (res.error) { setError(res.error); return; }
        router.refresh(); // need server-generated id
      }
      closeModal();
    });
  }

  function handleDeletePillar() {
    if (!deletePillarTarget) return;
    startDeleteTransition(async () => {
      const res = await deletePillarContent(deletePillarTarget.id);
      if (res?.error) return;
      setPillarContents((prev) => prev.filter((p) => p.id !== deletePillarTarget.id));
      setDeletePillarTarget(null);
    });
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold font-serif flex items-center gap-2">
          <Layers className="w-5 h-5 text-leaf-bright" /> Research Pillars
        </h2>
        <button
          onClick={() => { setEditingPillar(null); setPillarMode("add"); }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-sm font-semibold"
        >
          <Plus className="w-4 h-4" /> Add Pillar
        </button>
      </div>

      {pillarContents.length === 0 && (
        <div className="py-10 text-center text-muted-foreground text-sm border border-dashed border-border rounded-xl">
          No research pillars created yet. Add one to get started.
        </div>
      )}

      <div className="space-y-4">
        {pillarContents.map((pillar) => (
          <div key={pillar.id} className="glass-card rounded-xl border border-border p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-lg text-foreground">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{pillar.tagline}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => { setEditingPillar(pillar); setPillarMode("edit"); }}
                  className="text-muted-foreground hover:text-leaf-bright transition-colors"
                  title="Edit pillar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeletePillarTarget(pillar)}
                  className="text-muted-foreground hover:text-rose-400 transition-colors"
                  title="Delete pillar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <PillarTopics pillarKey={pillar.pillar} allProjects={items} />
          </div>
        ))}
      </div>

      <CrudModal
        open={pillarMode !== null}
        onClose={closeModal}
        title={pillarMode === "edit" ? "Edit Pillar" : "New Pillar"}
      >
        <form key={editingPillar?.id ?? "new-pillar"} onSubmit={handlePillarSubmit} className="space-y-4">
          <Field label="Title" required>
            <input name="title" defaultValue={editingPillar?.title ?? ""} required className={inputCls} placeholder="Pillar Title" />
          </Field>
          <Field label="Tagline" required>
            <textarea name="tagline" defaultValue={editingPillar?.tagline ?? ""} required rows={3} className={textareaCls} placeholder="Short subtitle..." />
          </Field>
          <Field label="Layman Description">
            <textarea name="laymanDesc" defaultValue={editingPillar?.laymanDesc ?? ""} rows={5} className={textareaCls} placeholder="Plain-English explanation..." />
          </Field>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending} label={pillarMode === "edit" ? "Save Content" : "Create Pillar"} />
        </form>
      </CrudModal>

      <ConfirmDeleteDialog
        open={deletePillarTarget !== null}
        onClose={() => setDeletePillarTarget(null)}
        onConfirm={handleDeletePillar}
        label={`"${deletePillarTarget?.title ?? ""}" pillar`}
        pending={deletePending}
      />
    </>
  );
}

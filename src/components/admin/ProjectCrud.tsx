"use client";
import React, { useState, useTransition, useEffect } from "react";
import { Plus, Pencil, Trash2, Target, GitBranch, Loader2, BookOpen, Save, CheckCircle, X } from "lucide-react";
import type { ProjectGoal, WorkPackage, ProjectInfo, ProjectProblemGroup, ProjectProblemBullet } from "../../../generated/prisma-client";
import {
  upsertProjectInfo,
  upsertProblemGroup, deleteProblemGroup,
  createProjectGoal, updateProjectGoal, deleteProjectGoal,
  createWorkPackage, updateWorkPackage, deleteWorkPackage,
} from "@/lib/actions/project";
import {
  Field, inputCls, selectCls, textareaCls, CrudModal, ConfirmDeleteDialog,
} from "./CrudHelpers";

// ── Project Info section ──────────────────────────────────────────────────────

function ProjectInfoForm({ info }: { info: ProjectInfo | null }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (saved) { const t = setTimeout(() => setSaved(false), 3000); return () => clearTimeout(t); }
  }, [saved]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await upsertProjectInfo(fd);
      if (res?.error) setError(res.error);
      else setSaved(true);
    });
  }

  return (
    <div className="glass-card rounded-2xl border border-border p-6 space-y-4">
      <h2 className="font-serif font-bold text-lg flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-leaf-bright" /> Page Content
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-b border-border/50 pb-4 space-y-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Hero Section</p>
          <Field label="Hero title">
            <input
              name="heroTitle"
              defaultValue={info?.heroTitle ?? "The Circular Coffee Project"}
              className={inputCls}
              placeholder="The Circular Coffee Project"
            />
          </Field>
          <Field label="Hero subtitle">
            <textarea
              name="heroSubtitle"
              rows={3}
              defaultValue={info?.heroSubtitle ?? "A 4-year north–south cooperative research programme funded by VLIR-UOS, bringing together expertise from Belgium and Ethiopia to build a circular coffee economy."}
              className={textareaCls}
            />
          </Field>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">VLIR-UOS Section</p>
          <Field label="Section title (paragraph 1)">
            <input
              name="vlirTitle"
              defaultValue={info?.vlirTitle ?? "What is VLIR-UOS?"}
              className={inputCls}
              placeholder="What is VLIR-UOS?"
            />
          </Field>
          <Field label="First paragraph">
            <textarea
              name="vlirP1"
              rows={4}
              defaultValue={info?.vlirP1 ?? "VLIR-UOS (Flemish Interuniversity Council – University Development Cooperation) supports partnerships between Flemish universities and institutions in the Global South. These \"Institutional University Cooperation\" projects build lasting academic and research capacity."}
              className={textareaCls}
            />
          </Field>
          <Field label="Section title (paragraph 2)">
            <input
              name="vlirP2Title"
              defaultValue={info?.vlirP2Title ?? "What is CARES?"}
              className={inputCls}
              placeholder="What is CARES?"
            />
          </Field>
          <Field label="Second paragraph">
            <textarea
              name="vlirP2"
              rows={3}
              defaultValue={info?.vlirP2 ?? "The Circular Coffee project is part of this framework, bringing together expertise in agronomy, food science, environmental engineering, and development economics."}
              className={textareaCls}
            />
          </Field>
        </div>

        {error && <p className="text-xs text-rose-400">{error}</p>}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-sm font-semibold disabled:opacity-50"
          >
            {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {pending ? "Saving…" : "Save Changes"}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-leaf-bright text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> Saved!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

// ── Problem Groups section ────────────────────────────────────────────────────

type BulletRow = { id?: string; text: string };
type GroupDraft = {
  id: string | null;
  title: string;
  order: number;
  bullets: BulletRow[];
  saved: boolean;
  saving: boolean;
  error: string | null;
};

type DBGroup = ProjectProblemGroup & { bullets: ProjectProblemBullet[] };

function ProblemGroupsCrud({ groups: initial }: { groups: DBGroup[] }) {
  const [groups, setGroups] = useState<GroupDraft[]>(() =>
    initial.map((g) => ({
      id: g.id,
      title: g.title,
      order: g.order,
      bullets: g.bullets.sort((a, b) => a.order - b.order).map((b) => ({ id: b.id, text: b.text })),
      saved: false,
      saving: false,
      error: null,
    }))
  );
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deletePending, startDeleteTransition] = useTransition();

  useEffect(() => {
    setGroups(
      initial.map((g) => ({
        id: g.id,
        title: g.title,
        order: g.order,
        bullets: g.bullets.sort((a, b) => a.order - b.order).map((b) => ({ id: b.id, text: b.text })),
        saved: false,
        saving: false,
        error: null,
      }))
    );
  }, [initial]);

  function addGroup() {
    setGroups((prev) => [
      ...prev,
      { id: null, title: "", order: prev.length, bullets: [{ text: "" }], saved: false, saving: false, error: null },
    ]);
  }

  function removeGroup(idx: number) {
    const g = groups[idx];
    if (g.id) {
      setDeleteTarget(g.id);
    } else {
      setGroups((prev) => prev.filter((_, i) => i !== idx));
    }
  }

  function confirmDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteProblemGroup(deleteTarget);
      setDeleteTarget(null);
    });
  }

  function updateTitle(idx: number, value: string) {
    setGroups((prev) => prev.map((g, i) => i === idx ? { ...g, title: value } : g));
  }

  function addBullet(idx: number) {
    setGroups((prev) => prev.map((g, i) => i === idx ? { ...g, bullets: [...g.bullets, { text: "" }] } : g));
  }

  function updateBullet(gIdx: number, bIdx: number, value: string) {
    setGroups((prev) => prev.map((g, i) => {
      if (i !== gIdx) return g;
      return { ...g, bullets: g.bullets.map((b, j) => j === bIdx ? { ...b, text: value } : b) };
    }));
  }

  function removeBullet(gIdx: number, bIdx: number) {
    setGroups((prev) => prev.map((g, i) => {
      if (i !== gIdx) return g;
      return { ...g, bullets: g.bullets.filter((_, j) => j !== bIdx) };
    }));
  }

  function saveGroup(idx: number) {
    const g = groups[idx];
    setGroups((prev) => prev.map((gr, i) => i === idx ? { ...gr, saving: true, error: null, saved: false } : gr));
    const fd = new FormData();
    if (g.id) fd.set("id", g.id);
    fd.set("title", g.title);
    g.bullets.forEach((b, i) => fd.set(`bullet_${i}`, b.text));
    upsertProblemGroup(fd).then((res) => {
      if (res?.error) {
        setGroups((prev) => prev.map((gr, i) => i === idx ? { ...gr, saving: false, error: res.error! } : gr));
      } else {
        setGroups((prev) => prev.map((gr, i) => i === idx ? { ...gr, saving: false, saved: true } : gr));
        setTimeout(() => setGroups((prev) => prev.map((gr, i) => i === idx ? { ...gr, saved: false } : gr)), 3000);
      }
    });
  }

  return (
    <div className="glass-card rounded-2xl border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-destructive/20 flex items-center justify-center text-destructive text-xs">!</span>
          Problem Statement Groups
        </h2>
        <button
          onClick={addGroup}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" /> Add Group
        </button>
      </div>

      {groups.length === 0 && (
        <p className="text-center py-6 text-sm text-muted-foreground">No groups yet. Click "Add Group" to create one.</p>
      )}

      <div className="space-y-4">
        {groups.map((g, gIdx) => (
          <div key={gIdx} className="border border-border/60 rounded-xl p-4 space-y-3 bg-muted/20">
            <div className="flex items-center justify-between gap-3">
              <input
                type="text"
                value={g.title}
                onChange={(e) => updateTitle(gIdx, e.target.value)}
                placeholder="Group title (e.g. Environmental Impact)"
                className={inputCls + " flex-1 font-semibold"}
              />
              <button
                onClick={() => removeGroup(gIdx)}
                className="text-muted-foreground hover:text-rose-400 transition-colors shrink-0"
                title="Delete group"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 pl-2">
              {g.bullets.map((b, bIdx) => (
                <div key={bIdx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-3 shrink-0" />
                  <input
                    type="text"
                    value={b.text}
                    onChange={(e) => updateBullet(gIdx, bIdx, e.target.value)}
                    placeholder={`Bullet point ${bIdx + 1}`}
                    className={inputCls + " flex-1 text-sm"}
                  />
                  <button
                    onClick={() => removeBullet(gIdx, bIdx)}
                    className="text-muted-foreground hover:text-rose-400 transition-colors mt-2 shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addBullet(gIdx)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-leaf-bright transition-colors mt-1"
              >
                <Plus className="w-3 h-3" /> Add bullet
              </button>
            </div>

            {g.error && <p className="text-xs text-rose-400">{g.error}</p>}
            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => saveGroup(gIdx)}
                disabled={g.saving}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-xs font-semibold disabled:opacity-50"
              >
                {g.saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                {g.saving ? "Saving…" : "Save Group"}
              </button>
              {g.saved && (
                <span className="flex items-center gap-1 text-leaf-bright text-xs font-medium">
                  <CheckCircle className="w-3.5 h-3.5" /> Saved!
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        label="this problem group and all its bullets"
        pending={deletePending}
      />
    </div>
  );
}

// ── Goals section ─────────────────────────────────────────────────────────────

function GoalsCrud({ goals: initial }: { goals: ProjectGoal[] }) {
  const [goals, setGoals] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<ProjectGoal | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectGoal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  React.useEffect(() => { setGoals(initial); }, [initial]);

  function openAdd() { setEditing(null); setError(null); setMode("add"); }
  function openEdit(g: ProjectGoal) { setEditing(g); setError(null); setMode("edit"); }
  function close() { setMode(null); setEditing(null); setError(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = editing
        ? await updateProjectGoal(editing.id, fd)
        : await createProjectGoal(fd);
      if (res?.error) setError(res.error);
      else close();
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteProjectGoal(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  return (
    <div className="glass-card rounded-2xl border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2">
          <Target className="w-5 h-5 text-leaf-bright" /> Project Goals
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" /> Add Goal
        </button>
      </div>

      <ul className="space-y-2">
        {goals.map((g, i) => (
          <li key={g.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
            <span className="text-leaf-bright text-xs font-mono mt-0.5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <p className="flex-1 text-sm text-foreground leading-relaxed">{g.text}</p>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => openEdit(g)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setDeleteTarget(g)} className="text-muted-foreground hover:text-rose-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </li>
        ))}
        {goals.length === 0 && (
          <li className="text-center py-6 text-sm text-muted-foreground">No goals yet. Add one above.</li>
        )}
      </ul>

      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Goal" : "Add Goal"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Goal text" required>
            <textarea
              name="text"
              defaultValue={editing?.text ?? ""}
              rows={3}
              required
              className={textareaCls}
              placeholder="Describe the project goal…"
            />
          </Field>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-leaf-bright transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {pending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {editing ? "Save Changes" : "Add Goal"}
          </button>
        </form>
      </CrudModal>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        label="this goal"
        pending={deletePending}
      />
    </div>
  );
}

// ── Work Packages section ─────────────────────────────────────────────────────

function WorkPackagesCrud({ wps: initial }: { wps: WorkPackage[] }) {
  const [wps, setWps] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<WorkPackage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WorkPackage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  React.useEffect(() => { setWps(initial); }, [initial]);

  function openAdd() { setEditing(null); setError(null); setMode("add"); }
  function openEdit(w: WorkPackage) { setEditing(w); setError(null); setMode("edit"); }
  function close() { setMode(null); setEditing(null); setError(null); }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setError(null);
    startTransition(async () => {
      const res = editing
        ? await updateWorkPackage(editing.id, fd)
        : await createWorkPackage(fd);
      if (res?.error) setError(res.error);
      else close();
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteWorkPackage(deleteTarget.id);
      setDeleteTarget(null);
    });
  }

  return (
    <div className="glass-card rounded-2xl border border-border p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif font-bold text-lg flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-coffee-light" /> Work Packages
        </h2>
        <button
          onClick={openAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-xs font-semibold"
        >
          <Plus className="w-3.5 h-3.5" /> Add WP
        </button>
      </div>

      <ul className="space-y-2">
        {wps.map((w) => (
          <li key={w.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
            <span className="tag-coffee font-mono text-xs shrink-0">{w.wpId}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{w.title}</p>
              <p className="text-xs text-muted-foreground">Lead: {w.lead}</p>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button onClick={() => openEdit(w)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setDeleteTarget(w)} className="text-muted-foreground hover:text-rose-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </li>
        ))}
        {wps.length === 0 && (
          <li className="text-center py-6 text-sm text-muted-foreground">No work packages yet. Add one above.</li>
        )}
      </ul>

      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Work Package" : "Add Work Package"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="WP ID" required>
              <input
                name="wpId"
                defaultValue={editing?.wpId ?? ""}
                required
                className={inputCls}
                placeholder="WP1"
              />
            </Field>
            <Field label="Lead institution" required>
              <input
                name="lead"
                defaultValue={editing?.lead ?? ""}
                required
                className={inputCls}
                placeholder="UA Antwerp"
              />
            </Field>
          </div>
          <Field label="Title" required>
            <input
              name="title"
              defaultValue={editing?.title ?? ""}
              required
              className={inputCls}
              placeholder="Work package title"
            />
          </Field>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-leaf-bright transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {pending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {editing ? "Save Changes" : "Add Work Package"}
          </button>
        </form>
      </CrudModal>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        label="this work package"
        pending={deletePending}
      />
    </div>
  );
}

// ── Combined export ───────────────────────────────────────────────────────────

export default function ProjectCrud({
  info,
  goals,
  workPackages,
  problemGroups,
}: {
  info: ProjectInfo | null;
  goals: ProjectGoal[];
  workPackages: WorkPackage[];
  problemGroups: DBGroup[];
}) {
  return (
    <div className="space-y-8">
      <ProjectInfoForm info={info} />
      <ProblemGroupsCrud groups={problemGroups} />

      {/* Circular Economy Model — read-only info */}
      <div className="glass-card rounded-2xl border border-border p-6">
        <h2 className="font-serif font-bold text-lg mb-1">Circular Economy Model</h2>
        <p className="text-sm text-muted-foreground mb-4">These 6 stages are fixed and displayed statically on the public project page.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { step: "01", label: "Bean Harvest",                          icon: "☕" },
            { step: "02", label: "Specialty Coffee Advanced Processing",   icon: "♻" },
            { step: "03", label: "Circular Agro-Energy & Earth Care",      icon: "🌿" },
            { step: "04", label: "Bio-Extracted Innovation Products",      icon: "🧪" },
            { step: "05", label: "Soil Enrichment",                        icon: "🌱" },
            { step: "06", label: "Better Crops",                           icon: "🌾" },
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-3 p-3 rounded-lg bg-muted/40 border border-border/50">
              <span className="text-xl">{s.icon}</span>
              <div>
                <span className="text-xs text-leaf-bright font-mono block">{s.step}</span>
                <p className="text-xs font-medium text-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GoalsCrud goals={goals} />
      <WorkPackagesCrud wps={workPackages} />
    </div>
  );
}

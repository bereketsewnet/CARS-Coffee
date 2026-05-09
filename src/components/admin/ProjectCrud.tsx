"use client";
import React, { useState, useTransition, useEffect } from "react";
import { Plus, Pencil, Trash2, Target, GitBranch, Loader2, BookOpen, Save, CheckCircle } from "lucide-react";
import type { ProjectGoal, WorkPackage, ProjectInfo } from "../../../generated/prisma-client";
import {
  upsertProjectInfo,
  createProjectGoal, updateProjectGoal, deleteProjectGoal,
  createWorkPackage, updateWorkPackage, deleteWorkPackage,
} from "@/lib/actions/project";
import {
  Field, inputCls, selectCls, textareaCls, CrudModal, ConfirmDeleteDialog,
} from "./CrudHelpers";

// ── VLIR-UOS Info section ─────────────────────────────────────────────────────

const STATIC_PROBLEM_LIST = [
  "Ethiopia produces ~400,000 tons of coffee waste annually",
  "Coffee husk & pulp pollute rivers and degrade farm soils",
  "Smallholder farmers lose an estimated 30% of potential income",
  "No integrated circular economy model exists at farm level",
  "Limited access to research-backed composting and valorization techniques",
].join("\n");

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
        <BookOpen className="w-5 h-5 text-leaf-bright" /> VLIR-UOS Section
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Section title">
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
        <Field label="Second paragraph">
          <textarea
            name="vlirP2"
            rows={3}
            defaultValue={info?.vlirP2 ?? "The Circular Coffee project is part of this framework, bringing together expertise in agronomy, food science, environmental engineering, and development economics."}
            className={textareaCls}
          />
        </Field>
        <div className="border-t border-border/50 pt-4 space-y-4">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Problem Statement</p>
          <Field label="Problem box title">
            <input
              name="problemTitle"
              defaultValue={info?.problemTitle ?? "The Problem"}
              className={inputCls}
              placeholder="The Problem"
            />
          </Field>
          <Field label="Problem bullets (one per line)">
            <textarea
              name="problemList"
              rows={6}
              defaultValue={info?.problemList ?? STATIC_PROBLEM_LIST}
              className={textareaCls}
              placeholder={"One bullet per line…"}
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
}: {
  info: ProjectInfo | null;
  goals: ProjectGoal[];
  workPackages: WorkPackage[];
}) {
  return (
    <div className="space-y-8">
      {/* VLIR-UOS editable section */}
      <ProjectInfoForm info={info} />

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

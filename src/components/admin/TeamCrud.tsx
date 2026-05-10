"use client";
import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  Mail,
  ImageIcon,
  X,
  Loader2,
  Star,
} from "lucide-react";
import type { TeamMember } from "../../../generated/prisma-client";
import {
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  setFeaturedTeamMember,
} from "@/lib/actions/team";
import {
  Field,
  inputCls,
  selectCls,
  textareaCls,
  CrudModal,
  ConfirmDeleteDialog,
  SubmitBtn,
} from "./CrudHelpers";

const ROLES = [
  "Principal Investigator",
  "Co-Investigator",
  "Senior Researcher",
  "PhD Researcher",
  "MSc Researcher",
] as const;

function deriveCategory(role: string): string {
  const r = role.toLowerCase().trim();
  if (r === "principal investigator" || r.includes("principal")) return "Principal Investigator";
  if (r === "co-investigator" || r.includes("co-invest") || r.includes("co-supervisor") || r.includes("co supervisor")) return "Co-Investigator";
  if (r === "senior researcher" || r.includes("senior")) return "Senior Researcher";
  if (r === "phd researcher" || r.includes("phd") || r.includes("candidate")) return "PhD Researcher";
  return "MSc Researcher";
}

const CATEGORY_ORDER = ["Principal Investigator", "Co-Investigator", "Senior Researcher", "PhD Researcher", "MSc Researcher"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  "Principal Investigator": "Principal Investigators",
  "Co-Investigator":        "Co-Investigators",
  "Senior Researcher":      "Senior Researchers",
  "PhD Researcher":         "PhD Researchers",
  "MSc Researcher":         "MSc Researchers",
};

function FeaturedControl({ item, featuredCount, onToggle, onOrder }: {
  item: TeamMember;
  featuredCount: number;
  onToggle: (id: string, featured: boolean) => void;
  onOrder: (id: string, order: number) => void;
}) {
  const [pending, startTransition] = useTransition();
  const isFeatured = (item as any).featured as boolean;
  const featuredOrder = (item as any).featuredOrder as number | null;
  const canFeature = isFeatured || featuredCount < 4;

  function handleToggle() {
    startTransition(async () => {
      const newFeatured = !isFeatured;
      const newOrder = newFeatured ? (featuredOrder ?? featuredCount + 1) : null;
      await setFeaturedTeamMember(item.id, newFeatured, newOrder);
      onToggle(item.id, newFeatured);
    });
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = Number(e.target.value);
    startTransition(async () => {
      await setFeaturedTeamMember(item.id, true, val);
      onOrder(item.id, val);
    });
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleToggle}
        disabled={pending || (!isFeatured && !canFeature)}
        title={isFeatured ? "Remove from home page" : canFeature ? "Pin to home page (max 4)" : "Max 4 members pinned"}
        className={`transition-colors disabled:opacity-40 ${isFeatured ? "text-amber-400 hover:text-amber-300" : "text-muted-foreground hover:text-amber-400"}`}
      >
        {pending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : (
          <Star className={`w-3.5 h-3.5 ${isFeatured ? "fill-amber-400" : ""}`} />
        )}
      </button>
      {isFeatured && (
        <select
          value={featuredOrder ?? 1}
          onChange={handleOrderChange}
          disabled={pending}
          className="text-[10px] bg-muted border border-border rounded px-1 py-0.5 text-muted-foreground"
        >
          <option value={1}>1st</option>
          <option value={2}>2nd</option>
          <option value={3}>3rd</option>
          <option value={4}>4th</option>
        </select>
      )}
    </div>
  );
}

export default function TeamCrud({ items: initial, pillars = [] }: { items: TeamMember[]; pillars?: { pillar: string; title: string }[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  // Image upload state
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  React.useEffect(() => {
    setItems(initial);
  }, [initial]);

  const featuredCount = items.filter((m) => (m as any).featured).length;

  function handleFeaturedToggle(id: string, featured: boolean) {
    setItems((prev) =>
      prev.map((m) => m.id === id ? { ...m, featured, featuredOrder: featured ? (m as any).featuredOrder ?? featuredCount + 1 : null } as any : m)
    );
  }

  function handleFeaturedOrder(id: string, order: number) {
    setItems((prev) =>
      prev.map((m) => m.id === id ? { ...m, featuredOrder: order } as any : m)
    );
  }

  function openAdd() {
    setEditing(null);
    setError(null);
    setImgPreview(null);
    setImgUrl(null);
    setUploadError(null);
    setMode("add");
  }
  function openEdit(m: TeamMember) {
    setEditing(m);
    setError(null);
    const existing = m.imageUrl ?? null;
    setImgUrl(existing);
    setImgPreview(existing);
    setUploadError(null);
    setMode("edit");
  }
  function close() {
    setMode(null);
    setEditing(null);
    setError(null);
    // Revoke blob URL to avoid memory leaks
    if (imgPreview && imgPreview.startsWith("blob:")) {
      URL.revokeObjectURL(imgPreview);
    }
    setImgPreview(null);
    setImgUrl(null);
    setUploadError(null);
  }

  async function handleImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files are allowed.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Image must be under 2 MB.");
      return;
    }
    setImgPreview(URL.createObjectURL(file));
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload?folder=team", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setUploadError(json.error ?? "Upload failed.");
        setImgPreview(null);
        setImgUrl(null);
      } else {
        setImgUrl(json.url);
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
      setImgPreview(null);
      setImgUrl(null);
    } finally {
      setUploading(false);
      if (imgInputRef.current) imgInputRef.current.value = "";
    }
  }

  function handleRemoveImg() {
    setImgPreview(null);
    setImgUrl(null);
    setUploadError(null);
    if (imgInputRef.current) imgInputRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (uploading) return;
    const fd = new FormData(e.currentTarget);
    // imgUrl is the persisted server-side URL (not the blob preview)
    fd.set("imageUrl", imgUrl ?? "");
    setError(null);
    startTransition(async () => {
      try {
        const res = editing
          ? await updateTeamMember(editing.id, {}, fd)
          : await createTeamMember({}, fd);
        if (res.error) {
          setError(res.error);
        } else {
          close();
          router.refresh(); // re-fetch server data so card grid shows updated photo
        }
      } catch (e) { console.error(e); }
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      try {
        await deleteTeamMember(deleteTarget.id);
        setDeleteTarget(null);
        router.refresh(); // re-fetch server data so deleted member disappears
      } catch (e) { console.error(e); }
    });
  }

  const active = items.filter((m) => m.active).length;
  const institutions = new Set(items.map((m) => m.institution)).size;
  const countries = new Set(items.map((m) => m.country)).size;

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: items.length },
          { label: "Active", value: active },
          { label: "Institutions", value: institutions },
          { label: "Countries", value: countries },
        ].map((s) => (
          <div
            key={s.label}
            className="glass-card rounded-xl border border-border p-4 text-center"
          >
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Add button */}
      <div className="flex justify-end">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-sm font-semibold shadow-glow"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Grouped by category */}
      <div className="space-y-8">
        {items.length === 0 && (
          <p className="py-12 text-center text-muted-foreground text-sm">No team members yet.</p>
        )}
        {CATEGORY_ORDER.map((cat) => {
          const group = items
            .filter((m) => deriveCategory(m.role) === cat)
            .sort((a, b) => ((a as any).order ?? 0) - ((b as any).order ?? 0) || a.name.localeCompare(b.name));
          if (!group.length) return null;
          return (
            <div key={cat}>
              {/* Category separator */}
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-0.5 rounded-full bg-leaf-bright inline-block" />
                <h3 className="font-serif text-base font-semibold text-foreground">{CATEGORY_LABELS[cat]}</h3>
                <span className="text-xs text-muted-foreground">({group.length})</span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.map((m) => (
                  <div key={m.id} className="glass-card rounded-xl border border-border p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary/30 flex items-center justify-center text-leaf-bright font-bold text-sm flex-shrink-0">
                        {m.imageUrl ? (
                          <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                        ) : (
                          m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FeaturedControl
                          item={m}
                          featuredCount={featuredCount}
                          onToggle={handleFeaturedToggle}
                          onOrder={handleFeaturedOrder}
                        />
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${m.active ? "text-leaf-bright bg-leaf/10 border-leaf/20" : "text-muted-foreground bg-muted border-border"}`}>
                          {m.active ? "Active" : "Inactive"}
                        </span>
                        <button onClick={() => openEdit(m)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteTarget(m)} className="text-muted-foreground hover:text-rose-400 transition-colors p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{m.name}</p>
                      <p className="text-xs text-muted-foreground">{m.role}</p>
                      <p className="text-xs text-muted-foreground">{m.institution} · {m.country}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="tag-pill text-xs">
                        {m.pillar ? (pillars.find((p) => p.pillar === m.pillar)?.title ?? m.pillar) : "—"}
                      </span>
                      {(m as any).order !== undefined && (
                        <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">#{(m as any).order}</span>
                      )}
                    </div>
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                        <Mail className="w-3 h-3" /> Email
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <CrudModal
        open={mode !== null}
        onClose={close}
        title={editing ? "Edit Team Member" : "Add Team Member"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Profile Image Upload */}
            <div className="sm:col-span-2">
              <Field label="Profile Photo">
                <input
                  ref={imgInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImgChange}
                />
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center flex-shrink-0">
                    {imgPreview ? (
                      <img
                        src={imgPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => imgInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:border-leaf-bright/50 transition-colors disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />{" "}
                          Uploading…
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3.5 h-3.5" />{" "}
                          {imgPreview ? "Change photo" : "Upload photo"}
                        </>
                      )}
                    </button>
                    {imgPreview && (
                      <button
                        type="button"
                        onClick={handleRemoveImg}
                        disabled={uploading}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-400 transition-colors disabled:opacity-50"
                      >
                        <X className="w-3 h-3" /> Remove
                      </button>
                    )}
                    {uploadError && (
                      <p className="text-xs text-rose-400">{uploadError}</p>
                    )}
                    {!uploadError && (
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG, WebP — max 2 MB
                      </p>
                    )}
                  </div>
                </div>
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Full Name" required>
                <input
                  name="name"
                  defaultValue={editing?.name ?? ""}
                  required
                  className={inputCls}
                  placeholder="Dr. Jane Smith"
                />
              </Field>
            </div>
            <Field label="Role" required>
              <select
                name="role"
                defaultValue={editing ? deriveCategory(editing.role) : "Principal Investigator"}
                required
                className={selectCls}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label="Institution" required>
              <input
                name="institution"
                defaultValue={editing?.institution ?? ""}
                required
                className={inputCls}
                placeholder="University name"
              />
            </Field>
            <Field label="Country" required>
              <input
                name="country"
                defaultValue={editing?.country ?? ""}
                required
                className={inputCls}
                placeholder="Ethiopia"
              />
            </Field>
            <Field label="Research Pillar">
              <select
                name="pillar"
                defaultValue={editing?.pillar ?? ""}
                className={selectCls}
              >
                <option value="">— None —</option>
                {pillars.map((p) => (
                  <option key={p.pillar} value={p.pillar}>
                    {p.title}
                  </option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Display Order">
                <input
                  name="order"
                  type="number"
                  defaultValue={Number((editing as any)?.order ?? 0)}
                  className={inputCls}
                  placeholder="0"
                />
              </Field>
            </div>
            <Field label="Email">
              <input
                name="email"
                type="email"
                defaultValue={editing?.email ?? ""}
                className={inputCls}
                placeholder="jane@university.edu"
              />
            </Field>
            <Field label="Active Status" required>
              <select
                name="active"
                defaultValue={editing ? String(editing.active) : "true"}
                className={selectCls}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Bio">
                <textarea
                  name="bio"
                  defaultValue={editing?.bio ?? ""}
                  rows={3}
                  className={textareaCls}
                  placeholder="Short biography…"
                />
              </Field>
            </div>            
            <Field label="LinkedIn">
              <input type="url" name="linkedin" defaultValue={(editing as any)?.linkedin ?? ""} className={inputCls} placeholder="https://linkedin.com/..." />
            </Field>
            <Field label="X (Twitter)">
              <input type="url" name="twitter" defaultValue={(editing as any)?.twitter ?? ""} className={inputCls} placeholder="https://x.com/..." />
            </Field>
            <Field label="Instagram">
              <input type="url" name="instagram" defaultValue={(editing as any)?.instagram ?? ""} className={inputCls} placeholder="https://instagram.com/..." />
            </Field>
            <Field label="Website">
              <input type="url" name="website" defaultValue={(editing as any)?.website ?? ""} className={inputCls} placeholder="https://..." />
            </Field>          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn
            pending={pending || uploading}
            label={editing ? "Save Changes" : "Add Member"}
          />
        </form>
      </CrudModal>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        label={deleteTarget?.name ?? ""}
        pending={deletePending}
      />
    </>
  );
}

"use client";
import React, { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Mail, ImageIcon, X, Loader2 } from "lucide-react";
import type { Collaborator } from "../../../generated/prisma-client";
import {
  createCollaborator,
  updateCollaborator,
  deleteCollaborator,
} from "@/lib/actions/collaborators";
import {
  Field,
  inputCls,
  selectCls,
  textareaCls,
  CrudModal,
  ConfirmDeleteDialog,
  SubmitBtn,
} from "./CrudHelpers";

const CATEGORY_LABELS: Record<string, string> = {
  GOVERNMENT: "Government Official",
  SPONSOR:    "Sponsor / Funder",
  NGO:        "NGO / Civil Society",
  ACADEMIC:   "Academic Partner",
  INDUSTRY:   "Industry Partner",
  OTHER:      "Other",
};

const ROLE_OPTIONS = [
  "Executive Dean",
  "Vice Executive Dean",
  "CTBE-CARES-Support",
];

export default function CollaboratorsCrud({ items: initial }: { items: Collaborator[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<Collaborator | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Collaborator | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  const imgInputRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  React.useEffect(() => { setItems(initial); }, [initial]);

  function openAdd() {
    setEditing(null); setError(null);
    setImgPreview(null); setImgUrl(null); setUploadError(null);
    setMode("add");
  }
  function openEdit(c: Collaborator) {
    setEditing(c); setError(null);
    setImgUrl(c.imageUrl ?? null); setImgPreview(c.imageUrl ?? null); setUploadError(null);
    setMode("edit");
  }
  function close() {
    setMode(null); setEditing(null); setError(null);
    if (imgPreview?.startsWith("blob:")) URL.revokeObjectURL(imgPreview);
    setImgPreview(null); setImgUrl(null); setUploadError(null);
  }

  async function handleImgChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setUploadError("Only image files are allowed."); return; }
    if (file.size > 2 * 1024 * 1024) { setUploadError("Image must be under 2 MB."); return; }
    setImgPreview(URL.createObjectURL(file));
    setUploadError(null); setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload?folder=collaborators", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || json.error) {
        setUploadError(json.error ?? "Upload failed."); setImgPreview(null); setImgUrl(null);
      } else { setImgUrl(json.url); }
    } catch {
      setUploadError("Upload failed. Please try again."); setImgPreview(null); setImgUrl(null);
    } finally {
      setUploading(false);
      if (imgInputRef.current) imgInputRef.current.value = "";
    }
  }

  function handleRemoveImg() {
    setImgPreview(null); setImgUrl(null); setUploadError(null);
    if (imgInputRef.current) imgInputRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (uploading) return;
    const fd = new FormData(e.currentTarget);
    fd.set("imageUrl", imgUrl ?? "");
    setError(null);
    startTransition(async () => {
      try {
        const res = editing
          ? await updateCollaborator(editing.id, {}, fd)
          : await createCollaborator({}, fd);
        if (res.error) setError(res.error);
        else { close(); router.refresh(); }
      } catch (e) { console.error(e); }
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      try {
        await deleteCollaborator(deleteTarget.id);
        setDeleteTarget(null); router.refresh();
      } catch (e) { console.error(e); }
    });
  }

  const active = items.filter((c) => c.active).length;
  const orgs = new Set(items.map((c) => c.organisation)).size;
  const countries = new Set(items.map((c) => c.country)).size;

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total", value: items.length },
          { label: "Active", value: active },
          { label: "Organisations", value: orgs },
          { label: "Countries", value: countries },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl border border-border p-4 text-center">
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
          <Plus className="w-4 h-4" /> Add Coordinator
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c) => (
          <div key={c.id} className="glass-card rounded-xl border border-border p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary/30 flex items-center justify-center text-leaf-bright font-bold text-sm flex-shrink-0">
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" />
                ) : (
                  c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)
                )}
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${c.active ? "text-leaf-bright bg-leaf/10 border-leaf/20" : "text-muted-foreground bg-muted border-border"}`}>
                  {c.active ? "Active" : "Inactive"}
                </span>
                <button onClick={() => openEdit(c)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => setDeleteTarget(c)} className="text-muted-foreground hover:text-rose-400 transition-colors p-1">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div>
              <p className="font-semibold text-foreground">{c.name}</p>
              {c.role && <p className="text-xs text-muted-foreground">{c.role}</p>}
              {(c.organisation || c.country) && (
                <p className="text-xs text-muted-foreground">
                  {[c.organisation, c.country].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
            <span className="tag-pill text-xs">{CATEGORY_LABELS[c.category] ?? c.category}</span>
            {c.email && (
              <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-3 h-3" /> Email
              </a>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-3 py-12 text-center text-muted-foreground text-sm">
            No collaborators yet. Add one to get started.
          </div>
        )}
      </div>

      {/* Modal */}
      <CrudModal open={mode !== null} onClose={close} title={editing ? "Edit Coordinator" : "Add Coordinator"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Photo upload */}
            <div className="sm:col-span-2">
              <Field label="Photo">
                <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgChange} />
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border bg-muted flex items-center justify-center flex-shrink-0">
                    {imgPreview
                      ? <img src={imgPreview} alt="Preview" className="w-full h-full object-cover" />
                      : <ImageIcon className="w-8 h-8 text-muted-foreground" />}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={() => imgInputRef.current?.click()} disabled={uploading}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm text-foreground hover:border-leaf-bright/50 transition-colors disabled:opacity-50">
                      {uploading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading…</> : <><ImageIcon className="w-3.5 h-3.5" /> {imgPreview ? "Change photo" : "Upload photo"}</>}
                    </button>
                    {imgPreview && <button type="button" onClick={handleRemoveImg} disabled={uploading} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-400 transition-colors disabled:opacity-50"><X className="w-3 h-3" /> Remove</button>}
                    {uploadError ? <p className="text-xs text-rose-400">{uploadError}</p> : <p className="text-xs text-muted-foreground">JPG, PNG, WebP — max 2 MB</p>}
                  </div>
                </div>
              </Field>
            </div>

            <div className="sm:col-span-2">
              <Field label="Full Name" required>
                <input name="name" defaultValue={editing?.name ?? ""} required className={inputCls} placeholder="John Smith" />
              </Field>
            </div>
            <Field label="Role / Title">
              <select name="role" defaultValue={editing?.role ?? ""} className={selectCls}>
                <option value="">— Select role —</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label="Organisation">
              <input name="organisation" defaultValue={editing?.organisation ?? ""} className={inputCls} placeholder="Ministry of Agriculture" />
            </Field>
            <Field label="Country">
              <input name="country" defaultValue={editing?.country ?? ""} className={inputCls} placeholder="Ethiopia" />
            </Field>
            <Field label="Category">
              <select name="category" defaultValue={editing?.category ?? "OTHER"} className={selectCls}>
                {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </Field>
            <Field label="Display Order">
              <input name="order" type="number" defaultValue={editing?.order ?? 0} className={inputCls} />
            </Field>
            <Field label="Email">
              <input name="email" type="email" defaultValue={editing?.email ?? ""} className={inputCls} placeholder="contact@org.gov" />
            </Field>
            <Field label="Active Status">
              <select name="active" defaultValue={editing ? String(editing.active) : "true"} className={selectCls}>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Bio / Description">
                <textarea name="bio" defaultValue={editing?.bio ?? ""} rows={3} className={textareaCls} placeholder="Brief description…" />
              </Field>
            </div>
            <Field label="LinkedIn">
              <input type="url" name="linkedin" defaultValue={editing?.linkedin ?? ""} className={inputCls} placeholder="https://linkedin.com/..." />
            </Field>
            <Field label="X (Twitter)">
              <input type="url" name="twitter" defaultValue={editing?.twitter ?? ""} className={inputCls} placeholder="https://x.com/..." />
            </Field>
            <Field label="Instagram">
              <input type="url" name="instagram" defaultValue={editing?.instagram ?? ""} className={inputCls} placeholder="https://instagram.com/..." />
            </Field>
            <Field label="Website">
              <input type="url" name="website" defaultValue={editing?.website ?? ""} className={inputCls} placeholder="https://..." />
            </Field>
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <SubmitBtn pending={pending || uploading} label={editing ? "Save Changes" : "Add Coordinator"} />
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

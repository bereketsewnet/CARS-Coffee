"use client";
import React, { useRef, useState, useTransition } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Calendar,
  ImagePlus,
  X,
  Loader2,
  Star,
} from "lucide-react";
import type { NewsEvent } from "../../../generated/prisma-client";
import {
  createNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
  setFeaturedNews,
} from "@/lib/actions/news";
import {
  Field,
  inputCls,
  selectCls,
  textareaCls,
  CrudModal,
  ConfirmDeleteDialog,
} from "./CrudHelpers";

const STATUS_COLORS: Record<string, string> = {
  UPCOMING: "text-sky-400 bg-sky-400/10 border-sky-400/20",
  PUBLISHED: "text-leaf-bright bg-leaf/10 border-leaf/20",
  PAST: "text-muted-foreground bg-muted border-border",
  DRAFT: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};
const STATUS_LABELS: Record<string, string> = {
  UPCOMING: "Upcoming",
  PUBLISHED: "Published",
  PAST: "Past",
  DRAFT: "Draft",
};

const TYPE_LABELS: Record<string, string> = {
  FIELD_NEWS: "Field News",
  ACADEMIC_NEWS: "Academic News",
  EVENT: "Event",
};

const TAG_LABELS: Record<string, string> = {
  ACADEMIC_AND_CAPACITY: "Academic & capacity building",
  FIELDWORK_AND_SOCIETAL: "Fieldwork & societal uptake",
  GOVERNANCE_AND_PARTNERSHIP: "Governance & Partnership",
  ADMINISTRATIVE: "Administrative updates",
  OPEN_CALLS: "Open calls & opportunities",
};

function toDateInput(d: Date | string | null | undefined): string {
  if (!d) return "";
  const dt = d instanceof Date ? d : new Date(d);
  return dt.toISOString().split("T")[0];
}

function FeaturedControl({ item, featuredCount, onToggle, onOrder }: {
  item: NewsEvent;
  featuredCount: number;
  onToggle: (id: string, featured: boolean) => void;
  onOrder: (id: string, order: number) => void;
}) {
  const [pending, startTransition] = useTransition();
  const isFeatured = (item as any).featured as boolean;
  const featuredOrder = (item as any).featuredOrder as number | null;
  const canFeature = isFeatured || featuredCount < 3;

  function handleToggle() {
    startTransition(async () => {
      const newFeatured = !isFeatured;
      const newOrder = newFeatured ? (featuredOrder ?? featuredCount + 1) : null;
      await setFeaturedNews(item.id, newFeatured, newOrder);
      onToggle(item.id, newFeatured);
    });
  }

  function handleOrderChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const val = Number(e.target.value);
    startTransition(async () => {
      await setFeaturedNews(item.id, true, val);
      onOrder(item.id, val);
    });
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleToggle}
        disabled={pending || (!isFeatured && !canFeature)}
        title={isFeatured ? "Unpin from home page" : canFeature ? "Pin to home page" : "Max 3 items pinned"}
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
        </select>
      )}
    </div>
  );
}

export default function NewsCrud({ items: initial }: { items: NewsEvent[] }) {
  const [items, setItems] = useState(initial);
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [editing, setEditing] = useState<NewsEvent | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<NewsEvent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deletePending, startDeleteTransition] = useTransition();

  // Image upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  React.useEffect(() => {
    setItems(initial);
  }, [initial]);

  const featuredCount = items.filter((i) => (i as any).featured).length;

  function openAdd() {
    setEditing(null);
    setError(null);
    setImgPreview(null);
    setImgUrl(null);
    setUploadError(null);
    setMode("add");
  }
  function openEdit(n: NewsEvent) {
    setEditing(n);
    setError(null);
    setImgPreview(n.imageUrl ?? null);
    setImgUrl(n.imageUrl ?? null);
    setUploadError(null);
    setMode("edit");
  }
  function close() {
    setMode(null);
    setEditing(null);
    setError(null);
    setImgPreview(null);
    setImgUrl(null);
    setUploadError(null);
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgPreview(URL.createObjectURL(file));
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload?folder=news", {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setUploadError(json.error ?? "Upload failed.");
        setImgPreview(editing?.imageUrl ?? null);
        setImgUrl(editing?.imageUrl ?? null);
      } else {
        setImgUrl(json.url);
      }
    } catch {
      setUploadError("Upload failed. Please try again.");
      setImgPreview(editing?.imageUrl ?? null);
      setImgUrl(editing?.imageUrl ?? null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleRemoveImg() {
    setImgPreview(null);
    setImgUrl(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
          ? await updateNewsEvent(editing.id, {}, fd)
          : await createNewsEvent({}, fd);
        if (res.error) setError(res.error);
        else close();
      } catch (e) { console.error(e); }
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      try {
        await deleteNewsEvent(deleteTarget.id);
        setDeleteTarget(null);
      } catch (e) { console.error(e); }
    });
  }

  function handleFeaturedToggle(id: string, featured: boolean) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, featured } as any : item
      )
    );
  }

  function handleFeaturedOrder(id: string, order: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, featuredOrder: order } as any : item
      )
    );
  }

  const upcoming = items.filter((i) => i.status === "UPCOMING").length;
  const published = items.filter((i) => i.status === "PUBLISHED").length;
  const drafts = items.filter((i) => i.status === "DRAFT").length;

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Items", value: items.length },
          { label: "Upcoming Events", value: upcoming },
          { label: "Published News", value: published },
          { label: "Drafts", value: drafts },
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

      {/* Featured indicator */}
      {featuredCount > 0 && (
        <p className="text-xs text-amber-400 flex items-center gap-1.5">
          <Star className="w-3 h-3 fill-amber-400" />
          {featuredCount}/3 items pinned to home page "Latest Updates"
        </p>
      )}

      {/* Add button */}
      <div className="flex justify-end">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-sm font-semibold shadow-glow"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* List */}
      <div className="glass-card rounded-xl border border-border overflow-hidden">
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className="px-5 py-4 border-b border-border/50 last:border-b-0 hover:bg-muted/20 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[item.status] ?? STATUS_COLORS.DRAFT}`}
                    >
                      {STATUS_LABELS[item.status] ?? item.status}
                    </span>
                    <span className="tag-pill text-xs">{TYPE_LABELS[item.type] ?? item.type}</span>
                    {(item as any).tag && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">
                        {TAG_LABELS[(item as any).tag] ?? (item as any).tag}
                      </span>
                    )}
                  </div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {item.excerpt}
                  </p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{item.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-end">
                    <FeaturedControl
                      item={item}
                      featuredCount={featuredCount}
                      onToggle={handleFeaturedToggle}
                      onOrder={handleFeaturedOrder}
                    />
                    <button
                      onClick={() => openEdit(item)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(item)}
                      className="text-muted-foreground hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-5 py-8 text-center text-muted-foreground text-sm">
              No news or events yet.
            </li>
          )}
        </ul>
      </div>

      <CrudModal
        open={mode !== null}
        onClose={close}
        title={editing ? "Edit News / Event" : "Add News / Event"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Field label="Title" required>
                <input
                  name="title"
                  defaultValue={editing?.title ?? ""}
                  required
                  className={inputCls}
                  placeholder="Title"
                />
              </Field>
            </div>
            <Field label="Type" required>
              <select
                name="type"
                defaultValue={editing?.type ?? "FIELD_NEWS"}
                required
                className={selectCls}
              >
                {Object.entries(TYPE_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>{l}</option>
                ))}
              </select>
            </Field>
            <Field label="Status" required>
              <select
                name="status"
                defaultValue={editing?.status ?? "DRAFT"}
                required
                className={selectCls}
              >
                {Object.entries(STATUS_LABELS).map(([v, l]) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Tag" required>
                <select
                  name="tag"
                  defaultValue={(editing as any)?.tag ?? ""}
                  required
                  className={selectCls}
                >
                  <option value="" disabled>Select a tag…</option>
                  {Object.entries(TAG_LABELS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Date" required>
              <input
                name="date"
                type="date"
                defaultValue={toDateInput(editing?.date)}
                required
                className={inputCls}
              />
            </Field>
            <Field label="Location">
              <input
                name="location"
                defaultValue={editing?.location ?? ""}
                className={inputCls}
                placeholder="City, Country"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Excerpt">
                <textarea
                  name="excerpt"
                  defaultValue={editing?.excerpt ?? ""}
                  rows={2}
                  className={textareaCls}
                  placeholder="Short excerpt…"
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Full Content">
                <textarea
                  name="content"
                  defaultValue={editing?.content ?? ""}
                  rows={4}
                  className={textareaCls}
                  placeholder="Full article content…"
                />
              </Field>
            </div>

            {/* Image upload */}
            <div className="sm:col-span-2">
              <Field label="Cover Image">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {imgPreview ? (
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={imgPreview}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-leaf-bright/40 transition-colors disabled:opacity-50"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-3 h-3 animate-spin" />{" "}
                            Uploading…
                          </>
                        ) : (
                          <>
                            <ImagePlus className="w-3 h-3" /> Change image
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImg}
                        disabled={uploading}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-muted border border-border text-rose-400 hover:bg-rose-500/10 transition-colors disabled:opacity-50"
                      >
                        <X className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full flex flex-col items-center justify-center gap-2 py-5 rounded-lg border-2 border-dashed border-border hover:border-leaf-bright/50 transition-colors text-muted-foreground hover:text-foreground disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs">Uploading…</span>
                      </>
                    ) : (
                      <>
                        <ImagePlus className="w-5 h-5" />
                        <span className="text-xs">
                          Click to upload cover image
                        </span>
                        <span className="text-xs opacity-60">
                          PNG, JPG, WebP — max 2 MB
                        </span>
                      </>
                    )}
                  </button>
                )}
                {uploadError && (
                  <p className="text-xs text-rose-400 mt-1">{uploadError}</p>
                )}
              </Field>
            </div>
          </div>
          {error && <p className="text-xs text-rose-400">{error}</p>}
          <button
            type="submit"
            disabled={pending || uploading}
            className="w-full py-2 rounded-lg bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-leaf-bright transition-colors disabled:opacity-50"
          >
            {pending
              ? "Saving…"
              : uploading
                ? "Uploading…"
                : editing
                  ? "Save Changes"
                  : "Add Item"}
          </button>
        </form>
      </CrudModal>

      <ConfirmDeleteDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        label={`"${deleteTarget?.title ?? ""}"`}
        pending={deletePending}
      />
    </>
  );
}

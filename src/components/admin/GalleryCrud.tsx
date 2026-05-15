"use client";
import React, { useState, useTransition, useRef } from "react";
import Image from "next/image";
import { Trash2, Upload, Loader2, Eye, EyeOff, ImagePlus, AlertCircle } from "lucide-react";
import { addGalleryImage, deleteGalleryImage, toggleGalleryImage } from "@/lib/actions/gallery";
import { GALLERY_LIMIT } from "@/lib/galleryConstants";
import { ConfirmDeleteDialog } from "./CrudHelpers";

type GalleryRow = { id: string; filename: string; url: string; active: boolean; order: number };

export default function GalleryCrud({ images: initial }: { images: GalleryRow[] }) {
  const [images, setImages] = useState<GalleryRow[]>(initial);
  const [pending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryRow | null>(null);
  const [deletePending, startDeleteTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeCount = images.filter((i) => i.active).length;
  const totalCount = images.length;
  const atLimit = totalCount >= GALLERY_LIMIT;

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setError(null);

    const remaining = GALLERY_LIMIT - totalCount;
    if (files.length > remaining) {
      setError(`You can only add ${remaining} more image(s). Gallery limit is ${GALLERY_LIMIT}.`);
      e.target.value = "";
      return;
    }

    setUploading(true);
    try {
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/upload?folder=gallery", { method: "POST", body: fd });
        const data = await res.json();
        if (data.error) { setError(data.error); break; }
        const result = await addGalleryImage(data.url, file.name);
        if ((result as any)?.error) { setError((result as any).error); break; }
        const newImg: GalleryRow = { id: Date.now().toString(), filename: file.name, url: data.url, active: true, order: totalCount + 1 };
        setImages((prev) => [...prev, newImg]);
      }
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function handleToggle(img: GalleryRow) {
    startTransition(async () => {
      const next = !img.active;
      await toggleGalleryImage(img.id, next);
      setImages((prev) => prev.map((i) => i.id === img.id ? { ...i, active: next } : i));
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startDeleteTransition(async () => {
      await deleteGalleryImage(deleteTarget.id);
      setImages((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      setDeleteTarget(null);
    });
  }

  return (
    <div className="space-y-6">
      {/* Stats + Upload bar */}
      <div className="glass-card rounded-2xl border border-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="text-muted-foreground">
            Total: <span className="font-bold text-foreground">{totalCount}</span>
            <span className="text-muted-foreground"> / {GALLERY_LIMIT}</span>
          </span>
          <span className="text-muted-foreground">
            Active: <span className="font-bold text-leaf-bright">{activeCount}</span>
          </span>
          <span className="text-muted-foreground">
            Hidden: <span className="font-bold text-amber-400">{totalCount - activeCount}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {atLimit && (
            <span className="flex items-center gap-1.5 text-xs text-rose-400 font-medium">
              <AlertCircle className="w-3.5 h-3.5" /> Limit reached
            </span>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || atLimit}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-leaf-bright transition-colors text-sm font-semibold disabled:opacity-50"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
            {uploading ? "Uploading…" : "Add Images"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-400/10 border border-rose-400/20 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-leaf-bright transition-all duration-300"
          style={{ width: `${Math.min((totalCount / GALLERY_LIMIT) * 100, 100)}%` }}
        />
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {images.map((img) => (
          <div
            key={img.id}
            className={`relative group rounded-xl overflow-hidden border transition-all duration-200 ${
              img.active ? "border-border" : "border-amber-400/40 opacity-60"
            }`}
          >
            <div className="aspect-square relative bg-muted">
              <Image
                src={img.url}
                alt={img.filename}
                fill
                className="object-cover"
                sizes="180px"
                unoptimized
              />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => handleToggle(img)}
                disabled={pending}
                title={img.active ? "Hide image" : "Show image"}
                className={`p-2 rounded-lg transition-colors ${
                  img.active
                    ? "bg-amber-500/80 hover:bg-amber-500 text-white"
                    : "bg-leaf-bright/80 hover:bg-leaf-bright text-black"
                }`}
              >
                {img.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setDeleteTarget(img)}
                title="Delete image"
                className="p-2 rounded-lg bg-rose-500/80 hover:bg-rose-500 text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Status badge */}
            {!img.active && (
              <div className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                HIDDEN
              </div>
            )}

            {/* Filename */}
            <div className="px-2 py-1.5 bg-card/90">
              <p className="text-[10px] text-muted-foreground truncate">{img.filename}</p>
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Upload className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No images yet. Click "Add Images" to upload.</p>
        </div>
      )}

      <ConfirmDeleteDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        label={deleteTarget?.filename ?? "image"}
        pending={deletePending}
      />
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";

async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "gallery");

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Upload gagal");
  return json.data; // { url, public_id }
}

async function saveToDatabase(imageUrl, caption) {
  const res = await fetch("/api/gallery", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl, caption }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Gagal menyimpan");
  return json.data;
}

async function deleteFromDatabase(id) {
  const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Gagal menghapus");
}

function UploadCloudIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 15a4.5 4.5 0 010-9 5.5 5.5 0 0110.6 1.9A4 4 0 0117 15.75H7.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 11v8m0-8l-2.5 2.5M12 11l2.5 2.5"
      />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 0v12a1 1 0 001 1h6a1 1 0 001-1V7"
      />
    </svg>
  );
}

function SpinnerIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="animate-spin" {...props}>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M21 12a9 9 0 00-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function GalleryUploader({ initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [caption, setCaption] = useState("");
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingPreview, setPendingPreview] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const acceptFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setUploadError("Hanya file gambar yang diizinkan");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Ukuran file maksimal 5MB");
      return;
    }
    setUploadError("");
    setPendingFile(file);
    setPendingPreview(URL.createObjectURL(file));
    setCaption("");
  }, []);

  const handleFilePick = useCallback(
    (e) => acceptFile(e.target.files?.[0]),
    [acceptFile],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      acceptFile(e.dataTransfer.files?.[0]);
    },
    [acceptFile],
  );

  const handleConfirmUpload = async () => {
    if (!pendingFile) return;
    setUploading(true);
    setUploadError("");
    try {
      const { url } = await uploadToCloudinary(pendingFile);
      const saved = await saveToDatabase(url, caption || null);

      const newImage = saved.galleryImage ?? saved;
      setImages((prev) => [newImage, ...prev]);
      setPendingFile(null);
      setPendingPreview("");
      setCaption("");
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCancelPending = () => {
    setPendingFile(null);
    setPendingPreview("");
    setCaption("");
    setUploadError("");
  };

  const handleDelete = async (id) => {
    if (!confirm("Hapus gambar ini?")) return;
    setDeletingId(id);
    try {
      await deleteFromDatabase(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      alert(err.message || "Gagal menghapus");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      {!pendingFile ? (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
            isDragging
              ? "border-sky-400 bg-sky-50"
              : "border-slate-300 bg-slate-50 hover:border-sky-300 hover:bg-sky-50/60"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFilePick}
            disabled={uploading}
            className="hidden"
          />
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <UploadCloudIcon className="h-6 w-6" />
          </span>
          <span className="text-sm font-medium text-slate-600">
            Klik atau seret gambar untuk diupload
          </span>
          <span className="text-xs text-slate-400">
            JPG, PNG, WebP · Maks 5MB
          </span>
        </label>
      ) : (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
          <img
            src={pendingPreview}
            alt="Preview"
            className="h-40 w-full rounded-xl object-cover sm:h-32 sm:w-32 sm:flex-shrink-0"
          />
          <div className="flex flex-1 flex-col justify-between gap-3">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Keterangan gambar (opsional)..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancelPending}
                disabled={uploading}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={uploading}
                className="flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {uploading && <SpinnerIcon className="h-4 w-4" />}
                {uploading ? "Mengupload..." : "Upload Gambar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadError && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {uploadError}
        </p>
      )}

      {/* Gallery grid */}
      {images.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-400">
          Belum ada gambar di galeri.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src={img.imageUrl}
                  alt={img.caption || "Foto sekolah"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {img.caption && (
                <p className="truncate px-2 py-1.5 text-xs text-slate-500">
                  {img.caption}
                </p>
              )}

              <button
                onClick={() => handleDelete(img.id)}
                disabled={deletingId === img.id}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 opacity-0 shadow transition-opacity duration-200 hover:bg-red-50 group-hover:opacity-100 disabled:opacity-100"
                title="Hapus gambar"
              >
                {deletingId === img.id ? (
                  <SpinnerIcon className="h-4 w-4" />
                ) : (
                  <TrashIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

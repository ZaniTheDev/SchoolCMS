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

export default function GalleryUploader({ initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [caption, setCaption] = useState("");
  const [pendingFile, setPendingFile] = useState(null);
  const [pendingPreview, setPendingPreview] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Step 1: pick file → preview
  const handleFilePick = useCallback((e) => {
    const file = e.target.files?.[0];
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

  // Step 2: confirm → upload to Cloudinary → save to DB
  const handleConfirmUpload = async () => {
    if (!pendingFile) return;
    setUploading(true);
    setUploadError("");
    try {
      const { url } = await uploadToCloudinary(pendingFile);
      const saved = await saveToDatabase(url, caption || null);

      // The API returns data nested under data.galleryImage or similar
      // Adapt based on your actual API response shape
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
    <div className="gallery-uploader">
      {/* Upload area */}
      {!pendingFile ? (
        <label className={`gallery-dropzone ${uploading ? "uploading" : ""}`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFilePick}
            disabled={uploading}
            className="gallery-input"
          />
          <span className="gallery-dropzone-text">
            Klik atau seret gambar untuk diupload
            <small>JPG, PNG, WebP · Maks 5MB</small>
          </span>
        </label>
      ) : (
        <div className="gallery-pending">
          <img
            src={pendingPreview}
            alt="Preview"
            className="gallery-pending-preview"
          />
          <div className="gallery-pending-meta">
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Keterangan gambar (opsional)..."
              className="gallery-caption-input"
            />
            <div className="gallery-pending-actions">
              <button
                onClick={handleCancelPending}
                disabled={uploading}
                className="btn-secondary"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmUpload}
                disabled={uploading}
                className="btn-primary"
              >
                {uploading ? "Mengupload..." : "Upload Gambar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {uploadError && <p className="gallery-error">{uploadError}</p>}

      {/* Gallery grid */}
      {images.length === 0 ? (
        <p className="empty-state">Belum ada gambar di galeri.</p>
      ) : (
        <div className="gallery-grid">
          {images.map((img) => (
            <div key={img.id} className="gallery-item">
              <img
                src={img.imageUrl}
                alt={img.caption || "Foto sekolah"}
                className="gallery-item-img"
              />
              {img.caption && (
                <p className="gallery-item-caption">{img.caption}</p>
              )}
              <button
                onClick={() => handleDelete(img.id)}
                disabled={deletingId === img.id}
                className="gallery-item-delete btn-danger"
              >
                {deletingId === img.id ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

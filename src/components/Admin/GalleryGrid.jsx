"use client";

import { useState } from "react";
import Image from "next/image";

export default function GalleryGrid({ initialImages }) {
  const [images, setImages] = useState(initialImages);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm("Hapus foto ini dari galeri?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Gagal menghapus foto");
        return;
      }

      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      alert("Terjadi kesalahan saat menghapus foto");
    } finally {
      setDeletingId(null);
    }
  };

  if (images.length === 0) {
    return (
      <div className="border border-dashed border-[#ddeef8] rounded-xl py-16 text-center">
        <p className="text-slate-400 text-sm">Belum ada foto di galeri.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((img) => (
        <div
          key={img.id}
          className="group relative aspect-square overflow-hidden rounded-xl bg-[#ddeef8]"
        >
          <Image
            src={img.imageUrl}
            alt={img.caption || "Foto galeri"}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-[#1e3a5f]/0 group-hover:bg-[#1e3a5f]/60 transition-colors flex items-center justify-center">
            <button
              onClick={() => handleDelete(img.id)}
              disabled={deletingId === img.id}
              className="opacity-0 group-hover:opacity-100 transition-opacity bg-white text-[#1e3a5f] text-xs font-medium px-3 py-1.5 rounded-full disabled:opacity-50"
            >
              {deletingId === img.id ? "Menghapus..." : "Hapus"}
            </button>
          </div>

          {img.caption && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e3a5f]/80 to-transparent p-2 pointer-events-none">
              <p className="text-white text-xs line-clamp-1">{img.caption}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

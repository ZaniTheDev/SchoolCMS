"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

async function uploadToCloudinary(file, folder = "teachers") {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();
  if (!json.success) throw new Error(json.message || "Upload gagal");
  return json.data;
}

function PhotoUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        setError("Hanya file gambar yang diizinkan");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB");
        return;
      }

      setError("");
      setUploading(true);
      try {
        const { url } = await uploadToCloudinary(file, "teachers");
        onChange(url);
      } catch (err) {
        setError(err.message);
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  return (
    <div>
      <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
        Foto
      </label>

      {value ? (
        <div className="relative w-32">
          <img
            src={value}
            alt="Foto guru"
            className="w-32 h-32 object-cover rounded-2xl border border-[#ddeef8]"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 text-xs font-semibold bg-white text-red-500 border border-red-200 px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
          >
            Hapus
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center gap-1 w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
            uploading
              ? "border-[#06b6d4] bg-[#f0fdff]"
              : "border-[#ddeef8] hover:border-[#06b6d4] hover:bg-[#f8fbff]"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
          />
          <span className="text-sm font-medium text-[#64748b]">
            {uploading ? "Mengupload..." : "Klik untuk upload foto"}
          </span>
          <span className="text-xs text-[#94a3b8]">
            JPG, PNG, WebP · Maks 5MB
          </span>
        </label>
      )}

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default function TeacherForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [name, setName] = useState(initialData?.name || "");
  const [position, setPosition] = useState(initialData?.position || "");
  const [bio, setBio] = useState(initialData?.bio || "");
  const [photo, setPhoto] = useState(initialData?.photo || "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !position) {
      setError("Nama dan jabatan wajib diisi");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name,
        position,
        bio: bio || null,
        photo: photo || null,
      };

      const url = isEdit ? `/api/teachers/${initialData.id}` : "/api/teachers";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Gagal menyimpan");

      router.push("/admin/teachers");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Name + Position */}
      <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
            Nama
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap guru..."
            required
            className="w-full text-base font-semibold text-[#1e3a5f] placeholder:text-[#cbd5e1] border-0 outline-none bg-transparent"
          />
        </div>

        <div className="pt-4 border-t border-[#f0f7ff]">
          <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
            Jabatan
          </label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Guru Matematika, Kepala Sekolah..."
            required
            className="w-full text-sm text-[#1e3a5f] placeholder:text-[#cbd5e1] border border-[#ddeef8] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#06b6d4] bg-[#f8fbff]"
          />
        </div>
      </div>

      {/* Photo */}
      <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm p-6">
        <PhotoUpload value={photo} onChange={setPhoto} />
      </div>

      {/* Bio */}
      <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm p-6">
        <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
          Bio
        </label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Deskripsi singkat tentang guru..."
          rows={4}
          className="w-full text-sm text-[#1e3a5f] placeholder:text-[#cbd5e1] border border-[#ddeef8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#06b6d4] bg-[#f8fbff] resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pb-8">
        <div>
          {isEdit && (
            <button
              type="button"
              onClick={async () => {
                if (!confirm("Hapus guru ini? Tindakan tidak bisa dibatalkan."))
                  return;
                await fetch(`/api/teachers/${initialData.id}`, {
                  method: "DELETE",
                });
                router.push("/admin/teachers");
                router.refresh();
              }}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors"
            >
              Hapus Guru
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin/teachers")}
            className="px-5 py-2.5 text-sm font-semibold text-[#64748b] border border-[#ddeef8] rounded-xl hover:bg-[#f8fbff] transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={submitting}
            onClick={handleSubmit}
            className="px-5 py-2.5 text-sm font-semibold bg-[#1e3a5f] text-white rounded-xl hover:bg-[#16304f] transition-colors disabled:opacity-50"
          >
            {submitting
              ? "Menyimpan..."
              : isEdit
                ? "Simpan Perubahan"
                : "Tambah Guru"}
          </button>
        </div>
      </div>
    </div>
  );
}

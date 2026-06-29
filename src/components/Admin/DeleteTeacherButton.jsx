"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteTeacherButton({ id }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/teachers/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      router.refresh();
    } catch (err) {
      alert(err.message || "Gagal menghapus guru");
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  };

  if (confirming) {
    return (
      <span className="delete-confirm">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="btn-danger"
        >
          {deleting ? "Menghapus..." : "Ya, Hapus"}
        </button>
        <button onClick={() => setConfirming(false)} className="btn-secondary">
          Batal
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} className="btn-danger">
      Hapus
    </button>
  );
}

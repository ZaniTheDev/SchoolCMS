"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

// ── Toolbar button ────────────────────────────────────────────────
function ToolbarBtn({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-[#1e3a5f] text-white"
          : "text-[#64748b] hover:bg-[#e8f4fd] hover:text-[#1e3a5f]"
      }`}
    >
      {children}
    </button>
  );
}

// ── Slug generator ────────────────────────────────────────────────
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function PostForm({ post }) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [thumbnail, setThumbnail] = useState(post?.thumbnail ?? "");
  const [published, setPublished] = useState(!!post?.publishedAt);
  const [slugManual, setSlugManual] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const editor = useEditor({
    extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
    content: post?.content ?? "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[320px] px-5 py-4 focus:outline-none text-[#1e3a5f]",
      },
    },
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual) setSlug(toSlug(title));
  }, [title, slugManual]);

  const handleSave = async (asDraft = false) => {
    setError(null);
    setSaving(true);

    const body = {
      title,
      slug,
      content: editor?.getHTML() ?? "",
      thumbnail: thumbnail || null,
      publishedAt: asDraft
        ? null
        : published
          ? (post?.publishedAt ?? new Date().toISOString())
          : null,
    };

    try {
      const res = await fetch(isEdit ? `/api/posts/${post.id}` : "/api/posts", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("POST /api/posts failed:", res.status, data);
        throw new Error(data.message ?? "Gagal menyimpan postingan");
      }

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Hapus postingan ini? Tindakan tidak bisa dibatalkan."))
      return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("DELETE /api/posts failed:", res.status, data);
        throw new Error(data.message ?? "Gagal menghapus postingan");
      }
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  };

  const addImage = useCallback(() => {
    const url = prompt("URL gambar:");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const setLink = useCallback(() => {
    const url = prompt("URL link:");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Title */}
      <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm p-6 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
            Judul
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul postingan..."
            className="w-full text-xl font-bold text-[#1e3a5f] placeholder:text-[#cbd5e1] border-0 outline-none bg-transparent"
          />
        </div>

        <div className="pt-3 border-t border-[#f0f7ff]">
          <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
            Slug
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#94a3b8]">/news/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugManual(true);
              }}
              className="flex-1 text-sm font-mono text-[#64748b] border border-[#ddeef8] rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#06b6d4] bg-[#f8fbff]"
            />
            {slugManual && (
              <button
                type="button"
                onClick={() => {
                  setSlugManual(false);
                  setSlug(toSlug(title));
                }}
                className="text-xs text-[#06b6d4] hover:text-[#0891b2]"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-[#f0f7ff] flex flex-wrap items-center gap-1">
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleBold().run()}
            active={editor?.isActive("bold")}
            title="Bold"
          >
            <strong>B</strong>
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            active={editor?.isActive("italic")}
            title="Italic"
          >
            <em>I</em>
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleStrike().run()}
            active={editor?.isActive("strike")}
            title="Strikethrough"
          >
            <s>S</s>
          </ToolbarBtn>
          <div className="w-px h-5 bg-[#ddeef8] mx-1" />
          <ToolbarBtn
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor?.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            H2
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor?.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            H3
          </ToolbarBtn>
          <div className="w-px h-5 bg-[#ddeef8] mx-1" />
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            active={editor?.isActive("bulletList")}
            title="Bullet list"
          >
            • List
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            active={editor?.isActive("orderedList")}
            title="Ordered list"
          >
            1. List
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            active={editor?.isActive("blockquote")}
            title="Blockquote"
          >
            "
          </ToolbarBtn>
          <div className="w-px h-5 bg-[#ddeef8] mx-1" />
          <ToolbarBtn
            onClick={setLink}
            active={editor?.isActive("link")}
            title="Link"
          >
            🔗
          </ToolbarBtn>
          <ToolbarBtn onClick={addImage} title="Gambar">
            🖼️
          </ToolbarBtn>
          <div className="w-px h-5 bg-[#ddeef8] mx-1" />
          <ToolbarBtn
            onClick={() => editor?.chain().focus().undo().run()}
            title="Undo"
          >
            ↩
          </ToolbarBtn>
          <ToolbarBtn
            onClick={() => editor?.chain().focus().redo().run()}
            title="Redo"
          >
            ↪
          </ToolbarBtn>
        </div>
        <EditorContent editor={editor} />
      </div>

      {/* Thumbnail + Settings */}
      <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-2">
            URL Thumbnail
          </label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://..."
            className="w-full text-sm border border-[#ddeef8] rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#06b6d4] text-[#1e3a5f] placeholder:text-[#cbd5e1]"
          />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="preview"
              className="mt-3 h-32 w-full object-cover rounded-xl border border-[#ddeef8]"
            />
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#f0f7ff]">
          <div>
            <p className="text-sm font-semibold text-[#1e3a5f]">Publikasikan</p>
            <p className="text-xs text-[#94a3b8]">
              Postingan akan tampil di halaman berita
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPublished(!published)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
              published ? "bg-[#06b6d4]" : "bg-[#cbd5e1]"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                published ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pb-8">
        <div>
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
            >
              {deleting ? "Menghapus..." : "Hapus Postingan"}
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={saving}
            className="px-5 py-2.5 text-sm font-semibold text-[#64748b] border border-[#ddeef8] rounded-xl hover:bg-[#f8fbff] transition-colors disabled:opacity-50"
          >
            Simpan Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={saving}
            className="px-5 py-2.5 text-sm font-semibold bg-[#1e3a5f] text-white rounded-xl hover:bg-[#16304f] transition-colors disabled:opacity-50"
          >
            {saving ? "Menyimpan..." : published ? "Publikasikan" : "Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

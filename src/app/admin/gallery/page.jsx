import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";
import GalleryUploader from "@/components/Admin/GalleryUploader";
import GalleryGrid from "@/components/Admin/GalleryGrid";
import LogoutButton from "@/components/Admin/LogoutButton";

export const metadata = { title: "Galeri — SchoolCMS Admin" };

export default async function AdminGalleryPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#1e3a5f] flex flex-col z-30 hidden lg:flex">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#06b6d4] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
              S
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">
                SchoolCMS
              </p>
              <p className="text-blue-300 text-xs">Panel Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {[
            { label: "Dashboard", href: "/admin", icon: "⊞" },
            { label: "Postingan", href: "/admin/posts", icon: "✏️" },
            { label: "Guru & Staf", href: "/admin/teachers", icon: "👥" },
            { label: "Acara", href: "/admin/events", icon: "📅" },
            {
              label: "Galeri",
              href: "/admin/gallery",
              icon: "🖼️",
              active: true,
            },
            { label: "Pengaturan", href: "/admin/settings", icon: "⚙️" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                item.active
                  ? "bg-[#06b6d4] text-white"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base w-5 text-center">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-5 border-t border-white/10">
          <div className="flex items-center justify-between gap-3 px-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#06b6d4]/30 flex items-center justify-center text-blue-200 text-xs font-bold flex-shrink-0">
                {session.user.name?.charAt(0).toUpperCase() ?? "AD"}
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs font-semibold truncate">
                  {session.user.name || "Administrator"}
                </p>
                <p className="text-blue-400 text-xs truncate">
                  {session.user.email}
                </p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1e3a5f]">Galeri</h1>
              <p className="text-sm text-[#64748b] mt-1">
                {images.length} foto tersimpan
              </p>
            </div>
          </div>

          {/* Upload card */}
          <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm p-6">
            <h2 className="text-xs font-semibold text-[#64748b] uppercase tracking-wider mb-4">
              Unggah Foto Baru
            </h2>
            <GalleryUploader />
          </div>

          {/* Preview Card */}
          <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm p-6">
            {images.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-[#94a3b8] text-sm">
                  Belum ada foto di galeri.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <GalleryGrid initialImages={images} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

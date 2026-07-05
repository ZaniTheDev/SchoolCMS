import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";
import LogoutButton from "@/components/Admin/LogoutButton";

function formatDate(date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const metadata = { title: "Postingan — SchoolCMS Admin" };

export default async function AdminPostsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { User: { select: { name: true } } },
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
            {
              label: "Postingan",
              href: "/admin/posts",
              icon: "✏️",
              active: true,
            },
            { label: "Guru & Staf", href: "/admin/teachers", icon: "👥" },
            { label: "Acara", href: "/admin/events", icon: "📅" },
            { label: "Galeri", href: "/admin/gallery", icon: "🖼️" },
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
              <h1 className="text-2xl font-bold text-[#1e3a5f]">Postingan</h1>
              <p className="text-sm text-[#64748b] mt-1">
                {posts.length} postingan ditemukan
              </p>
            </div>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 bg-[#1e3a5f] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#16304f] transition-colors"
            >
              <span>✏️</span> Buat Postingan
            </Link>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-[#ddeef8] shadow-sm overflow-hidden">
            {posts.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <p className="text-[#94a3b8] text-sm">Belum ada postingan.</p>
                <Link
                  href="/admin/posts/new"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#06b6d4] hover:text-[#0891b2]"
                >
                  Buat postingan pertama →
                </Link>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#f0f7ff]">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider">
                      Judul
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider hidden md:table-cell">
                      Penulis
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider hidden md:table-cell">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-[#64748b] uppercase tracking-wider hidden lg:table-cell">
                      Tanggal
                    </th>
                    <th className="px-6 py-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f7ff]">
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-[#f8fbff] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#1e3a5f] line-clamp-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-[#94a3b8] mt-0.5 font-mono">
                          {post.slug}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-[#64748b] hidden md:table-cell">
                        {post.User?.name ?? "-"}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {post.publishedAt ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#d1fae5] text-[#065f46]">
                            Dipublikasi
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#f1f5f9] text-[#64748b]">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-[#94a3b8] text-xs hidden lg:table-cell">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 justify-end">
                          <Link
                            href={`/news/${post.slug}`}
                            target="_blank"
                            className="text-xs text-[#94a3b8] hover:text-[#64748b] transition-colors"
                          >
                            Lihat
                          </Link>
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="text-xs font-semibold text-[#06b6d4] hover:text-[#0891b2] transition-colors"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

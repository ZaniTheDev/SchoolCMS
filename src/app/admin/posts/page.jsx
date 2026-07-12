import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "../../../../lib/prisma";
import LogoutButton from "@/components/Admin/LogoutButton";
import AdminSidebar from "@/components/Admin/AdminSidebar";

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
    <>
      <AdminSidebar />
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
    </>
  );
}

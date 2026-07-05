import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "lib/prisma";
import Link from "next/link";
import LogoutButton from "@/components/Admin/LogoutButton";

export const metadata = { title: "Guru & Staf — SchoolCMS Admin" };

export default async function TeachersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  const teachers = await prisma.teacher.findMany({
    orderBy: { createdAt: "asc" },
  });

  async function deleteTeacher(formData) {
    "use server";
    const id = formData.get("id");
    await prisma.teacher.delete({ where: { id } });
    revalidatePath("/admin/teachers");
  }

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
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
            {
              label: "Guru & Staf",
              href: "/admin/teachers",
              icon: "👥",
              active: true,
            },
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
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors"
              >
                ← Dashboard
              </Link>
              <span className="text-[#cbd5e1]">/</span>
              <h1 className="text-sm font-semibold text-[#1e3a5f]">
                Guru & Staf
              </h1>
            </div>
            <Link
              href="/admin/teachers/new"
              className="text-sm font-medium text-white bg-[#06b6d4] hover:bg-[#0891b2] px-4 py-2 rounded-xl transition-colors"
            >
              + Tambah Guru
            </Link>
          </div>

          {teachers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#ddeef8] p-12 text-center">
              <p className="text-[#94a3b8] text-sm">Belum ada data guru.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[#ddeef8] overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#ddeef8] bg-[#f8fbff]">
                    <th className="text-left px-6 py-3 font-semibold text-[#1e3a5f]">
                      Nama
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-[#1e3a5f]">
                      Jabatan
                    </th>
                    <th className="text-right px-6 py-3 font-semibold text-[#1e3a5f]">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher) => (
                    <tr
                      key={teacher.id}
                      className="border-b border-[#ddeef8] last:border-b-0 hover:bg-[#f8fbff] transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-[#1e3a5f]">
                        {teacher.name}
                      </td>
                      <td className="px-6 py-4 text-[#64748b]">
                        {teacher.position}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/teachers/${teacher.id}/edit`}
                            className="text-xs font-medium text-[#06b6d4] hover:text-[#0891b2] px-3 py-1.5 rounded-lg hover:bg-[#f0f7ff] transition-colors"
                          >
                            Edit
                          </Link>
                          <form action={deleteTeacher}>
                            <input type="hidden" name="id" value={teacher.id} />
                            <button
                              type="submit"
                              className="text-xs font-medium text-red-500 hover:text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              Hapus
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

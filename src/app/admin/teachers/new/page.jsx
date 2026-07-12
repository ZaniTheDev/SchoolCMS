import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import TeacherForm from "@/components/Admin/TeacherForm";
import Link from "next/link";
import LogoutButton from "@/components/Admin/LogoutButton";
import AdminSidebar from "@/components/Admin/AdminSidebar";
export const metadata = { title: "Tambah Guru — SchoolCMS Admin" };

export default async function NewTeacherPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  return (
    <div className="min-h-screen bg-[#f0f7ff]">
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/teachers"
              className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors"
            >
              ← Guru & Staf
            </Link>
            <span className="text-[#cbd5e1]">/</span>
            <h1 className="text-sm font-semibold text-[#1e3a5f]">
              Tambah Guru
            </h1>
          </div>
          <TeacherForm />
        </div>
      </main>
    </div>
  );
}

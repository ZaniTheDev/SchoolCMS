import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import PostForm from "@/components/Admin/PostForm";
import Link from "next/link";
import LogoutButton from "@/components/Admin/LogoutButton";
import AdminSidebar from "@/components/Admin/AdminSidebar";

export const metadata = { title: "Buat Postingan — SchoolCMS Admin" };

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");

  return <PostFormLayout session={session} />;
}

function PostFormLayout({ session }) {
  return (
    <>
      <AdminSidebar />
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/posts"
              className="text-sm text-[#64748b] hover:text-[#1e3a5f] transition-colors"
            >
              ← Postingan
            </Link>
            <span className="text-[#cbd5e1]">/</span>
            <h1 className="text-sm font-semibold text-[#1e3a5f]">
              Buat Postingan Baru
            </h1>
          </div>
          <PostForm />
        </div>
      </main>
    </>
  );
}

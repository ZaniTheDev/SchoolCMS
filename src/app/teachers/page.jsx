import prisma from "lib/prisma";
import Navbar from "@/components/public/Navbar";
import TeacherCard from "@/components/public/TeacherCard";

export const metadata = { title: "Guru & Staf" };

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8fbff]">
        {/* Header */}
        <section className="bg-white border-b border-[#ddeef8] py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-semibold text-[#06b6d4] uppercase tracking-widest mb-2">
              Tim Pengajar
            </p>
            <h1 className="text-3xl font-bold text-[#1e3a5f]">
              Guru &amp; Staf
            </h1>
            <p className="text-[#64748b] mt-2 text-sm">
              Kenali para pendidik berdedikasi di sekolah kami.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          {teachers.length === 0 ? (
            <p className="text-center text-[#94a3b8] text-sm py-20">
              Belum ada data guru.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

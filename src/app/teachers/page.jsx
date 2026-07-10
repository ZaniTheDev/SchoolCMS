import prisma from "lib/prisma";
import Navbar from "@/components/public/Navbar";
import TeacherCard from "@/components/public/TeacherCard";
import ProfilePic from "../../../public/images/GemaBangsa.png";

export const metadata = { title: "Guru & Staf" };

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <Navbar schoolName="SMK Gema Bangsa" logoUrl={ProfilePic} />

      <main className="min-h-screen bg-[#f8fbff]">
        {/* Header */}
        <section className="relative overflow-hidden bg-white border-b border-[#ddeef8]">
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 right-[-5%] h-64 w-64 rounded-full bg-[#06b6d4]/5 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-[-8%] h-56 w-56 rounded-full bg-[#1e3a5f]/[0.03] blur-3xl"
          />

          {/* Subtle dot pattern */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#ddeef8_0.5px,transparent_0)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_60%_at_80%_0%,black_30%,transparent_100%)]"
          />

          <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-14">
            {/* Badge */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#06b6d4]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06b6d4] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#06b6d4]" />
              </span>
              Tim Pengajar
            </span>

            {/* Heading */}
            <div className="mt-7 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1e3a5f] leading-[1.1]">
                Guru{" "}
                <span className="relative inline-block">
                  &amp; Staf
                  <svg
                    aria-hidden
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 180 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5C42 2 138 2 179 5.5"
                      stroke="#06b6d4"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.35"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-[#64748b] mt-5 text-base md:text-lg leading-relaxed">
                Kenali para pendidik berdedikasi di sekolah kami.
              </p>
            </div>

            {/* Stats */}
            {teachers.length > 0 && (
              <div className="mt-10 flex items-center gap-6">
                <div className="flex items-center gap-3 rounded-xl border border-[#ddeef8] bg-white px-4 py-2.5 shadow-sm">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#06b6d4]/[0.08]">
                    <svg
                      className="h-[18px] w-[18px] text-[#06b6d4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1e3a5f] tabular-nums">
                      {teachers.length}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-[#94a3b8]">
                      Guru & Staf
                    </p>
                  </div>
                </div>

                <div className="h-8 w-px bg-[#ddeef8]" />

                <div className="hidden sm:flex items-center gap-2 text-sm text-[#94a3b8]">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                    />
                  </svg>
                  <span>Diurutkan berdasarkan keanggotaan</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#06b6d4]/20 to-transparent" />
        </section>

        {/* Grid */}
        <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          {teachers.length === 0 ? (
            <div className="relative rounded-2xl border-2 border-dashed border-[#ddeef8] bg-gradient-to-b from-white/80 to-[#f8fbff] py-24 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#06b6d4]/[0.06] ring-1 ring-[#06b6d4]/10">
                <svg
                  className="h-7 w-7 text-[#94a3b8]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <p className="text-base font-medium text-[#64748b]">
                Belum ada data guru.
              </p>
              <p className="mt-1.5 text-sm text-[#94a3b8]">
                Informasi guru & staf akan tampil di sini.
              </p>
            </div>
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

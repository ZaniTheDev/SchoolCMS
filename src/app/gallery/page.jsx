import prisma from "lib/prisma";
import Gallery from "../../components/public/Gallery";
import Navbar from "@/components/public/Navbar";
import ProfilePic from "../../../public/images/GemaBangsa.png";

export const metadata = {
  title: "Galeri Sekolah",
  description: "Dokumentasi kegiatan dan momen sekolah",
};

export default async function GalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <Navbar schoolName="SMK Gema Bangsa" logoUrl={ProfilePic} />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-sky-50/60 to-white">
          {/* Decorative elements */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-sky-100/70 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-[-10%] h-72 w-72 rounded-full bg-[#1e3a5f]/5 blur-3xl"
          />
          {/* Grid pattern overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,slate-100_1px,transparent_1px),linear-gradient(to_bottom,slate-100_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]"
          />

          <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16">
            {/* Badge */}
            <span className="inline-flex items-center gap-2.5 rounded-full border border-sky-200/80 bg-white/80 shadow-sm shadow-sky-100/50 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
              </span>
              Dokumentasi Sekolah
            </span>

            {/* Heading */}
            <div className="mt-8 max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1e3a5f] leading-[1.1]">
                Galeri{" "}
                <span className="relative">
                  Sekolah
                  <svg
                    aria-hidden
                    className="absolute -bottom-1 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5.5C47 2 153 2 199 5.5"
                      stroke="#0ea5e9"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      opacity="0.4"
                    />
                  </svg>
                </span>
              </h1>
              <p className="text-slate-500 mt-5 text-base md:text-lg leading-relaxed max-w-xl">
                Dokumentasi kegiatan dan momen berharga sekolah yang terabadikan
                dalam bidikan kamera.
              </p>
            </div>

            {/* Stats bar */}
            {images.length > 0 && (
              <div className="mt-10 flex items-center gap-6">
                <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white/60 px-4 py-2.5 shadow-sm">
                  {/* Camera icon */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50">
                    <svg
                      className="h-4.5 w-4.5 text-sky-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#1e3a5f] tabular-nums">
                      {images.length}
                    </p>
                    <p className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      Foto tersimpan
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-slate-200" />

                <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
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
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <span>Diurutkan dari terbaru</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom fade edge */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-200/60 to-transparent" />
        </section>

        {/* Gallery */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          {images.length === 0 ? (
            <div className="relative rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-b from-slate-50/50 to-white py-24 text-center">
              {/* Empty state icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 ring-1 ring-slate-200/60">
                <svg
                  className="h-7 w-7 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                  />
                </svg>
              </div>
              <p className="text-base font-medium text-slate-500">
                Belum ada dokumentasi yang ditambahkan.
              </p>
              <p className="mt-1.5 text-sm text-slate-400">
                Foto-foto kegiatan sekolah akan tampil di sini.
              </p>
            </div>
          ) : (
            <Gallery images={images} />
          )}
        </section>
      </main>
    </>
  );
}

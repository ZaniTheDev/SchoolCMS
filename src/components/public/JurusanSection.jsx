"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Static Data (Can be replaced with props from Prisma later) ────
const JURUSAN_DATA = [
  {
    id: "tkj",
    shortTitle: "TKJ",
    title: "Teknik Komputer dan Jaringan",
    description:
      "Menguasai infrastruktur jaringan komputer, keamanan siber dasar, hingga administrasi server berbasis Linux dan Windows.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    careers: ["Network Engineer", "IT Support", "System Administrator"],
  },
  {
    id: "rpl",
    shortTitle: "RPL",
    title: "Rekayasa Perangkat Lunak",
    description:
      "Mendalami logika pemrograman, pengembangan web & mobile apps, serta pengelolaan basis data untuk kebutuhan industri digital.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    careers: ["Web Developer", "Mobile Programmer", "Database Admin"],
  },
  {
    id: "mm",
    shortTitle: "MM",
    title: "Multimedia",
    description:
      "Mengasah kreativitas melalui desain grafis, fotografi, videografi, serta animasi 2D/3D untuk konten media modern.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
    ),
    careers: ["Graphic Designer", "Video Editor", "Content Creator"],
  },
  {
    id: "akl",
    shortTitle: "AKL",
    title: "Akuntansi dan Keuangan Lembaga",
    description:
      "Menguasai pencatatan transaksi, pengelolaan keuangan, perpajakan, serta pengoperasian software akuntansi modern.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
    careers: ["Staff Akuntansi", "Tax Consultant", "Kasir/Teller"],
  },
];

// ── Component ─────────────────────────────────────────────────────
export default function JurusanSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current?.children ?? [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="jurusan" // ID so the About section CTA can link to #jurusan
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32 bg-white"
      aria-labelledby="jurusan-heading"
    >
      {/* ── Background accents ── */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute top-20 -left-40 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #BAE6FD 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div ref={headerRef} className="max-w-2xl mb-16">
          <div className="opacity-0">
            <span
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{ backgroundColor: "#E0F0FB", color: "#0A6EBD" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#06B6D4" }}
                aria-hidden="true"
              />
              Program Keahlian
            </span>
          </div>

          <h2
            id="jurusan-heading"
            className="opacity-0 text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight tracking-tight mt-6 mb-5"
            style={{ color: "#0D2D4E" }}
          >
            Jurusan{" "}
            <span
              className="relative inline-block whitespace-nowrap"
              style={{ color: "#0A6EBD" }}
            >
              Unggulan Kami
              <span
                className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #06B6D4, transparent)",
                }}
                aria-hidden="true"
              />
            </span>
          </h2>

          <p
            className="opacity-0 text-base sm:text-lg leading-relaxed"
            style={{ color: "#4A6B8A" }}
          >
            Kurikulum yang dirancang langsung bersama industri untuk memastikan
            setiap lulusan memiliki keterampilan yang relevan dan siap kerja.
          </p>
        </div>

        {/* ── Jurusan Grid ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {JURUSAN_DATA.map((jurusan) => (
            <div
              key={jurusan.id}
              className="opacity-0 group flex flex-col rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0A6EBD]/10 hover:border-[#93C5FD]"
              style={{ borderColor: "#C7DFEF" }}
            >
              {/* Card Top: Icon & Short Title */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300 group-hover:bg-[#0A6EBD] group-hover:text-white"
                    style={{ backgroundColor: "#E0F0FB", color: "#0A6EBD" }}
                  >
                    {jurusan.icon}
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-md border"
                    style={{
                      color: "#0A6EBD",
                      borderColor: "#C7DFEF",
                      backgroundColor: "#F0F7FF",
                    }}
                  >
                    {jurusan.shortTitle}
                  </span>
                </div>

                {/* Title & Description */}
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: "#0D2D4E" }}
                >
                  {jurusan.title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#4A6B8A" }}
                >
                  {jurusan.description}
                </p>
              </div>

              {/* Card Bottom: Careers & CTA */}
              <div
                className="mt-auto p-6 pt-4 border-t"
                style={{ borderColor: "#F0F7FF" }}
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mb-2.5"
                  style={{ color: "#94a3b8" }}
                >
                  Prospek Karir
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {jurusan.careers.map((career) => (
                    <span
                      key={career}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md border"
                      style={{
                        color: "#4A6B8A",
                        borderColor: "#C7DFEF",
                        backgroundColor: "#fff",
                      }}
                    >
                      {career}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/jurusan/${jurusan.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 group-hover:gap-2.5"
                  style={{ color: "#0A6EBD" }}
                >
                  Pelajari Lebih Lanjut
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Static content ────────────────────────────────────────────────
const STATS = [
  { value: "25+", label: "Tahun Berdiri" },
  { value: "1.800", label: "Siswa Aktif" },
  { value: "120", label: "Guru Tersertifikasi" },
  { value: "15+", label: "Mitra Industri" }, // ★ SMK specific stat
];

const VALUES = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Relevansi Industri",
    description:
      "Kurikulum yang dirancang bersama dunia usaha dan industri untuk memastikan keterampilan siswa selalu mutakhir.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
      </svg>
    ),
    title: "Keterampilan Praktis",
    description:
      "Pembelajaran berbasis praktek di laboratorium modern dan langsung terjun ke lapangan industri.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Integritas",
    description:
      "Membangun karakter jujur, bertanggung jawab, dan beretika sebagai fondasi kehidupan dan bekerja.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>
    ),
    title: "Kesiapan Kerja",
    description:
      "Program magang dan penyaluran kerja yang terstruktur untuk memastikan lulusan terserap industri.",
  },
];

// ── Component ─────────────────────────────────────────────────────
export default function AboutSection({
  videoUrl,
  principalName = "Drs. Bambang Supriyadi, M.Pd.",
  principalPhoto = null,
  principalQuote = "Pendidikan kejuruan bukan sekadar transfer ilmu, tapi membentuk karakter dan keterampilan yang siap menghadapi tantangan dunia nyata.",
  visi = "Mewujudkan lembaga pendidikan kejuruan yang unggul, menghasilkan lulusan kompeten, berkarakter, dan siap bersaing di tingkat nasional maupun global.",
  misi = [
    "Menyelenggarakan pendidikan berbasis kompetensi dan praktik industri.",
    "Membangun karakter peserta didik yang berakhlak mulia, bertanggung jawab, dan berwawasan lingkungan.",
    "Menjalin kemitraan strategis dengan dunia usaha dan dunia industri (DUDI) untuk penyerapan lulusan.",
  ],
}) {
  const sectionRef = useRef(null);

  const introRef = useRef(null);
  const principalRef = useRef(null); // ★ New ref for principal
  const visiMisiRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const videoRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Intro Text
      gsap.fromTo(
        introRef.current?.children ?? [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // ★ 2. Principal Section (Staggered slide-in)
      gsap.fromTo(
        principalRef.current?.children ?? [],
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: principalRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // 3. Visi & Misi Cards
      gsap.fromTo(
        visiMisiRef.current?.children ?? [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: visiMisiRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // 4. Full-width Stats
      gsap.fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.5)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );

      // 5. Values Grid
      gsap.fromTo(
        valuesRef.current?.children ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // 6. Video Card
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // 7. Bottom CTA
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: "#F0F7FF" }}
      aria-labelledby="about-heading"
    >
      {/* ── Background accents ── */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C7DFEF, transparent)",
          }}
        />
        <div
          className="absolute -bottom-40 right-0 w-[480px] h-[480px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* ════ BLOCK 1: Intro & Principal ════ */}
        <div className="max-w-3xl">
          <div ref={introRef} className="flex flex-col gap-6 mb-10">
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
                Tentang Sekolah Kami
              </span>
            </div>

            <h2
              id="about-heading"
              className="opacity-0 text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight tracking-tight"
              style={{ color: "#0D2D4E" }}
            >
              Mendidik Generasi{" "}
              <span
                className="relative inline-block whitespace-nowrap"
                style={{ color: "#0A6EBD" }}
              >
                Pemimpin Masa Depan
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
              Sejak berdiri, sekolah kami telah menjadi rumah bagi ribuan siswa
              yang tumbuh menjadi individu berkarakter, berprestasi, dan siap
              bersaing secara global. Kami percaya bahwa pendidikan yang baik
              bukan hanya soal nilai — tetapi tentang membentuk manusia
              seutuhnya.
            </p>
          </div>

          {/* ★ Kepala Sekolah Section */}
          <div
            ref={principalRef}
            className="flex flex-col sm:flex-row items-start gap-5 p-6 rounded-2xl border bg-white mb-10"
            style={{ borderColor: "#C7DFEF" }}
          >
            <div className="opacity-0 flex-shrink-0">
              {principalPhoto ? (
                <Image
                  src={principalPhoto}
                  alt={`Foto ${principalName}`}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border-2 shadow-sm"
                  style={{ borderColor: "#C7DFEF" }}
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BAE6FD] to-[#93C5FD] border-2 flex items-center justify-center shadow-sm"
                  style={{ borderColor: "#C7DFEF" }}
                >
                  <svg
                    className="w-7 h-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="opacity-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                <h3
                  className="text-base font-bold"
                  style={{ color: "#0D2D4E" }}
                >
                  {principalName}
                </h3>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ backgroundColor: "#E0F0FB", color: "#0A6EBD" }}
                >
                  Kepala Sekolah
                </span>
              </div>
              <blockquote
                className="text-sm leading-relaxed italic pl-4 border-l-2"
                style={{ color: "#4A6B8A", borderColor: "#06B6D4" }}
              >
                &ldquo;{principalQuote}&rdquo;
              </blockquote>
            </div>
          </div>

          {/* Visi & Misi Cards */}
          <div
            ref={visiMisiRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            <div
              className="opacity-0 p-6 rounded-2xl border bg-white"
              style={{ borderColor: "#C7DFEF" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ backgroundColor: "#0A6EBD", color: "#fff" }}
                >
                  V
                </div>
                <h3 className="text-lg font-bold" style={{ color: "#0D2D4E" }}>
                  Visi
                </h3>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#4A6B8A" }}
              >
                {visi}
              </p>
            </div>
            <div
              className="opacity-0 p-6 rounded-2xl border bg-white"
              style={{ borderColor: "#C7DFEF" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
                  style={{ backgroundColor: "#06B6D4", color: "#fff" }}
                >
                  M
                </div>
                <h3 className="text-lg font-bold" style={{ color: "#0D2D4E" }}>
                  Misi
                </h3>
              </div>
              {/* ★ Formatted as a list */}
              <ol
                className="space-y-2 text-sm leading-relaxed"
                style={{ color: "#4A6B8A" }}
              >
                {misi.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold text-[#0A6EBD] flex-shrink-0">
                      {i + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* ════ BLOCK 2: Full-Width Stats Bar ════ */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl border bg-white shadow-sm shadow-[#0A6EBD]/5"
          style={{ borderColor: "#C7DFEF" }}
          role="list"
          aria-label="Statistik sekolah"
        >
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              role="listitem"
              className="opacity-0 flex flex-col items-center text-center gap-1 p-4 rounded-xl border border-dashed"
              style={{ borderColor: "#C7DFEF" }}
            >
              <span
                className="text-3xl sm:text-4xl font-extrabold tabular-nums"
                style={{ color: "#0A6EBD" }}
              >
                {value}
              </span>
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "#4A6B8A" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ════ BLOCK 3: Values & Video ════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Values */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#4A6B8A" }}
            >
              Nilai Inti Kami
            </p>
            <div
              ref={valuesRef}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              role="list"
              aria-label="Nilai inti sekolah"
            >
              {VALUES.map(({ icon, title, description }) => (
                <div
                  key={title}
                  role="listitem"
                  className="opacity-0 group flex gap-4 p-4 rounded-xl border bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93C5FD] hover:shadow-lg hover:shadow-[#0A6EBD]/5"
                  style={{ borderColor: "#C7DFEF" }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: "#E0F0FB", color: "#0A6EBD" }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "#0D2D4E" }}
                    >
                      {title}
                    </span>
                    <span
                      className="text-xs leading-relaxed"
                      style={{ color: "#4A6B8A" }}
                    >
                      {description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky Video Card */}
          {/* ★ Added mb-16 to prevent sticky overlap with CTA */}
          <div className="flex items-start justify-center lg:sticky lg:top-24 mb-16">
            <div ref={videoRef} className="opacity-0 relative w-full max-w-lg">
              <div
                className="absolute -inset-3 rounded-2xl opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, #BAE6FD 0%, #06B6D4 100%)",
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              <div
                className="relative z-10 rounded-2xl overflow-hidden shadow-xl border"
                style={{ borderColor: "#C7DFEF", backgroundColor: "#0D2D4E" }}
              >
                {videoUrl ? (
                  <div className="aspect-video">
                    <iframe
                      src={videoUrl}
                      title="Video profil sekolah"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video flex flex-col items-center justify-center gap-4 px-8">
                    <div className="relative flex items-center justify-center">
                      <div
                        className="absolute w-20 h-20 rounded-full animate-ping opacity-20"
                        style={{ backgroundColor: "#06B6D4" }}
                        aria-hidden="true"
                      />
                      <div
                        className="relative w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "#0A6EBD" }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 translate-x-0.5 text-white"
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <span
                      className="text-sm font-medium text-center"
                      style={{ color: "#BAE6FD" }}
                    >
                      Video Profil Sekolah
                    </span>
                  </div>
                )}

                <div
                  className="flex items-center gap-3 px-5 py-3 border-t"
                  style={{
                    borderColor: "rgba(199,223,239,0.2)",
                    backgroundColor: "rgba(13,45,78,0.6)",
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#06B6D4" }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#BAE6FD" }}
                  >
                    Profil &amp; Keunggulan Sekolah
                  </span>
                  <span
                    className="ml-auto text-xs"
                    style={{ color: "#4A6B8A" }}
                  >
                    HD Quality
                  </span>
                </div>
              </div>

              <div
                className="absolute -bottom-5 -left-5 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-lg bg-white"
                style={{ borderColor: "#C7DFEF" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#E0F0FB" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0A6EBD"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-xs font-bold"
                    style={{ color: "#0D2D4E" }}
                  >
                    Akreditasi A
                  </span>
                  <span className="text-[10px]" style={{ color: "#4A6B8A" }}>
                    BAN-PT 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════ BLOCK 4: Call to Action ════ */}
        <div
          ref={ctaRef}
          className="opacity-0 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl border bg-white shadow-sm"
          style={{ borderColor: "#C7DFEF" }}
        >
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold mb-1" style={{ color: "#0D2D4E" }}>
              Tertarik bergabung bersama kami?
            </h3>
            <p className="text-sm" style={{ color: "#4A6B8A" }}>
              Jelajahi program keahlian dan proses pendaftaran siswa baru.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {/* ★ Fixed CTA to match the text */}
            <Link
              href="/jurusan"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0A6EBD]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A6EBD]"
              style={{ backgroundColor: "#0A6EBD" }}
            >
              Lihat Jurusan
              <svg
                className="w-4 h-4"
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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-2 border-[#C7DFEF] text-[#0D2D4E] bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-[#E0F0FB] hover:border-[#0A6EBD]/40 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A6EBD]"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

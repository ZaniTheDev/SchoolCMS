"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Static content ────────────────────────────────────────────────
const STATS = [
  { value: "25+", label: "Tahun Berdiri" },
  { value: "1.800", label: "Siswa Aktif" },
  { value: "120", label: "Guru Tersertifikasi" },
  { value: "98%", label: "Tingkat Kelulusan" },
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
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "Keunggulan",
    description:
      "Mendorong setiap siswa melampaui batas potensi diri melalui standar akademik tertinggi.",
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
        <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Inovasi",
    description:
      "Menerapkan metode pembelajaran mutakhir yang relevan dengan tantangan era digital.",
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
      "Membangun karakter jujur, bertanggung jawab, dan beretika sebagai fondasi kehidupan.",
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
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Komunitas",
    description:
      "Mempererat hubungan antara sekolah, keluarga, dan masyarakat dalam satu ekosistem pendidikan.",
  },
];

// ── Component ─────────────────────────────────────────────────────
export default function AboutSection({ videoUrl }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const shared = {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      };

      // Left column — stagger the children
      gsap.fromTo(
        [badgeRef.current, headingRef.current, descRef.current],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          ...shared,
        },
      );

      // Stats row
      gsap.fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
          ...shared,
        },
      );

      // Value cards
      gsap.fromTo(
        valuesRef.current?.children ?? [],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.5,
          ...shared,
        },
      );

      // Video card
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, scale: 0.96, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: videoRef.current,
            start: "top 80%",
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
      {/* ── Subtle background accents ── */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* ════ LEFT — Text content ════ */}
          <div className="flex flex-col gap-10">
            {/* Badge */}
            <div ref={badgeRef} className="opacity-0">
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

            {/* Heading + description */}
            <div className="flex flex-col gap-5">
              <h2
                id="about-heading"
                ref={headingRef}
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
                      background:
                        "linear-gradient(90deg, #06B6D4, transparent)",
                    }}
                    aria-hidden="true"
                  />
                </span>
              </h2>
              <p
                ref={descRef}
                className="opacity-0 text-base sm:text-lg leading-relaxed max-w-prose"
                style={{ color: "#4A6B8A" }}
              >
                Sejak berdiri, sekolah kami telah menjadi rumah bagi ribuan
                siswa yang tumbuh menjadi individu berkarakter, berprestasi, dan
                siap bersaing secara global. Kami percaya bahwa pendidikan yang
                baik bukan hanya soal nilai — tetapi tentang membentuk manusia
                seutuhnya.
              </p>
            </div>

            {/* ── Stats ── */}
            <div
              ref={statsRef}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4"
              role="list"
              aria-label="Statistik sekolah"
            >
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  role="listitem"
                  className="opacity-0 flex flex-col gap-1 p-4 rounded-xl border"
                  style={{ backgroundColor: "#fff", borderColor: "#C7DFEF" }}
                >
                  <span
                    className="text-2xl font-bold tabular-nums"
                    style={{ color: "#0A6EBD" }}
                  >
                    {value}
                  </span>
                  <span
                    className="text-xs leading-snug"
                    style={{ color: "#4A6B8A" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Core values grid ── */}
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#4A6B8A" }}
              >
                Nilai Inti
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
                    className="opacity-0 group flex gap-4 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: "#fff",
                      borderColor: "#C7DFEF",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#93C5FD";
                      e.currentTarget.style.boxShadow =
                        "0 4px 16px 0 rgba(10,110,189,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#C7DFEF";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Icon bubble */}
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
          </div>

          {/* ════ RIGHT — Video card ════ */}
          <div className="flex items-start justify-center lg:sticky lg:top-24">
            <div ref={videoRef} className="opacity-0 relative w-full max-w-lg">
              {/* Decorative offset frame */}
              <div
                className="absolute -inset-3 rounded-2xl opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, #BAE6FD 0%, #06B6D4 100%)",
                  zIndex: 0,
                }}
                aria-hidden="true"
              />

              {/* Video card */}
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
                  /* Placeholder when no video is provided */
                  <div className="aspect-video flex flex-col items-center justify-center gap-4 px-8">
                    {/* Play button ring */}
                    <div className="relative flex items-center justify-center">
                      <div
                        className="absolute w-20 h-20 rounded-full animate-ping opacity-20"
                        style={{ backgroundColor: "#06B6D4" }}
                        aria-hidden="true"
                      />
                      <button
                        type="button"
                        className="relative w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{
                          backgroundColor: "#0A6EBD",
                          outlineColor: "#06B6D4",
                        }}
                        aria-label="Putar video profil sekolah"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6 translate-x-0.5"
                          style={{ color: "#fff" }}
                          aria-hidden="true"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                    <span
                      className="text-sm font-medium text-center"
                      style={{ color: "#BAE6FD" }}
                    >
                      Video Profil Sekolah
                    </span>
                  </div>
                )}

                {/* Bottom info bar */}
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

              {/* Small floating accent card */}
              <div
                className="absolute -bottom-5 -left-5 z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border shadow-lg"
                style={{
                  backgroundColor: "#fff",
                  borderColor: "#C7DFEF",
                }}
                aria-hidden="true"
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
      </div>
    </section>
  );
}

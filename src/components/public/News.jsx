"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Static placeholder data ───────────────────────────────────────
const FEATURED = {
  slug: "prestasi-olimpiade-nasional-2024",
  category: "Prestasi Siswa",
  date: "10 Juni 2024",
  title: "Siswa Kami Raih Medali Emas di Olimpiade Sains Nasional 2024",
  excerpt:
    "Tiga siswa terbaik kami berhasil membawa pulang medali emas dari ajang Olimpiade Sains Nasional yang diselenggarakan di Jakarta. Pencapaian luar biasa ini merupakan hasil dari kerja keras, dedikasi, dan bimbingan intensif selama satu tahun penuh.",
  imageUrl: null,
};

const NEWS = [
  {
    slug: "penerimaan-siswa-baru-2025",
    category: "Pengumuman",
    date: "8 Juni 2024",
    title: "Penerimaan Siswa Baru Tahun Ajaran 2025/2026 Resmi Dibuka",
    excerpt:
      "Pendaftaran dapat dilakukan secara online melalui portal resmi sekolah mulai 1 Juli 2024.",
    imageUrl: null,
  },
  {
    slug: "program-beasiswa-unggulan",
    category: "Akademik",
    date: "5 Juni 2024",
    title: "Program Beasiswa Unggulan untuk Siswa Berprestasi Dibuka Kembali",
    excerpt:
      "Kami membuka kembali program beasiswa penuh bagi siswa dengan prestasi akademik dan non-akademik terbaik.",
    imageUrl: null,
  },
  {
    slug: "pekan-olahraga-sekolah-2024",
    category: "Olahraga",
    date: "2 Juni 2024",
    title: "Pekan Olahraga Sekolah 2024 Resmi Dibuka dengan Meriah",
    excerpt:
      "Lebih dari 800 siswa berpartisipasi dalam berbagai cabang olahraga selama lima hari penyelenggaraan.",
    imageUrl: null,
  },
  {
    slug: "kerjasama-universitas-luar-negeri",
    category: "Komunitas",
    date: "28 Mei 2024",
    title: "Sekolah Jalin Kerjasama dengan Tiga Universitas di Eropa",
    excerpt:
      "Perjanjian kerjasama ini membuka peluang beasiswa dan pertukaran pelajar bagi siswa terbaik kami.",
    imageUrl: null,
  },
  {
    slug: "workshop-coding-ai",
    category: "Akademik",
    date: "24 Mei 2024",
    title: "Workshop Coding dan AI untuk Siswa SMA Digelar Selama Dua Hari",
    excerpt:
      "Ratusan siswa mendapatkan pengalaman langsung pemrograman dan kecerdasan buatan bersama mentor industri.",
    imageUrl: null,
  },
  {
    slug: "festival-seni-budaya-2024",
    category: "Kegiatan",
    date: "20 Mei 2024",
    title: "Festival Seni dan Budaya Sekolah Tampilkan 40 Pertunjukan Siswa",
    excerpt:
      "Dari tari tradisional hingga band modern, festival tahun ini menjadi yang terbesar dalam sejarah sekolah.",
    imageUrl: null,
  },
];

const CATEGORY_COLORS = {
  "Prestasi Siswa": { bg: "#DBEAFE", text: "#1D4ED8" },
  Pengumuman: { bg: "#FEF9C3", text: "#854D0E" },
  Akademik: { bg: "#D1FAE5", text: "#065F46" },
  Olahraga: { bg: "#FCE7F3", text: "#9D174D" },
  Komunitas: { bg: "#EDE9FE", text: "#5B21B6" },
  Kegiatan: { bg: "#FFEDD5", text: "#C2410C" },
};

const DEFAULT_CATEGORY_STYLE = { bg: "#E0F0FB", text: "#0A6EBD" };

// ── Sub-components ────────────────────────────────────────────────
function CategoryBadge({ category, size = "sm" }) {
  const style = CATEGORY_COLORS[category] ?? DEFAULT_CATEGORY_STYLE;
  return (
    <span
      className={`inline-block font-semibold rounded-full ${
        size === "sm" ? "text-[10px] px-2.5 py-0.5" : "text-xs px-3 py-1"
      }`}
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {category}
    </span>
  );
}

function DateLabel({ date }) {
  return (
    <span
      className="flex items-center gap-1.5 text-xs"
      style={{ color: "#4A6B8A" }}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        className="w-3.5 h-3.5 flex-shrink-0"
        aria-hidden="true"
      >
        <rect x="1" y="3" width="14" height="12" rx="2" />
        <path d="M1 7h14M5 1v4M11 1v4" strokeLinecap="round" />
      </svg>
      <time dateTime={date}>{date}</time>
    </span>
  );
}

// Image placeholder — Arctic-toned illustrated fill
function ImagePlaceholder({ featured = false }) {
  return (
    <div
      className="w-full h-full flex items-end justify-end"
      style={{
        background:
          "linear-gradient(135deg, #BAE6FD 0%, #E0F2FE 55%, #CFFAFE 100%)",
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={featured ? "w-full opacity-60" : "w-full opacity-50"}
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="320" height="200" fill="url(#imgGrad)" />
        <defs>
          <linearGradient
            id="imgGrad"
            x1="0"
            y1="0"
            x2="320"
            y2="200"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#CFFAFE" />
          </linearGradient>
        </defs>
        {/* Abstract school shapes */}
        <rect
          x="60"
          y="80"
          width="120"
          height="90"
          rx="3"
          fill="#93C5FD"
          opacity=".5"
        />
        <polygon points="50,80 120,38 190,80" fill="#60A5FA" opacity=".4" />
        <rect
          x="90"
          y="125"
          width="32"
          height="45"
          fill="#7DD3FC"
          opacity=".7"
          rx="2"
        />
        <rect
          x="232"
          y="100"
          width="60"
          height="70"
          rx="2"
          fill="#A5F3FC"
          opacity=".45"
        />
        <polygon points="225,100 262,72 302,100" fill="#67E8F9" opacity=".35" />
        <ellipse cx="30" cy="148" rx="18" ry="28" fill="#BAE6FD" opacity=".5" />
        <ellipse
          cx="295"
          cy="155"
          rx="14"
          ry="22"
          fill="#BAE6FD"
          opacity=".5"
        />
      </svg>
    </div>
  );
}

function FeaturedCard({ article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group block rounded-2xl overflow-hidden border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderColor: "#C7DFEF",
        outlineColor: "#0A6EBD",
        backgroundColor: "#fff",
      }}
      aria-label={`Baca berita: ${article.title}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Image */}
        <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-72 overflow-hidden">
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ImagePlaceholder featured />
          )}
          {/* Gradient overlay bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(13,45,78,0.25) 0%, transparent 50%)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-between p-7 lg:p-9">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={article.category} size="md" />
              <DateLabel date={article.date} />
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold leading-snug tracking-tight line-clamp-3 transition-colors duration-200 group-hover:text-blue-700"
              style={{ color: "#0D2D4E" }}
            >
              {article.title}
            </h3>
            <p
              className="text-sm leading-relaxed line-clamp-4"
              style={{ color: "#4A6B8A" }}
            >
              {article.excerpt}
            </p>
          </div>

          <div className="mt-6">
            <span
              className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 group-hover:gap-2.5"
              style={{ color: "#0A6EBD" }}
            >
              Baca Selengkapnya
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function NewsCard({ article }) {
  return (
    <Link
      href={`/news/${article.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderColor: "#C7DFEF",
        outlineColor: "#0A6EBD",
        backgroundColor: "#fff",
      }}
      aria-label={`Baca berita: ${article.title}`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden flex-shrink-0">
        {article.imageUrl ? (
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge category={article.category} />
          <DateLabel date={article.date} />
        </div>
        <h3
          className="text-sm font-bold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-blue-700"
          style={{ color: "#0D2D4E" }}
        >
          {article.title}
        </h3>
        <p
          className="text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: "#4A6B8A" }}
        >
          {article.excerpt}
        </p>
        <span
          className="inline-flex items-center gap-1 text-xs font-semibold mt-auto transition-gap duration-200 group-hover:gap-2"
          style={{ color: "#0A6EBD" }}
        >
          Baca
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M2 8a.5.5 0 01.5-.5h9.793L9.146 4.354a.5.5 0 11.708-.708l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L12.293 8.5H2.5A.5.5 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}

// ── Main section ──────────────────────────────────────────────────
export default function LatestNews({ featured, news }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const featuredRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const trigger = (el, extra = {}) => ({
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
        ...extra,
      });

      gsap.fromTo(
        [badgeRef.current, headingRef.current, descRef.current],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.1,
          ...trigger(badgeRef.current),
        },
      );

      gsap.fromTo(
        featuredRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
          ...trigger(featuredRef.current, { delay: 0.1 }),
        },
      );

      gsap.fromTo(
        gridRef.current?.children ?? [],
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          ...trigger(gridRef.current),
        },
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          ...trigger(ctaRef.current),
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ backgroundColor: "#fff" }}
      aria-labelledby="news-heading"
    >
      {/* Background accents */}
      <div className="pointer-events-none select-none" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px opacity-60"
          style={{
            background:
              "linear-gradient(90deg, transparent, #C7DFEF, transparent)",
          }}
        />
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(circle, #0A6EBD 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
        {/* ── Header ── */}
        <div className="flex flex-col items-start gap-5 max-w-2xl">
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
              Berita Sekolah
            </span>
          </div>

          <h2
            id="news-heading"
            ref={headingRef}
            className="opacity-0 text-3xl sm:text-4xl lg:text-[2.6rem] font-bold leading-tight tracking-tight"
            style={{ color: "#0D2D4E" }}
          >
            Tetap Terhubung dengan{" "}
            <span
              className="relative inline-block"
              style={{ color: "#0A6EBD" }}
            >
              Berita Terkini
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
            ref={descRef}
            className="opacity-0 text-base sm:text-lg leading-relaxed"
            style={{ color: "#4A6B8A" }}
          >
            Ikuti perkembangan terbaru seputar kegiatan akademik, prestasi
            siswa, dan pengumuman penting dari sekolah kami. Kami berkomitmen
            menjaga keterbukaan informasi untuk seluruh keluarga besar sekolah.
          </p>
        </div>

        {/* ── Featured article ── */}

        {featured && (
          <div ref={featuredRef} className="opacity-0">
            <FeaturedCard article={featured} />
          </div>
        )}

        {/* ── Divider with label ── */}
        <div className="flex items-center gap-4" aria-hidden="true">
          <div className="flex-1 h-px" style={{ backgroundColor: "#C7DFEF" }} />
          <span
            className="text-xs font-semibold uppercase tracking-widest flex-shrink-0"
            style={{ color: "#4A6B8A" }}
          >
            Berita Lainnya
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: "#C7DFEF" }} />
        </div>

        {/* ── News grid ── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Daftar berita sekolah"
        >
          {news.map((article) => (
            <div key={article.slug} role="listitem" className="opacity-0">
              <NewsCard article={article} />
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div ref={ctaRef} className="opacity-0 flex justify-center">
          <Link
            href="/news"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 group"
            style={{
              borderColor: "#0A6EBD",
              color: "#0A6EBD",
              outlineColor: "#0A6EBD",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#0A6EBD";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#0A6EBD";
            }}
          >
            Lihat Semua Berita
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

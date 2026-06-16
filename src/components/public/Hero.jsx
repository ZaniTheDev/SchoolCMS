"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function HomeHero({
  schoolName = "Nama Sekolah",
  tagline = "Membentuk Generasi Unggul dan Berkarakter",
  description = "Kami berkomitmen menghadirkan pendidikan berkualitas yang mempersiapkan setiap siswa menghadapi masa depan dengan percaya diri.",
  imageUrl,
}) {
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5 },
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.3",
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45 },
        "-=0.25",
      );

    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 0.7, ease: "power2.out" },
        "-=0.6",
      );
    }

    return () => tl.kill();
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ backgroundColor: "#F0F7FF" }}
      aria-label="Hero section"
    >
      {/* Background geometry — subtle arctic grid */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Large faint circle top-right */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, #BAE6FD 0%, transparent 70%)",
          }}
        />
        {/* Small accent circle bottom-left */}
        <div
          className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 lg:w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:py-28">
          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-center">
            {/* Eyebrow label */}
            <div ref={eyebrowRef} className="opacity-0 mb-5">
              <span
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "#E0F0FB",
                  color: "#0A6EBD",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#06B6D4" }}
                  aria-hidden="true"
                />
                {schoolName}
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="opacity-0 text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
              style={{ color: "#0D2D4E" }}
            >
              {tagline.split(" ").map((word, i, arr) => {
                // Last two words get the cyan underline treatment
                const isAccent = i >= arr.length - 2;
                return (
                  <span key={i}>
                    {isAccent ? (
                      <span
                        className="relative inline-block"
                        style={{ color: "#0A6EBD" }}
                      >
                        {word}
                        <span
                          className="absolute left-0 -bottom-1 h-0.5 w-full rounded-full"
                          style={{ backgroundColor: "#06B6D4" }}
                          aria-hidden="true"
                        />
                      </span>
                    ) : (
                      <span>{word}</span>
                    )}
                    {i < arr.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </h1>

            {/* Description */}
            <p
              ref={descRef}
              className="opacity-0 text-base sm:text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: "#4A6B8A" }}
            >
              {description}
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="opacity-0 flex flex-col sm:flex-row gap-3"
            >
              <Link
                href="/news"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  backgroundColor: "#0A6EBD",
                  focusOutlineColor: "#0A6EBD",
                }}
              >
                Jelajahi Berita
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: "#C7DFEF",
                  color: "#0D2D4E",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E0F0FB";
                  e.currentTarget.style.borderColor = "#0A6EBD";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#C7DFEF";
                }}
              >
                Hubungi Sekolah
              </Link>
            </div>
          </div>

          {/* ── Right: Image / Placeholder ── */}
          <div
            ref={imageRef}
            className="opacity-0 hidden lg:flex items-center justify-center"
          >
            {imageUrl ? (
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={imageUrl}
                  alt={`${schoolName} school building`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              /* Illustrated placeholder */
              <div
                className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden flex items-center justify-center border"
                style={{
                  backgroundColor: "#E0F0FB",
                  borderColor: "#C7DFEF",
                }}
                aria-label="School illustration placeholder"
              >
                {/* Abstract school SVG illustration */}
                <svg
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4/5 h-4/5"
                  aria-hidden="true"
                >
                  {/* Ground */}
                  <rect
                    x="0"
                    y="240"
                    width="400"
                    height="60"
                    fill="#BAE6FD"
                    opacity="0.4"
                    rx="2"
                  />

                  {/* Main building */}
                  <rect
                    x="80"
                    y="120"
                    width="240"
                    height="130"
                    fill="#DBEAFE"
                    rx="4"
                  />
                  <rect
                    x="80"
                    y="120"
                    width="240"
                    height="130"
                    stroke="#93C5FD"
                    strokeWidth="1.5"
                    rx="4"
                  />

                  {/* Roof */}
                  <polygon
                    points="60,120 200,50 340,120"
                    fill="#BFDBFE"
                    stroke="#60A5FA"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />

                  {/* Flag pole */}
                  <line
                    x1="200"
                    y1="50"
                    x2="200"
                    y2="20"
                    stroke="#93C5FD"
                    strokeWidth="2"
                  />
                  <rect
                    x="200"
                    y="20"
                    width="24"
                    height="14"
                    fill="#06B6D4"
                    rx="1"
                  />

                  {/* Door */}
                  <rect
                    x="172"
                    y="190"
                    width="56"
                    height="60"
                    fill="#93C5FD"
                    rx="3"
                  />
                  <circle cx="222" cy="222" r="3" fill="#0A6EBD" />

                  {/* Windows — top row */}
                  <rect
                    x="100"
                    y="145"
                    width="44"
                    height="34"
                    fill="#E0F2FE"
                    stroke="#93C5FD"
                    strokeWidth="1"
                    rx="2"
                  />
                  <line
                    x1="122"
                    y1="145"
                    x2="122"
                    y2="179"
                    stroke="#93C5FD"
                    strokeWidth="1"
                  />
                  <line
                    x1="100"
                    y1="162"
                    x2="144"
                    y2="162"
                    stroke="#93C5FD"
                    strokeWidth="1"
                  />

                  <rect
                    x="256"
                    y="145"
                    width="44"
                    height="34"
                    fill="#E0F2FE"
                    stroke="#93C5FD"
                    strokeWidth="1"
                    rx="2"
                  />
                  <line
                    x1="278"
                    y1="145"
                    x2="278"
                    y2="179"
                    stroke="#93C5FD"
                    strokeWidth="1"
                  />
                  <line
                    x1="256"
                    y1="162"
                    x2="300"
                    y2="162"
                    stroke="#93C5FD"
                    strokeWidth="1"
                  />

                  {/* Trees */}
                  <ellipse
                    cx="46"
                    cy="210"
                    rx="26"
                    ry="38"
                    fill="#BAE6FD"
                    opacity="0.7"
                  />
                  <rect x="43" y="230" width="6" height="18" fill="#93C5FD" />
                  <ellipse
                    cx="354"
                    cy="215"
                    rx="22"
                    ry="32"
                    fill="#BAE6FD"
                    opacity="0.7"
                  />
                  <rect x="351" y="232" width="6" height="14" fill="#93C5FD" />

                  {/* Path */}
                  <path
                    d="M172 250 L155 290 M228 250 L245 290"
                    stroke="#93C5FD"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.5"
                  />
                </svg>

                {/* Placeholder label */}
                <span
                  className="absolute bottom-4 text-xs font-medium tracking-wide"
                  style={{ color: "#4A6B8A" }}
                >
                  Foto Sekolah
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

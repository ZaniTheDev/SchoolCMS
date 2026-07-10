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
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const floatingRefs = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.65 },
          "-=0.35",
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 24, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55 },
          "-=0.3",
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.25",
        );

      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.7",
        );
      }

      // Floating decorative elements — staggered drift
      floatingRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: "random(-12, 12)",
          x: "random(-8, 8)",
          rotation: "random(-3, 3)",
          duration: "random(4, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setFloatingRef = (el, index) => {
    floatingRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#F0F7FF]"
      aria-label="Hero section"
    >
      {/* ── Background layers ── */}
      <div
        className="absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        {/* Primary radial glow top-right */}
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #BAE6FD 0%, transparent 65%)",
          }}
        />
        {/* Secondary glow bottom-left */}
        <div
          className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #06B6D4 0%, transparent 65%)",
          }}
        />
        {/* Third subtle glow mid-right */}
        <div
          className="absolute top-1/2 right-[10%] -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #0A6EBD 0%, transparent 70%)",
          }}
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#BAE6FD_0.5px,transparent_0)] [background-size:32px_32px] opacity-40"
          style={{
            maskImage:
              "radial-gradient(ellipse 70% 60% at 70% 40%, black 20%, transparent 100%)",
          }}
        />

        {/* Diagonal lines — very subtle */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #0D2D4E 0px, #0D2D4E 1px, transparent 1px, transparent 40px)",
          }}
        />
      </div>

      {/* ── Floating decorative shapes ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Shape 1: Small ring */}
        <div
          ref={(el) => setFloatingRef(el, 0)}
          className="absolute top-[18%] right-[15%] w-12 h-12 rounded-full border-2 border-[#06B6D4]/20"
        />
        {/* Shape 2: Tiny filled circle */}
        <div
          ref={(el) => setFloatingRef(el, 1)}
          className="absolute top-[35%] left-[8%] w-3 h-3 rounded-full bg-[#06B6D4]/30"
        />
        {/* Shape 3: Small square rotated */}
        <div
          ref={(el) => setFloatingRef(el, 2)}
          className="absolute bottom-[30%] right-[8%] w-6 h-6 rounded-sm border border-[#0A6EBD]/15 rotate-12"
        />
        {/* Shape 4: Dot cluster */}
        <div
          ref={(el) => setFloatingRef(el, 3)}
          className="absolute top-[60%] left-[12%] flex gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]/60" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]/30" />
        </div>
        {/* Shape 5: Larger ring */}
        <div
          ref={(el) => setFloatingRef(el, 4)}
          className="absolute top-[12%] left-[25%] w-20 h-20 rounded-full border border-[#BAE6FD]/40"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:py-28">
          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-center max-w-xl">
            {/* Eyebrow */}
            <div ref={eyebrowRef} className="opacity-0 mb-6">
              <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full bg-[#E0F0FB] text-[#0A6EBD] shadow-sm shadow-[#06B6D4]/10">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06B6D4] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#06B6D4]" />
                </span>
                {schoolName}
              </span>
            </div>

            {/* Heading */}
            <h1
              ref={headingRef}
              className="opacity-0 text-[2.5rem] sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight text-[#0D2D4E] mb-7"
            >
              {tagline.split(" ").map((word, i, arr) => {
                const isAccent = i >= arr.length - 2;
                return (
                  <span key={i}>
                    {isAccent ? (
                      <span className="relative inline-block text-[#0A6EBD]">
                        {word}
                        <svg
                          className="absolute -bottom-1.5 left-0 w-full"
                          viewBox="0 0 200 10"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2 7C50 3 150 3 198 7"
                            stroke="#06B6D4"
                            strokeWidth="3"
                            strokeLinecap="round"
                            opacity="0.35"
                          />
                        </svg>
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
              className="opacity-0 text-base sm:text-lg leading-relaxed text-[#4A6B8A] mb-10 max-w-lg"
            >
              {description}
            </p>

            {/* CTA */}
            <div
              ref={ctaRef}
              className="opacity-0 flex flex-col sm:flex-row gap-3.5"
            >
              <Link
                href="/news"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#0A6EBD] shadow-lg shadow-[#0A6EBD]/20 transition-all duration-200 hover:shadow-xl hover:shadow-[#0A6EBD]/25 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A6EBD]"
              >
                Jelajahi Berita
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold border-2 border-[#C7DFEF] text-[#0D2D4E] bg-white/50 backdrop-blur-sm transition-all duration-200 hover:bg-[#E0F0FB] hover:border-[#0A6EBD]/40 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A6EBD]"
              >
                Hubungi Sekolah
                <svg
                  className="w-4 h-4 text-[#0A6EBD]/60 transition-transform duration-200 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex items-center gap-6 text-[#4A6B8A]/60">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#F0F7FF] bg-gradient-to-br from-[#BAE6FD] to-[#93C5FD] flex items-center justify-center"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-white/80"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                ))}
              </div>
              <div className="text-xs leading-tight">
                <span className="font-semibold text-[#0D2D4E]/70">
                  500+ siswa
                </span>
                <br />
                telah bergabung
              </div>
            </div>
          </div>

          {/* ── Right: Image / Placeholder ── */}
          <div ref={imageRef} className="opacity-0 hidden lg:block">
            {imageUrl ? (
              <div className="relative">
                {/* Glow behind image */}
                <div
                  className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, #BAE6FD 0%, transparent 70%)",
                  }}
                />
                <div className="relative w-full max-w-lg mx-auto aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-[#0A6EBD]/10 ring-1 ring-[#BAE6FD]/50">
                  <Image
                    src={imageUrl}
                    alt={`${schoolName} school building`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            ) : (
              /* ── Polished placeholder composition ── */
              <div className="relative w-full max-w-lg mx-auto">
                {/* Glow behind card */}
                <div
                  className="absolute -inset-6 rounded-3xl opacity-25 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 60%, #BAE6FD 0%, transparent 65%)",
                  }}
                />

                {/* Main card */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C7DFEF] bg-gradient-to-br from-[#E0F0FB] via-white to-[#DBEAFE] shadow-xl shadow-[#0A6EBD]/8">
                  {/* Subtle inner grid */}
                  <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                      backgroundImage:
                        "linear-gradient(#93C5FD 1px, transparent 1px), linear-gradient(90deg, #93C5FD 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Illustration */}
                  <svg
                    viewBox="0 0 480 360"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0 w-full h-full"
                    aria-hidden="true"
                  >
                    {/* Sky gradient */}
                    <defs>
                      <linearGradient
                        id="sky"
                        x1="240"
                        y1="0"
                        x2="240"
                        y2="360"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0%" stopColor="#E0F2FE" />
                        <stop
                          offset="100%"
                          stopColor="#DBEAFE"
                          stopOpacity="0.3"
                        />
                      </linearGradient>
                      <linearGradient
                        id="ground"
                        x1="240"
                        y1="260"
                        x2="240"
                        y2="360"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop
                          offset="0%"
                          stopColor="#BAE6FD"
                          stopOpacity="0.5"
                        />
                        <stop
                          offset="100%"
                          stopColor="#BAE6FD"
                          stopOpacity="0.15"
                        />
                      </linearGradient>
                    </defs>

                    <rect width="480" height="360" fill="url(#sky)" />

                    {/* Clouds */}
                    <g opacity="0.5">
                      <ellipse
                        cx="100"
                        cy="60"
                        rx="40"
                        ry="16"
                        fill="#BAE6FD"
                      />
                      <ellipse
                        cx="130"
                        cy="55"
                        rx="30"
                        ry="14"
                        fill="#BAE6FD"
                      />
                      <ellipse
                        cx="370"
                        cy="80"
                        rx="35"
                        ry="13"
                        fill="#BAE6FD"
                      />
                      <ellipse
                        cx="395"
                        cy="76"
                        rx="25"
                        ry="11"
                        fill="#BAE6FD"
                      />
                    </g>

                    {/* Ground */}
                    <rect
                      x="0"
                      y="270"
                      width="480"
                      height="90"
                      fill="url(#ground)"
                      rx="0"
                    />

                    {/* ── Trees (behind building) ── */}
                    {/* Left tree */}
                    <rect
                      x="68"
                      y="230"
                      width="8"
                      height="45"
                      fill="#93C5FD"
                      rx="2"
                    />
                    <ellipse
                      cx="72"
                      cy="210"
                      rx="28"
                      ry="40"
                      fill="#BAE6FD"
                      opacity="0.8"
                    />
                    <ellipse cx="72" cy="200" rx="20" ry="28" fill="#BAE6FD" />

                    {/* Right tree */}
                    <rect
                      x="404"
                      y="235"
                      width="7"
                      height="40"
                      fill="#93C5FD"
                      rx="2"
                    />
                    <ellipse
                      cx="408"
                      cy="215"
                      rx="24"
                      ry="35"
                      fill="#BAE6FD"
                      opacity="0.8"
                    />
                    <ellipse cx="408" cy="206" rx="17" ry="24" fill="#BAE6FD" />

                    {/* Small bush left */}
                    <ellipse
                      cx="130"
                      cy="272"
                      rx="18"
                      ry="12"
                      fill="#BAE6FD"
                      opacity="0.6"
                    />
                    {/* Small bush right */}
                    <ellipse
                      cx="355"
                      cy="274"
                      rx="15"
                      ry="10"
                      fill="#BAE6FD"
                      opacity="0.6"
                    />

                    {/* ── Main building ── */}
                    <rect
                      x="110"
                      y="145"
                      width="260"
                      height="135"
                      fill="#DBEAFE"
                      rx="4"
                    />
                    <rect
                      x="110"
                      y="145"
                      width="260"
                      height="135"
                      stroke="#93C5FD"
                      strokeWidth="1.5"
                      rx="4"
                    />

                    {/* Roof */}
                    <polygon
                      points="85,145 240,65 395,145"
                      fill="#BFDBFE"
                      stroke="#60A5FA"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    {/* Roof inner line */}
                    <polygon
                      points="120,145 240,82 360,145"
                      fill="none"
                      stroke="#93C5FD"
                      strokeWidth="0.75"
                      strokeLinejoin="round"
                      opacity="0.5"
                    />

                    {/* Flag pole */}
                    <line
                      x1="240"
                      y1="65"
                      x2="240"
                      y2="28"
                      stroke="#93C5FD"
                      strokeWidth="2.5"
                    />
                    <circle cx="240" cy="26" r="3" fill="#93C5FD" />
                    <rect
                      x="240"
                      y="28"
                      width="28"
                      height="16"
                      fill="#06B6D4"
                      rx="2"
                    />
                    <line
                      x1="240"
                      y1="36"
                      x2="268"
                      y2="36"
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.5"
                    />

                    {/* Door */}
                    <rect
                      x="205"
                      y="215"
                      width="70"
                      height="65"
                      fill="#93C5FD"
                      rx="4"
                    />
                    <rect
                      x="210"
                      y="220"
                      width="60"
                      height="55"
                      fill="#BFDBFE"
                      rx="3"
                    />
                    <circle cx="262" cy="250" r="3.5" fill="#0A6EBD" />

                    {/* Windows — top row */}
                    {[135, 205, 295].map((x) => (
                      <g key={x}>
                        <rect
                          x={x}
                          y="165"
                          width="50"
                          height="38"
                          fill="#E0F2FE"
                          stroke="#93C5FD"
                          strokeWidth="1"
                          rx="3"
                        />
                        <line
                          x1={x + 25}
                          y1="165"
                          x2={x + 25}
                          y2="203"
                          stroke="#93C5FD"
                          strokeWidth="0.75"
                        />
                        <line
                          x1={x}
                          y1="184"
                          x2={x + 50}
                          y2="184"
                          stroke="#93C5FD"
                          strokeWidth="0.75"
                        />
                        {/* Window glow */}
                        <rect
                          x={x + 3}
                          y="168"
                          width="20"
                          height="14"
                          fill="white"
                          opacity="0.3"
                          rx="1"
                        />
                      </g>
                    ))}

                    {/* Bottom windows */}
                    {[145, 315].map((x) => (
                      <g key={x}>
                        <rect
                          x={x}
                          y="225"
                          width="42"
                          height="32"
                          fill="#E0F2FE"
                          stroke="#93C5FD"
                          strokeWidth="1"
                          rx="3"
                        />
                        <line
                          x1={x + 21}
                          y1="225"
                          x2={x + 21}
                          y2="257"
                          stroke="#93C5FD"
                          strokeWidth="0.75"
                        />
                        <line
                          x1={x}
                          y1="241"
                          x2={x + 42}
                          y2="241"
                          stroke="#93C5FD"
                          strokeWidth="0.75"
                        />
                      </g>
                    ))}

                    {/* Path */}
                    <path
                      d="M220 280 L200 340 M260 280 L280 340"
                      stroke="#93C5FD"
                      strokeWidth="8"
                      strokeLinecap="round"
                      opacity="0.35"
                    />
                    <path
                      d="M225 280 L208 340 M255 280 L272 340"
                      stroke="#BAE6FD"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.4"
                    />

                    {/* Birds */}
                    <g
                      stroke="#93C5FD"
                      strokeWidth="1.2"
                      fill="none"
                      opacity="0.4"
                    >
                      <path d="M155 48 Q160 42 165 48" />
                      <path d="M170 40 Q175 34 180 40" />
                      <path d="M310 52 Q315 46 320 52" />
                    </g>
                  </svg>

                  {/* Corner badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 rounded-lg bg-white/80 backdrop-blur-sm px-3 py-1.5 shadow-sm ring-1 ring-[#C7DFEF]/60">
                    <div className="h-2 w-2 rounded-full bg-[#06B6D4]" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0A6EBD]">
                      Foto Sekolah
                    </span>
                  </div>
                </div>

                {/* Floating accent badges around the card */}
                <div
                  ref={(el) => setFloatingRef(el, 5)}
                  className="absolute -top-4 -right-4 z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-lg shadow-[#0A6EBD]/8 ring-1 ring-[#C7DFEF]/50"
                >
                  <svg
                    className="w-6 h-6 text-[#0A6EBD]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </div>

                <div
                  ref={(el) => setFloatingRef(el, 6)}
                  className="absolute -bottom-3 -left-3 z-10 flex items-center gap-2 rounded-xl bg-white shadow-lg shadow-[#0A6EBD]/8 ring-1 ring-[#C7DFEF]/50 px-4 py-2.5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#06B6D4]/10">
                    <svg
                      className="w-4 h-4 text-[#06B6D4]"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0D2D4E]">
                      Terakreditasi
                    </p>
                    <p className="text-[10px] text-[#4A6B8A]/70">Grade A</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom fade into next section ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}

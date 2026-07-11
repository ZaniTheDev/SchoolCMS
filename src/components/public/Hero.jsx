"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";

export default function HomeHero({
  schoolName = "Nama Sekolah",
  tagline = "Membentuk Generasi Unggul dan Berkarakter",
  description = "Kami berkomitmen menghadirkan pendidikan berkualitas yang mempersiapkan setiap siswa menghadapi masa depan dengan percaya diri.",
  imageUrl,
  images = [], // ★ Gallery images from server
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const hasImages = images.length > 0;

  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const imageRef = useRef(null);
  const floatingRefs = useRef([]);
  const imagesRef = useRef(images);

  imagesRef.current = images;
  // Preload gallery images
  useEffect(() => {
    if (!hasImages) return;
    images.forEach((img) => {
      const i = new window.Image();
      i.src = img.imageUrl;
    });
  }, [images, hasImages]);

  // Auto-advance slideshow
  useEffect(() => {
    if (!hasImages || images.length <= 1 || paused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagesRef.current.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [hasImages, images.length, paused]);

  // Entrance animations
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

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

      // Only animate the right-side illustration if NO gallery images
      if (!hasImages && imageRef.current) {
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

      // Floating shapes (only when NO gallery images)
      if (!hasImages) {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [hasImages]);

  const setFloatingRef = (el, index) => {
    floatingRefs.current[index] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#F0F7FF]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero section"
    >
      {/* ── Background decorations (only when NO gallery images) ── */}
      {!hasImages && (
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          <div
            className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-25"
            style={{
              background:
                "radial-gradient(circle, #BAE6FD 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, #06B6D4 0%, transparent 65%)",
            }}
          />
          <div
            className="absolute top-1/2 right-[10%] -translate-y-1/2 w-96 h-96 rounded-full opacity-10"
            style={{
              background:
                "radial-gradient(circle, #0A6EBD 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#BAE6FD_0.5px,transparent_0)] [background-size:32px_32px] opacity-40"
            style={{
              maskImage:
                "radial-gradient(ellipse 70% 60% at 70% 40%, black 20%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, #0D2D4E 0px, #0D2D4E 1px, transparent 1px, transparent 40px)",
            }}
          />
        </div>
      )}

      {/* ── Gallery Background Slideshow ── */}
      {hasImages && (
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
              style={{
                opacity: i === currentSlide ? 1 : 0,
                backgroundImage: `url(${img.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}

          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F0F7FF]/90 via-[#F0F7FF]/75 to-[#0D2D4E]/15" />

          {/* Progress bar */}
          {images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0D2D4E]/5 z-20">
              {!paused && (
                <div
                  key={currentSlide}
                  className="h-full bg-[#06B6D4]/40 origin-left animate-hero-progress"
                />
              )}
            </div>
          )}

          {/* Navigation dots */}
          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentSlide
                      ? "w-6 bg-[#06B6D4]"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Slide ${i + 1}${img.caption ? `: ${img.caption}` : ""}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Floating shapes (only when NO gallery images) ── */}
      {!hasImages && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div
            ref={(el) => setFloatingRef(el, 0)}
            className="absolute top-[18%] right-[15%] w-12 h-12 rounded-full border-2 border-[#06B6D4]/20"
          />
          <div
            ref={(el) => setFloatingRef(el, 1)}
            className="absolute top-[35%] left-[8%] w-3 h-3 rounded-full bg-[#06B6D4]/30"
          />
          <div
            ref={(el) => setFloatingRef(el, 2)}
            className="absolute bottom-[30%] right-[8%] w-6 h-6 rounded-sm border border-[#0A6EBD]/15 rotate-12"
          />
          <div
            ref={(el) => setFloatingRef(el, 3)}
            className="absolute top-[60%] left-[12%] flex gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#BAE6FD]/30" />
          </div>
          <div
            ref={(el) => setFloatingRef(el, 4)}
            className="absolute top-[12%] left-[25%] w-20 h-20 rounded-full border border-[#BAE6FD]/40"
          />
        </div>
      )}

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:py-28">
          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-center max-w-xl">
            <div ref={eyebrowRef} className="opacity-0 mb-6">
              <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-full bg-[#E0F0FB] text-[#0A6EBD] shadow-sm shadow-[#06B6D4]/10">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#06B6D4] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#06B6D4]" />
                </span>
                {schoolName}
              </span>
            </div>

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

            <p
              ref={descRef}
              className="opacity-0 text-base sm:text-lg leading-relaxed text-[#4A6B8A] mb-10 max-w-lg"
            >
              {description}
            </p>

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

          {/* ── Right: Fallback illustration (only when NO gallery images) ── */}
          {!hasImages && (
            <div ref={imageRef} className="opacity-0 hidden lg:block">
              {imageUrl ? (
                <div className="relative">
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
                <div className="relative w-full max-w-lg mx-auto">
                  <div
                    className="absolute -inset-6 rounded-3xl opacity-25 blur-2xl"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 60%, #BAE6FD 0%, transparent 65%)",
                    }}
                  />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#C7DFEF] bg-gradient-to-br from-[#E0F0FB] via-white to-[#DBEAFE] shadow-xl shadow-[#0A6EBD]/8">
                    {/* Your existing SVG illustration goes here if you had one */}
                    <span className="absolute bottom-4 right-4 text-xs font-medium tracking-wide text-[#4A6B8A]">
                      Foto Sekolah
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}

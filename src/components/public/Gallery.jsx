"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Gallery({ images }) {
  const [selected, setSelected] = useState(null);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!selected) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
      );
    });

    return () => ctx.revert();
  }, [selected]);

  const closeLightbox = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => setSelected(null),
    });
  };

  if (!images || images.length === 0) {
    return (
      <div className="border border-dashed border-[#ddeef8] rounded-xl py-24 text-center">
        <p className="text-slate-400">Belum ada foto di galeri.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setSelected(img)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-[#ddeef8] focus:outline-none focus:ring-2 focus:ring-[#06b6d4]"
          >
            <Image
              src={img.imageUrl}
              alt={img.caption || "Foto galeri sekolah"}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e3a5f]/80 to-transparent p-2">
                <p className="text-white text-xs line-clamp-1">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {selected && (
        <div
          ref={overlayRef}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-[#1e3a5f]/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            ref={imgRef}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl aspect-video cursor-default"
          >
            <Image
              src={selected.imageUrl}
              alt={selected.caption || "Foto galeri sekolah"}
              fill
              sizes="100vw"
              className="object-contain"
            />
            {selected.caption && (
              <p className="absolute -bottom-8 left-0 right-0 text-center text-white/80 text-sm">
                {selected.caption}
              </p>
            )}
            <button
              onClick={closeLightbox}
              className="absolute -top-10 right-0 text-white/70 hover:text-white text-sm"
            >
              Tutup ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function PostDetail({ post }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!post) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".post-header", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".post-body", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!post) {
    return (
      <main style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
        <div
          style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}
        >
          <p style={{ color: "#64748b" }}>Post tidak ditemukan.</p>
        </div>
      </main>
    );
  }

  const publishedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <main
      ref={containerRef}
      style={{ backgroundColor: "#f0f4f8", minHeight: "100vh" }}
    >
      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px" }}
      >
        {/* Back link */}
        <Link
          href="/news"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#06b6d4",
            fontSize: "14px",
            fontWeight: 500,
            marginBottom: "32px",
            textDecoration: "none",
          }}
        >
          ← Kembali ke Berita
        </Link>

        {/* Header */}
        <div className="post-header">
          {post.thumbnail && (
            <img
              src={post.thumbnail}
              alt={post.title}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "32px",
              }}
            />
          )}

          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 700,
              color: "#1e3a5f",
              lineHeight: 1.25,
              marginBottom: "16px",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "14px",
              color: "#64748b",
              marginBottom: "40px",
              paddingBottom: "24px",
              borderBottom: "1px solid #cbd5e1",
            }}
          >
            {post.author?.name && (
              <span>
                Oleh{" "}
                <strong style={{ color: "#1e3a5f" }}>{post.author.name}</strong>
              </span>
            )}
            {publishedDate && <span>{publishedDate}</span>}
          </div>
        </div>

        {/* Body */}
        <div
          className="post-body"
          style={{
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "#334155",
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </main>
  );
}

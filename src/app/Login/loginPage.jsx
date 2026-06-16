"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const illustrationRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(formRef.current, { opacity: 0, y: 30 });
      gsap.set(titleRef.current, { opacity: 0, y: 20 });
      gsap.set(illustrationRef.current, { opacity: 0, scale: 0.95 });

      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.to(illustrationRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.to(formRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSignIn = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // Store session or token as needed (implementation depends on auth strategy)
      if (data.success && data.data?.token) {
        localStorage.setItem("authToken", data.data.token);
        // Set session cookie or handle authentication state
        router.push("/admin");
      } else {
        throw new Error("Authentication failed.");
      }
    } catch (err) {
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSignIn();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] flex items-center justify-center p-4">
      <div
        ref={containerRef}
        className="w-full max-w-[1000px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Panel - Brand/Illustration */}
        <div className="w-full md:w-[45%] bg-[#0F2D52] p-10 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4BA3D3]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#4BA3D3]/5 rounded-full blur-2xl" />

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-[#4BA3D3] rounded-lg flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="4"
                    width="7"
                    height="7"
                    rx="1.5"
                    fill="#E8F4FD"
                  />
                  <rect
                    x="13"
                    y="4"
                    width="7"
                    height="7"
                    rx="1.5"
                    fill="#E8F4FD"
                    opacity="0.6"
                  />
                  <rect
                    x="4"
                    y="13"
                    width="7"
                    height="7"
                    rx="1.5"
                    fill="#E8F4FD"
                    opacity="0.6"
                  />
                  <rect
                    x="13"
                    y="13"
                    width="7"
                    height="7"
                    rx="1.5"
                    fill="#E8F4FD"
                    opacity="0.3"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                School<span className="text-[#4BA3D3]">CMS</span>
              </span>
            </div>

            {/* Main content */}
            <div ref={titleRef}>
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-[#4BA3D3] mb-3">
                Admin Portal
              </p>
              <h1 className="text-3xl font-bold text-white leading-tight mb-3">
                Welcome back
              </h1>
              <p className="text-sm text-[#8BBFDD] leading-relaxed max-w-xs">
                Manage your school&apos;s content with our intuitive
                administration system.
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div ref={illustrationRef} className="relative z-10 mt-8">
            <div className="bg-white/5 backdrop-blur-sm border border-[#4BA3D3]/20 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#4BA3D3]" />
                  <div className="w-2 h-2 rounded-full bg-[#4BA3D3]/40" />
                  <div className="w-2 h-2 rounded-full bg-[#4BA3D3]/40" />
                </div>
                <span className="text-[10px] font-medium text-[#4BA3D3] tracking-wider">
                  Dashboard
                </span>
              </div>

              <div className="flex items-end gap-1.5 h-16 mb-3">
                {[35, 70, 50, 85, 30, 55, 75, 45].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all"
                    style={{
                      height: `${h}%`,
                      background:
                        h >= 70
                          ? "rgba(75,163,211,0.7)"
                          : h >= 50
                            ? "rgba(75,163,211,0.45)"
                            : "rgba(75,163,211,0.25)",
                    }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "Posts", value: "24" },
                  { label: "Events", value: "8" },
                  { label: "Teachers", value: "36" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 border border-[#4BA3D3]/10 rounded-lg p-2 text-center"
                  >
                    <p className="text-base font-bold text-white">
                      {item.value}
                    </p>
                    <p className="text-[9px] text-[#6AAECB] mt-0.5">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 mt-6">
            <div className="inline-flex items-center gap-2 bg-[#4BA3D3]/10 border border-[#4BA3D3]/20 rounded-full px-3 py-1.5">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4BA3D3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-[10px] text-[#6AAECB]">
                Secure &amp; encrypted
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full md:w-[55%] p-8 md:p-12 flex items-center">
          <div ref={formRef} className="w-full max-w-sm mx-auto">
            {/* Mobile logo */}
            <div className="flex md:hidden items-center gap-2.5 mb-8">
              <div className="w-8 h-8 bg-[#0F2D52] rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="4"
                    y="4"
                    width="7"
                    height="7"
                    rx="1.5"
                    fill="#E8F4FD"
                  />
                  <rect
                    x="13"
                    y="4"
                    width="7"
                    height="7"
                    rx="1.5"
                    fill="#E8F4FD"
                    opacity="0.6"
                  />
                  <rect
                    x="4"
                    y="13"
                    width="7"
                    height="7"
                    rx="1.5"
                    fill="#E8F4FD"
                    opacity="0.6"
                  />
                  <rect
                    x="13"
                    y="13"
                    width="7"
                    height="7"
                    rx="1.5"
                    fill="#E8F4FD"
                    opacity="0.3"
                  />
                </svg>
              </div>
              <span className="text-lg font-bold text-[#0F2D52] tracking-tight">
                School<span className="text-[#4BA3D3]">CMS</span>
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#0F2D52] tracking-tight mb-1.5">
                Administrator Login
              </h2>
              <p className="text-sm text-gray-500">
                Enter your credentials to access the dashboard.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="flex items-start gap-2.5 mb-6 bg-red-50 border border-red-200 rounded-lg px-4 py-3"
                role="alert"
              >
                <svg
                  className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Email field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="you@school.edu"
                  autoComplete="email"
                  className="w-full h-[44px] bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#4BA3D3] focus:ring-2 focus:ring-[#4BA3D3]/20 focus:bg-white"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-[44px] bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-12 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-200 focus:border-[#4BA3D3] focus:ring-2 focus:ring-[#4BA3D3]/20 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                role="checkbox"
                aria-checked={rememberMe}
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    rememberMe
                      ? "bg-[#0F2D52] border-[#0F2D52]"
                      : "bg-white border-gray-300 group-hover:border-gray-400"
                  }`}
                >
                  {rememberMe && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-600">Remember me</span>
              </button>

              <a
                href="/admin/forgot-password"
                className="text-sm font-medium text-[#4BA3D3] hover:text-[#0F2D52] transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Sign in button */}
            <button
              type="button"
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full h-[44px] bg-[#0F2D52] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#1a3f6e] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign in</span>
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                </>
              )}
            </button>

            {/* Security note */}
            <div className="flex items-start gap-2.5 mt-6 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
              <svg
                className="w-4 h-4 text-[#4BA3D3] flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-xs text-gray-400 leading-relaxed">
                Only authorized administrators and teachers may access this
                system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

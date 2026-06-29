"use client";

// app/login/page.js

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

// Map Auth.js error codes to human-readable Bahasa Indonesia messages
const ERROR_MESSAGES = {
  CredentialsSignin: "Email atau password salah.",
  AccessDenied: "Akun Anda tidak memiliki akses ke panel admin.",
  Default: "Terjadi kesalahan. Silakan coba lagi.",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Pick up ?error= param that Auth.js appends on redirect
  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) {
      setError(ERROR_MESSAGES[urlError] ?? ERROR_MESSAGES.Default);
    }
  }, [searchParams]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Email dan password wajib diisi.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false, // Handle redirect manually so we can catch errors
      });

      if (result?.error) {
        setError(ERROR_MESSAGES[result.error] ?? ERROR_MESSAGES.Default);
        return;
      }

      // signIn with redirect: false returns undefined on success,
      // but may also return undefined on some errors without setting .error
      if (!result) {
        setError(ERROR_MESSAGES.Default);
        return;
      }

      // Always redirect to /admin after successful login
      router.push("/admin");
      router.refresh();
    } catch {
      setError(ERROR_MESSAGES.Default);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#1e3a5f]/5" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-[#06b6d4]/8" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-[#1e3a5f]/10 border border-[#ddeef8] overflow-hidden">
          {/* Card header strip */}
          <div className="bg-[#1e3a5f] px-8 py-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-[#06b6d4] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                S
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">
                  SchoolCMS
                </p>
                <p className="text-blue-300 text-xs">Panel Administrasi</p>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Masuk ke Dashboard
            </h1>
            <p className="text-blue-300 text-sm mt-1">
              Khusus untuk administrator sekolah
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Error message */}
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl"
                >
                  <span className="mt-0.5 flex-shrink-0">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#1e3a5f]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@sekolah.sch.id"
                  disabled={isLoading}
                  className="
                    w-full px-4 py-3 rounded-xl border border-[#c8dff0] bg-[#f8fbff]
                    text-[#1e3a5f] placeholder-[#94a3b8] text-sm
                    focus:outline-none focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent
                    disabled:opacity-60 disabled:cursor-not-allowed
                    transition-shadow duration-150
                  "
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#1e3a5f]"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    disabled={isLoading}
                    className="
                      w-full px-4 py-3 pr-12 rounded-xl border border-[#c8dff0] bg-[#f8fbff]
                      text-[#1e3a5f] placeholder-[#94a3b8] text-sm
                      focus:outline-none focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent
                      disabled:opacity-60 disabled:cursor-not-allowed
                      transition-shadow duration-150
                    "
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    disabled={isLoading}
                    aria-label={
                      showPassword
                        ? "Sembunyikan password"
                        : "Tampilkan password"
                    }
                    className="
                      absolute right-3 top-1/2 -translate-y-1/2
                      w-8 h-8 flex items-center justify-center rounded-lg
                      text-[#64748b] hover:text-[#1e3a5f] hover:bg-[#e8f4fd]
                      transition-colors duration-150
                      disabled:opacity-40
                    "
                  >
                    {showPassword ? (
                      // Eye-off icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      // Eye icon
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="
                  w-full bg-[#1e3a5f] text-white font-semibold text-sm
                  px-4 py-3.5 rounded-xl
                  hover:bg-[#16304f] active:bg-[#0f2540]
                  focus:outline-none focus:ring-2 focus:ring-[#06b6d4] focus:ring-offset-2
                  disabled:opacity-60 disabled:cursor-not-allowed
                  transition-colors duration-150
                  flex items-center justify-center gap-2
                "
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Memverifikasi...
                  </>
                ) : (
                  "Masuk"
                )}
              </button>
            </form>

            <p className="text-center text-xs text-[#94a3b8] mt-6">
              Hanya akun dengan akses{" "}
              <span className="font-semibold text-[#64748b]">
                Administrator
              </span>{" "}
              yang dapat masuk ke panel ini.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[#94a3b8] mt-6">
          © {new Date().getFullYear()} SchoolCMS. Hak cipta dilindungi.
        </p>
      </div>
    </div>
  );
}

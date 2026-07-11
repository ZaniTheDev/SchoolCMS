"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Jurusan", href: "/jurusan" },
  { label: "News", href: "/news" },
  { label: "Teachers", href: "/teachers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({
  schoolName = "School Name",
  logoUrl,
  isAdmin = false, // Pass this from your layout if the user is logged in
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const menuRef = useRef(null);
  const toggleRef = useRef(null);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ── Scroll Listener ──
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Body Scroll Lock ──
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ── Focus Trap & Outside Click ──
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (e.key !== "Tab") return;

      const menu = menuRef.current;
      if (!menu) return;

      const focusable = menu.querySelectorAll(
        'a, button, input, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    // Auto-focus first link when menu opens
    menuRef.current?.querySelector("a")?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-[#F0F7FF]/80 backdrop-blur-xl shadow-lg shadow-[#0A6EBD]/5 border-[#C7DFEF]"
          : "bg-[#F0F7FF] border-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo + School Name */}
          <Link
            href="/"
            className="flex items-center gap-3 min-w-0 flex-shrink-0 group"
            aria-label={`${schoolName} — Home`}
          >
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={`${schoolName} logo`}
                width={38}
                height={38}
                className="rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 bg-[#0A6EBD]"
                aria-hidden="true"
              >
                <span className="text-white font-bold text-base leading-none select-none">
                  {schoolName.charAt(0)}
                </span>
              </div>
            )}
            <span className="font-semibold text-sm sm:text-base truncate text-[#0D2D4E] transition-colors duration-200 group-hover:text-[#0A6EBD]">
              {schoolName}
            </span>
          </Link>

          {/* Desktop Links & Auth Button */}
          <div className="hidden md:flex items-center gap-1">
            <ul className="flex items-center gap-0.5" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive(href)
                        ? "bg-[#E0F0FB] text-[#0A6EBD]"
                        : "text-[#4A6B8A] hover:bg-[#EBF4FA] hover:text-[#0D2D4E]"
                    }`}
                    aria-current={isActive(href) ? "page" : undefined}
                  >
                    {isActive(href) && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#06B6D4]"
                        aria-hidden="true"
                      />
                    )}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Separator */}
            <div className="w-px h-5 bg-[#C7DFEF] mx-2" aria-hidden="true" />

            {/* Auth Button */}
            {isAdmin ? (
              <Link
                href="/admin"
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-[#0A6EBD] text-white hover:bg-[#0A6EBD]/90 transition-colors shadow-sm shadow-[#0A6EBD]/20"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg text-sm font-semibold border-2 border-[#C7DFEF] text-[#0D2D4E] hover:bg-[#E0F0FB] hover:border-[#0A6EBD]/30 transition-all"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-[#4A6B8A] hover:bg-[#EBF4FA] hover:text-[#0D2D4E] transition-colors duration-200"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          id="mobile-menu"
          className={`md:hidden border-t border-[#C7DFEF] overflow-hidden transition-all duration-300 ease-in-out origin-top ${
            isOpen
              ? "max-h-[500px] opacity-100 scale-y-100"
              : "max-h-0 opacity-0 scale-y-95 pointer-events-none"
          }`}
        >
          <ul role="list" className="flex flex-col gap-0.5 py-2">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(href)
                      ? "bg-[#E0F0FB] text-[#0A6EBD]"
                      : "text-[#4A6B8A] hover:bg-[#EBF4FA] hover:text-[#0D2D4E]"
                  }`}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {isActive(href) && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-[#06B6D4]"
                      aria-hidden="true"
                    />
                  )}
                  {label}
                </Link>
              </li>
            ))}

            {/* Mobile Auth Button */}
            <li className="pt-2 mt-2 border-t border-[#C7DFEF]">
              {isAdmin ? (
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold bg-[#0A6EBD] text-white hover:bg-[#0A6EBD]/90 transition-colors"
                >
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
                      d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
                    />
                  </svg>
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-sm font-semibold border-2 border-[#C7DFEF] text-[#0D2D4E] hover:bg-[#E0F0FB] transition-colors"
                >
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
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  Login Admin
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

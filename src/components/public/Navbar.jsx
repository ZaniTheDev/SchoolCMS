"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "News", href: "/news" },
  { label: "Events", href: "/events" },
  { label: "Teachers", href: "/teachers" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" },
];

// Arctic theme tokens
// Background:   #F0F7FF (Frost White)
// Border:       #C7DFEF (Ice Blue)
// Primary text: #0D2D4E (Arctic Blue dark)
// Muted text:   #4A6B8A (Slate Blue)
// Active bg:    #E0F0FB (Ice Blue tint)
// Active text:  #0A6EBD (Arctic Blue)
// Hover bg:     #EBF4FA
// Logo fallback:#0A6EBD (Arctic Blue)
// Accent dot:   #06B6D4 (Cyan)

export default function Navbar({ schoolName = "School Name", logoUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 border-b"
      style={{ backgroundColor: "#F0F7FF", borderColor: "#C7DFEF" }}
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
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#0A6EBD" }}
                aria-hidden="true"
              >
                <span className="text-white font-bold text-base leading-none select-none">
                  {schoolName.charAt(0)}
                </span>
              </div>
            )}
            <span
              className="font-semibold text-sm sm:text-base truncate transition-colors duration-200"
              style={{ color: "#0D2D4E" }}
            >
              {schoolName}
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-0.5" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1.5"
                  style={
                    isActive(href)
                      ? { backgroundColor: "#E0F0FB", color: "#0A6EBD" }
                      : { color: "#4A6B8A" }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive(href)) {
                      e.currentTarget.style.backgroundColor = "#EBF4FA";
                      e.currentTarget.style.color = "#0D2D4E";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(href)) {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#4A6B8A";
                    }
                  }}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {isActive(href) && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#06B6D4" }}
                      aria-hidden="true"
                    />
                  )}
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md transition-colors duration-200"
            style={{ color: "#4A6B8A" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#EBF4FA";
              e.currentTarget.style.color = "#0D2D4E";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#4A6B8A";
            }}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            <span aria-hidden="true">
              {isOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
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
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden border-t py-2"
            style={{ borderColor: "#C7DFEF" }}
          >
            <ul role="list" className="flex flex-col gap-0.5">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200"
                    style={
                      isActive(href)
                        ? { backgroundColor: "#E0F0FB", color: "#0A6EBD" }
                        : { color: "#4A6B8A" }
                    }
                    aria-current={isActive(href) ? "page" : undefined}
                  >
                    {isActive(href) && (
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#06B6D4" }}
                        aria-hidden="true"
                      />
                    )}
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

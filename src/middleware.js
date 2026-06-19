// middleware.js

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // DEBUG — remove after fixing
  console.log("=== MIDDLEWARE ===");
  console.log("pathname:", pathname);
  console.log("token:", JSON.stringify(token));
  console.log(
    "cookies:",
    req.cookies.getAll().map((c) => c.name),
  );

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  if (isLoginPage && token?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (isAdminRoute && (!token || token.role !== "ADMIN")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};

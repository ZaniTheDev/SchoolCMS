// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/SessionProvider";

// Plain JavaScript object for SEO configuration
export const metadata = {
  title: "My Next.js Application",
  description: "Built with the App Router",
};
const inter = Inter({ subsets: ["latin"], display: "swap" });

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="id">
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}

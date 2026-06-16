// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";

// Plain JavaScript object for SEO configuration
export const metadata = {
  title: "My Next.js Application",
  description: "Built with the App Router",
};
const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}

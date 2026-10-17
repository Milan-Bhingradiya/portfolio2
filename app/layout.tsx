import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Milan Bhingradiya — Associate AI Developer",
  description:
    "Milan Bhingradiya builds production systems end to end — from a college placement portal to a YOLO11m PPE-detection pipeline on edge NPUs.",
};

// Runs before paint: applies saved theme (default dark) to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.className} bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <Navbar />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

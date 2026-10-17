"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
      <div className="flex items-center gap-1">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md p-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 sm:hidden"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <Link
          href="/"
          className="font-mono text-sm lowercase tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          milan bhingradiya
        </Link>
      </div>

      {/* desktop links */}
      <div className="hidden items-center gap-5 sm:flex">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="font-mono text-sm lowercase text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {l.label}
          </a>
        ))}
        <ThemeToggle />
      </div>

      {/* mobile: theme toggle only */}
      <div className="sm:hidden">
        <ThemeToggle />
      </div>

      {/* mobile dropdown */}
      {open && (
        <div className="absolute inset-x-6 top-full z-50 rounded-xl border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 sm:hidden">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 font-mono text-sm lowercase text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

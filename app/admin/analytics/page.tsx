"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

const inputCls =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-zinc-100";
const btnPrimary =
  "rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300";

export default function AnalyticsAdminPage() {
  const [password, setPassword] = useState("");
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("admin_pw");
      if (saved) {
        setPassword(saved);
        setUnlocked(true);
      }
    } catch {
      /* storage unavailable */
    }
  }, []);

  const unlock = async () => {
    setChecking(true);
    setError("");
    try {
      const res = await fetch("/api/visits/stats", {
        headers: { "x-admin-password": input },
      });
      if (!res.ok) throw new Error();
      try {
        sessionStorage.setItem("admin_pw", input);
      } catch {
        /* storage unavailable */
      }
      setPassword(input);
      setUnlocked(true);
    } catch {
      setError("Wrong password.");
    }
    setChecking(false);
  };

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-md px-6 py-24">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Enter the admin password to view visitor analytics.
        </p>
        <div className="mt-6 space-y-3">
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            placeholder="Admin password"
            className={inputCls}
          />
          <button onClick={unlock} disabled={checking} className={btnPrimary}>
            {checking ? "Checking…" : "Unlock"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Analytics</h1>
          <nav className="flex gap-1 rounded-lg border border-zinc-200 p-1 dark:border-zinc-800">
            <Link
              href="/admin"
              className="rounded-md px-3 py-1 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Content
            </Link>
            <span className="rounded-md bg-zinc-900 px-3 py-1 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
              Analytics
            </span>
          </nav>
        </div>
      </div>
      <AnalyticsDashboard password={password} />
      <div className="pb-8" />
    </main>
  );
}

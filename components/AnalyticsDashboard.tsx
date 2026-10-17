"use client";

import { useEffect, useState } from "react";

type Bucket = { _id: string; count: number };
type VisitRow = {
  _id: string;
  createdAt: string;
  page: string;
  device: string;
  browser: string;
  os: string;
  country: string;
  city: string;
  org: string;
  ip: string;
  referrer: string;
  durationSec: number;
};

type Stats = {
  totalVisits: number;
  uniqueVisitors: number;
  avgSec: number;
  todayVisits: number;
  perDay: Bucket[];
  byDevice: Bucket[];
  byBrowser: Bucket[];
  byPage: Bucket[];
  byCountry: Bucket[];
  recent: VisitRow[];
};

const cardCls =
  "rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950";

function fmtDur(sec: number) {
  const s = Math.round(sec || 0);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function hostOf(ref: string) {
  if (!ref) return "Direct";
  try {
    return new URL(ref).hostname.replace(/^www\./, "");
  } catch {
    return ref;
  }
}

function Bars({ items }: { items: Bucket[] }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div className="space-y-2">
      {items.length === 0 && (
        <p className="text-sm text-zinc-500">No data yet.</p>
      )}
      {items.map((i) => (
        <div key={i._id || "unknown"} className="flex items-center gap-3 text-sm">
          <span className="w-28 shrink-0 truncate text-zinc-600 dark:text-zinc-400">
            {i._id || "Unknown"}
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
            <div
              className="h-full rounded-full bg-zinc-900 dark:bg-zinc-100"
              style={{ width: `${Math.max(2, (i.count / max) * 100)}%` }}
            />
          </div>
          <span className="w-10 shrink-0 text-right font-medium">{i.count}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsDashboard({ password }: { password: string }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/visits/stats", { headers: { "x-admin-password": password } })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setStats)
      .catch(() => setError("Could not load analytics."));
  }, [password]);

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!stats) return <p className="text-sm text-zinc-500">Loading analytics…</p>;

  const cards = [
    { label: "Total visits", value: stats.totalVisits.toLocaleString("en-IN") },
    { label: "Unique visitors", value: stats.uniqueVisitors.toLocaleString("en-IN") },
    { label: "Avg time / visit", value: fmtDur(stats.avgSec) },
    { label: "Visits today", value: stats.todayVisits.toLocaleString("en-IN") },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className={cardCls}>
            <p className="text-xs uppercase tracking-wide text-zinc-500">{c.label}</p>
            <p className="mt-1 text-2xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>

      <div className={cardCls}>
        <h3 className="mb-4 text-sm font-bold">Visits — last 14 days</h3>
        <Bars items={stats.perDay.map((d) => ({ _id: d._id.slice(5), count: d.count }))} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={cardCls}>
          <h3 className="mb-4 text-sm font-bold">Devices</h3>
          <Bars items={stats.byDevice} />
        </div>
        <div className={cardCls}>
          <h3 className="mb-4 text-sm font-bold">Browsers</h3>
          <Bars items={stats.byBrowser} />
        </div>
        <div className={cardCls}>
          <h3 className="mb-4 text-sm font-bold">Pages</h3>
          <Bars items={stats.byPage} />
        </div>
        <div className={cardCls}>
          <h3 className="mb-4 text-sm font-bold">Countries</h3>
          <Bars items={stats.byCountry} />
        </div>
      </div>

      <div className={cardCls}>
        <h3 className="mb-4 text-sm font-bold">Recent visits</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
                <th className="pb-2 pr-3 font-medium">Date & time</th>
                <th className="pb-2 pr-3 font-medium">Page</th>
                <th className="pb-2 pr-3 font-medium">Device</th>
                <th className="pb-2 pr-3 font-medium">Browser</th>
                <th className="pb-2 pr-3 font-medium">OS</th>
                <th className="pb-2 pr-3 font-medium">Location</th>
                <th className="pb-2 pr-3 font-medium">Organization</th>
                <th className="pb-2 pr-3 font-medium">IP</th>
                <th className="pb-2 pr-3 font-medium">From</th>
                <th className="pb-2 font-medium">Time spent</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((v) => (
                <tr
                  key={v._id}
                  className="border-b border-zinc-100 last:border-0 dark:border-zinc-900"
                >
                  <td className="whitespace-nowrap py-2 pr-3 text-zinc-600 dark:text-zinc-400">
                    {fmtDate(v.createdAt)}
                  </td>
                  <td className="py-2 pr-3">{v.page}</td>
                  <td className="py-2 pr-3">{v.device}</td>
                  <td className="py-2 pr-3">{v.browser}</td>
                  <td className="py-2 pr-3">{v.os}</td>
                  <td className="whitespace-nowrap py-2 pr-3">
                    {v.city ? `${v.city}, ${v.country}` : v.country}
                  </td>
                  <td className="max-w-[160px] truncate py-2 pr-3" title={v.org || v.ip}>
                    {v.org || v.ip}
                  </td>
                  <td className="whitespace-nowrap py-2 pr-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                    {v.ip}
                  </td>
                  <td className="max-w-[140px] truncate py-2 pr-3 text-zinc-600 dark:text-zinc-400">
                    {hostOf(v.referrer)}
                  </td>
                  <td className="whitespace-nowrap py-2">{fmtDur(v.durationSec)}</td>
                </tr>
              ))}
              {stats.recent.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-4 text-zinc-500">
                    No visits recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

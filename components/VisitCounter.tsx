"use client";

import { useEffect, useState } from "react";

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

function fmtDur(sec: number) {
  if (sec < 60) return `${sec}s`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s ? `${m}m ${s}s` : `${m}m`;
}

// Public visitor counter shown at the very bottom of the page.
export default function VisitCounter() {
  const [data, setData] = useState<{ totalVisits: number; avgSec: number } | null>(
    null
  );

  useEffect(() => {
    fetch("/api/visits/public")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || data.totalVisits === 0) return null;

  return (
    <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
      {fmt(data.totalVisits)} visits · avg {fmtDur(data.avgSec)} per visit
    </p>
  );
}

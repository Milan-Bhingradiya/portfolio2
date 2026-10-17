"use client";

import { useEffect } from "react";

// First-party visit tracking: records a page view on load and beacons
// time-spent when the tab hides or closes. Skips /admin pages.
export default function AnalyticsTracker() {
  useEffect(() => {
    const page = window.location.pathname;
    if (page.startsWith("/admin")) return;

    let sessionId = "";
    try {
      sessionId = sessionStorage.getItem("vsid") || "";
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("vsid", sessionId);
      }
    } catch {
      sessionId = Math.random().toString(36).slice(2);
    }

    const start = Date.now();
    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        page,
        referrer: document.referrer || "",
      }),
    }).catch(() => {});

    const sendTime = () => {
      const durationSec = Math.round((Date.now() - start) / 1000);
      const blob = new Blob(
        [JSON.stringify({ sessionId, page, durationSec })],
        { type: "application/json" }
      );
      navigator.sendBeacon("/api/visits/heartbeat", blob);
    };

    const onVis = () => {
      if (document.visibilityState === "hidden") sendTime();
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pagehide", sendTime);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pagehide", sendTime);
    };
  }, []);

  return null;
}

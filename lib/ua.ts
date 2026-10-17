// Minimal user-agent parser: device type, browser, OS. No dependency.

export function parseUA(ua: string) {
  const u = ua || "";
  const device = /tablet|ipad/i.test(u)
    ? "Tablet"
    : /mobile|android|iphone|ipod/i.test(u)
      ? "Mobile"
      : "Desktop";

  let browser = "Other";
  if (/edg\/|edga|edgios/i.test(u)) browser = "Edge";
  else if (/opr\/|opera/i.test(u)) browser = "Opera";
  else if (/firefox|fxios/i.test(u)) browser = "Firefox";
  else if (/chrome|crios/i.test(u)) browser = "Chrome";
  else if (/safari/i.test(u)) browser = "Safari";

  let os = "Other";
  if (/windows/i.test(u)) os = "Windows";
  else if (/android/i.test(u)) os = "Android";
  else if (/iphone|ipad/i.test(u)) os = "iOS";
  else if (/mac os|macintosh/i.test(u)) os = "macOS";
  else if (/linux/i.test(u)) os = "Linux";

  return { device, browser, os };
}

export function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Best-effort IP geolocation + organization lookup (free ip-api.com, no key).
// For corporate IPs the `org` field reveals the visiting company (B2B-style
// reverse IP lookup, like Lead Forensics/Clearbit's free tier). Never throws.
export async function geoLookup(
  ip: string
): Promise<{ country: string; city: string; org: string }> {
  const fallback = { country: "Unknown", city: "", org: "" };
  if (!ip || ip === "unknown" || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.")) {
    return fallback;
  }
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch(
      `http://ip-api.com/json/${ip}?fields=status,country,city,org`,
      { signal: ctrl.signal }
    );
    clearTimeout(t);
    const data = await res.json();
    if (data?.status === "success") {
      return {
        country: data.country || "Unknown",
        city: data.city || "",
        org: data.org || "",
      };
    }
  } catch {
    /* geo unavailable */
  }
  return fallback;
}

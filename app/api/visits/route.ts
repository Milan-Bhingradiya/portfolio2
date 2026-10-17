import { dbConnect } from "@/lib/db";
import Visit from "@/models/Visit";
import { parseUA, clientIp, geoLookup } from "@/lib/ua";

// Records one page view. Public endpoint (no auth) — first-party analytics.
export async function POST(req: Request) {
  try {
    const { sessionId, page, referrer } = await req.json();
    const ua = req.headers.get("user-agent") || "";
    const { device, browser, os } = parseUA(ua);
    const ip = clientIp(req);

    await dbConnect();
    const doc = await Visit.create({
      sessionId: sessionId || "unknown",
      page: page || "/",
      referrer: referrer || "",
      userAgent: ua,
      device,
      browser,
      os,
      ip,
      country: "Unknown",
      city: "",
      org: "",
    });

    // Fill in location + organization without delaying the response.
    geoLookup(ip).then(async ({ country, city, org }) => {
      if (country !== "Unknown" || org) {
        await Visit.updateOne({ _id: doc._id }, { $set: { country, city, org } });
      }
    });

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

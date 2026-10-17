import { dbConnect } from "@/lib/db";
import Visit from "@/models/Visit";

// Receives time-spent beacons; keeps the max duration per page view.
export async function POST(req: Request) {
  try {
    let body: { sessionId?: string; page?: string; durationSec?: number };
    try {
      body = await req.json();
    } catch {
      body = JSON.parse(await req.text());
    }
    const { sessionId, page, durationSec } = body;
    if (!sessionId || typeof durationSec !== "number") {
      return Response.json({ ok: false }, { status: 400 });
    }
    await dbConnect();
    const latest = await Visit.findOne({ sessionId, page: page || "/" }).sort({
      createdAt: -1,
    });
    if (latest && durationSec > (latest.durationSec || 0)) {
      latest.durationSec = durationSec;
      await latest.save();
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}

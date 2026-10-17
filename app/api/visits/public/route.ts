import { dbConnect } from "@/lib/db";
import Visit from "@/models/Visit";

// Public counters for the footer. No personal data.
export async function GET() {
  try {
    await dbConnect();
    const [totalVisits, avgAgg] = await Promise.all([
      Visit.countDocuments(),
      Visit.aggregate([{ $group: { _id: null, avg: { $avg: "$durationSec" } } }]),
    ]);
    return Response.json({
      totalVisits,
      avgSec: Math.round(avgAgg[0]?.avg || 0),
    });
  } catch {
    return Response.json({ totalVisits: 0, avgSec: 0 });
  }
}

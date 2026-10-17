import { dbConnect } from "@/lib/db";
import Visit from "@/models/Visit";

function authorized(req: Request) {
  const password = req.headers.get("x-admin-password");
  return (
    !!process.env.ADMIN_PASSWORD &&
    !!password &&
    password === process.env.ADMIN_PASSWORD
  );
}

async function breakdown(field: string, limit = 8) {
  return Visit.aggregate([
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
  ]);
}

// Admin-only analytics report.
export async function GET(req: Request) {
  if (!authorized(req)) {
    return new Response("Unauthorized", { status: 401 });
  }
  await dbConnect();

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const twoWeeksAgo = new Date(Date.now() - 14 * 86400000);

  const [totalVisits, uniqueSessions, avgAgg, todayVisits, perDay, recent] =
    await Promise.all([
      Visit.countDocuments(),
      Visit.distinct("sessionId").then((a) => a.length),
      Visit.aggregate([{ $group: { _id: null, avg: { $avg: "$durationSec" } } }]),
      Visit.countDocuments({ createdAt: { $gte: dayStart } }),
      Visit.aggregate([
        { $match: { createdAt: { $gte: twoWeeksAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Visit.find().sort({ createdAt: -1 }).limit(100).lean(),
    ]);

  const [byDevice, byBrowser, byPage, byCountry] = await Promise.all([
    breakdown("device"),
    breakdown("browser"),
    breakdown("page"),
    breakdown("country"),
  ]);

  return Response.json({
    totalVisits,
    uniqueVisitors: uniqueSessions,
    avgSec: Math.round(avgAgg[0]?.avg || 0),
    todayVisits,
    perDay,
    byDevice,
    byBrowser,
    byPage,
    byCountry,
    recent,
  });
}

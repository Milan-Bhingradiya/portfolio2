import mongoose, { Schema } from "mongoose";

// One document per page view. durationSec is filled in by the heartbeat beacon.
const VisitSchema = new Schema(
  {
    sessionId: { type: String, index: true },
    page: String,
    referrer: String,
    userAgent: String,
    device: String, // Mobile | Tablet | Desktop
    browser: String,
    os: String,
    country: String,
    city: String,
    org: String, // company / ISP from reverse IP lookup (B2B visitor intel)
    ip: String,
    durationSec: { type: Number, default: 0 },
  },
  { timestamps: true }
);

VisitSchema.index({ createdAt: -1 });

export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

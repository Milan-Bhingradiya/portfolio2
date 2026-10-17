import mongoose, { Schema } from "mongoose";

// Single editable document (key: "main") holding the whole portfolio.
const SiteContentSchema = new Schema(
  {
    key: { type: String, unique: true, default: "main" },
    profile: {
      name: String,
      roles: [String],
      tagline: String,
      email: String,
      phone: String,
      github: String,
      linkedin: String,
      location: String,
    },
    stats: [{ value: String, label: String }],
    experience: [
      {
        company: String,
        role: String,
        period: String,
        location: String,
        points: [String],
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        tech: [String],
        link: String,
        badge: String,
        category: String,
      },
    ],
    skillGroups: [{ title: String, skills: [String] }],
    achievements: [{ title: String, detail: String }],
    education: {
      school: String,
      degree: String,
      period: String,
      extra: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SiteContent ||
  mongoose.model("SiteContent", SiteContentSchema);

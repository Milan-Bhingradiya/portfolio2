import { dbConnect } from "./db";
import SiteContent from "@/models/SiteContent";
import * as fallback from "@/data/portfolio";

export type SiteContentData = {
  profile: {
    name: string;
    roles: string[];
    tagline: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    location: string;
  };
  stats: { value: string; label: string }[];
  experience: {
    company: string;
    role: string;
    period: string;
    location: string;
    points: string[];
  }[];
  projects: {
    title: string;
    description: string;
    tech: string[];
    link?: string;
    badge?: string;
    category: "AI" | "Web" | "App";
  }[];
  skillGroups: { title: string; skills: string[] }[];
  achievements: { title: string; detail: string }[];
  education: { school: string; degree: string; period: string; extra: string };
};

function fallbackContent(): SiteContentData {
  return {
    profile: fallback.profile,
    stats: fallback.stats,
    experience: fallback.experience,
    projects: fallback.projects as SiteContentData["projects"],
    skillGroups: fallback.skillGroups,
    achievements: fallback.achievements,
    education: fallback.education,
  };
}

function clean(doc: Record<string, unknown>): SiteContentData {
  const data = JSON.parse(
    JSON.stringify(doc, (key, value) => (key === "_id" || key === "__v" ? undefined : value))
  ) as Record<string, unknown>;
  delete data.key;
  delete data.createdAt;
  delete data.updatedAt;
  return data as unknown as SiteContentData;
}

/**
 * Returns the portfolio content: MongoDB first (seeding from the static
 * data file on first use), static fallback if the DB is unreachable —
 * so `next build` never fails because of the database.
 */
export async function getContent(): Promise<SiteContentData> {
  try {
    await dbConnect();
    let doc = await SiteContent.findOne({ key: "main" }).lean();
    if (!doc) {
      const created = await SiteContent.create({ key: "main", ...fallbackContent() });
      return clean(created.toObject());
    }
    return clean(doc as unknown as Record<string, unknown>);
  } catch {
    return fallbackContent();
  }
}

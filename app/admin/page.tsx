"use client";

import { useState } from "react";
import Link from "next/link";
import type { SiteContentData } from "@/lib/content";

const inputCls =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-600 dark:focus:border-zinc-100";
const labelCls = "mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500";
const cardCls =
  "rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950";
const btnPrimary =
  "rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300";
const btnGhost =
  "rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-100 dark:hover:text-zinc-100";
const btnDanger =
  "rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:border-red-600 dark:border-red-900 dark:text-red-400";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={cardCls}>
      <h2 className="mb-4 text-base font-bold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelCls}>{label}</span>
      {children}
    </label>
  );
}

const emptyProject = {
  title: "",
  description: "",
  tech: [] as string[],
  link: "",
  badge: "",
  category: "Web" as "AI" | "Web" | "App",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [content, setContent] = useState<SiteContentData | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const unlock = async () => {
    setLoading(true);
    setStatus("");
    try {
      const res = await fetch("/api/content");
      if (!res.ok) throw new Error();
      setContent(await res.json());
      try {
        sessionStorage.setItem("admin_pw", password);
      } catch {
        /* storage unavailable */
      }
      setUnlocked(true);
    } catch {
      setStatus("Could not load content.");
    }
    setLoading(false);
  };

  const save = async () => {
    if (!content) return;
    setStatus("Saving…");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(content),
    });
    setStatus(
      res.ok
        ? "Saved — homepage updated."
        : res.status === 401
          ? "Wrong admin password."
          : "Save failed."
    );
  };

  const set = (patch: Partial<SiteContentData>) =>
    setContent((c) => (c ? { ...c, ...patch } : c));

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-md px-6 py-24">
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Enter the admin password to edit the portfolio.
        </p>
        <div className="mt-6 space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && unlock()}
            placeholder="Admin password"
            className={inputCls}
          />
          <button onClick={unlock} disabled={loading} className={btnPrimary}>
            {loading ? "Loading…" : "Unlock"}
          </button>
          {status && <p className="text-sm text-red-600">{status}</p>}
        </div>
      </main>
    );
  }

  if (!content) return null;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-6 py-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Edit portfolio</h1>
          <nav className="flex gap-1 rounded-lg border border-zinc-200 p-1 dark:border-zinc-800">
            <span className="rounded-md bg-zinc-900 px-3 py-1 text-sm font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
              Content
            </span>
            <Link
              href="/admin/analytics"
              className="rounded-md px-3 py-1 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              Analytics
            </Link>
          </nav>
        </div>
        <button onClick={save} className={btnPrimary}>
          Save all
        </button>
      </div>
      {status && <p className="text-sm text-zinc-600 dark:text-zinc-400">{status}</p>}

      <Section title="Profile">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Name">
            <input
              className={inputCls}
              value={content.profile.name}
              onChange={(e) => set({ profile: { ...content.profile, name: e.target.value } })}
            />
          </Field>
          <Field label="Roles (comma separated)">
            <input
              className={inputCls}
              value={content.profile.roles.join(", ")}
              onChange={(e) =>
                set({
                  profile: {
                    ...content.profile,
                    roles: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  },
                })
              }
            />
          </Field>
        </div>
        <Field label="Tagline">
          <textarea
            className={inputCls}
            rows={3}
            value={content.profile.tagline}
            onChange={(e) => set({ profile: { ...content.profile, tagline: e.target.value } })}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Email">
            <input
              className={inputCls}
              value={content.profile.email}
              onChange={(e) => set({ profile: { ...content.profile, email: e.target.value } })}
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputCls}
              value={content.profile.phone}
              onChange={(e) => set({ profile: { ...content.profile, phone: e.target.value } })}
            />
          </Field>
          <Field label="GitHub URL">
            <input
              className={inputCls}
              value={content.profile.github}
              onChange={(e) => set({ profile: { ...content.profile, github: e.target.value } })}
            />
          </Field>
          <Field label="LinkedIn URL">
            <input
              className={inputCls}
              value={content.profile.linkedin}
              onChange={(e) => set({ profile: { ...content.profile, linkedin: e.target.value } })}
            />
          </Field>
        </div>
        <Field label="Location">
          <input
            className={inputCls}
            value={content.profile.location}
            onChange={(e) => set({ profile: { ...content.profile, location: e.target.value } })}
          />
        </Field>
      </Section>

      <Section title="Projects">
        {content.projects.map((p, i) => (
          <div key={i} className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">#{i + 1}</span>
              <button
                className={btnDanger}
                onClick={() =>
                  set({ projects: content.projects.filter((_, j) => j !== i) })
                }
              >
                Delete
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Title">
                <input
                  className={inputCls}
                  value={p.title}
                  onChange={(e) => {
                    const projects = [...content.projects];
                    projects[i] = { ...p, title: e.target.value };
                    set({ projects });
                  }}
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Category">
                  <select
                    className={inputCls}
                    value={p.category}
                    onChange={(e) => {
                      const projects = [...content.projects];
                      projects[i] = { ...p, category: e.target.value as "AI" | "Web" | "App" };
                      set({ projects });
                    }}
                  >
                    <option>AI</option>
                    <option>Web</option>
                    <option>App</option>
                  </select>
                </Field>
                <Field label="Badge (optional)">
                  <input
                    className={inputCls}
                    value={p.badge || ""}
                    onChange={(e) => {
                      const projects = [...content.projects];
                      projects[i] = { ...p, badge: e.target.value };
                      set({ projects });
                    }}
                  />
                </Field>
              </div>
            </div>
            <Field label="Description">
              <textarea
                className={inputCls}
                rows={3}
                value={p.description}
                onChange={(e) => {
                  const projects = [...content.projects];
                  projects[i] = { ...p, description: e.target.value };
                  set({ projects });
                }}
              />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Tech (comma separated)">
                <input
                  className={inputCls}
                  value={p.tech.join(", ")}
                  onChange={(e) => {
                    const projects = [...content.projects];
                    projects[i] = {
                      ...p,
                      tech: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    };
                    set({ projects });
                  }}
                />
              </Field>
              <Field label="Link (optional)">
                <input
                  className={inputCls}
                  value={p.link || ""}
                  onChange={(e) => {
                    const projects = [...content.projects];
                    projects[i] = { ...p, link: e.target.value };
                    set({ projects });
                  }}
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          className={btnGhost}
          onClick={() => set({ projects: [...content.projects, { ...emptyProject }] })}
        >
          + Add project
        </button>
      </Section>

      <Section title="Experience">
        {content.experience.map((job, i) => (
          <div key={i} className="space-y-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{job.company || `#${i + 1}`}</span>
              <button
                className={btnDanger}
                onClick={() =>
                  set({ experience: content.experience.filter((_, j) => j !== i) })
                }
              >
                Delete
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Company">
                <input
                  className={inputCls}
                  value={job.company}
                  onChange={(e) => {
                    const experience = [...content.experience];
                    experience[i] = { ...job, company: e.target.value };
                    set({ experience });
                  }}
                />
              </Field>
              <Field label="Role">
                <input
                  className={inputCls}
                  value={job.role}
                  onChange={(e) => {
                    const experience = [...content.experience];
                    experience[i] = { ...job, role: e.target.value };
                    set({ experience });
                  }}
                />
              </Field>
              <Field label="Period">
                <input
                  className={inputCls}
                  value={job.period}
                  onChange={(e) => {
                    const experience = [...content.experience];
                    experience[i] = { ...job, period: e.target.value };
                    set({ experience });
                  }}
                />
              </Field>
              <Field label="Location">
                <input
                  className={inputCls}
                  value={job.location}
                  onChange={(e) => {
                    const experience = [...content.experience];
                    experience[i] = { ...job, location: e.target.value };
                    set({ experience });
                  }}
                />
              </Field>
            </div>
            <Field label="Points (one per line)">
              <textarea
                className={inputCls}
                rows={4}
                value={job.points.join("\n")}
                onChange={(e) => {
                  const experience = [...content.experience];
                  experience[i] = {
                    ...job,
                    points: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean),
                  };
                  set({ experience });
                }}
              />
            </Field>
          </div>
        ))}
        <button
          className={btnGhost}
          onClick={() =>
            set({
              experience: [
                ...content.experience,
                { company: "", role: "", period: "", location: "", points: [] },
              ],
            })
          }
        >
          + Add experience
        </button>
      </Section>

      <Section title="Skills">
        {content.skillGroups.map((g, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
            <Field label="Group">
              <input
                className={inputCls}
                value={g.title}
                onChange={(e) => {
                  const skillGroups = [...content.skillGroups];
                  skillGroups[i] = { ...g, title: e.target.value };
                  set({ skillGroups });
                }}
              />
            </Field>
            <Field label="Skills (comma separated)">
              <input
                className={inputCls}
                value={g.skills.join(", ")}
                onChange={(e) => {
                  const skillGroups = [...content.skillGroups];
                  skillGroups[i] = {
                    ...g,
                    skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                  };
                  set({ skillGroups });
                }}
              />
            </Field>
            <button
              className={btnDanger}
              onClick={() =>
                set({ skillGroups: content.skillGroups.filter((_, j) => j !== i) })
              }
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className={btnGhost}
          onClick={() =>
            set({ skillGroups: [...content.skillGroups, { title: "", skills: [] }] })
          }
        >
          + Add group
        </button>
      </Section>

      <Section title="Stats">
        {content.stats.map((s, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-[1fr_2fr_auto] sm:items-end">
            <Field label="Value">
              <input
                className={inputCls}
                value={s.value}
                onChange={(e) => {
                  const stats = [...content.stats];
                  stats[i] = { ...s, value: e.target.value };
                  set({ stats });
                }}
              />
            </Field>
            <Field label="Label">
              <input
                className={inputCls}
                value={s.label}
                onChange={(e) => {
                  const stats = [...content.stats];
                  stats[i] = { ...s, label: e.target.value };
                  set({ stats });
                }}
              />
            </Field>
            <button
              className={btnDanger}
              onClick={() => set({ stats: content.stats.filter((_, j) => j !== i) })}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className={btnGhost}
          onClick={() => set({ stats: [...content.stats, { value: "", label: "" }] })}
        >
          + Add stat
        </button>
      </Section>

      <div className="flex items-center justify-between pb-8">
        <button onClick={save} className={btnPrimary}>
          Save all
        </button>
        {status && <p className="text-sm text-zinc-600 dark:text-zinc-400">{status}</p>}
      </div>
    </main>
  );
}

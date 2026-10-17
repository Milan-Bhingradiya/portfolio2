"use client";

import { useState } from "react";
import type { SiteContentData } from "@/lib/content";

type Category = "All" | "AI" | "Web" | "App";
const categories: Category[] = ["All", "AI", "Web", "App"];

export default function Projects({
  projects,
  github,
}: Pick<SiteContentData, "projects"> & { github: string }) {
  const [active, setActive] = useState<Category>("All");
  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-12">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight">Projects</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">
            Selected work from production systems and side projects.
          </p>
        </div>
        <div className="flex gap-1 rounded-lg border border-zinc-200 p-1 dark:border-zinc-800">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                active === c
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <article
            key={p.title}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold leading-snug">{p.title}</h3>
              <div className="flex shrink-0 gap-1.5">
                <span className="rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                  {p.category}
                </span>
                {p.badge && (
                  <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">
                    {p.badge}
                  </span>
                )}
              </div>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {p.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
              >
                View on GitHub
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </a>
            )}
          </article>
        ))}
      </div>

      <a
        href={github}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
      >
        More on GitHub
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      </a>
    </section>
  );
}

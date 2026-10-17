import type { SiteContentData } from "@/lib/content";

export default function Skills({
  skillGroups,
}: Pick<SiteContentData, "skillGroups">) {
  return (
    <section id="skills" className="py-12">
      <h2 className="text-xl font-bold tracking-tight">Skills</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {skillGroups.map((g) => (
          <div key={g.title}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              {g.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {g.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-zinc-200 px-2 py-0.5 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

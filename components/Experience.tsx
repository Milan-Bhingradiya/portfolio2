import type { SiteContentData } from "@/lib/content";

export default function Experience({
  experience,
}: Pick<SiteContentData, "experience">) {
  return (
    <section id="experience" className="py-12">
      <h2 className="text-xl font-bold tracking-tight">Experience</h2>
      <div className="mt-6 space-y-8">
        {experience.map((job) => (
          <article
            key={job.company}
            className="relative border-l-2 border-zinc-200 pl-6 dark:border-zinc-800"
          >
            <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-zinc-900 dark:bg-zinc-100" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold">{job.company}</h3>
              <span className="text-sm text-zinc-500">{job.period}</span>
            </div>
            <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              {job.role} · {job.location}
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {job.points.map((point, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

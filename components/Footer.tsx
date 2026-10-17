import type { SiteContentData } from "@/lib/content";

export default function Footer({
  profile,
  achievements,
  education,
}: Pick<SiteContentData, "profile" | "achievements" | "education">) {
  return (
    <footer id="contact" className="pb-16 pt-12">
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-bold tracking-tight">Beyond the code</h2>
        <div className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
          {achievements.map((a) => (
            <p key={a.title}>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {a.title}:
              </span>{" "}
              {a.detail}
            </p>
          ))}
          <p>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {education.school}:
            </span>{" "}
            {education.degree} ({education.period}) — {education.extra}
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Have something interesting to build?
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-3 inline-block rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {profile.email}
        </a>
        <p className="mt-2 text-sm text-zinc-500">{profile.phone}</p>
      </div>

      <p className="mt-10 text-center text-xs text-zinc-400 dark:text-zinc-600">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </p>
    </footer>
  );
}

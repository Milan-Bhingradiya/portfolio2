import Image from "next/image";
import type { SiteContentData } from "@/lib/content";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12v3.14c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

export default function Hero({
  profile,
  stats,
}: Pick<SiteContentData, "profile" | "stats">) {
  const links = [
    { label: "GitHub", href: profile.github, Icon: GithubIcon },
    { label: "LinkedIn", href: profile.linkedin, Icon: LinkedinIcon },
    { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
  ];

  return (
    <header className="pt-10 pb-12 md:pt-14 md:pb-16">
      <div className="group w-36 shrink-0 sm:w-40">
        <div className="relative aspect-square">
          <Image
            src="/images/normal.png"
            alt="Pencil sketch portrait of Milan Bhingradiya"
            width={1080}
            height={1080}
            priority
            className="portrait-img absolute inset-0 aspect-square w-full rounded-full object-cover transition-opacity duration-300 group-hover:opacity-0"
          />
          <Image
            src="/images/sunglasses.png"
            alt="Pencil sketch portrait of Milan Bhingradiya wearing dark sunglasses"
            width={1080}
            height={1080}
            className="portrait-img absolute inset-0 aspect-square w-full rounded-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      </div>

      <h1 className="mt-5 text-xl font-bold tracking-tight">
        {profile.name}
      </h1>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">
        {profile.roles.join(" · ")}
      </p>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {profile.tagline}
      </p>

      <div className="mt-6 flex items-center gap-2">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-100 dark:hover:text-zinc-100"
          >
            <Icon />
          </a>
        ))}
        <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-500">
          {profile.location}
        </span>
      </div>

      <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-zinc-200 bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-800 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white px-5 py-4 dark:bg-zinc-950">
            <dt className="order-2 mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              {s.label}
            </dt>
            <dd className="text-xl font-bold tracking-tight">{s.value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

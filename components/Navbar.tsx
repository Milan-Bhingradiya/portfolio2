import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "experience", href: "#experience" },
  { label: "projects", href: "#projects" },
  { label: "contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
      <Link
        href="/"
        className="font-mono text-sm lowercase tracking-tight text-zinc-900 dark:text-zinc-100"
      >
        milan bhingradiya
      </Link>
      <div className="flex items-center gap-5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="font-mono text-sm lowercase text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            {l.label}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}

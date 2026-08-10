import Link from "next/link";
import { PILLARS } from "@/lib/data";

export default function Home() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-zinc-50 sm:text-5xl">
        Mon nom c&apos;est{" "}
        <span className="text-cyan-300">Guy Fleury Irankunda</span>...
        <br />
        <span className="text-zinc-300">
          here you can see everything to know about me.
        </span>
      </h1>

      <nav className="mt-12 flex flex-wrap items-center justify-center gap-4">
        {PILLARS.map((p) => (
          <Link
            key={p.id}
            href={p.route}
            className="rounded-full border px-6 py-2.5 text-sm font-medium uppercase tracking-widest transition hover:scale-105"
            style={{ borderColor: p.color, color: p.color }}
          >
            {p.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}


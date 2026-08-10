import Link from "next/link";
import { PILLARS } from "@/lib/data";

/* Hero principal de la page d'accueil.
   Présente le nom + la navigation vers les 3 piliers (3D interactive).
   Composant serveur — statique, zéro JS client. */
export default function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-20 px-6 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-zinc-100 sm:text-6xl">
          Mon nom c&apos;est{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">
            Guy Fleury Irankunda
          </span>
          <span aria-hidden="true">…</span>
        </h1>
        <p className="text-pretty text-base text-zinc-400 sm:text-xl">
          Développeur Junior passionné par les projets ancrés dans la réalité.
          Ici, vous pouvez voir tout ce qu&apos;il est nécessaire de savoir sur
          moi — décrivez simplement l&apos;un des piliers ci-dessous pour
          plonger dans l&apos;Univers 3D.
        </p>
      </div>

      <nav
        aria-label="Navigation vers les piliers du portfolio"
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {PILLARS.map((p) => (
          <Link
            key={p.id}
            href={p.route}
            aria-label={`Découvrir le pilier ${p.label}`}
            className="inline-flex items-center justify-center rounded-full border border-zinc-600 px-7 py-3 text-sm font-medium uppercase tracking-widest text-zinc-200 ring-cyan-300/40 transition-all duration-200 hover:scale-105 hover:border-cyan-300 hover:text-cyan-300 hover:ring-2 hover:ring-offset-2 hover:ring-offset-zinc-950"
            style={{ borderColor: p.color, color: p.color }}
          >
            {p.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}

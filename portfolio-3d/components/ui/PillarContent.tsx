import { PILLARS, PILLAR_SECTIONS, type PillarId } from "@/lib/data";

/** Contenu UI scrollable du pilier (Milestone 8/9).
    Thematise par couleur de pilier ; defile en premier plan pendant que le
    triangle 3D fond en arriere-plan (recul — Milestone 9). */
export default function PillarContent({ id }: { id: PillarId }) {
  const pillar = PILLARS.find((p) => p.id === id);
  const sections = pillar ? PILLAR_SECTIONS[id] : [];
  if (!pillar) return null;

  return (
    <div
      id="pillar-content"
      className="mx-auto mt-4 grid w-full max-w-3xl gap-2"
    >
      {sections.map((s, i) => (
        <section
          key={i}
          className="flex min-h-[64vh] flex-col gap-3 rounded-xl border border-white/5 p-6 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <h2 className="text-2xl font-bold" style={{ color: pillar.color }}>
            {s.title}
          </h2>

          {s.links ? (
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {s.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/card flex flex-col gap-2 rounded-lg border border-white/10 bg-white/2 p-4 text-left transition-colors hover:border-white/25 hover:bg-white/4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-medium text-zinc-100">{l.label}</span>
                    {l.stack && (
                      <span
                        className="shrink-0 rounded px-2 py-0.5 text-xs font-medium uppercase opacity-85"
                        style={{
                          backgroundColor: `${pillar.color}20`,
                          color: pillar.color,
                        }}
                      >
                        {l.stack}
                      </span>
                    )}
                  </div>
                  {l.description && (
                    <p className="text-sm text-zinc-400">{l.description}</p>
                  )}
                  <span className="mt-auto text-xs text-cyan-300">github.com →</span>
                </a>
              ))}
            </div>
          ) : (
            <p className="text-zinc-300">{s.text}</p>
          )}
        </section>
      ))}
    </div>
  );
}

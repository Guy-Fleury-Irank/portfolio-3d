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
          <p className="text-zinc-300">{s.text}</p>
        </section>
      ))}
    </div>
  );
}

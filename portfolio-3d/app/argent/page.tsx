import BackButton from "@/components/ui/BackButton";

export default function ArgentPage() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <BackButton />
      <div className="text-center">
        <h1 className="text-4xl font-semibold uppercase tracking-widest text-[#10b981]">
          Argent
        </h1>
        <p className="mt-3 max-w-md text-zinc-300">
          Philosophie, Flux &amp; Marchés — contenu à venir (Milestone 12).
        </p>
      </div>
    </section>
  );
}

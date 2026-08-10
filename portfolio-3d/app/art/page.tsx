import BackButton from "@/components/ui/BackButton";

export default function ArtPage() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <BackButton />
      <div className="text-center">
        <h1 className="text-4xl font-semibold uppercase tracking-widest text-[#f59e0b]">
          Art
        </h1>
        <p className="mt-3 max-w-md text-zinc-300">
          Formes, Espace &amp; Son — contenu à venir (Milestone 11).
        </p>
      </div>
    </section>
  );
}

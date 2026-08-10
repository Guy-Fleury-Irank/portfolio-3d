import BackButton from "@/components/ui/BackButton";

export default function TravailPage() {
  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
      <BackButton />
      <div className="text-center">
        <h1 className="text-4xl font-semibold uppercase tracking-widest text-[#3b82f6]">
          Travail
        </h1>
        <p className="mt-3 max-w-md text-zinc-300">
          Engineering &amp; Systems — contenu à venir (Milestone 10).
        </p>
      </div>
    </section>
  );
}

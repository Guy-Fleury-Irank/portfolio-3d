import type { Metadata } from "next";
import PillarFrame from "@/components/ui/PillarFrame";

export const metadata: Metadata = {
  title: "Travail — Guy Fleury Irankunda",
  description:
    "Engineering & Systems — projets JavaScript, Java (Spring Boot / Hibernate), TypeScript et HTML/CSS.",
};

export default function TravailPage() {
  return (
    <PillarFrame
      id="travail"
      description="Engineering & Systems — projets JavaScript, Java (Spring Boot / Hibernate), TypeScript et HTML/CSS."
    >
      <p className="text-sm text-zinc-400">
        Cartes projet ci-dessus → dépôts GitHub. Contenu enrichi (lecteurs /
        vidéos) viendra s&apos;ajouter prochainement (M11 / M12).
      </p>
    </PillarFrame>
  );
}

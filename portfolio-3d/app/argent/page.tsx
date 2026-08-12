import type { Metadata } from "next";
import PillarFrame from "@/components/ui/PillarFrame";

export const metadata: Metadata = {
  title: "Argent — Guy Fleury Irankunda",
  description:
    "Philosophie, Flux & Marchés — lectures Predictive History, digital garden & ressources d'exploration.",
};

export default function ArgentPage() {
  return (
    <PillarFrame
      id="argent"
      description="Philosophie, Flux & Marchés — digital garden, lectures Predictive History, réflexions sur l'argent."
    >
      <p className="text-sm text-zinc-500">
        Bulles de pensée & ressources → Milestone 12.
      </p>
    </PillarFrame>
  );
}

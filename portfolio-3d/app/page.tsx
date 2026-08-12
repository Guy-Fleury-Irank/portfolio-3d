import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Guy Fleury Irankunda — Portfolio 3D",
  description:
    "Portfolio 3D interactif : Travail, Art, Argent — une structure triangulaire fractale dans l'espace profond.",
};

/* Page d'accueil — Hero + Footer. Le reste du canvas 3D est rendu en arrière-plan
   par <SiteCanvas /> (monté dans RootLayout), donc z-0 sous le contenu z-10. */
export default function Home() {
  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}



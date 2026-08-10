import Hero from "@/components/ui/Hero";
import Footer from "@/components/ui/Footer";

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



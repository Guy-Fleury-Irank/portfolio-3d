import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SceneCanvas from "@/components/three/SceneCanvas";
import RouteViewSync from "@/components/ui/RouteViewSync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guy Fleury Irankunda — Portfolio 3D",
  description:
    "Portfolio 3D interactif : Travail, Art, Argent — une structure triangulaire fractale dans l'espace profond.",
};

export const viewport: Viewport = {
  themeColor: "#05060f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Canvas 3D GLOBAL & PERSISTANT — monté une seule fois, jamais rechargé
            entre les navigations. « La caméra et l'objet bougent, pas le canvas. » */}
        <SceneCanvas />
        {/* Synchronise l'état 3D avec la route (clic sphère, liens, back/forward, URL). */}
        <RouteViewSync />
        {/* Contenu des pages par-dessus (z-10), fond transparent → la 3D reste visible. */}
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}


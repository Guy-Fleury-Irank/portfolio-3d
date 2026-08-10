/**
 * Bouton global « Retour / Accueil » — fixe en haut à gauche (guide §3.B).
 */
"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="fixed left-5 top-5 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200 backdrop-blur transition hover:border-white/35 hover:bg-white/10"
    >
      <span aria-hidden>←</span> Accueil
    </Link>
  );
}

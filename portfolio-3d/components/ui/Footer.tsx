/* Footer global — coordonnées + navigation légère.
   Composant serveur — apparaît en bas de chaque page et est recyclé dans M8+. */
const EMAIL = "guyfleuryirankunda2004@gmail.com";
const GITHUB = "https://github.com/Guy-Fleury-Irank";
const LOCATION = "Bujumbura, Burundi";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-white/10 py-12">
      <div className="px-6 text-center">
        <p className="text-sm text-zinc-400">
          Connectons-nous —{" "}
          <span className="text-zinc-200">{LOCATION}</span>
        </p>

        <div className="mt-4 flex flex-col items-center gap-2 text-center sm:flex-row sm:gap-8">
          <a
            href={`mailto:${EMAIL}`}
            className="text-sm font-medium text-zinc-300 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current hover:text-cyan-300"
          >
            E-mail
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-300 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current hover:text-cyan-300"
          >
            GitHub →
          </a>
        </div>

        <p className="mt-10 text-xs text-zinc-600">
          © {year} Guy Fleury Irankunda — Portfolio 3D interactif (Next.js 16,
          R3F, GLSL).
        </p>
      </div>
    </footer>
  );
}

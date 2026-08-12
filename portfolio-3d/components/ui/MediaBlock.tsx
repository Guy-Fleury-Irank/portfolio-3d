"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, type ComponentType } from "react";
import { useStore } from "@/store/useStore";
import type { PillarMedia } from "@/lib/data";

/** Props minimales du lecteur (types react-player v3.4 incomplets : `url` manquant). */
interface LightPlayerProps {
  url?: string | string[] | null;
  playing?: boolean;
  controls?: boolean;
  loop?: boolean;
  width?: string | number;
  height?: string | number;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  config?: object;
}

/** ReactPlayer (v3.4) chargé À LA DEMANDE (code-splitting) — lecteur léger. */
const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
      Chargement du lecteur…
    </div>
  ),
}) as unknown as ComponentType<LightPlayerProps>;

interface MediaBlockProps {
  media: PillarMedia[];
  accentColor: string;
}

/**
 * Lecteur média multi-définition (vidéo locale + playlist YouTube) + toggle
 * d'activation de l'audio spatial de la sphère Art (Milestone 11).
 */
export default function MediaBlock({ media, accentColor }: MediaBlockProps) {
  const artAudioEnabled = useStore((s) => s.artAudioEnabled);
  const setArtAudioEnabled = useStore((s) => s.setArtAudioEnabled);

  // Playlist aplatie avec index global (regroupée par groupe de média).
  const playlist = useMemo(() => {
    let gi = 0;
    return media.map((m) => ({
      title: m.title,
      items: m.items.map((it) => ({ label: it.label, url: it.url, idx: gi++ })),
    }));
  }, [media]);

  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Élément actif (recherche par index global).
  const current = useMemo(() => {
    for (const g of playlist) {
      const hit = g.items.find((it) => it.idx === active);
      if (hit) return hit;
    }
    return null;
  }, [playlist, active]);

  return (
    <div className="mt-2 flex flex-col gap-4">
      {current && (
        <div className="overflow-hidden rounded-lg border border-white/10">
          <div className="aspect-video w-full">
            <ReactPlayer
              url={current.url}
              playing={playing}
              controls
              width="100%"
              height="100%"
              config={{ file: { attributes: { preload: "metadata" } } }}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {playlist.map((g, gi) => (
          <div key={gi} className="flex flex-col gap-1">
            {g.title && (
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: accentColor }}
              >
                {g.title}
              </p>
            )}
            {g.items.map((it) => (
              <button
                key={it.url}
                type="button"
                aria-pressed={it.idx === active}
                onClick={() => {
                  setActive(it.idx);
                  setPlaying(true);
                }}
                className="rounded-lg border border-white/10 px-3 py-2 text-left text-sm text-zinc-300 transition-colors hover:bg-white/5"
                style={
                  it.idx === active
                    ? { borderColor: accentColor, color: accentColor }
                    : undefined
                }
              >
                {it.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Toggle audio spatial — l'utilisateur dépose son fichier plus tard. */}
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <button
          type="button"
          aria-pressed={artAudioEnabled}
          onClick={() => setArtAudioEnabled(!artAudioEnabled)}
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-amber-300/60 hover:text-amber-200"
          style={{
            ...(artAudioEnabled
              ? { borderColor: accentColor, color: accentColor }
              : {}),
          }}
        >
          {artAudioEnabled
            ? "Audio spatial actif sur la sphère Art"
            : "🎧 Activer l'audio spatial (sphère Art)"}
        </button>
        {!artAudioEnabled && (
          <span className="text-xs text-zinc-600">
            Déposez un fichier dans <code>public/audio/art-choir-spatial.mp3</code>
          </span>
        )}
      </div>
    </div>
  );
}
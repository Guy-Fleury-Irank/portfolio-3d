import PillarFrame from "@/components/ui/PillarFrame";

export default function ArtPage() {
  return (
    <PillarFrame
      id="art"
      description="Formes, Espace & Son — création 3D Blender, musique au piano, chants liturgiques russes."
    >
      <p className="text-sm text-zinc-400">
        Lecteur & playlist ci-dessous. Activez l&apos;audio spatial sur la sphère
        Art après avoir déposé votre fichier dans <code>public/audio/</code>.
      </p>
    </PillarFrame>
  );
}

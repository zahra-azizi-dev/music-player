import { getSongBySlug } from "@/lib/api";
import Image from "next/image";
import React from "react";
import SongSlugPlay from "@/components/songSlugPlay";
export default async function page({ params }) {
  const { slug } = await params;
  const song = await getSongBySlug(slug);
 return (
  <main className="relative min-h-[calc(100vh-72px)] overflow-hidden px-8 pb-32 pt-10">
    {/* subtle background glow */}
    <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-red-900/10 blur-3xl" />

    <div className="relative mx-auto max-w-6xl">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {song.coverUrl ? (
          <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.45)] md:h-56 md:w-56">
            <Image
              src={song.coverUrl}
              alt={song.title}
              fill
              unoptimized
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ) : (
          <div className="flex h-48 w-48 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 text-sm text-white/50 md:h-56 md:w-56">
            {song.title}
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
            Now Playing
          </p>

          <h2 className="text-3xl font-bold uppercase tracking-wide text-white md:text-5xl">
            {song.title}
          </h2>

          <h3 className="mt-3 text-base text-white/45 md:text-lg">
            {song.artist.name}
          </h3>

          <div className="mt-7">
            <SongSlugPlay song={song} />
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-white/[0.06] pt-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/20">
          Song
        </p>

        <p className="mt-2 text-sm text-white/30">
          Listen to {song.title} by {song.artist.name}
        </p>
      </div>
    </div>
  </main>
);
}

import { getAlbumBySlug } from "@/lib/api";
import Image from "next/image";
import SongCard from "@/components/SongCard";
import React from "react";

export default async function page({ params }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);

  return (
    <main className="min-h-screen px-5 pb-16 pt-8 sm:px-8 lg:px-10">
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-900/20 blur-3xl" />

        <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center">
          {album.coverUrl ? (
            <div className="group relative h-40 w-40 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:h-48 sm:w-48">
              <Image
                src={album.coverUrl}
                alt={album.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ) : (
            <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-2xl bg-neutral-800 text-sm text-white/50 sm:h-48 sm:w-48">
              {album.title}
            </div>
          )}

          {/* Album Info */}
          <div className="min-w-0 flex-1">

            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              Album
            </p>

            <h1 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-5xl">
              {album.title}
            </h1>

            <p className="mt-3 text-sm text-white/55">
              {album.artist.name}
            </p>

            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/30">
              {album.releaseYear}
            </p>

            <p className="mt-5 text-xs text-white/25">
              {album.songs.length} songs
            </p>

          </div>
        </div>
      </section>
      <section>

        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-red-500/70">
              Tracklist
            </p>

            <h2 className="text-2xl font-bold tracking-wide text-white">
              Songs
            </h2>
          </div>

          <span className="text-xs text-white/25">
            {album.songs.length} tracks
          </span>
        </div>

        <ul className="flex flex-col gap-2">
          {album.songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              songList={album.songs}
              layout="list"
            />
          ))}
        </ul>

      </section>
    </main>
  );
}
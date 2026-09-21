import React from "react";
import Link from "next/link";
import { getCategories, searchSongs } from "@/lib/api.js";
import Image from "next/image";
import SongCard from "@/components/SongCard";

export default async function search({ searchParams }) {
  const { q } = await searchParams;

  if (q) {
    const songs = await searchSongs(q);

    return (
      <main className="min-h-screen px-6 py-8 sm:px-8 lg:px-10">
        <div className="mb-7">
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-red-500/80">
            Search results for
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {q}
          </h1>
        </div>

        {songs.length === 0 ? (
          <p className="text-white/40">چیزی پیدا نشد</p>
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} songList={songs} />
            ))}
          </ul>
        )}
      </main>
    );
  }

  const categories = await getCategories();
  const mainCategories = categories.filter((genre) => !genre.parent);

  return (
    <main className="min-h-screen px-6 py-8 sm:px-8 lg:px-10">
      <div className="mb-7">
        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-red-500/80">
          Explore the collection
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Browse all
        </h1>
      </div>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-3 lg:grid-cols-4">
        {mainCategories.map((genre) => (
          <li key={genre.id}>
            <Link
              href={`/category/${genre.slug}`}
              className="group relative block aspect-[1.7/1] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
            >
              {genre.coverUrl ? (
                <>
                  <Image
                    src={genre.coverUrl}
                    alt={genre.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-500 transition-all duration-500 group-hover:w-full" />
                </>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-white/50">
                  {genre.name}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

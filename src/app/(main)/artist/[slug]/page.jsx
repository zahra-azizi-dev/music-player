import { getArtistBySlug } from "@/lib/api";
import { getAlbumsByArtist } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import SongCard from "@/components/SongCard";
import React from "react";

export default async function page({ params }) {
  const { slug } = await params;
  const albums = await getAlbumsByArtist(slug);
  const artist = await getArtistBySlug(slug);
  const hasAlbums = albums && albums.length > 0;

  const albumSongIds = albums.flatMap((album) => album.songs.map((s) => s.id));

  const songComplete = artist.songs.filter(
    (song) => !albumSongIds.includes(song.id),
  );

  return (
    <main className="min-h-screen px-5 pb-16 pt-8 sm:px-8 lg:px-10">
      <section className="relative mb-14 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-900/20 blur-3xl" />

        <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center">
          {artist.imageUrl ? (
            <div className="group relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-2xl sm:h-44 sm:w-44">
              <Image
                src={artist.imageUrl}
                alt={artist.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ) : (
            <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-2xl bg-neutral-800 text-sm text-white/50 sm:h-44 sm:w-44">
              {artist.name}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
              Artist
            </p>

            <h1 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-5xl">
              {artist.name}
            </h1>

            {artist.bio && (
              <p className="mt-4 max-w-2xl text-sm leading-6 text-white/45">
                {artist.bio}
              </p>
            )}
          </div>
        </div>
      </section>
      {hasAlbums && (
        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-red-500/70">
                Discography
              </p>

              <h2 className="text-2xl font-bold tracking-wide text-white">
                Albums
              </h2>
            </div>

            <span className="text-xs text-white/25">
              {albums.length} {albums.length === 1 ? "album" : "albums"}
            </span>
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {albums.map((album) => (
              <li key={album.id}>
                <Link href={`/album/${album.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/20 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]">
                    <Image
                      src={album.coverUrl}
                      alt={album.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />
                  </div>

                  <h3 className="mt-3 truncate text-sm font-semibold text-white/85 transition-colors group-hover:text-white">
                    {album.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      {songComplete.length > 0 && (
        <section>
          <div className="mb-6">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-red-500/70">
              More from the artist
            </p>

            <h2 className="text-2xl font-bold tracking-wide text-white">
              Greatest Hits
            </h2>
          </div>

          <ul className="flex flex-col gap-2">
            {songComplete.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                songList={songComplete}
                layout="list"
              />
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

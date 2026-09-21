"use client";
import { usePlayer } from "@/app/context/PlayerContext";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorite } from "@/app/context/FavoritContext";
import { Heart, Play, Pause } from "lucide-react";

export default function SongCard({ song, songList, layout }) {
  const { playSong, isPlaying, currentSong, togglePlay } = usePlayer();
  const { isFavorite, toggleFavorite } = useFavorite();

  const isThisSongPlaying = currentSong?.id === song.id && isPlaying;

  function handlePlayClick(e) {
    e.preventDefault();
    e.stopPropagation();

    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playSong(song, songList);
    }
  }
  function handleFavoritSong(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(song);
  }

  const isList = layout === "list";

  return (
    <li className={isList ? "flex items-center gap-3" : "w-full"}>
      <Link
        href={`/song/${song.slug}`}
        className={isList ? "flex items-center gap-3" : "block w-full"}
      >
        <div
          className={
            isList
              ? "flex items-center gap-3"
              : "group w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-3 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055] hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)]"
          }
        >
          <div
            className={
              isList
                ? "relative h-14 w-14 shrink-0 overflow-hidden rounded-xl"
                : "relative aspect-square w-full overflow-hidden rounded-xl"
            }
          >
            {song.coverUrl ? (
              <Image
                src={song.coverUrl}
                alt={song.title}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-white/50">
                {song.title}
              </div>
            )}
            {!isList && (
              <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-black/10 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  onClick={handlePlayClick}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-200 hover:scale-110"
                >
                  {isThisSongPlaying ? (
                    <Pause size={18} fill="currentColor" />
                  ) : (
                    <Play size={18} fill="currentColor" />
                  )}
                </button>

                <button
                  onClick={handleFavoritSong}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-red-400"
                >
                  <Heart
                    size={17}
                    className={isFavorite(song.id) ? "text-red-500" : ""}
                    fill={isFavorite(song.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
            )}
          </div>
          <div className={isList ? "min-w-0" : "mt-3 min-w-0"}>
            <p className="truncate text-sm font-semibold text-white">
              {song.title}
            </p>

            <p className="mt-1 truncate text-xs text-white/45">
              {song.artist?.name}
            </p>
          </div>
        </div>
      </Link>
      {isList && (
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <button
            onClick={handlePlayClick}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            {isThisSongPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-red-400">
            <Heart size={17} />
          </button>
        </div>
      )}
    </li>
  );
}

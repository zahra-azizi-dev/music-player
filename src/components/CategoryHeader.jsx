"use client";
import { usePlayer } from "@/app/context/PlayerContext";
import Image from "next/image";
import { Play, Pause, Shuffle } from "lucide-react";
import React from "react";

export default function CategoryHeader({ headerCategory }) {
  const {
    isPlaying,
    togglePlay,
    playSong,
    isShuffle,
    toggleShuffle,
    currentSong,
  } = usePlayer();
  function handlePlayClick() {
    if (currentSong?.id === headerCategory.songs[0].id) {
      togglePlay();
    } else {
      playSong(headerCategory.songs[0], headerCategory.songs);
    }
  }
  function handleShuffleClick() {
    const shuffledSongs = [...headerCategory.songs].sort(
      () => Math.random() - 0.5,
    );
    playSong(shuffledSongs[0], shuffledSongs);
    toggleShuffle();
  }
  return (
    <div className="mb-8 flex items-center gap-6">
      <div className="relative h-32 w-32 md:h-40 md:w-40 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={headerCategory.coverUrl}
          alt={headerCategory.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wide">
          {headerCategory.name}
        </h2>
        <h3 className="text-white/60 mt-2">
          {headerCategory.songs.length} songs
        </h3>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handlePlayClick}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff2a2a] text-white transition hover:scale-105"
        >
          {isPlaying ? <Pause fill="white" /> : <Play fill="white" />}
        </button>
        <button
          onClick={handleShuffleClick}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 backdrop-blur transition hover:bg-white/20"
        >
          <Shuffle className={isShuffle ? "text-[#ff2a2a]" : "text-white"} />
        </button>
      </div>
    </div>
  );
}

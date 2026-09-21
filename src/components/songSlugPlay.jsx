"use client";
import { usePlayer } from "@/app/context/PlayerContext";
import { Heart, Play, Pause } from "lucide-react";
import React from "react";

export default function SongSlugPlay({ song }) {
  const { isPlaying, togglePlay, playSong, currentSong } = usePlayer();
  function handlePlayClick() {
    if (currentSong?.id === song.id) {
      togglePlay();
    } else {
      playSong(song, [song]);
    }
  }
  const isThisPlaying = currentSong?.id == song.id && isPlaying;
  return (
    <div className="mb-8 flex items-center gap-6">
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlayClick}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff2a2a] text-white transition hover:scale-105"
        >
          {isThisPlaying? <Pause fill="white" /> : <Play fill="white" />}
        </button>
      </div>
    </div>
  );
}

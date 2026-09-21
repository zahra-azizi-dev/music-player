"use client";
import { usePlayer } from "@/app/context/PlayerContext";
import {
  Pause,
  Repeat,
  SkipBack,
  SkipForward,
  Download,
  Play,
  Shuffle,
  Repeat1,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";
function formatTime(time) {
  if (!time || isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
export default function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    currentTime,
    duration,
    audioRef,
    isShuffle,
    toggleShuffle,
    cycleRepeatMode,
    repeatMode,
    closePlayer,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.08] bg-[#0b0708]/95 px-4 py-2.5 shadow-[0_-10px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:px-6">
      <div className="mx-auto flex max-w-[1600px] items-center gap-5">
        <div className="flex min-w-0 w-[28%] items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg">
            <Image
              src={currentSong.coverUrl}
              alt={currentSong.title}
              fill
              className="object-cover"
            />

            {isPlaying && <div className="absolute inset-0 bg-black/15" />}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-white">
              {currentSong.title}
            </h2>

            <h3 className="mt-0.5 truncate text-xs text-white/40">
              {currentSong.artist?.name}
            </h3>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={cycleRepeatMode}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/[0.06] ${
                repeatMode !== "off"
                  ? "text-red-500"
                  : "text-white/40 hover:text-white"
              }`}
              aria-label="Repeat"
            >
              {repeatMode === "one" ? (
                <Repeat1 size={15} />
              ) : (
                <Repeat size={15} />
              )}
            </button>
            <button
              onClick={prevSong}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/[0.06] hover:text-white"
              aria-label="Previous"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlay}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.12)] transition duration-200 hover:scale-105 hover:bg-white"
            >
              {isPlaying ? (
                <Pause size={17} fill="currentColor" />
              ) : (
                <Play size={17} fill="currentColor" />
              )}
            </button>
            <button
              onClick={nextSong}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition hover:bg-white/[0.06] hover:text-white"
              aria-label="Next"
            >
              <SkipForward size={18} />
            </button>

            <button
              onClick={toggleShuffle}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/[0.06] ${
                isShuffle ? "text-red-500" : "text-white/40 hover:text-white"
              }`}
              aria-label="Shuffle"
            >
              <Shuffle size={15} />
            </button>
          </div>
          <div className="mt-1.5 flex w-full max-w-2xl items-center gap-2">
            <span className="w-9 text-right text-[10px] tabular-nums text-white/35">
              {formatTime(currentTime)}
            </span>

            <div
              className="group relative h-1 flex-1 cursor-pointer rounded-full bg-white/10"
              onClick={(e) => {
                const barWidth = e.currentTarget.clientWidth;
                const clickX = e.nativeEvent.offsetX;
                const percentage = clickX / barWidth;
                audioRef.current.currentTime = percentage * duration;
              }}
            >
              <div
                className="relative h-full rounded-full bg-gradient-to-r from-red-900 to-red-500 transition-all"
                style={{
                  width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                }}
              >
                <div className="absolute -right-1 -top-[2px] h-2 w-2 rounded-full bg-white opacity-0 shadow-md transition group-hover:opacity-100" />
              </div>
            </div>

            <span className="w-9 text-[10px] tabular-nums text-white/35">
              -{formatTime(duration - currentTime)}
            </span>
          </div>
        </div>
        <button
          onClick={closePlayer}
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition hover:bg-white/[0.06] hover:text-white"
          aria-label="Close player"
        >
          <X size={17} />
        </button>
      </div>
    </footer>
  );
}

"use client";
import { useFavorite } from "../../context/FavoritContext";
import SongCard from "@/components/SongCard";
import { Heart } from "lucide-react";
import React from "react";

export default function page() {
  const { favoriteSongs } = useFavorite();
  if (favoriteSongs.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-10 text-center">
        <Heart size={48} className="text-white/20" />
        <h2 className="text-xl font-semibold text-white">There is nothing</h2>
        <p className="text-sm text-white/40">liked your favorite songs</p>
      </div>
    );
  }
  return (
    <div className="p-10">
      <div className="p-7">
        <p className="mb-3  text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500">
          favorites Song
        </p>

        <h1 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-5xl">
          favorites Song{" "}
        </h1>
      </div>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
        {favoriteSongs.map((val) => (
          <SongCard key={val.id} song={val} songList={favoriteSongs} />
        ))}
      </ul>
    </div>
  );
}

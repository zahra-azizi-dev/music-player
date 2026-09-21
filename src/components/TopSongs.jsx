"use client";
import Carousel from "./Carousel";
import SongCard from "./SongCard";
import React from "react";

export default function TopSongs({ topSong }) {
  return (
    <Carousel items={topSong}>
      {(val, slideSize, totalItems) => (
        <div
          key={val.id}
          style={{ width: `${100 / totalItems}%` }}
          className="shrink-0 px-2"
        >
          <SongCard
            song={val}
            songList={topSong}
          />
        </div>
      )}
    </Carousel>
  );
}
"use client";
import React from "react";
import Carousel from "./Carousel";
import SongCard from "./SongCard";
import Image from "next/image";
import Link from "next/link";

export default function Songcarousel({ songCar }) {
  return (
    <Carousel items={songCar}>
      {(val, slideSize,totalItems) => (
        <div
          key={val.id}
          style={{ width: `${100 / totalItems}%` }}
          className="shrink-0 p-2 overflow-hidden  aspect-[3/4]"
        >
          <SongCard song={val} songList={songCar} />
        </div>
      )}
    </Carousel>
  );
}

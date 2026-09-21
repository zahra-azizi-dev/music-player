"use client";
import React from "react";
import Carousel from "./Carousel";
import Image from "next/image";
import Link from "next/link";

export default function GenreCarousel({ subGenres }) {
  return (
    <Carousel items={subGenres}>
      {(val, slideSize, totalItems) => (
        <Link
          style={{ width: `${100 / totalItems}%` }}
          key={val.id}
          href={`/category/${val.slug}`}
          className="group relative block aspect-[5/3] w-full shrink-0 px-1.5"
        >
          {val.coverUrl ? (
            <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/20 group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]">
              <Image
                src={val.coverUrl}
                alt={val.name}
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-neutral-900 text-sm text-white/50">
              {val.name}
            </div>
          )}
        </Link>
      )}
    </Carousel>
  );
}

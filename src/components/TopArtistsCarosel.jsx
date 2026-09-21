"use client";

import React from "react";
import { useState } from "react";
import { chunkArray } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TopArtistsCarosel({ artists }) {
  const [currentPage, setCurrentPage] = useState(0);

  const artistChunks = chunkArray(artists, 8);
  const currentArtist = artistChunks[currentPage];

  function handleNext() {
    const nextpage = (currentPage + 1) % artistChunks.length;
    setCurrentPage(nextpage);
  }

  function handlePrevious() {
    const prevPage =
      (currentPage - 1 + artistChunks.length) % artistChunks.length;
    setCurrentPage(prevPage);
  }

  return (
    <section className="relative px-5 py-8 sm:px-8 lg:px-10">
      {/* Header */}
      <div className="mb-7">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500/70">
          Trending now
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide text-white sm:text-2xl">
          Top Artists This Month
        </h2>
      </div>

      {/* Previous button */}
      <button
        onClick={handlePrevious}
        className="absolute left-1 top-[58%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/70 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-red-500/40 hover:bg-[#241113] hover:text-white sm:left-3 lg:left-5"
        aria-label="Previous"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Next button */}
      <button
        onClick={handleNext}
        className="absolute right-1 top-[58%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/70 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-red-500/40 hover:bg-[#241113] hover:text-white sm:right-3 lg:right-5"
        aria-label="Next"
      >
        <ChevronRight size={18} />
      </button>

      {/* Artists */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={currentPage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-10 lg:gap-x-20"
        >
          {currentArtist.map((artist, index) => (
            <li key={artist.id}>
              <Link
                href={`/artist/${artist.slug}`}
                className="group flex h-[68px] w-full items-center gap-3 rounded-xl border border-transparent px-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/10 hover:bg-white/[0.045] hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)]"
              >
                {/* Rank / Play */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                  <span className="text-sm font-medium text-white/35 transition-all duration-300 group-hover:hidden">
                    {currentPage * 8 + index + 1}
                  </span>

                  <span className="hidden h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-lg group-hover:flex">
                    <Play size={13} fill="currentColor" />
                  </span>
                </div>

                {/* Artist image */}
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:scale-105 group-hover:border-red-500/40">
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 rounded-full bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                </div>

                {/* Artist name */}
                <h2 className="min-w-0 truncate text-sm font-medium text-white/75 transition-colors duration-300 group-hover:text-white sm:text-[15px]">
                  {artist.name}
                </h2>

                {/* Speaker */}
                <div className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full opacity-30 transition-all duration-300 group-hover:bg-red-500/10 group-hover:opacity-100">
                  <Image
                    src="/speaker.svg"
                    alt="speaker"
                    width={16}
                    height={16}
                    className="brightness-0 invert"
                  />
                </div>
              </Link>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </section>
  );
}

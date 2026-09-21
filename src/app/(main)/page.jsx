import { getSubGenres, getLatestSongs, getSingleSongs } from "@/lib/api";
import Songcarousel from "@/components/songcarousel";
import React from "react";
import GenreCarousel from "@/components/GenreCarousel";
import TopSongs from "@/components/TopSongs";
import HeroCarousel from "@/components/HeroCarousel";

export default async function page() {
  const subGenres = await getSubGenres();
  const latestSongs = await getLatestSongs();
  const singleSongs = await getSingleSongs();

  return (
    <div className="min-h-screen space-y-14 px-5 pb-10 sm:px-8 lg:px-10">
      <section className="pt-5">
        <HeroCarousel />
      </section>
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500/70">
              Trending now
            </p>

            <h2 className="text-2xl font-bold uppercase tracking-wide text-white">
              Top Songs
            </h2>
          </div>
        </div>

        <TopSongs topSong={singleSongs} />
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500/70">
              Explore your mood
            </p>

            <h2 className="text-2xl font-bold uppercase tracking-wide text-white">
              Vibes
            </h2>
          </div>
        </div>

        <GenreCarousel subGenres={subGenres} />
      </section>
      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500/70">
              Fresh music
            </p>

            <h2 className="text-2xl font-bold uppercase tracking-wide text-white">
              New Released
            </h2>
          </div>
        </div>

        <Songcarousel songCar={latestSongs} />
      </section>
    </div>
  );
}

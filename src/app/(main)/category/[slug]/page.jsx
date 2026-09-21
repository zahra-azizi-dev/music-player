import SongCard from "@/components/SongCard";
import { getCategoryBySlug } from "@/lib/api";
import CategoryHeader from "@/components/CategoryHeader";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function page({ params }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const hassubcate = category.children && category.children.length > 0;
  return (
    <main className="flex-1 px-8 pb-32 pt-8">
      {hassubcate ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {category.children.map((subGanre) => {
            return (
              <li key={subGanre.id}>
                <Link
                  href={`/category/${subGanre.slug}`}
                  className="group relative block aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
                >
                  {subGanre.coverUrl ? (
                    <>
                      <Image
                        src={subGanre.coverUrl}
                        alt={subGanre.name}
                        fill
                        unoptimized
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                      <h3 className="absolute bottom-5 left-5 text-lg font-semibold text-white drop-shadow-lg sm:text-xl">
                        {subGanre.name}
                      </h3>
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-sm text-white/50">
                      {subGanre.name}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <CategoryHeader headerCategory={category} />
          <ul className="flex flex-col gap-3">
            {category.songs.map((song) => {
              return (
                <SongCard
                  key={song.id}
                  song={song}
                  songList={category.songs}
                  layout="list"
                />
              );
            })}
          </ul>
        </>
      )}
    </main>
  );
}

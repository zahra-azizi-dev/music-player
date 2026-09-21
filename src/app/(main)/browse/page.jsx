import CategoryHeader from "@/components/CategoryHeader";
import GenreCarousel from "@/components/GenreCarousel";
import { getArtists, getMainCategories } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TopArtistsCarosel from "@/components/TopArtistsCarosel";
import { Play } from "lucide-react";
export default async function page() {
  const artists = await getArtists();
  const genres = await getMainCategories();

  return (
    <div>
      <TopArtistsCarosel artists={artists} />
      <section  className="px-20 py-4 md:px-8 pt-6">
        <GenreCarousel subGenres={genres} />
      </section>
    </div>
  );
}

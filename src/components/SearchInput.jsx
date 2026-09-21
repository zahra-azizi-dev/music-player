"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import React from "react";

export default function SearchInput() {
  const route = useRouter();
  const searchParams = useSearchParams();
  function handleChange(e) {
    const value = e.target.value;
    route.push(`/search?q=${value}`);
  }
  return (
    <div className="group relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/35 transition duration-300 group-focus-within:text-red-400"
      />
      <input
        type="search"
        placeholder="Search songs, artists, albums..."
        defaultValue={searchParams.get("q") || ""}
        onChange={handleChange}
        className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/30
          transition-all duration-300 hover:border-white/15 hover:bg-white/[0.07] focus:border-red-800/60 focus:bg-white/[0.08] focus:shadow-[0_0_25px_rgba(120,0,10,0.15)]"
      />
    </div>
  );
}

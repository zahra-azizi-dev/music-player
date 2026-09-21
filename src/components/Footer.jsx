"use client";

import Image from "next/image";
import Link from "next/link";
import {  Music2 } from "lucide-react";

export default function HomeFooter() {
  return (
    <footer className="relative overflow-visible border-t border-white/[0.07] bg-[#090506]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_50%_0%,rgba(120,0,15,0.14),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-7 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

          <div className="shrink-0">
            <div className="flex items-center">
              <Image src="/mainlogo.png" width={150} height={65} alt="Gramophone" priority className="h-auto w-[82px] object-contain sm:w-[95px]" />
              <h2 className="text-lg font-bold tracking-tight text-white">GRAMOPHONE</h2>
            </div>

            <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-red-500/80">
              Music • Mood • Memory
            </p>
          </div>

          <nav className="flex items-center gap-5 sm:gap-7">
            <Link href="/" className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/35 transition-colors hover:text-white">
              Home
            </Link>

            <Link href="/search" className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/35 transition-colors hover:text-white">
              Search
            </Link>

            <Link href="/browse" className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/35 transition-colors hover:text-white">
              Browse
            </Link>
          </nav>

          <div className="group relative flex cursor-pointer items-center gap-3">

            <div className="absolute bottom-12 right-0 z-50 w-[280px] origin-bottom-right scale-95 translate-y-2 rounded-2xl border border-red-500/30 bg-[#10090b]/95 p-4 opacity-0 shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_40px_rgba(120,0,15,0.2)] backdrop-blur-2xl transition-all duration-400 pointer-events-none group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:scale-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:pointer-events-auto sm:w-[300px]">

              <div className="absolute -bottom-2 right-7 h-4 w-4 rotate-45 border-b border-r border-red-500/30 bg-[#10090b]" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-red-500">
                    Designed & Built by
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Zahra Azizi
                  </h3>
                  <p className="mt-1 text-xs text-white/40">
                    Front-End Developer
                  </p>
                </div>
                <div className="relative h-40 w-40 overflow-hidden rounded-xl border border-white/10">
                  <Image src="/zarzar1.jpg" alt="Zahra Azizi" fill className="object-cover" />
                </div>
              </div>
              <div className="my-4 h-px bg-white/[0.07]" />
              <p className="text-xs leading-5 text-white/45">
                Building beautiful web experiences
                <span className="ml-1 text-red-400">✦</span>
              </p>
            </div>
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-500 group-hover:scale-110 group-hover:border-red-500/60 group-hover:shadow-[0_0_25px_rgba(140,0,20,0.35)]">
              <Image src="/zarzar1.jpg" alt="Zahra Azizi" fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="hidden sm:block">
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-red-500">
                Designed & Built by
              </p>

              <h3 className="mt-0.5 text-xs font-semibold text-white">
                Zahra Azizi
              </h3>
              <p className="text-[9px] text-white/30">
                Front-End Developer
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/[0.05] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[9px] text-white/20">
            © 2026 Gramophone. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-white/20">
            <span className="text-[9px]">
              React • Next.js • JavaScript
            </span>

            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02]">
              <Music2 size={12} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-900/40 to-transparent" />
    </footer>
  );
}
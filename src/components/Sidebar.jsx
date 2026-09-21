"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSidebar } from "@/app/context/SidebarContext";
import { Home, Search, Compass, X, Heart } from "lucide-react";

export default function Sidebar({ categories }) {
  const navLink = [
    { label: "home", href: "/", icon: Home },
    { label: "search", href: "/search", icon: Search },
    { label: "browse", href: "/browse", icon: Compass },
    { label: "Favorite Songs", href: "/favorites", icon:Heart },
  ];

  const { isOpen, setIsOpen } = useSidebar();

  return (
    <>
      <div>
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px] lg:hidden"
          ></div>
        )}
      </div>
      <aside
        className={` fixed top-0 lg:top-[72px] lg:self-start  left-0 z-50 h-screen lg:h-[calc(100vh-72px)] w-[260px] transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} font-space-grotesk p-4 bg-[#09090b]/95 backdrop-blur-2xl border-r border-white/[0.07] shadow-[12px_0_50px_rgba(0,0,0,0.45)] overflow-hidden`}
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-800/[0.10] blur-3xl" />
        <button
          onClick={() => setIsOpen(false)}
          className="
            relative
            mb-8
            ml-auto
            flex h-9 w-9
            items-center justify-center
            rounded-xl

            border border-white/[0.07]
            bg-white/[0.035]

            text-white/45

            transition-all duration-300

            hover:border-red-500/25
            hover:bg-red-500/[0.08]
            hover:text-white

            lg:hidden
          "
        >
          <X size={18} />
        </button>
        <div className="relative mb-10 px-3">
          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.28em]
              text-white/25
            "
          >
            Music
          </p>

          <h2
            className="
              mt-1
              text-lg
              font-semibold
              tracking-[0.08em]
              text-white
            "
          >
            GRAMOPHONE
          </h2>

          <div
            className="
            mt-3
            h-px
            w-10
            bg-red-500/60
          "
          />
        </div>

        <div className="relative">
          <p
            className="
              mb-3
              px-3
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.25em]
              text-white/25
            "
          >
            Main
          </p>

          <ul className="space-y-1.5">
            {navLink.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="
                      group
                      relative
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      px-4
                      py-3

                      text-[14px]
                      font-medium
                      capitalize
                      text-white/50

                      transition-all
                      duration-300

                      hover:bg-white/[0.045]
                      hover:text-white
                    "
                  >
                    <span
                      className="
                        absolute
                        left-0
                        top-1/2
                        h-0
                        w-[2px]
                        -translate-y-1/2

                        rounded-full
                        bg-red-500

                        opacity-0

                        transition-all
                        duration-300

                        group-hover:h-5
                        group-hover:opacity-100
                      "
                    />

                    <Icon
                      size={19}
                      strokeWidth={1.8}
                      className="
                        shrink-0
                        text-white/40
                        transition-all
                        duration-300

                        group-hover:scale-105
                        group-hover:text-red-400
                      "
                    />

                    <span>{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-40

          bg-gradient-to-t
          from-red-950/[0.08]
          to-transparent
        "
        />

        <div
          className="
          absolute
          bottom-5
          left-7
          right-7
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/[0.07]
          to-transparent
        "
        />
      </aside>
    </>
  );
}

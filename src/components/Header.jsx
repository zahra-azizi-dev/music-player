"use client";

import React, { useContext } from "react";
import Image from "next/image";
import {
  Search,
  Heart,
  Bell,
  LogOut,
  UserRound,
  Menu,
  X,
} from "lucide-react";
import { Kalam } from "next/font/google";
import SearchInput from "./SearchInput";
import { AuthContext } from "@/app/context/AuthContext";
import { useSidebar } from "@/app/context/SidebarContext";

const kalam = Kalam({
  subsets: ["latin"],
  weight: "700",
});

export default function Header() {
  const { user, logOut } = useContext(AuthContext);

  const welcomeMessage = user
    ? `Hey ${user.username}, let the music take over`
    : "Welcome — let the music take over";

  const { isOpen, setIsOpen } = useSidebar();

  return (
    <header
      className="
        sticky top-0 z-40 w-full
        border-b border-white/[0.08]
        bg-[#09090b]/80
        backdrop-blur-2xl
      "
    >
      {/* subtle red glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-24 h-40 w-72 rounded-full bg-red-700/[0.08] blur-3xl" />
        <div className="absolute -right-20 -top-24 h-40 w-72 rounded-full bg-red-700/[0.06] blur-3xl" />
      </div>

      <div
        className="
          relative flex min-h-[72px] items-center
          gap-3 px-4
          sm:gap-4 sm:px-6
          lg:px-8
        "
      >
        {/* Mobile menu */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          className="
            flex h-10 w-10 shrink-0 items-center justify-center
            rounded-xl
            border border-white/[0.08]
            bg-white/[0.035]
            text-white/65
            transition-all duration-300
            hover:border-red-500/30
            hover:bg-red-500/[0.08]
            hover:text-white
            lg:hidden
          "
        >
          {isOpen ? <X size={19} /> : <Menu size={19} />}
        </button>

        <div className="shrink-0 ">
          <Image
            src="/lastlogo.png"
            width={150}
            height={65}
            alt="Gramophone"
            priority
            className="
              h-auto w-[92px]
              object-contain
              sm:w-[105px]
            "
          />
        </div>

        <div
          className="
            min-w-0 flex-1
            lg:mx-0
            lg:max-w-[620px]
          "
        >
          <SearchInput />
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          
          <div className="hidden xl:flex items-center gap-3 mr-2">
            <div
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-full
                border border-white/[0.09]
                bg-white/[0.045]
              "
            >
              <UserRound size={16} className="text-white/55" />
            </div>

            <div className="min-w-0 max-w-[210px]">
              <p
                className="
                  mb-0.5 text-[8px]
                  uppercase tracking-[0.22em]
                  text-white/30
                "
              >
                {user ? "Welcome back" : "Welcome"}
              </p>

              <div className="relative w-fit max-w-full overflow-hidden">
                <h2
                  className={`
                    ${kalam.className}
                    inline-block
                    max-w-full
                    overflow-hidden
                    whitespace-nowrap
                    border-r border-white/70
                    text-sm text-white
                    [animation:typing-loop_5s_steps(40)_infinite,blink_.7s_infinite]
                  `}
                >
                  {user
                    ? `Hey ${user.username}, Feel the music`
                    : "Welcome — Feel the music"}
                </h2>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Favorites"
            className="
              hidden h-10 w-10
              items-center justify-center
              rounded-xl
              border border-transparent
              text-white/40
              transition-all duration-300
              hover:border-white/[0.08]
              hover:bg-white/[0.05]
              hover:text-red-400
              sm:flex
            "
          >
            <Heart size={18} strokeWidth={1.7} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="
              hidden h-10 w-10
              items-center justify-center
              rounded-xl
              border border-transparent
              text-white/40
              transition-all duration-300
              hover:border-white/[0.08]
              hover:bg-white/[0.05]
              hover:text-white
              sm:flex
            "
          >
            <Bell size={18} strokeWidth={1.7} />
          </button>

          <div className="hidden h-6 w-px bg-white/[0.08] sm:block" />

          <button
            type="button" onClick={logOut} className=" group flex h-10 items-center justify-center gap-2 rounded-xl
              border border-white/[0.08]
              bg-white/[0.035]
              px-3
              text-sm font-semibold
              text-white/65
              transition-all duration-300
              hover:border-red-500/30
              hover:bg-red-500/[0.08]
              hover:text-white
              sm:px-3.5
            "
          >
            <LogOut
              size={16}
              className="
                text-white/40
                transition-colors duration-300
                group-hover:text-red-400
              "
            />

            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      <div
        className="
          h-px w-full
          bg-gradient-to-r
          from-transparent
          via-red-700/30
          to-transparent
        "
      />
    </header>
  );
}
"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const sizeResponsive = (width) => {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
};
export default function Carousel({ items, children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prev) => {
      return prev < Math.floor(items.length - slideSize) ? prev + 1 : prev;
    });
  };
  const prevSlide = () => {
    return setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handResize = () => {
      setWidth(window.innerWidth);
    };
    handResize();
    window.addEventListener("resize", handResize);
    return () => {
      window.removeEventListener("resize", handResize);
    };
  }, []);
  const slideSize = sizeResponsive(width);
  console.log("width:", width, "slideSize:", slideSize);
  return (
    <div className="overflow-hidden relative">
      <button
        onClick={prevSlide}
        disabled={currentIndex === 0}
        className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-2xl text-white transition hover:bg-black disabled:pointer-events-none disabled:opacity-0"
        aria-label="Previous"
      >
        {" "}
        ‹
      </button>
      <button
        onClick={nextSlide}
        disabled={currentIndex >= Math.floor(items.length - slideSize)}
        className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-2xl text-white transition hover:bg-black disabled:pointer-events-none disabled:opacity-0"
        aria-label="Next"
      >
        ›
      </button>
      <div
        style={{
          width: `${(items.length / slideSize) * 100}%`,
          transform: `translateX(-${currentIndex * (100 / items.length)}%)`,
        }}
        className="flex transition-transform duration-300 ease-in-out"
      >
        {items.map((val) => children(val, slideSize, items.length))}
      </div>
    </div>
  );
}

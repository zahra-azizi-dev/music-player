"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export default function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ],
  );

  return (
    <section className="w-full">
      <div
        ref={emblaRef}
        className="overflow-hidden rounded-[28px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <div className="flex">
          <div className="min-w-0 flex-[0_0_100%]">
            <div className="relative h-[220px] w-full sm:h-[260px] md:h-[290px] lg:h-[320px]">
              <Image
                src="/slide1.png"
                alt="Vintage road trip"
                fill
                unoptimized
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="min-w-0 flex-[0_0_100%]">
            <div className="relative h-[220px] w-full sm:h-[260px] md:h-[290px] lg:h-[320px]">
              <Image
                src="/slide2.png"
                alt="Vintage recording studio"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

          <div className="min-w-0 flex-[0_0_100%]">
            <div className="relative h-[220px] w-full sm:h-[260px] md:h-[290px] lg:h-[320px]">
              <Image
                src="/slide3.png"
                alt="Vintage radio"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
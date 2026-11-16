"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function HeroBanner() {
  const [activeDot, setActiveDot] = useState(0);

  const handleScrollToShop = () => {
    const el =
      document.getElementById("best-sellers-section") ||
      document.getElementById("featured-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDot((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDot((prev) => (prev === 3 ? 0 : prev + 1));
  };

  return (
    <section className="pt-2 sm:pt-4 pb-2 w-full px-2 sm:px-4 md:px-6">
      {/* Contained Hero Banner Container with exact rounded corners */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-sky-100 bg-[#DDF1FB] group">
        {/* Full Exact Banner Visual Image */}
        <img
          src="/images/littlenest/hero_banner_full.png"
          alt="Big Smiles, Bigger Adventures - LittleNest"
          className="w-full h-auto block select-none pointer-events-none"
        />

        {/* Interactive Clickable Area for 'Shop Now →' Button */}
        <button
          type="button"
          onClick={handleScrollToShop}
          aria-label="Shop Now"
          title="Shop Now"
          className="absolute left-[7%] bottom-[6.5%] w-[16%] h-[20%] rounded-full cursor-pointer focus:outline-none transition-transform hover:scale-105 active:scale-95 bg-transparent"
        />

        {/* Interactive Left Slider Arrow */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#0B3558] flex items-center justify-center shadow-md cursor-pointer transition-all hover:scale-110 active:scale-90"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>

        {/* Interactive Right Slider Arrow */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#0B3558] flex items-center justify-center shadow-md cursor-pointer transition-all hover:scale-110 active:scale-90"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Pagination Dots Matching Screenshot: 1 navy capsule + 3 light blue dots */}
      <div className="flex items-center justify-center gap-1.5 mt-2.5 sm:mt-3">
        <button
          type="button"
          onClick={() => setActiveDot(0)}
          className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
            activeDot === 0
              ? "w-5 sm:w-6 bg-[#0B3558]"
              : "w-1.5 sm:w-2 bg-[#B8D8EC] hover:bg-[#8EC5E5]"
          }`}
          aria-label="Slide 1"
        />
        <button
          type="button"
          onClick={() => setActiveDot(1)}
          className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
            activeDot === 1
              ? "w-5 sm:w-6 bg-[#0B3558]"
              : "w-1.5 sm:w-2 bg-[#B8D8EC] hover:bg-[#8EC5E5]"
          }`}
          aria-label="Slide 2"
        />
        <button
          type="button"
          onClick={() => setActiveDot(2)}
          className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
            activeDot === 2
              ? "w-5 sm:w-6 bg-[#0B3558]"
              : "w-1.5 sm:w-2 bg-[#B8D8EC] hover:bg-[#8EC5E5]"
          }`}
          aria-label="Slide 3"
        />
        <button
          type="button"
          onClick={() => setActiveDot(3)}
          className={`transition-all duration-300 rounded-full h-1.5 sm:h-2 ${
            activeDot === 3
              ? "w-5 sm:w-6 bg-[#0B3558]"
              : "w-1.5 sm:w-2 bg-[#B8D8EC] hover:bg-[#8EC5E5]"
          }`}
          aria-label="Slide 4"
        />
      </div>
    </section>
  );
}

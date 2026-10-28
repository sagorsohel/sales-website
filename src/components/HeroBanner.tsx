"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export function HeroBanner() {
  const slides = [
    {
      subtitle: "Super Sale! Up to 50% off",
      title: "Baby & Kids Toys Sale",
      description: "Discover verified high-quality educational toys, soft plushies, and creative kits.",
      buttonText: "SHOP NOW",
      bgColor: "bg-gradient-to-r from-[#f75388] via-[#fa6495] to-[#f878a1]",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=900&auto=format&fit=crop&q=80",
    },
    {
      subtitle: "New Arrivals 2026",
      title: "Creative Learning & Play",
      description: "Spark imagination with safe, certified, and fun activity sets for toddlers.",
      buttonText: "EXPLORE NOW",
      bgColor: "bg-gradient-to-r from-[#00c3e3] via-[#26d0ea] to-[#4de0f5]",
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=900&auto=format&fit=crop&q=80",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden w-full">
      <div className={`${slide.bgColor} transition-colors duration-700 min-h-[440px] md:min-h-[500px] flex items-center relative pb-16`}>
        {/* Soft Background circles */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-white/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 z-10">
          {/* Left Text */}
          <div className="text-white space-y-4 max-w-lg">
            <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
              {slide.subtitle}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-white font-serif drop-shadow-xs">
              {slide.title}
            </h1>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-md">
              {slide.description}
            </p>

            <div className="pt-2">
              <a
                href="#featured-products"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-lg shadow-cyan-900/20 transition-all transform hover:scale-105 cursor-pointer"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center md:justify-end relative">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full overflow-hidden border-8 border-white/30 shadow-2xl bg-white/10 backdrop-blur-xs">
              <img
                src={slide.image}
                alt="Kid playing with toys"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white flex items-center justify-center shadow-md cursor-pointer z-20 transition-all hover:scale-110"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white flex items-center justify-center shadow-md cursor-pointer z-20 transition-all hover:scale-110"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}

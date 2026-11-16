import React from "react";
import { ArrowRight } from "lucide-react";

export function DualPromoBanners() {
  return (
    <section id="promo-banners" className="py-4 sm:py-6 w-full px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Banner 1: Kids Fashion (Royal Blue) */}
        <div className="rounded-3xl bg-[#026AA7] p-7 sm:p-9 flex items-center justify-between relative overflow-hidden group shadow-md text-white min-h-[220px]">
          {/* Decorative subtle patterns */}
          <div className="absolute top-4 right-1/2 w-16 h-1 bg-white/20 rounded-full rotate-45 pointer-events-none" />
          <div className="absolute bottom-5 left-10 w-2 h-2 rounded-full bg-[#F5B301] pointer-events-none" />

          <div className="space-y-2 z-10 max-w-[260px]">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-none text-white">
              Up to 40% OFF
            </h3>
            <p className="text-sm font-semibold text-white/95">
              On Kids Fashion
            </p>
            <div className="pt-3">
              <a
                href="#best-sellers-section"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F5B301] hover:bg-[#E0A200] text-slate-950 text-xs font-black uppercase tracking-wider transition-all transform hover:scale-105 shadow-sm"
              >
                <span>Shop Fashion</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </a>
            </div>
          </div>

          <div className="w-36 h-36 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center relative z-10">
            <img
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=450&auto=format&fit=crop&q=80"
              alt="Kids Fashion"
              className="w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Banner 2: Smart Learning (Sunshine Yellow) */}
        <div className="rounded-3xl bg-[#F5B301] p-7 sm:p-9 flex items-center justify-between relative overflow-hidden group shadow-md text-slate-950 min-h-[220px]">
          {/* Decorative subtle patterns */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-white/20 pointer-events-none" />

          <div className="space-y-2 z-10 max-w-[260px]">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-slate-950">
              Smart Learning<br />Brighter Future
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-800">
              Educational Toys & Books
            </p>
            <div className="pt-3">
              <a
                href="#best-sellers-section"
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#0B3558] hover:bg-[#07243D] text-white text-xs font-black uppercase tracking-wider transition-all transform hover:scale-105 shadow-sm"
              >
                <span>Shop Learning</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </a>
            </div>
          </div>

          <div className="w-36 h-36 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center relative z-10">
            <img
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=450&auto=format&fit=crop&q=80"
              alt="Learning & Books"
              className="w-full h-full object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


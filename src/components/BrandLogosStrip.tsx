import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function BrandLogosStrip() {
  const brands = [
    { name: "Sunshine", style: "font-serif italic font-black text-xl tracking-wide" },
    { name: "THE CLASSIC", style: "font-mono font-bold tracking-widest text-xs" },
    { name: "Hipster", style: "font-serif font-black text-2xl tracking-tight" },
    { name: "OLD STYLE", style: "font-sans font-bold tracking-wider text-sm border-2 border-current px-2 py-0.5" },
    { name: "SUMMIT", style: "font-sans font-black tracking-widest text-base" },
  ];

  return (
    <section className="py-10 border-t border-b border-gray-100 max-w-7xl mx-auto px-4 sm:px-8 my-6">
      <div className="flex items-center justify-between gap-4">
        <button
          className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer shrink-0"
          aria-label="Previous Brand"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex-1 flex items-center justify-around gap-6 overflow-x-auto text-gray-400">
          {brands.map((b, i) => (
            <div
              key={i}
              className={`hover:text-gray-900 transition-colors cursor-pointer select-none whitespace-nowrap ${b.style}`}
            >
              {b.name}
            </div>
          ))}
        </div>

        <button
          className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer shrink-0"
          aria-label="Next Brand"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

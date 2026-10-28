import React from "react";

export function DualPromoBanners() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Banner 1: Barbie Doll / Special Deals (Peach) */}
        <div className="rounded-3xl bg-[#f7c29e] p-8 sm:p-10 flex items-center justify-between relative overflow-hidden group shadow-xs">
          <div className="space-y-3 z-10 max-w-[240px]">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
              Barbie Doll
            </h3>
            <p className="text-sm font-semibold text-gray-700">
              Get Up to 70% Off
            </p>
            <div className="pt-2">
              <a
                href="#featured-products"
                className="inline-block px-6 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-transform group-hover:scale-105"
              >
                SHOP NOW
              </a>
            </div>
          </div>

          <div className="w-36 h-36 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop&q=80"
              alt="Doll character"
              className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Banner 2: Teddy Bear (Mint Green) */}
        <div className="rounded-3xl bg-[#a3d4b8] p-8 sm:p-10 flex items-center justify-between relative overflow-hidden group shadow-xs">
          <div className="space-y-3 z-10 max-w-[240px]">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
              Teddy Bear
            </h3>
            <p className="text-sm font-semibold text-gray-700">
              Only from ৳১৯৯
            </p>
            <div className="pt-2">
              <a
                href="#featured-products"
                className="inline-block px-6 py-2.5 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-transform group-hover:scale-105"
              >
                SHOP NOW
              </a>
            </div>
          </div>

          <div className="w-36 h-36 sm:w-48 sm:h-48 shrink-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=500&auto=format&fit=crop&q=80"
              alt="Teddy Bear"
              className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

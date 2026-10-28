import React from "react";

export function WidePromoBanner() {
  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="rounded-3xl bg-[#fdf2e9] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative border border-orange-100">
        <div className="space-y-3 z-10 text-center md:text-left">
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 font-serif">
            Teddy & Soft Toys
          </h3>
          <p className="text-xs sm:text-sm font-bold tracking-widest text-gray-500 uppercase">
            ALL TYPES OF TOYS
          </p>
          <div className="pt-3">
            <a
              href="#featured-products"
              className="inline-block px-7 py-3 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white text-xs font-extrabold uppercase tracking-wider shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
            >
              SHOP NOW
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <img
            src="https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=700&auto=format&fit=crop&q=80"
            alt="Soft Toys Collection"
            className="max-h-56 object-contain rounded-2xl drop-shadow-md"
          />
        </div>
      </div>
    </section>
  );
}

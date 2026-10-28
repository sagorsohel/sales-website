"use client";

import React from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setActiveModalProduct } from "@/redux/slices/productSlice";
import { addToCart } from "@/redux/slices/cartSlice";

export function ThreeColumnShowcase() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  // Divide or map products into 3 sets
  const latestList = products.slice(0, 3);
  const bestsellersList = products.slice(1, 4);
  const specialList = products.slice(2, 5);

  const sections = [
    { title: "Latest", items: latestList },
    { title: "Bestsellers", items: bestsellersList },
    { title: "Special", items: specialList },
  ];

  return (
    <section id="latest-showcase" className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sections.map((col, idx) => (
          <div key={idx} className="space-y-4">
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-gray-100">
              <h3 className="font-serif font-black text-lg text-gray-900">
                {col.title}
              </h3>
              <div className="flex items-center gap-1">
                <button
                  className="w-6 h-6 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer text-xs"
                  aria-label="Prev"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  className="w-6 h-6 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-600 hover:text-black cursor-pointer text-xs"
                  aria-label="Next"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* List of 3 mini product cards */}
            <div className="space-y-4">
              {col.items.length === 0 ? (
                <div className="text-xs text-gray-400 py-6 text-center">
                  Loading dynamic items...
                </div>
              ) : (
                col.items.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => dispatch(setActiveModalProduct(prod))}
                    className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50/80 transition-colors cursor-pointer group"
                  >
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                      <img
                        src={
                          prod.featuredImage ||
                          "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&auto=format&fit=crop&q=80"
                        }
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 group-hover:text-[#00c3e3] truncate transition-colors">
                        {prod.name}
                      </h4>
                      <div className="flex items-center gap-0.5 text-amber-400 my-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs font-bold text-[#00c3e3]">
                          ${prod.salePrice}
                        </span>
                        {prod.regularPrice > prod.salePrice && (
                          <span className="text-[10px] line-through text-gray-400">
                            ${prod.regularPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

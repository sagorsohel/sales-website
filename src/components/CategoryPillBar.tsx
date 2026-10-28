"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSelectedCategory } from "@/redux/slices/productSlice";

export function CategoryPillBar() {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector((state) => state.products);

  // Playful visual categories matching reference design + any dynamic categories
  const visualCategories = [
    { name: "All", label: "All Items", icon: "✨" },
    { name: "Bicycle", label: "Bicycle", icon: "🚲" },
    { name: "Doll", label: "Doll", icon: "👧" },
    { name: "Teddy Bear", label: "Teddy Bear", icon: "🧸" },
    { name: "Rubber Duck", label: "Rubber Duck", icon: "🐥" },
    { name: "Airplane", label: "Airplane", icon: "✈️" },
    { name: "Rocking Horse", label: "Rocking Horse", icon: "🎠" },
  ];

  // Combine dynamic categories if they are different
  const dynamicCategories = categories.map((c) => ({
    name: c.name,
    label: c.name,
    icon: c.icon || "📦",
  }));

  const allDisplayCategories = [
    ...visualCategories,
    ...dynamicCategories.filter((d) => !visualCategories.some((v) => v.name === d.name)),
  ];

  return (
    <section id="categories" className="relative -mt-10 sm:-mt-14 z-30 max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-full shadow-xl border border-gray-100 p-3 sm:p-5 flex items-center justify-between sm:justify-around gap-2 overflow-x-auto scrollbar-none">
        {allDisplayCategories.slice(0, 7).map((cat) => {
          const isActive =
            selectedCategory === cat.name ||
            (selectedCategory === "All" && cat.name === "All");

          return (
            <button
              key={cat.name}
              onClick={() => {
                dispatch(setSelectedCategory(cat.name));
                const el = document.getElementById("featured-products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex flex-col items-center gap-1.5 min-w-[72px] sm:min-w-[88px] group cursor-pointer transition-transform hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all shadow-xs ${
                  isActive
                    ? "bg-[#00c3e3] text-white shadow-md shadow-cyan-200 scale-105"
                    : "bg-gray-50 group-hover:bg-[#e0f7fa] text-gray-700"
                }`}
              >
                {cat.icon}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive ? "text-[#00c3e3] font-bold" : "text-gray-600 group-hover:text-gray-900"
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

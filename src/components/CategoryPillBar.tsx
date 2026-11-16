"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSelectedCategory } from "@/redux/slices/productSlice";

export function CategoryPillBar() {
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state) => state.products);

  const categories = [
    {
      name: "Toys",
      label: "Toys",
      image: "/images/littlenest/cat_toys.png",
    },
    {
      name: "Baby Care",
      label: "Baby Care",
      image: "/images/littlenest/cat_babycare.png",
    },
    {
      name: "Clothing",
      label: "Clothing",
      image: "/images/littlenest/cat_clothing.png",
    },
    {
      name: "Learning",
      label: "Learning",
      image: "/images/littlenest/cat_learning.png",
    },
    {
      name: "Feeding",
      label: "Feeding",
      image: "/images/littlenest/cat_feeding.png",
    },
    {
      name: "Outdoor Play",
      label: "Outdoor Play",
      image: "/images/littlenest/cat_outdoor.png",
    },
  ];

  return (
    <section className="py-4 sm:py-6 w-full px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
        {categories.map((cat) => {
          const isActive =
            selectedCategory.toLowerCase() === cat.name.toLowerCase();

          return (
            <button
              key={cat.name}
              type="button"
              onClick={() => {
                dispatch(setSelectedCategory(cat.name));
                const el =
                  document.getElementById("best-sellers-section") ||
                  document.getElementById("featured-products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className={`group w-full rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg focus:outline-none cursor-pointer ${
                isActive ? "ring-2 ring-[#0B3558] shadow-md -translate-y-1" : ""
              }`}
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-auto object-contain rounded-2xl transition-transform duration-300 group-hover:scale-103"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

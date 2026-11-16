"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function NewArrivalsSection() {
  const items = [
    {
      id: "arrival-1",
      name: "Baby Bear Onesie",
      image: "/images/littlenest/arrival_1.png",
    },
    {
      id: "arrival-2",
      name: "Rainbow Stacker Rings",
      image: "/images/littlenest/arrival_2.png",
    },
    {
      id: "arrival-3",
      name: "Classic Blue Beetle Car",
      image: "/images/littlenest/arrival_3.png",
    },
    {
      id: "arrival-4",
      name: "Pink Toddler Training Cup",
      image: "/images/littlenest/arrival_4.png",
    },
    {
      id: "arrival-5",
      name: "Soft Plush Knitted Bunny",
      image: "/images/littlenest/arrival_5.png",
    },
    {
      id: "arrival-6",
      name: "Wooden Shape Sorter Cube",
      image: "/images/littlenest/arrival_6.png",
    },
  ];

  return (
    <section className="py-6 sm:py-8 w-full px-2 sm:px-4 md:px-6">
      {/* Header Row */}
      <div className="flex items-end justify-between mb-4 pb-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B3558] tracking-tight">
            New Arrivals
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Fresh picks for your little ones!
          </p>
        </div>

        <a
          href="#best-sellers-section"
          className="text-xs sm:text-sm font-bold text-[#0B3558] hover:text-[#07243D] flex items-center gap-1 transition-colors hover:underline"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* 6-Item Grid matching screenshot 100% */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href="#best-sellers-section"
            className="group w-full rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 block hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-auto object-contain rounded-2xl group-hover:scale-103 transition-transform duration-300"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

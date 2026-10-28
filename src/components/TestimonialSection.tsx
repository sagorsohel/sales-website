"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
      quote:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      author: "Joseph Ali",
      role: "Happy Parent & Verified Buyer",
    },
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
      quote:
        "The toys arrived very quickly and in beautiful gift packaging. My toddler absolutely loves the educational building blocks. The quality is safe, durable, and totally authentic!",
      author: "Sarah Jenkins",
      role: "Preschool Educator",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  };

  const next = () => {
    setCurrentIndex((p) => (p === testimonials.length - 1 ? 0 : p + 1));
  };

  const t = testimonials[currentIndex];

  return (
    <section className="py-16 bg-[#e1f5fe] relative overflow-hidden my-8">
      {/* Decorative Left: Blocks */}
      <div className="hidden lg:block absolute left-8 bottom-4 w-44 pointer-events-none opacity-85">
        <img
          src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&auto=format&fit=crop&q=80"
          alt="Alphabet Blocks"
          className="w-full rounded-2xl shadow-sm rotate-6 object-cover h-36"
        />
      </div>

      {/* Decorative Right: Kid in toy car */}
      <div className="hidden lg:block absolute right-8 bottom-4 w-48 pointer-events-none opacity-85">
        <img
          src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&auto=format&fit=crop&q=80"
          alt="Kid playing"
          className="w-full rounded-2xl shadow-sm -rotate-6 object-cover h-36"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif mb-6">
          Testimonial
        </h2>

        {/* Circular Avatar with decorative ring */}
        <div className="w-20 h-20 mx-auto rounded-full p-1 bg-white shadow-md mb-6">
          <img
            src={t.avatar}
            alt={t.author}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Quote */}
        <p className="text-sm sm:text-base text-gray-700 italic font-serif leading-relaxed max-w-2xl mx-auto mb-4">
          “{t.quote}”
        </p>

        {/* Author */}
        <div className="font-bold text-gray-900 text-sm">{t.author}</div>
        <div className="text-xs text-gray-500">{t.role}</div>

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-gray-400/40 hover:border-gray-900 flex items-center justify-center text-gray-700 hover:text-black transition-colors cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-gray-400/40 hover:border-gray-900 flex items-center justify-center text-gray-700 hover:text-black transition-colors cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

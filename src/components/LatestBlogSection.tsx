import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function LatestBlogSection() {
  const blogs = [
    {
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80",
      date: "20 December 2026",
      title: "How to Choose Safe Sensory Toys for Toddlers",
      snippet:
        "Learn essential tips on selecting age-appropriate, certified non-toxic toys that nurture creativity and motor coordination.",
    },
    {
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
      date: "18 December 2026",
      title: "Top 10 Holiday Gift Ideas for Creative Kids",
      snippet:
        "From classic building blocks to interactive coding games, discover this season's most loved toys for joyful family moments.",
    },
    {
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80",
      date: "15 December 2026",
      title: "The Developmental Benefits of Plush Toys",
      snippet:
        "Why comfort companions and soft plush animals play a crucial role in building emotional security and empathy in early childhood.",
    },
  ];

  return (
    <section id="blog" className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
          Latest Blog
        </h2>
        <div className="w-12 h-1 bg-[#fbb034] mx-auto mt-2 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((b, idx) => (
          <div
            key={idx}
            className="flex flex-col rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-xs hover:shadow-lg transition-all group"
          >
            {/* Image */}
            <div className="relative h-52 w-full overflow-hidden bg-gray-100">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between text-center space-y-4">
              <div>
                <span className="inline-block text-[11px] font-bold text-[#fbb034] uppercase tracking-wider mb-2">
                  {b.date}
                </span>
                <h3 className="font-serif font-black text-base text-gray-900 group-hover:text-[#00c3e3] transition-colors line-clamp-1">
                  {b.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mt-2 line-clamp-3">
                  {b.snippet}
                </p>
              </div>

              <div>
                <button className="px-6 py-2 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105 cursor-pointer">
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination arrows */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer text-xs"
          aria-label="Previous Blog"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer text-xs"
          aria-label="Next Blog"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}

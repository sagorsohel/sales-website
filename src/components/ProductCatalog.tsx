"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Check,
  Search,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  setSelectedCategory,
  setSearchQuery,
  fetchWebsiteProducts,
  fetchWebsiteCategories,
  type Product,
} from "@/redux/slices/productSlice";

export function ProductCatalog() {
  const dispatch = useAppDispatch();
  const {
    products,
    categories,
    selectedCategory,
    searchQuery,
    loading,
    error,
  } = useAppSelector((state) => state.products);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchWebsiteProducts());
    dispatch(fetchWebsiteCategories());
  }, [dispatch]);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.salePrice,
        category: product.category,
        image: product.icon || "🛍️",
      })
    );
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <section id="featured-products" className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0891b2] mb-1">
            <Sparkles className="w-4 h-4 text-[#ff8a00]" />
            <span>Top Picks & Best Deals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-serif">
            Featured Products
          </h2>
        </div>

        {/* Category Pills inside catalog */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
          <button
            onClick={() => dispatch(setSelectedCategory("All"))}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === "All"
                ? "bg-[#0891b2] text-white shadow-xs"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All Items
          </button>
          {categories.slice(0, 6).map((cat) => (
            <button
              key={cat.id || cat.name}
              onClick={() => dispatch(setSelectedCategory(cat.name))}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.name
                  ? "bg-[#0891b2] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Loading & Empty State */}
      {loading && products.length === 0 ? (
        <div className="text-center py-20 border border-gray-100 rounded-3xl bg-gray-50/50 space-y-3">
          <RefreshCw className="w-6 h-6 text-[#0891b2] animate-spin mx-auto" />
          <p className="text-sm font-medium text-gray-700">
            লোডিং হচ্ছে... পণ্যের তালিকা প্রস্তুত করা হচ্ছে
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
          <p className="text-gray-500 text-sm">
            {error ? `দুঃখিত, তথ্য লোড হতে সমস্যা হয়েছে: ${error}` : "কোনো পণ্য খুঁজে পাওয়া যায়নি।"}
          </p>
          <button
            onClick={() => {
              dispatch(setSelectedCategory("All"));
              dispatch(setSearchQuery(""));
              dispatch(fetchWebsiteProducts());
            }}
            className="mt-4 px-5 py-2 rounded-full bg-[#0891b2] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0e7490] transition-all cursor-pointer"
          >
            সব পণ্য দেখুন
          </button>
        </div>
      ) : (
        /* 4-column product grid matching screenshot style */
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 p-2.5 sm:p-3.5 flex flex-col justify-between hover:shadow-lg hover:border-gray-200 transition-all duration-300 group"
            >
              <div>
                {/* Product Image Container */}
                <Link
                  href={`/product/${product.id}`}
                  className="w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center relative block"
                >
                  <img
                    src={
                      product.featuredImage ||
                      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&auto=format&fit=crop&q=80"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Rating Pill Badge (bottom-left of image - matching reference screenshot) */}
                  <div className="absolute bottom-2 left-2 z-10 inline-flex items-center rounded-lg overflow-hidden text-xs font-bold shadow-xs select-none">
                    <div className="bg-[#ff8a00] text-white px-2 py-0.5 flex items-center gap-1 font-bold">
                      <span>{(product.rating || 5.0).toFixed(1)}</span>
                      <span className="text-[11px] leading-none">★</span>
                    </div>
                    <div className="bg-[#dedede]/90 backdrop-blur-xs text-gray-800 px-1.5 py-0.5 font-semibold text-[11px]">
                      {product.salesCount || 9}
                    </div>
                  </div>
                </Link>

                {/* Product Title */}
                <Link
                  href={`/product/${product.id}`}
                  className="line-clamp-2 text-xs sm:text-[13px] font-medium text-gray-800 leading-snug mt-2.5 min-h-[34px] group-hover:text-[#0891b2] transition-colors block"
                  title={product.name}
                >
                  {product.name}
                </Link>

                {/* Price Row (matching reference: ↓ 59%  ৳190  ৳78) */}
                <div className="flex items-baseline gap-1.5 sm:gap-2 pt-1.5 flex-wrap">
                  {product.discountPercentage > 0 && (
                    <span className="text-xs sm:text-sm font-black text-[#d91b5c]">
                      ↓ {product.discountPercentage}%
                    </span>
                  )}
                  {product.regularPrice > product.salePrice && (
                    <span className="text-xs line-through text-slate-400 font-normal">
                      ৳{product.regularPrice}
                    </span>
                  )}
                  <span className="text-base sm:text-lg font-black text-[#9f1239] tracking-tight">
                    ৳{product.salePrice}
                  </span>
                </div>

                {/* Free Delivery Tag */}
                <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                  FREE delivery
                </div>
              </div>

              {/* Full-width Add to Cart Button (pastel cyan/sky background with teal text) */}
              <div className="pt-2.5">
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full py-2 sm:py-2.5 rounded-xl bg-[#dff3f9] hover:bg-[#cdebf6] active:scale-[0.98] text-[#0891b2] text-xs sm:text-sm font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  {addedId === product.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Added!</span>
                    </>
                  ) : (
                    "Add to Cart"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination / Browse More */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <button
          className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer text-xs transition-colors"
          aria-label="Previous Products"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs font-semibold text-gray-500 px-2">
          Page 1
        </span>
        <button
          className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer text-xs transition-colors"
          aria-label="Next Products"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}


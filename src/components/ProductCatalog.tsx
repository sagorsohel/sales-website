"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Plus,
  Check,
  Search,
  CheckCircle,
  Sparkles,
  Percent,
  Eye,
  X,
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
    // 100% Dynamic data fetching from Express backend & MySQL
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
        image: product.icon || "🧸",
      })
    );
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <section id="featured-products" className="py-14 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Section Title matching reference */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-serif">
          Featured Products
        </h2>
        <div className="w-12 h-1 bg-[#fbb034] mx-auto mt-2 rounded-full" />
      </div>

      {/* Loading & Empty State */}
      {loading && products.length === 0 ? (
        <div className="text-center py-20 border border-gray-100 rounded-3xl bg-gray-50/50 space-y-3">
          <RefreshCw className="w-6 h-6 text-[#00c3e3] animate-spin mx-auto" />
          <p className="text-sm font-medium text-gray-700">
            Loading products dynamically from MySQL Database...
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
          <p className="text-gray-500 text-sm">
            {error ? `Database error: ${error}` : "No products found matching your search."}
          </p>
          <button
            onClick={() => {
              dispatch(setSelectedCategory("All"));
              dispatch(setSearchQuery(""));
              dispatch(fetchWebsiteProducts());
            }}
            className="mt-4 px-5 py-2 rounded-full bg-[#00c3e3] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#00a8c4] transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        /* 4-column product grid matching reference */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-gray-100 p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group relative"
            >
              {/* Badges Container */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 items-start">
                {product.discountPercentage > 0 && (
                  <span className="bg-[#fbb034] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-xs">
                    -{product.discountPercentage}%
                  </span>
                )}
                <span className="bg-[#00c3e3] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-xs">
                  New
                </span>
              </div>

              {/* Product Image */}
              <Link
                href={`/product/${product.id}`}
                className="w-full h-52 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 mb-3 relative block"
              >
                <img
                  src={
                    product.featuredImage ||
                    "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500&auto=format&fit=crop&q=80"
                  }
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                />

                {/* Quick Add overlay button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product, e);
                  }}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer"
                  title="Add to Cart"
                >
                  {addedId === product.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )}
                </button>
              </Link>

              {/* Product Info */}
              <div className="text-center space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    href={`/product/${product.id}`}
                    className="font-bold text-sm text-gray-900 group-hover:text-[#00c3e3] transition-colors truncate block"
                  >
                    {product.name}
                  </Link>

                  {/* 5 Golden Stars */}
                  <div className="flex items-center justify-center gap-0.5 text-amber-400 my-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  {/* Pricing: strikethrough old price + cyan sale price */}
                  <div className="flex items-center justify-center gap-2 pt-0.5">
                    {product.regularPrice > product.salePrice && (
                      <span className="text-xs line-through text-gray-400 font-medium">
                        ${product.regularPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-sm font-extrabold text-[#00c3e3]">
                      ${product.salePrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    href={`/product/${product.id}`}
                    className="w-full py-2 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white text-[11px] font-bold text-center block transition-colors shadow-xs"
                  >
                    অর্ডার করুন / বিস্তারিত
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination arrows */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer text-xs"
          aria-label="Previous Products"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-900 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer text-xs"
          aria-label="Next Products"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}

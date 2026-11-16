"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  fetchWebsiteProducts,
  fetchWebsiteCategories,
  type Product,
} from "@/redux/slices/productSlice";

export function ProductCatalog() {
  const dispatch = useAppDispatch();
  const {
    products,
    selectedCategory,
    searchQuery,
    loading,
  } = useAppSelector((state) => state.products);

  const [addedId, setAddedId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    dispatch(fetchWebsiteProducts());
    dispatch(fetchWebsiteCategories());
  }, [dispatch]);

  // Featured 4 Best Sellers matching screenshot precisely
  const defaultBestSellers = [
    {
      id: "best-1",
      name: "Kids Ride On Car",
      category: "Toys",
      salePrice: 2999,
      regularPrice: 3999,
      discountPercentage: 25,
      rating: 4.7,
      reviewsCount: "1.2k",
      featuredImage: "/images/littlenest/prod_car.png",
    },
    {
      id: "best-2",
      name: "Girls Princess Dress",
      category: "Clothing",
      salePrice: 1599,
      regularPrice: 1999,
      discountPercentage: 20,
      rating: 4.8,
      reviewsCount: "856",
      featuredImage: "/images/littlenest/prod_dress.png",
    },
    {
      id: "best-3",
      name: "Soft Teddy Bear",
      category: "Toys",
      salePrice: 699,
      regularPrice: 999,
      discountPercentage: 30,
      rating: 4.9,
      reviewsCount: "2.1k",
      featuredImage: "/images/littlenest/prod_teddy.png",
    },
    {
      id: "best-4",
      name: "Building Blocks Set",
      category: "Learning",
      salePrice: 1699,
      regularPrice: 1999,
      discountPercentage: 15,
      rating: 4.6,
      reviewsCount: "732",
      featuredImage: "/images/littlenest/prod_blocks.png",
    },
  ];

  // Merge dynamic DB products if available
  const displayItems =
    products.length > 0
      ? products.filter((p) => {
          const matchCat =
            selectedCategory === "All" ||
            p.category?.toLowerCase() === selectedCategory.toLowerCase();
          const matchSearch =
            !searchQuery ||
            p.name?.toLowerCase().includes(searchQuery.toLowerCase());
          return matchCat && matchSearch;
        })
      : defaultBestSellers;

  const itemsToShow = displayItems.length > 0 ? displayItems.slice(0, 4) : defaultBestSellers;

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (item: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: String(item.id),
        name: item.name,
        price: Number(item.salePrice),
        category: item.category || "General",
        image: item.featuredImage || "🧸",
      })
    );
    setAddedId(String(item.id));
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="best-sellers-section" className="py-6 sm:py-10 w-full px-2 sm:px-4 md:px-6">
      {/* Header Row */}
      <div className="flex items-end justify-between mb-6 sm:mb-8 pb-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0B3558] tracking-tight">
            Best Sellers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Loved by parents, trusted by kids!
          </p>
        </div>

        <a
          href="#best-sellers-section"
          className="text-xs sm:text-sm font-bold text-[#0B3558] hover:text-[#07243D] flex items-center gap-1 transition-colors hover:underline"
        >
          <span>View All Products</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* 4-Column Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {itemsToShow.map((product: any) => {
          const discount =
            product.discountPercentage ||
            (product.regularPrice > product.salePrice
              ? Math.round(
                  ((product.regularPrice - product.salePrice) /
                    product.regularPrice) *
                    100
                )
              : null);

          const isFav = wishlist[String(product.id)];
          const ratingVal = product.rating || 4.8;
          const reviews = product.reviewsCount || `${product.salesCount || 850}`;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 flex flex-col hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div>
                {/* Image Box with Badges */}
                <div className="relative w-full h-44 sm:h-48 flex items-center justify-center mb-2">
                  {/* Top-Left Discount Badge */}
                  {discount && (
                    <span className="absolute top-1 left-1 z-10 bg-[#F5B301] text-slate-950 text-[11px] font-black px-2 py-0.5 rounded-full shadow-2xs">
                      -{discount}%
                    </span>
                  )}

                  {/* Top-Right Wishlist Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(String(product.id), e)}
                    className="absolute top-1 right-1 z-10 w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-slate-400 hover:text-rose-500 shadow-2xs transition-colors cursor-pointer"
                    title="Add to Wishlist"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        isFav ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                  </button>

                  {/* Product Image */}
                  <Link
                    href={`/product/${product.id}`}
                    className="w-full h-full flex items-center justify-center p-1"
                  >
                    <img
                      src={
                        product.featuredImage ||
                        "/images/littlenest/prod_car.png"
                      }
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-108 transition-transform duration-300"
                    />
                  </Link>
                </div>

                {/* Product Title */}
                <Link
                  href={`/product/${product.id}`}
                  className="font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-[#0B3558] transition-colors truncate block"
                  title={product.name}
                >
                  {product.name}
                </Link>

                {/* Golden Stars Rating */}
                <div className="flex items-center gap-1 my-1.5">
                  <div className="flex items-center gap-0.5 text-[#F5B301]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#F5B301] text-[#F5B301]"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-500 font-semibold ml-1">
                    {ratingVal} ({reviews})
                  </span>
                </div>

                {/* Pricing: Bold Navy Sale Price + Strikethrough Regular Price */}
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-lg sm:text-xl font-black text-[#0B3558] tracking-tight">
                    ৳{Number(product.salePrice).toLocaleString()}
                  </span>
                  {product.regularPrice > product.salePrice && (
                    <span className="text-xs line-through text-slate-400 font-normal">
                      ৳{Number(product.regularPrice).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Full Width Navy Add to Cart Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(product, e)}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-[#0B3558] hover:bg-[#07243D] active:scale-[0.98] text-white text-xs sm:text-sm font-bold text-center transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                >
                  {addedId === String(product.id) ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



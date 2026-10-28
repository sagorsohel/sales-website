"use client";

import React, { useState, useEffect } from "react";
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
  setActiveModalProduct,
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
    activeModalProduct,
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
              onClick={() => dispatch(setActiveModalProduct(product))}
              className="bg-white rounded-3xl border border-gray-100 p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group cursor-pointer relative"
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
              <div className="w-full h-52 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 mb-3 relative">
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
                  onClick={(e) => handleAddToCart(product, e)}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer"
                  title="Add to Cart"
                >
                  {addedId === product.id ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <ShoppingBag className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Product Info */}
              <div className="text-center space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#00c3e3] transition-colors truncate">
                    {product.name}
                  </h3>

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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setActiveModalProduct(product));
                    }}
                    className="w-full py-1.5 rounded-full border border-gray-200 hover:border-[#00c3e3] hover:bg-[#e0f7fa] text-[11px] font-bold text-gray-700 hover:text-[#00c3e3] transition-colors cursor-pointer"
                  >
                    View Details & Benefits
                  </button>
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

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
              <div>
                <span className="text-xs font-bold text-[#00c3e3] uppercase">
                  {activeModalProduct.category}
                </span>
                <h3 className="font-serif font-black text-gray-900 text-lg">
                  {activeModalProduct.name}
                </h3>
              </div>
              <button
                onClick={() => dispatch(setActiveModalProduct(null))}
                className="p-1.5 rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Media gallery */}
              <div className="space-y-3">
                <div className="h-60 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-4">
                  <img
                    src={activeModalProduct.featuredImage}
                    alt={activeModalProduct.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                {activeModalProduct.galleryImages &&
                  activeModalProduct.galleryImages.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {activeModalProduct.galleryImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Thumb ${idx}`}
                          className="w-16 h-14 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                      ))}
                    </div>
                  )}
              </div>

              {/* Price */}
              <div className="p-4 rounded-2xl bg-[#e0f7fa]/50 border border-cyan-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 font-medium">Product Price</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-black text-[#00c3e3]">
                      ${activeModalProduct.salePrice.toFixed(2)}
                    </span>
                    {activeModalProduct.regularPrice >
                      activeModalProduct.salePrice && (
                      <span className="text-sm line-through text-gray-400 font-medium">
                        ${activeModalProduct.regularPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {activeModalProduct.discountPercentage > 0 && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#fbb034] text-white">
                    -{activeModalProduct.discountPercentage}% Special Discount
                  </span>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 mb-1.5">
                  Description
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {activeModalProduct.description || "No description available."}
                </p>
              </div>

              {/* Benefits (উপকারিতা) */}
              {activeModalProduct.benefits &&
                activeModalProduct.benefits.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 mb-2 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      উপকারিতা সমূহ (Benefits)
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProduct.benefits.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-xs border border-emerald-100"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Facilities (সুবিধাসমূহ) */}
              {activeModalProduct.facilities &&
                activeModalProduct.facilities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-[#00c3e3] mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      সুবিধাসমূহ (Facilities)
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProduct.facilities.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-cyan-50 text-cyan-900 text-xs border border-cyan-100"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00c3e3] mt-1.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                100% Child-Safe Certified
              </span>
              <button
                onClick={(e) => {
                  handleAddToCart(activeModalProduct, e);
                  dispatch(setActiveModalProduct(null));
                }}
                className="px-6 py-2.5 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer transition-transform hover:scale-105"
              >
                Add to Cart (${activeModalProduct.salePrice.toFixed(2)})
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

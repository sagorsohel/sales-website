"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Truck,
  Zap,
  Home as HomeIcon,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartSlice";
import { setSearchQuery, setSelectedCategory } from "@/redux/slices/productSlice";

export function Navbar() {
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith("/product/");

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const categories = useAppSelector((state) => state.products.categories);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [allCategoriesOpen, setAllCategoriesOpen] = useState(false);
  const [wishlistCount] = useState(0);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Clean Funnel Header for Single Product Pages
  if (isProductPage) {
    return (
      <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center text-[#0B3558]">
              <svg
                viewBox="0 0 36 36"
                className="w-8 h-8 fill-none stroke-[#0B3558] stroke-[2.5]"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 4L4 16v14a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V16L18 4z" />
                <path
                  d="M18 17.5c-1.8-2.2-4.5-1.5-4.5 1 0 2.5 4.5 5.5 4.5 5.5s4.5-3 4.5-5.5c0-2.5-2.7-3.2-4.5-1z"
                  fill="#F5B301"
                  stroke="#F5B301"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-[#0B3558] leading-none">
                LittleNest
              </span>
              <span className="text-[9px] font-semibold text-slate-500 tracking-tight mt-0.5">
                Happy Kids, Happy Family
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#0B3558] text-xs font-bold border border-blue-100">
            <ShieldCheck className="w-4 h-4 text-[#0B3558]" />
            <span>১০০% অরিজিনাল পণ্য • ক্যাশ অন ডেলিভারি</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:0123456789"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
              <span>0123-456-789</span>
            </a>

            <button
              onClick={() => {
                const el = document.getElementById("order-form-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 rounded-full bg-[#F5B301] hover:bg-[#e0a200] text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer transition-all hover:scale-105"
            >
              অর্ডার করুন
            </button>
          </div>
        </div>
      </header>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById("best-sellers-section") || document.getElementById("featured-products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navCategories = [
    { name: "Toys", label: "Toys" },
    { name: "Baby Care", label: "Baby Care" },
    { name: "Clothing", label: "Kids Fashion" },
    { name: "Learning", label: "Learning" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-xs">
      {/* 1. TOPMOST NAVY ANNOUNCEMENT BAR */}
      <div className="bg-[#0B3558] text-white text-[11px] sm:text-xs py-1.5 px-4 sm:px-8 font-medium">
        <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="tracking-tight">
              Free Delivery all over Bangladesh on orders over ৳1,000!
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-300 text-[11px] font-medium">
            <a href="#footer" className="hover:text-white transition-colors">
              Track Order
            </a>
            <span className="text-slate-500">|</span>
            <a href="#footer" className="hover:text-white transition-colors">
              Help
            </a>
            <span className="text-slate-500">|</span>
            <a href="#footer" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo, Search Capsule, User Actions) */}
      <div className="w-full px-2 sm:px-4 md:px-6 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        {/* LittleNest Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 select-none shrink-0 group">
          <div className="relative w-9 h-9 flex items-center justify-center text-[#0B3558]">
            <svg
              viewBox="0 0 36 36"
              className="w-9 h-9 fill-none stroke-[#0B3558] stroke-[2.5]"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 4L4 16v14a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V16L18 4z" />
              <path
                d="M18 17.5c-1.8-2.2-4.5-1.5-4.5 1 0 2.5 4.5 5.5 4.5 5.5s4.5-3 4.5-5.5c0-2.5-2.7-3.2-4.5-1z"
                fill="#F5B301"
                stroke="#F5B301"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-[26px] font-black tracking-tight text-[#0B3558] leading-none">
              Little<span className="text-[#F5B301]">Nest</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-tight mt-0.5">
              Happy Kids, Happy Family
            </span>
          </div>
        </Link>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <form onSubmit={handleSearch} className="relative w-full flex items-center">
            <input
              type="text"
              placeholder="Search for toys, clothes and more..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full py-2.5 pl-5 pr-12 rounded-full border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-[#0B3558] text-slate-800 bg-white placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="absolute right-1 p-2 rounded-full bg-[#0B3558] hover:bg-[#07243D] text-white transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </div>

        {/* Right User Actions: Account, Wishlist, Cart */}
        <div className="flex items-center gap-5 sm:gap-7">
          {/* Account */}
          <div className="hidden sm:flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-[#0B3558] transition-colors">
            <User className="w-5 h-5 text-slate-700" />
            <div className="flex items-center text-xs font-semibold">
              <span>Account</span>
              <ChevronDown className="w-3.5 h-3.5 ml-0.5 text-slate-500" />
            </div>
          </div>

          {/* Wishlist */}
          <div className="hidden sm:flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-[#0B3558] transition-colors relative">
            <div className="relative">
              <Heart className="w-5 h-5 text-slate-700" />
              <span className="absolute -top-1.5 -right-2 bg-[#E53935] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            </div>
            <span className="text-xs font-semibold">Wishlist</span>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => dispatch(toggleCart())}
            className="flex items-center gap-1.5 cursor-pointer text-slate-700 hover:text-[#0B3558] transition-colors group"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-slate-700 group-hover:text-[#0B3558]" />
              <span className="absolute -top-1.5 -right-2 bg-[#E53935] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalCount}
              </span>
            </div>
            <span className="text-xs font-semibold hidden sm:inline-block">Cart</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-700 hover:text-[#0B3558]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. NAVY BLUE RIBBON BAR */}
      <nav className="bg-[#0B3558] text-white">
        <div className="w-full px-2 sm:px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* All Categories Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => setAllCategoriesOpen(!allCategoriesOpen)}
                className="flex items-center gap-2 bg-[#07243D] hover:bg-[#051a2c] text-white text-xs font-bold px-4 py-3 cursor-pointer transition-colors"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronDown className="w-3.5 h-3.5 ml-1" />
              </button>

              {allCategoriesOpen && (
                <div className="absolute top-full left-0 w-56 bg-white text-slate-800 shadow-xl border border-slate-100 rounded-b-xl py-2 z-50 animate-in fade-in">
                  <button
                    onClick={() => {
                      dispatch(setSelectedCategory("All"));
                      setAllCategoriesOpen(false);
                      const el = document.getElementById("best-sellers-section") || document.getElementById("featured-products");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-sky-50 hover:text-[#0B3558] flex items-center justify-between"
                  >
                    <span>All Products</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id || c.name}
                      onClick={() => {
                        dispatch(setSelectedCategory(c.name));
                        setAllCategoriesOpen(false);
                        const el = document.getElementById("best-sellers-section") || document.getElementById("featured-products");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-sky-50 hover:text-[#0B3558] flex items-center justify-between"
                    >
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Main Links */}
            <ul className="hidden md:flex items-center gap-5 text-xs font-bold py-1">
              <li>
                <Link
                  href="/"
                  className="bg-[#F5B301] text-slate-950 px-4 py-1.5 rounded-md flex items-center gap-1.5 transition-transform hover:scale-105"
                >
                  <HomeIcon className="w-3.5 h-3.5" />
                  <span>Home</span>
                </Link>
              </li>

              {navCategories.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      dispatch(setSelectedCategory(item.name));
                      const el = document.getElementById("best-sellers-section") || document.getElementById("featured-products");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="flex items-center gap-1 text-white/90 hover:text-[#F5B301] transition-colors py-1 cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-3 h-3 text-white/70" />
                  </button>
                </li>
              ))}

              <li>
                <a
                  href="#promo-banners"
                  className="bg-[#E53935] hover:bg-[#D32F2F] text-white text-[11px] font-extrabold px-3 py-1 rounded-md flex items-center gap-1 shadow-xs transition-transform hover:scale-105"
                >
                  <span>Sale</span>
                  <Zap className="w-3 h-3 fill-current" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#07243D] px-4 py-3 space-y-3 text-sm font-semibold border-t border-slate-700">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full py-2 pl-4 pr-10 rounded-full bg-white text-slate-800 text-xs focus:outline-none"
              />
              <button type="submit" className="absolute right-2 top-2 text-[#0B3558]">
                <Search className="w-4 h-4" />
              </button>
            </form>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#F5B301] font-bold"
            >
              Home
            </Link>

            {navCategories.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  dispatch(setSelectedCategory(item.name));
                  setMobileMenuOpen(false);
                  const el = document.getElementById("best-sellers-section") || document.getElementById("featured-products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="block w-full text-left py-1 text-white/90 hover:text-[#F5B301]"
              >
                {item.label}
              </button>
            ))}

            <a
              href="#promo-banners"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-[#E53935] text-white text-xs font-bold rounded-md"
            >
              Sale ⚡
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}



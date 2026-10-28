"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PhoneCall,
  ShoppingBag,
  Search,
  Menu,
  X,
  ShieldCheck,
  Truck,
  Sparkles,
  MessageCircle,
  Clock,
  Heart,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartSlice";
import { setSearchQuery } from "@/redux/slices/productSlice";

export function Navbar() {
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith("/product/");

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 1. Fresh, High-Converting Header for Single Product Funnel Landing Pages
  if (isProductPage) {
    return (
      <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo & Store Branding */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tight text-gray-900 group-hover:text-[#0891b2] transition-colors">
              <span className="text-[#fbb034]">K</span>
              <span className="text-[#0891b2]">i</span>
              <span className="text-[#f75388]">d</span>
              <span className="text-[#72c02c]">d</span>
              <span className="text-[#9b59b6]">l</span>
              <span className="text-[#fbb034]">e</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full ml-1">
              ✓ ভেরিফায়েড স্টোর
            </span>
          </Link>

          {/* Center Trust Badge */}
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% অরিজিনাল পণ্য • ক্যাশ অন ডেলিভারি</span>
          </div>

          {/* Right Action: Hotline & Order Now */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0123456789"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
              <span>0123-456-789</span>
            </a>

            <button
              onClick={() => {
                const el = document.getElementById("order-form-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#e11d48] to-[#f43f5e] hover:from-[#be123c] hover:to-[#e11d48] text-white text-xs font-black uppercase tracking-wider shadow-sm shadow-rose-500/20 cursor-pointer transition-all hover:scale-105"
            >
              অর্ডার করুন
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white sticky top-0 z-40 shadow-xs border-b border-gray-100">
      {/* 1. Fresh Announcement Top Bar */}
      <div className="bg-[#ff8a00] text-white text-[11px] sm:text-xs py-1.5 sm:py-2 px-4 sm:px-8 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 shrink-0 text-white" />
            <span className="font-semibold tracking-wide">
              সারাদেশে দ্রুত ক্যাশ অন ডেলিভারি ও ১০০% অরিজিনাল পণ্য সুবিধা!
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold">
            <a
              href="tel:0123456789"
              className="hidden sm:flex items-center gap-1 hover:text-white/80 transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>হেল্পলাইন: 0123-456-789</span>
            </a>
            <span className="hidden md:inline-block text-white/50">•</span>
            <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
              <span>মুদ্রা: ৳ BDT</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header with Playful Logo, Search Bar, and Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
        {/* Playful Brand Logo */}
        <Link href="/" className="flex items-center gap-2 select-none group shrink-0">
          <div className="flex items-center gap-0.5 text-2xl sm:text-3xl font-black tracking-tight">
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#ff8a00] fill-[#ff8a00] inline-block mr-0.5 group-hover:rotate-12 transition-transform" />
            <span className="text-[#f75388]">K</span>
            <span className="text-[#0891b2]">i</span>
            <span className="text-[#ff8a00]">d</span>
            <span className="text-[#10b981]">d</span>
            <span className="text-[#8b5cf6]">l</span>
            <span className="text-[#f43f5e]">e</span>
          </div>
        </Link>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              placeholder="পণ্য সার্চ করুন (যেমন: Toys, Fashion, Accessories)..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full py-2.5 pl-5 pr-12 rounded-full border-2 border-gray-200 text-sm focus:outline-none focus:border-[#0891b2] text-gray-800 bg-gray-50/50 transition-colors"
            />
            <button
              onClick={() => {
                const el = document.getElementById("featured-products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="absolute right-1.5 p-2 rounded-full bg-[#0891b2] hover:bg-[#0e7490] text-white transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Info: Customer Support & Cart */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Support Info */}
          <a
            href="tel:0123456789"
            className="hidden lg:flex items-center gap-3 hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-[#0891b2]/10 border border-[#0891b2]/20 flex items-center justify-center text-[#0891b2]">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">হটলাইন সহায়তা</div>
              <div className="text-xs font-bold text-gray-900">0123-456-789</div>
            </div>
          </a>

          {/* Shopping Cart Button */}
          <button
            onClick={() => dispatch(toggleCart())}
            className="flex items-center gap-2.5 p-1 cursor-pointer group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#dff3f9] hover:bg-[#cdebf6] flex items-center justify-center text-[#0891b2] transition-colors shadow-2xs">
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d91b5c] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {totalCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[11px] text-gray-500 font-medium">শপিং ব্যাগ</div>
              <div className="text-xs font-black text-gray-900">
                ৳{totalAmount.toLocaleString()}
              </div>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-black rounded-lg hover:bg-gray-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Navigation Ribbon */}
      <nav className="border-t border-gray-100 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <ul className="hidden md:flex items-center gap-7 py-2.5 text-xs font-bold text-gray-700 tracking-wider">
            <li>
              <Link href="/" className="text-[#0891b2] hover:text-[#0891b2] transition-colors">
                HOME
              </Link>
            </li>
            <li>
              <a href="#featured-products" className="hover:text-[#0891b2] transition-colors">
                ALL PRODUCTS
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:text-[#0891b2] transition-colors">
                CATEGORIES
              </a>
            </li>
            <li>
              <a href="#featured-products" className="hover:text-[#0891b2] transition-colors">
                HOT OFFERS
              </a>
            </li>
            <li>
              <a href="#latest-showcase" className="hover:text-[#0891b2] transition-colors">
                POPULAR
              </a>
            </li>
            <li>
              <a href="#footer" className="hover:text-[#0891b2] transition-colors">
                CONTACT
              </a>
            </li>
          </ul>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>সরাসরি অর্ডার করতে কল করুন: 0123-456-789</span>
          </div>
        </div>

        {/* Mobile dropdown menu (100% Customer focused, Zero Admin links) */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-4 bg-white border-t border-gray-100 space-y-3 text-sm font-semibold text-gray-800">
            {/* Mobile Search */}
            <div className="relative w-full mb-3">
              <input
                type="text"
                placeholder="পণ্য খুঁজুন..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full py-2 pl-4 pr-10 rounded-full border border-gray-200 text-xs text-gray-800 bg-gray-50 focus:outline-none focus:border-[#0891b2]"
              />
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById("featured-products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="absolute right-1 top-1 p-1.5 rounded-full bg-[#0891b2] text-white"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-[#0891b2] font-bold"
            >
              হোম পেজ
            </Link>
            <a
              href="#featured-products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 hover:text-[#0891b2]"
            >
              সকল পণ্য ও অফার
            </a>
            <a
              href="#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 hover:text-[#0891b2]"
            >
              ক্যাটাগরি সমূহ
            </a>
            <a
              href="#latest-showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 hover:text-[#0891b2]"
            >
              জনপ্রিয় সংগ্রহ
            </a>
            <a
              href="#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 hover:text-[#0891b2]"
            >
              যোগাযোগ ও সহায়তা
            </a>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
              <a
                href="tel:0123456789"
                className="flex items-center gap-1.5 font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded-full"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
                <span>কল করুন</span>
              </a>
              <span className="font-semibold text-emerald-700">ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}


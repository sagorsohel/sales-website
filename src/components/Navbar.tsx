"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PhoneCall,
  ShoppingBag,
  Search,
  ChevronDown,
  Sparkles,
  ExternalLink,
  Menu,
  X,
  User,
  ShieldCheck,
  Truck,
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

  // 1. Fresh, Minimalist, High-Converting Header for Single Product Funnel Pages
  if (isProductPage) {
    return (
      <header className="w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo & Home Link */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black font-serif tracking-tight text-gray-900 group-hover:text-[#00c3e3] transition-colors">
              <span className="text-[#fbb034]">K</span>
              <span className="text-[#00c3e3]">i</span>
              <span className="text-[#f75388]">d</span>
              <span className="text-[#72c02c]">d</span>
              <span className="text-[#9b59b6]">l</span>
              <span className="text-[#fbb034]">e</span>
            </span>
            <span className="hidden sm:inline-block text-[11px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-1">
              অফিসিয়াল স্টোর
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
    <header className="w-full bg-white sticky top-0 z-40 shadow-xs">
      {/* 1. Yellow/Golden Top Bar */}
      <div className="bg-[#fbb034] text-gray-900 text-xs py-2 px-4 sm:px-8 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>Welcome to our online store!</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:opacity-80">
              <span>Currency: USD</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="hidden sm:flex items-center gap-1 cursor-pointer hover:opacity-80">
              <span>Language: English</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
              <User className="w-3.5 h-3.5" />
              <span>My Account</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 bg-white/25 hover:bg-white/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-gray-900 transition-colors"
            >
              Admin Panel
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Header with Playful Logo, Search, and Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        {/* Playful Kiddle Brand Logo */}
        <Link href="/" className="flex items-center gap-2 select-none group">
          <div className="flex items-center gap-0.5 text-3xl font-extrabold tracking-tight">
            <Sparkles className="w-7 h-7 text-[#fbb034] fill-[#fbb034] inline-block mr-1 group-hover:rotate-12 transition-transform" />
            <span className="text-[#f75388]">K</span>
            <span className="text-[#00c3e3]">i</span>
            <span className="text-[#fbb034]">d</span>
            <span className="text-[#81c784]">d</span>
            <span className="text-[#ab47bc]">l</span>
            <span className="text-[#ff7043]">e</span>
          </div>
        </Link>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 max-w-lg mx-6">
          <div className="relative w-full flex items-center">
            <input
              type="text"
              placeholder="Search products, toys, benefits..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full py-2.5 pl-5 pr-12 rounded-full border-2 border-gray-200 text-sm focus:outline-none focus:border-[#00c3e3] text-gray-700 bg-gray-50/50"
            />
            <button
              onClick={() => {
                const el = document.getElementById("featured-products");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="absolute right-1.5 p-2 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Info: Customer Support & Cart */}
        <div className="flex items-center gap-6">
          {/* Support Info */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-[#00c3e3] flex items-center justify-center text-[#00c3e3]">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">Customer Support</div>
              <div className="text-xs font-bold text-gray-900">0123-456-789</div>
            </div>
          </div>

          {/* Shopping Cart Button */}
          <button
            onClick={() => dispatch(toggleCart())}
            className="flex items-center gap-3 p-1 cursor-pointer group"
          >
            <div className="relative w-11 h-11 rounded-full border-2 border-[#00c3e3] group-hover:bg-[#00c3e3]/10 flex items-center justify-center text-[#00c3e3] transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#f75388] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-bounce">
                  {totalCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[11px] text-gray-500 font-medium">Shopping Cart</div>
              <div className="text-xs font-bold text-gray-900">
                ${totalAmount.toFixed(2)}
              </div>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Navigation Ribbon (Pink Accent Border / Bar) */}
      <nav className="border-t border-b border-pink-100 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-center md:justify-center">
          <ul className="hidden md:flex items-center gap-8 py-3 text-xs font-bold text-gray-700 tracking-wider">
            <li>
              <Link href="/" className="text-[#f75388] hover:text-[#f75388] transition-colors">
                HOME
              </Link>
            </li>
            <li>
              <a href="#featured-products" className="hover:text-[#f75388] transition-colors">
                FASHION
              </a>
            </li>
            <li>
              <a href="#featured-products" className="hover:text-[#f75388] transition-colors">
                ACCESSORIES
              </a>
            </li>
            <li>
              <a href="#categories" className="hover:text-[#f75388] transition-colors">
                BRANDS
              </a>
            </li>
            <li>
              <a href="#latest-showcase" className="hover:text-[#f75388] transition-colors">
                LIFESTYLE
              </a>
            </li>
            <li>
              <a href="#blog" className="hover:text-[#f75388] transition-colors">
                BLOG
              </a>
            </li>
            <li>
              <a href="#footer" className="hover:text-[#f75388] transition-colors">
                CONTACT
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 py-3 bg-white border-t border-gray-100 space-y-2 text-sm font-semibold text-gray-700">
            <Link href="/" className="block py-1 text-[#f75388]">HOME</Link>
            <a href="#featured-products" className="block py-1">FASHION</a>
            <a href="#featured-products" className="block py-1">ACCESSORIES</a>
            <a href="#categories" className="block py-1">BRANDS</a>
            <a href="#latest-showcase" className="block py-1">LIFESTYLE</a>
            <a href="#blog" className="block py-1">BLOG</a>
            <a href="#footer" className="block py-1">CONTACT</a>
            <a href="http://localhost:5173" target="_blank" className="block py-1 text-[#00c3e3]">
              ADMIN PANEL ↗
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}

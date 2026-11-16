"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-[#0a2e4c] text-white pt-14 pb-8 border-t border-[#0d3b61]">
      <div className="w-full px-2 sm:px-4 md:px-6">
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#18466e]">
          {/* Col 1: Brand & Socials */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center p-1 border border-white/20">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-white"
                >
                  <path
                    d="M20 5L6 16.5V33C6 34.1 6.9 35 8 35H32C33.1 35 34 34.1 34 33V16.5L20 5Z"
                    stroke="currentColor"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 16C18 13.5 15 14 14 16C12.8 18.5 16.5 22 20 24.5C23.5 22 27.2 18.5 26 16C25 14 22 13.5 20 16Z"
                    fill="#F5B301"
                  />
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block leading-tight font-serif">
                  Little<span className="text-[#F5B301]">Nest</span>
                </span>
                <span className="text-[10px] text-sky-200/80 tracking-wider block font-medium">
                  Happy Kids, Happy Family
                </span>
              </div>
            </Link>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b507b] hover:bg-[#026AA7] text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b507b] hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b507b] hover:bg-pink-600 text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#1b507b] hover:bg-red-500 text-white flex items-center justify-center font-bold text-xs"
                aria-label="Pinterest"
              >
                <span className="font-serif italic font-black text-sm">P</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-xs text-sky-100/80">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-amber-400 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Customer Support</h4>
            <ul className="space-y-2 text-xs text-sky-100/80">
              <li>
                <Link href="/help" className="hover:text-amber-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-amber-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-amber-400 transition-colors">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-amber-400 transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Our Policies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Our Policies</h4>
            <ul className="space-y-2 text-xs text-sky-100/80">
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-400 transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Our Store
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Subscribe Our Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">Subscribe Our Newsletter</h4>
            <p className="text-xs text-sky-100/80">
              Get the latest updates and offers!
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-1">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white text-gray-800 text-xs px-3.5 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5B301] placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-[#F5B301] hover:bg-[#e0a400] text-[#0B3558] text-xs font-bold px-4 py-2.5 rounded-md transition-colors whitespace-nowrap"
              >
                {subscribed ? "Done!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-sky-200/70 gap-3">
          <p>© 2026 LittleNest. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for Happy Kids
          </p>
        </div>
      </div>
    </footer>
  );
}

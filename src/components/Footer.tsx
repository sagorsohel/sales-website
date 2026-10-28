"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Camera,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  const isProductPage = pathname?.startsWith("/product/");

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Clean, fresh footer for product landing page
  if (isProductPage) {
    return (
      <footer className="w-full bg-slate-900 text-white mt-16 py-10 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-center space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300 font-semibold">
            <span className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>সারাদেশে হোম ডেলিভারি</span>
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>১০০% ক্যাশ অন ডেলিভারি</span>
            </span>
            <span className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>৭ দিনের ফ্রি রিপ্লেসমেন্ট</span>
            </span>
          </div>

          <div className="text-xs text-gray-400 max-w-md mx-auto space-y-1">
            <p>অর্ডার সংক্রান্ত যেকোনো সহায়তায় সরাসরি কল করুন:</p>
            <p className="text-base font-bold text-white tracking-wider">0123-456-789</p>
          </div>

          <div className="border-t border-slate-800/80 pt-6 text-[11px] text-gray-500">
            © 2026 Kiddle Online Store. All Rights Reserved.
          </div>
        </div>
      </footer>
    );
  }

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

  const instagramPhotos = [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=300&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
  ];

  return (
    <footer id="footer" className="w-full bg-white border-t border-gray-100 mt-16">
      {/* 1. Newsletter Strip in Cyan */}
      <div className="bg-[#00c3e3] py-5 px-4 sm:px-8 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-base sm:text-lg font-bold font-serif">
            Sign Up For Newsletter
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex w-full md:w-auto items-center max-w-md bg-white rounded-full p-1 shadow-sm"
          >
            <input
              type="email"
              required
              placeholder="Your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 text-xs sm:text-sm text-gray-800 rounded-full focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-[#00c3e3] hover:bg-[#00a8c4] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              {subscribed ? "THANK YOU!" : "SUBSCRIBE"}
            </button>
          </form>

          {/* Payment Badges */}
          <div className="flex items-center gap-2 text-white/90 text-xs font-bold">
            <span className="px-2 py-1 bg-white/20 rounded font-mono">VISA</span>
            <span className="px-2 py-1 bg-white/20 rounded font-mono">MC</span>
            <span className="px-2 py-1 bg-white/20 rounded font-mono">PAYPAL</span>
            <span className="px-2 py-1 bg-white/20 rounded font-mono">AMEX</span>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Contact Info */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b-2 border-gray-100 pb-2">
            CONTACT INFO
          </h4>
          <div className="space-y-2.5 text-xs text-gray-600">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#00c3e3] shrink-0 mt-0.5" />
              <span>
                Address: 78 Farmington Lane Vernon Rockville, CT 06066
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#00c3e3] shrink-0" />
              <span>Phone: 0123-456-789</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00c3e3] shrink-0" />
              <span>E-mail: support@kiddlestore.com</span>
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 text-gray-400">
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#00c3e3] hover:text-[#00c3e3] flex items-center justify-center transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#00c3e3] hover:text-[#00c3e3] flex items-center justify-center transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#00c3e3] hover:text-[#00c3e3] flex items-center justify-center transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"></circle>
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 rounded-full border border-gray-200 hover:border-[#00c3e3] hover:text-[#00c3e3] flex items-center justify-center transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Information */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b-2 border-gray-100 pb-2">
            INFORMATION
          </h4>
          <ul className="space-y-2 text-xs text-gray-600">
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                Delivery Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                Legal Notice & Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                Price Drop & Discounts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                New Products 2026
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                Best Sales Collections
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: My Account */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b-2 border-gray-100 pb-2">
            MY ACCOUNT
          </h4>
          <ul className="space-y-2 text-xs text-gray-600">
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                Secure Payment
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                Sitemap & Directory
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#00c3e3] transition-colors">
                Physical Stores
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Instagram Post Grid */}
        <div className="space-y-4">
          <h4 className="text-xs font-black uppercase tracking-widest text-gray-900 border-b-2 border-gray-100 pb-2">
            INSTAGRAM POST
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {instagramPhotos.map((src, i) => (
              <a
                key={i}
                href="#"
                className="block aspect-square rounded-xl overflow-hidden bg-gray-100 group relative border border-gray-100"
              >
                <img
                  src={src}
                  alt={`Instagram ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-[#00c3e3]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Copyright */}
      <div className="border-t border-gray-100 py-6 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 Kiddle Online Store. All Rights Reserved.</span>
          <span className="text-gray-400 text-[11px]">
            Powered by Next.js 16 • Tailwind CSS • Drizzle ORM • Redux Toolkit
          </span>
        </div>
      </div>
    </footer>
  );
}

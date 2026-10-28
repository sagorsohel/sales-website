import React from "react";
import { Truck, RotateCcw, Headphones } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      title: "সারাদেশে হোম ডেলিভারি",
      subtitle: "দ্রুততম সময়ে নির্ভরযোগ্য ডেলিভারি সার্ভিস",
      icon: <Truck className="w-7 h-7 text-[#ff8a00]" />,
      iconBg: "bg-[#fff8e1]",
    },
    {
      title: "ক্যাশ অন ডেলিভারি সুবিধা",
      subtitle: "পণ্য হাতে পেয়ে মূল্য পরিশোধের নিশ্চয়তা",
      icon: <RotateCcw className="w-7 h-7 text-[#e11d48]" />,
      iconBg: "bg-[#ffe4e6]",
    },
    {
      title: "২৪/৭ কাস্টমার হেল্পলাইন",
      subtitle: "সরাসরি ফোন বা হোয়াটসঅ্যাপে সহায়তা",
      icon: <Headphones className="w-7 h-7 text-[#0891b2]" />,
      iconBg: "bg-[#e0f2fe]",
    },
  ];

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-8 border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/60 hover:bg-white hover:shadow-md border border-gray-100/80 transition-all duration-300"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${b.iconBg} flex items-center justify-center shrink-0 shadow-2xs`}
            >
              {b.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{b.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


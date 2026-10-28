import React from "react";
import { Truck, RotateCcw, Headphones } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      title: "Free Shipping Worldwide",
      subtitle: "On orders over $150",
      icon: <Truck className="w-8 h-8 text-[#fbb034]" />,
      iconBg: "bg-[#fff8e1]",
    },
    {
      title: "Cash On Delivery",
      subtitle: "100% money back guarantee",
      icon: <RotateCcw className="w-8 h-8 text-[#f75388]" />,
      iconBg: "bg-[#fce4ec]",
    },
    {
      title: "24/7 Customer Service",
      subtitle: "Call us 24/7 at 123-456-789",
      icon: <Headphones className="w-8 h-8 text-[#00c3e3]" />,
      iconBg: "bg-[#e0f7fa]",
    },
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-8 border-b border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50/70 transition-colors"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${b.iconBg} flex items-center justify-center shrink-0`}
            >
              {b.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{b.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{b.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

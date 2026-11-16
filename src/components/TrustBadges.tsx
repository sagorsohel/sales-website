import React from "react";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      title: "Fast Delivery",
      subtitle: "Across Bangladesh",
      icon: <Truck className="w-8 h-8 text-[#026AA7] shrink-0" strokeWidth={2.2} />,
    },
    {
      title: "Secure Payment",
      subtitle: "100% Safe & Secure",
      icon: <ShieldCheck className="w-8 h-8 text-[#026AA7] shrink-0" strokeWidth={2.2} />,
    },
    {
      title: "Easy Returns",
      subtitle: "Within 7 Days",
      icon: <RotateCcw className="w-8 h-8 text-[#026AA7] shrink-0" strokeWidth={2.2} />,
    },
    {
      title: "Parent Support",
      subtitle: "Always Here to Help",
      icon: <Headphones className="w-8 h-8 text-[#026AA7] shrink-0" strokeWidth={2.2} />,
    },
  ];

  return (
    <section className="py-4 sm:py-6 w-full px-2 sm:px-4 md:px-6">
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 p-2 rounded-xl"
          >
            {b.icon}
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-tight">
                {b.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                {b.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

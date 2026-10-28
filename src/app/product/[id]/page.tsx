"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  CheckCircle,
  ShieldCheck,
  Truck,
  RotateCcw,
  PhoneCall,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Flame,
  Minus,
  Plus,
  Send,
  MessageCircle,
  ShoppingBag,
  Award,
  Zap,
  Check,
  Eye,
  Lock,
  User,
  Phone,
  MapPin,
  Heart,
  Share2,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { fetchWebsiteProducts, type Product } from "@/redux/slices/productSlice";

function SingleProductContent() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const productId = params?.id as string;

  // Redux state
  const { products } = useAppSelector((state) => state.products);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gallery state
  const [activeImage, setActiveImage] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [validImages, setValidImages] = useState<string[]>([]);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 38,
    seconds: 45,
  });

  // Order form state
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">("inside");
  const [quantity, setQuantity] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [cartSuccess, setCartSuccess] = useState(false);

  // Delivery costs
  const deliveryFee = deliveryArea === "inside" ? 60 : 120;

  // Fetch product data
  useEffect(() => {
    if (!products.length) {
      dispatch(fetchWebsiteProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setLoading(true);
      setError(null);

      // Check Redux
      const foundInRedux = products.find(
        (p) => p.id === productId || p.slug === productId
      );

      if (foundInRedux) {
        if (isMounted) {
          setupProduct(foundInRedux);
          setLoading(false);
        }
        return;
      }

      // Fetch from API directly
      try {
        const res = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await res.json();
        if (isMounted) {
          if (data.success && data.data) {
            setupProduct(data.data);
          } else {
            setError(data.message || "প্রোডাক্টটি খুঁজে পাওয়া যায়নি।");
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    function setupProduct(p: Product) {
      setProduct(p);
      const fallbackImgs = [
        p.featuredImage,
        ...(Array.isArray(p.galleryImages) ? p.galleryImages : []),
      ].filter((img): img is string => typeof img === "string" && img.startsWith("http"));

      const finalImgs =
        fallbackImgs.length > 0
          ? fallbackImgs
          : [
              "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1000&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1000&auto=format&fit=crop&q=80",
            ];

      setValidImages(finalImgs);
      setActiveImage(finalImgs[0]);
      setActiveImageIndex(0);
    }

    if (productId) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [productId, products]);

  // Live countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 45, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToOrderForm = () => {
    const el = document.getElementById("order-form-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.salePrice,
        category: product.category,
        image: product.icon || "🧸",
      })
    );
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2000);
  };

  const handlePrevImage = () => {
    if (!validImages.length) return;
    const nextIdx = (activeImageIndex - 1 + validImages.length) % validImages.length;
    setActiveImageIndex(nextIdx);
    setActiveImage(validImages[nextIdx]);
  };

  const handleNextImage = () => {
    if (!validImages.length) return;
    const nextIdx = (activeImageIndex + 1) % validImages.length;
    setActiveImageIndex(nextIdx);
    setActiveImage(validImages[nextIdx]);
  };

  // Calculations
  const unitPrice = product?.salePrice || 0;
  const regularPrice = product?.regularPrice || unitPrice * 1.35;
  const itemsTotal = unitPrice * quantity;
  const grandTotal = itemsTotal + deliveryFee;
  const totalSavings = (regularPrice - unitPrice) * quantity;
  const discountPercent =
    product?.discountPercentage ||
    Math.round(((regularPrice - unitPrice) / regularPrice) * 100) ||
    20;

  // Handle Order Submit
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert("অনুগ্রহ করে আপনার নাম, মোবাইল নাম্বার এবং সম্পূর্ণ ঠিকানা সঠিকভাবে লিখুন।");
      return;
    }

    setSubmitting(true);

    try {
      const orderPayload = {
        customer: customerName.trim(),
        phone: phone.trim(),
        address: `${address.trim()} (এলাকা: ${
          deliveryArea === "inside" ? "ঢাকা সিটির ভেতরে" : "ঢাকা সিটির বাইরে"
        })`,
        deliveryFee,
        items: [
          {
            id: product.id,
            name: product.name,
            price: product.salePrice,
            quantity: quantity,
          },
        ],
        totalAmount: grandTotal,
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const json = await res.json();

      if (json.success) {
        setOrderSuccess({
          orderId: json.data?.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName,
          phone,
          address,
          deliveryArea: deliveryArea === "inside" ? "ঢাকা সিটি (৳৬০)" : "ঢাকার বাইরে (৳১২০)",
          quantity,
          productName: product.name,
          grandTotal,
        });
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        alert(json.message || "অর্ডার সম্পন্ন হতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err: any) {
      alert("অর্ডার পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে ইন্টারনেট বা সার্ভার চেক করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 bg-[#f8fafc]">
        <div className="w-12 h-12 border-4 border-[#00c3e3] border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-bold text-sm">
          প্রোডাক্ট লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-2xl font-black">
          !
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          প্রোডাক্টটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-gray-500">
          {error || "এই আইটেমটি বর্তমানে আমাদের ডাটাবেজে পাওয়া যায়নি।"}
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-[#00c3e3] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#00a8c4] transition-all shadow-md"
        >
          হোমপেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const defaultBenefits = [
    "১০০% প্রিমিয়াম অরিজিনাল কোয়ালিটি এবং নিখুঁত ফিনিশিং গ্যারান্টি",
    "পণ্য হাতে পেয়ে পুরোপুরি চেক করে মূল্য পরিশোধের সুবিধা (ক্যাশ অন ডেলিভারি)",
    "৭ দিনের সহজ ফ্রি রিপ্লেসমেন্ট ওয়ারেন্টি পলিসি",
    "সারাদেশে দ্রুততম হোম ডেলিভারি ও ২৪/৭ ডেডিকেটেড কাস্টমার হেল্পডেস্ক",
  ];

  const benefitsList =
    product.benefits && product.benefits.length > 0
      ? product.benefits
      : defaultBenefits;

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen pb-24 selection:bg-rose-500 selection:text-white">
      {/* 1. FRESH SLIM URGENCY BANNER */}
      <div className="bg-[#0f172a] text-white py-2.5 px-4 shadow-sm border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span className="text-slate-100 font-bold tracking-wide">
              🔥 বিশেষ ধামাকা ডিসকাউন্ট অফার! অফারটি শেষ হতে বাকি:
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono font-black text-xs bg-slate-900/90 border border-slate-700/80 px-3.5 py-1 rounded-full shadow-inner">
            <span className="text-white bg-slate-800 px-2 py-0.5 rounded">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span className="text-slate-400">:</span>
            <span className="text-white bg-slate-800 px-2 py-0.5 rounded">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span className="text-slate-400">:</span>
            <span className="text-rose-400 bg-slate-800 px-2 py-0.5 rounded">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-300 font-medium">
            <span>📞 সরাসরি কল করুন:</span>
            <a href="tel:0123456789" className="text-amber-400 font-bold hover:underline">
              0123-456-789
            </a>
          </div>
        </div>
      </div>

      {/* 2. SUCCESS CONFIRMATION MODAL */}
      {orderSuccess && (
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                অর্ডার নিশ্চিত হয়েছে
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                🎉 অভিনন্দন {orderSuccess.customerName}!
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
                আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমাদের কাস্টমার সার্ভিস প্রতিনিধি শীঘ্রই আপনার মোবাইল নাম্বারে কল করে অর্ডারটি চূড়ান্ত কনফার্ম করবেন।
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left max-w-lg mx-auto space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 font-medium">অর্ডার আইডি:</span>
                <span className="font-mono font-bold text-blue-600">
                  {orderSuccess.orderId}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 font-medium">প্রোডাক্ট:</span>
                <span className="font-bold text-slate-800 text-right">
                  {orderSuccess.productName} (x{orderSuccess.quantity})
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 font-medium">মোবাইল নাম্বার:</span>
                <span className="font-semibold text-slate-800">{orderSuccess.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 font-medium">ডেলিভারি ঠিকানা:</span>
                <span className="font-semibold text-slate-800 text-right">
                  {orderSuccess.address}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-500 font-medium">ডেলিভারি জোন:</span>
                <span className="font-semibold text-slate-800">
                  {orderSuccess.deliveryArea}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-base font-black text-emerald-700">
                <span>সর্বমোট প্রদেয় টাকা:</span>
                <span>৳ {orderSuccess.grandTotal}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setOrderSuccess(null)}
                className="px-6 py-2.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all cursor-pointer"
              >
                আরেকটি অর্ডার করুন
              </button>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all"
              >
                হোমপেজে যান
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. BREADCRUMB */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-rose-600 transition-colors">
            হোম
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="hover:text-rose-600 cursor-pointer font-medium">
            {product.category || "টয় ও গ্যাজেট"}
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      {/* 4. MAIN HERO SECTION (FULL IMAGE & FRESH PRESENTATION) */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: FULL-SIZE GORGEOUS IMAGE DISPLAY (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image (Full & Edge-to-Edge) */}
            <div className="relative w-full h-[380px] sm:h-[480px] md:h-[540px] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm group">
              <img
                src={activeImage || product.featuredImage}
                alt={product.name}
                className="w-full h-full object-cover sm:object-contain group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1000&auto=format&fit=crop&q=80";
                }}
              />

              {/* Floating Discount Tag */}
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-600 to-red-500 text-white text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-yellow-300 text-yellow-300" />
                  <span>-{discountPercent}% ছাড়</span>
                </div>
              )}

              {/* Interactive Prev/Next Arrows directly on image */}
              {validImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-xs flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-xs flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* In-Stock Floating Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-200 shadow-md flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>ইন স্টক - দ্রুত ডেলিভারি</span>
              </div>
            </div>

            {/* Thumbnail Gallery (Clean, Rounded, No Broken Icons) */}
            {validImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none">
                {validImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveImage(img);
                      setActiveImageIndex(idx);
                    }}
                    className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer bg-slate-50 ${
                      activeImage === img
                        ? "border-rose-500 ring-4 ring-rose-500/20 shadow-md scale-105"
                        : "border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.parentElement?.remove();
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs font-bold text-slate-700">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1.5 shadow-2xs">
                <Truck className="w-5 h-5 text-blue-500" />
                <span>ফ্রি হোম ডেলিভারি</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1.5 shadow-2xs">
                <RotateCcw className="w-5 h-5 text-emerald-500" />
                <span>৭ দিনে রিপ্লেসমেন্ট</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-rose-500" />
                <span>১০০% আসল পণ্য</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Pricing, Highlights & CTAs (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-700">
                  4.9 (১,৪২০+ কাস্টমার রিভিউ)
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  ✔ ভেরিফাইড অরিজিনাল
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-xs text-slate-400 mt-1.5 font-medium">
                ক্যাটাগরি: <span className="text-slate-800 font-bold">{product.category}</span>
              </p>
            </div>

            {/* Price Showcase Card */}
            <div className="bg-gradient-to-br from-rose-50 via-white to-orange-50/50 border border-rose-200/80 rounded-3xl p-5 sm:p-6 shadow-xs">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">অফার মূল্য:</span>
                <span className="text-3xl sm:text-5xl font-black text-rose-600 font-mono tracking-tight">
                  ৳ {unitPrice}
                </span>
                {regularPrice > unitPrice && (
                  <span className="text-base sm:text-lg font-bold text-slate-400 line-through">
                    ৳ {regularPrice}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-black shadow-xs">
                    সাশ্রয় ৳ {regularPrice - unitPrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-2.5 flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-rose-500" />
                <span>সীমিত সময়ের বিশেষ অফার! সারাদেশে দ্রুত ক্যাশ অন ডেলিভারি।</span>
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                প্রধান বৈশিষ্ট্যসমূহ:
              </h4>
              <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {benefitsList.slice(0, 4).map((b, i) => (
                  <div key={i} className="flex items-start gap-3 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Converting CTA Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={scrollToOrderForm}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-red-500 hover:from-rose-700 hover:to-red-600 text-white font-black text-base sm:text-lg uppercase tracking-wider shadow-xl shadow-rose-500/25 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer animate-pulse"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>সরাসরি অর্ডার করতে ক্লিক করুন</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl border-2 border-slate-900 hover:bg-slate-900 hover:text-white text-slate-900 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{cartSuccess ? "কার্টে যোগ হয়েছে!" : "কার্টে যোগ করুন"}</span>
                </button>

                <a
                  href={`https://wa.me/880123456789?text=${encodeURIComponent(
                    `হ্যালো! আমি '${product.name}' (মূল্য: ৳${product.salePrice}) সরাসরি অর্ডার করতে চাই।`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>হোয়াটসঅ্যাপে অর্ডার</span>
                </a>
              </div>
            </div>

            {/* Delivery Highlights */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>
                  <strong>ডেলিভারি চার্জ:</strong> ঢাকা সিটির ভিতরে মাত্র ৳৬০, ঢাকা সিটির বাইরে ৳১২০
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>
                  <strong>ক্যাশ অন ডেলিভারি:</strong> প্রোডাক্ট হাতে পেয়ে চেক করে সম্পূর্ণ টাকা পরিশোধ করুন
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. FULL-BLEED VISUAL SHOWCASE SECTION ("image full jeno sundore lage") */}
      <div className="max-w-6xl mx-auto px-4 mt-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
            প্রিমিয়াম ভিজ্যুয়াল শোকেস
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            বাস্তবে দেখতে ঠিক যেমন নিখুঁত ও আকর্ষণীয়
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            প্রতিটি খুঁটিনাটি নিখুঁতভাবে তৈরি, যাতে আপনি পান সর্বোচ্চ টেকসই ও আকর্ষণীয় অভিজ্ঞতা।
          </p>
        </div>

        {/* 2 Full-Width Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Visual Showcase Card 1 */}
          <div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm group">
            <div className="h-72 sm:h-96 w-full overflow-hidden relative">
              <img
                src={
                  validImages[1] ||
                  validImages[0] ||
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80"
                }
                alt="Product feature view 1"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                  ডিজাইন ও উপাদান
                </span>
                <h3 className="text-lg sm:text-xl font-black">
                  প্রিমিয়াম কোয়ালিটি এবং আধুনিক আর্কিটেকচার
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  উচ্চমানের সামগ্রী দ্বারা প্রস্তুতকৃত, যা যেকোনো সাধারণ পণ্যের তুলনায় অনেক বেশি টেকসই ও শক্তিশালী।
                </p>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card 2 */}
          <div className="rounded-3xl overflow-hidden bg-white border border-slate-100 shadow-sm group">
            <div className="h-72 sm:h-96 w-full overflow-hidden relative">
              <img
                src={
                  validImages[2] ||
                  validImages[0] ||
                  "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1000&auto=format&fit=crop&q=80"
                }
                alt="Product feature view 2"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  নিরাপত্তা ও সহজ ব্যবহার
                </span>
                <h3 className="text-lg sm:text-xl font-black">
                  ১০০% ঝুঁকিমুক্ত ও আনন্দদায়ক অভিজ্ঞতা
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  দৈনন্দিন স্বাচ্ছন্দ্য ও দীর্ঘমেয়াদী নির্ভরযোগ্যতার জন্য বিশেষভাবে উপযোগী।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. WHY BUY THIS PRODUCT? (BENEFITS & FACILITIES) */}
      <div className="max-w-6xl mx-auto px-4 mt-16">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-bold text-rose-600 uppercase tracking-widest bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
            কেন এই প্রোডাক্টটি কিনবেন?
          </span>
          <h2 className="text-xl sm:text-3xl font-black text-slate-900">
            আমাদের প্রোডাক্টের বিশেষত্ব ও উপকারিতা
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            উন্নত প্রযুক্তি এবং প্রিমিয়াম ম্যাটেরিয়াল দ্বারা তৈরি, যা আপনার দৈনন্দিন ব্যবহারে আনবে সর্বোচ্চ স্বাচ্ছন্দ্য।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">প্রিমিয়াম কোয়ালিটি</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              টেকসই ও মজবুত উপাদানে তৈরি, যা দীর্ঘমেয়াদী ব্যবহারের পূর্ণ নিশ্চয়তা প্রদান করে।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">সহজ ব্যবহার</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              কোনো জটিলতা ছাড়াই অত্যন্ত সহজে পরিচালনা এবং বাসায় বা অফিসে ব্যবহার উপযোগী।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">নিরাপত্তা ও ওয়ারেন্টি</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              ১০০% ঝুঁকিমুক্ত কেনাকাটা এবং ত্রুটিমুক্ত প্যাকেজিং সাথে ৭ দিনের রিপ্লেসমেন্ট নিশ্চয়তা।
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xs space-y-3 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">অর্থ ও সময় সাশ্রয়</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              বিশেষ ছাড়ের অফারে কম খরচে সেরা গ্যাজেট বা পণ্য পাওয়ার সুবর্ণ সুযোগ।
            </p>
          </div>
        </div>
      </div>

      {/* 7. VIDEO DEMONSTRATION & PRODUCT SHOWCASE */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
            <Eye className="w-4 h-4" />
            <span>প্রোডাক্টের বাস্তব ভিডিও ডেমোস্ট্রেশন</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            কীভাবে এটি কাজ করে স্বচক্ষে ভিডিওতে দেখে নিন
          </h3>

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner mt-4">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=1"
              title="Product Demonstration Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* 8. SPECIFICATIONS TABLE */}
      <div className="max-w-4xl mx-auto px-4 mt-14">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-slate-900 border-b pb-3">
            প্রোডাক্ট স্পেসিফিকেশন ও বিবরণ
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description ||
              "এই পণ্যটি আন্তর্জাতিক মানদণ্ড অনুযায়ী তৈরি করা হয়েছে। প্রতিটি পণ্য প্রেরণের পূর্বে কঠোরভাবে পরীক্ষা করে ডেলিভারির জন্য পাঠানো হয়।"}
          </p>

          <div className="overflow-hidden rounded-2xl border border-slate-200 mt-4 text-xs sm:text-sm">
            <table className="w-full text-left">
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-slate-50/60">
                  <td className="px-5 py-3.5 font-bold text-slate-600 w-1/3">মডেল / নাম</td>
                  <td className="px-5 py-3.5 text-slate-900 font-bold">{product.name}</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-600">ক্যাটাগরি</td>
                  <td className="px-5 py-3.5 text-slate-800">{product.category}</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="px-5 py-3.5 font-bold text-slate-600">পেমেন্ট মেথড</td>
                  <td className="px-5 py-3.5 text-slate-800 font-semibold">ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে টাকা দিন)</td>
                </tr>
                <tr>
                  <td className="px-5 py-3.5 font-bold text-slate-600">ওয়ারেন্টি</td>
                  <td className="px-5 py-3.5 text-slate-800 font-semibold">৭ দিনের ফ্রি রিপ্লেসমেন্ট ওয়ারেন্টি</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="px-5 py-3.5 font-bold text-slate-600">ডেলিভারি সময়</td>
                  <td className="px-5 py-3.5 text-slate-800">ঢাকা সিটিতে ২৪-৪৮ ঘণ্টা, ঢাকার বাইরে ২-৩ দিন</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 9. HIGH-CONVERTING DIRECT ORDER FORM (ZARO STYLE) */}
      <div id="order-form-section" className="max-w-4xl mx-auto px-4 mt-16 scroll-mt-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-rose-500 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Header Banner */}
          <div className="text-center space-y-2.5 border-b-2 border-dashed border-slate-200 pb-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-black uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-rose-500" />
              <span>সরাসরি ক্যাশ অন ডেলিভারিতে অর্ডার</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900">
              অর্ডার করতে নিচের ফর্মটি সঠিক তথ্য দিয়ে পূরণ করুন
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              অগ্রিম এক টাকাও দিতে হবে না! ডেলিভারি ম্যানের কাছ থেকে পণ্য বুঝে পেয়ে সম্পূর্ণ মূল্য পরিশোধ করুন।
            </p>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-6">
            {/* Input 1: Name */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                আপনার সম্পূর্ণ নাম <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 text-sm outline-none transition-all"
                />
                <User className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Input 2: Mobile Number */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                আপনার সচল মোবাইল নাম্বার <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="যেমন: 017XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 text-sm outline-none transition-all font-mono"
                />
                <Phone className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              <span className="text-[11px] text-slate-400">
                অর্ডার নিশ্চিত করতে আমাদের প্রতিনিধি এই নাম্বারে কল করবেন।
              </span>
            </div>

            {/* Input 3: Full Delivery Address */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                আপনার সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={2}
                  placeholder="বাসা নং, রোড নং, এলাকা, থানা এবং জেলার নাম বিস্তারিত লিখুন..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 text-sm outline-none transition-all"
                />
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
              </div>
            </div>

            {/* Input 4: Delivery Zone Selection */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                আপনার ডেলিভারি এলাকা সিলেক্ট করুন <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label
                  onClick={() => setDeliveryArea("inside")}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    deliveryArea === "inside"
                      ? "border-rose-500 bg-rose-50/60 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryArea === "inside"}
                      onChange={() => setDeliveryArea("inside")}
                      className="accent-rose-600 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800">
                        ঢাকা সিটির ভেতরে
                      </div>
                      <div className="text-[11px] text-slate-500">২৪-৪৮ ঘণ্টার মধ্যে ডেলিভারি</div>
                    </div>
                  </div>
                  <span className="font-bold text-base text-slate-900 font-mono">৳ ৬০</span>
                </label>

                <label
                  onClick={() => setDeliveryArea("outside")}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                    deliveryArea === "outside"
                      ? "border-rose-500 bg-rose-50/60 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="deliveryZone"
                      checked={deliveryArea === "outside"}
                      onChange={() => setDeliveryArea("outside")}
                      className="accent-rose-600 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-800">
                        ঢাকা সিটির বাইরে
                      </div>
                      <div className="text-[11px] text-slate-500">২-৩ দিনে হোম ডেলিভারি</div>
                    </div>
                  </div>
                  <span className="font-bold text-base text-slate-900 font-mono">৳ ১২০</span>
                </label>
              </div>
            </div>

            {/* Input 5: Quantity Stepper */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 block">
                  পণ্যের পরিমাণ (Quantity)
                </span>
                <span className="text-[11px] text-slate-500">
                  প্রতি পিস ৳ {unitPrice}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-black text-xl w-8 text-center text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Input 6: Payment Method */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                পেমেন্ট মেথড
              </label>
              <div className="p-4 rounded-2xl border border-emerald-300 bg-emerald-50/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-200" />
                  <span className="text-xs sm:text-sm font-bold text-emerald-950">
                    ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য দিন)
                  </span>
                </div>
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            {/* Order Summary Receipt Box */}
            <div className="bg-slate-950 text-white rounded-3xl p-6 space-y-3.5 font-mono shadow-md">
              <div className="flex justify-between text-xs sm:text-sm text-slate-300">
                <span>প্রোডাক্ট সাব-টোটাল ({quantity} পিস):</span>
                <span>৳ {itemsTotal}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm text-slate-300">
                <span>ডেলিভারি চার্জ:</span>
                <span>৳ {deliveryFee}</span>
              </div>
              {totalSavings > 0 && (
                <div className="flex justify-between text-xs text-yellow-300 font-bold">
                  <span>মোট সাশ্রয়:</span>
                  <span>- ৳ {totalSavings}</span>
                </div>
              )}
              <div className="border-t border-slate-800 pt-3 flex justify-between text-lg sm:text-2xl font-black text-emerald-400">
                <span>সর্বমোট প্রদেয় টাকা:</span>
                <span>৳ {grandTotal}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-lg sm:text-2xl uppercase tracking-wider shadow-2xl shadow-emerald-500/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>অর্ডার প্রসেস হচ্ছে...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span>অর্ডার কনফার্ম করুন - ৳ {grandTotal}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <Lock className="w-3.5 h-3.5" />
              <span>আপনার সকল ব্যক্তিগত তথ্য সম্পূর্ণ সুরক্ষিত এবং গোপন রাখা হবে।</span>
            </div>
          </form>
        </div>
      </div>

      {/* 10. REAL CUSTOMER REVIEWS */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-3.5 py-1 rounded-full border border-amber-100">
            কাস্টমার মতামত
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            আমাদের সন্তুষ্ট গ্রাহকদের রিভিউ
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              “অর্ডার করার পরদিনই ঢাকা সিটির ভিতরে প্রোডাক্ট ডেলিভারি পেয়েছি। প্যাকেজিং দারুণ ছিল এবং প্রোডাক্ট কোয়ালিটি ছবির চেয়েও অনেক ভালো!”
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 font-black text-xs flex items-center justify-center">
                র
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">রাকিবুল হাসান</div>
                <div className="text-[10px] text-emerald-600 font-bold">ভেরিফাইড ক্রেতা (উত্তরা, ঢাকা)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              “ক্যাশ অন ডেলিভারিতে চেক করে টাকা দেওয়ার সুযোগ থাকায় কোনো ভয় ছিল না। একদম নিখুঁত পণ্য। ধন্যবাদ সেলারকে।”
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 font-black text-xs flex items-center justify-center">
                ত
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">তানিয়া সুলতানা</div>
                <div className="text-[10px] text-emerald-600 font-bold">ভেরিফাইড ক্রেতা (চট্টগ্রাম)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center text-amber-400 text-xs">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
              “প্রোডাক্টের বিল্ড কোয়ালিটি খুব ভালো। সাপোর্ট টিম ফোনে খুব ভদ্রভাবে কথা বলেছে। নিঃসন্দেহে বিশ্বস্ত একটি পেজ।”
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 font-black text-xs flex items-center justify-center">
                শ
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">শহিদুল ইসলাম</div>
                <div className="text-[10px] text-emerald-600 font-bold">ভেরিফাইড ক্রেতা (রাজশাহী)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 11. STICKY BOTTOM QUICK ACTION BAR FOR MOBILE */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-4 z-50 md:hidden flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold">অফার মূল্য</span>
          <span className="font-mono font-black text-xl text-rose-600">
            ৳ {unitPrice}
          </span>
        </div>

        <button
          type="button"
          onClick={scrollToOrderForm}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-red-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-rose-500/30 flex items-center gap-1.5 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>অর্ডার করুন</span>
        </button>
      </div>
    </div>
  );
}

export default function SingleProductLandingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 bg-[#f8fafc]">
          <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600 font-bold text-sm">
            প্রোডাক্ট লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
          </p>
        </div>
      }
    >
      <SingleProductContent />
    </Suspense>
  );
}

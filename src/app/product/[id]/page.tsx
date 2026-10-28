"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  PhoneCall,
  ShoppingBag,
  Minus,
  Plus,
  MessageCircle,
  Zap,
  CheckCircle,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  User,
  Phone,
  MapPin,
  Lock,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  fetchWebsiteProducts,
  type Product,
  type ProductVariant,
} from "@/redux/slices/productSlice";

// Default Color Options fallback if product doesn't define custom variants
const DEFAULT_COLOR_VARIANTS: ProductVariant[] = [
  {
    name: "Yellow (হলুদ)",
    slug: "yellow",
    image: "/products/thumb-yellow.png",
  },
  {
    name: "Hot Pink (উজ্জ্বল গোলাপি)",
    slug: "hot-pink",
    image: "/products/thumb-red.png",
  },
  {
    name: "Sky Blue (আকাশী নীল)",
    slug: "sky-blue",
    image: "/products/cooker-blue-main.png",
  },
  {
    name: "Sea Green (সামুদ্রিক সবুজ)",
    slug: "sea-green",
    image: "/products/thumb-green.png",
  },
  {
    name: "Baby Pink (হালকা গোলাপি)",
    slug: "baby-pink",
    image: "/products/thumb-red.png",
  },
  {
    name: "Blood Red (রক্তিম লাল)",
    slug: "blood-red",
    image: "/products/thumb-red.png",
  },
];

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

  // Gallery & Variant State
  const [activeImage, setActiveImage] = useState<string>("");
  const [validImages, setValidImages] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<ProductVariant | null>(null);

  // Order & Stepper State
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">("inside");
  const [submitting, setSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [cartSuccess, setCartSuccess] = useState(false);

  // Fetch product data on mount
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

      // Determine available variants
      const vars =
        Array.isArray(p.variants) && p.variants.length > 0
          ? p.variants
          : DEFAULT_COLOR_VARIANTS;

      setSelectedColor(vars[0]);

      // Collect gallery images
      const initialImgs = [
        p.featuredImage,
        ...(Array.isArray(p.galleryImages) ? p.galleryImages : []),
        ...(Array.isArray(p.variants) ? p.variants.map((v) => v.image) : []),
      ].filter(
        (img): img is string =>
          typeof img === "string" &&
          img.trim() !== "" &&
          (img.startsWith("http") || img.startsWith("/"))
      );

      // Unique images
      const uniqueImgs = Array.from(new Set(initialImgs));
      const fallbackImgs = [
        "/products/thumb-red.png",
        "/products/cooker-blue-main.png",
        "/products/thumb-yellow.png",
        "/products/thumb-green.png",
      ];
      const displayImgs = uniqueImgs.length > 0 ? uniqueImgs.slice(0, 8) : fallbackImgs;

      setValidImages(displayImgs);
      setActiveImage(p.featuredImage || displayImgs[0]);
    }

    if (productId) {
      loadProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [productId, products]);

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
        id: `${product.id}-${selectedColor?.slug || "default"}`,
        name: `${product.name}${selectedColor ? ` - ${selectedColor.name}` : ""}`,
        price: product.salePrice,
        category: product.category || "",
        image: activeImage || product.featuredImage || "🍲",
      })
    );
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    scrollToOrderForm();
  };

  // Calculations
  const unitPrice = product?.salePrice || 0;
  const regularPrice = product?.regularPrice || unitPrice;
  const savingsAmount = Math.max(0, regularPrice - unitPrice);

  // Delivery Charges (100% dynamic from backend)
  const deliveryInsideFee =
    product?.deliveryInside !== undefined ? product.deliveryInside : 60;
  const deliveryOutsideFee =
    product?.deliveryOutside !== undefined ? product.deliveryOutside : 120;
  const deliveryFee =
    deliveryArea === "inside" ? deliveryInsideFee : deliveryOutsideFee;

  const itemsTotal = unitPrice * quantity;
  const grandTotal = itemsTotal + deliveryFee;

  const skuString = `${(product?.slug || product?.id || "PROD").toUpperCase()}${
    selectedColor ? `-${selectedColor.slug.toUpperCase()}` : ""
  }`;

  // Contact info
  const phoneNumber = product?.phoneNumber || "0123456789";
  const whatsappNumber = product?.whatsappNumber || "880123456789";

  // Key Features list
  const keyFeaturesList =
    product?.keyFeatures && product.keyFeatures.length > 0
      ? product.keyFeatures
      : [
          `মডেল: ${product?.name || ""}`,
          `ক্যাটাগরি: ${product?.category || "Kitchen & Home"}`,
          `ওয়ারেন্টি: সার্ভিস ওয়ারেন্টি প্রযোজ্য`,
        ];

  // Variants list
  const availableVariants =
    product?.variants && product.variants.length > 0
      ? product.variants
      : DEFAULT_COLOR_VARIANTS;

  // Related products from Redux (excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== product?.id)
    .slice(0, 3);

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
        }${selectedColor ? `, কালার: ${selectedColor.name}` : ""})`,
        deliveryFee,
        items: [
          {
            id: product.id,
            name: `${product.name}${selectedColor ? ` (${selectedColor.name})` : ""}`,
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
          selectedColor: selectedColor?.name || "Standard",
          deliveryArea:
            deliveryArea === "inside"
              ? `ঢাকা সিটি (৳${deliveryInsideFee})`
              : `ঢাকার বাইরে (৳${deliveryOutsideFee})`,
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 bg-gray-50">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-600 font-bold text-sm">
          প্রোডাক্ট লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center max-w-lg mx-auto">
        <h2 className="text-2xl font-black text-gray-900">
          প্রোডাক্টটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-gray-500">{error}</p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-md bg-[#2b3990] text-white font-bold text-xs uppercase"
        >
          হোমপেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f6f8] text-gray-800 min-h-screen py-6 px-3 sm:px-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ORDER SUCCESS MODAL */}
        {orderSuccess && (
          <div className="bg-white border-2 border-emerald-500 rounded-xl p-6 sm:p-8 shadow-xl text-center space-y-5 animate-in fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              🎉 অভিনন্দন {orderSuccess.customerName}! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 max-w-md mx-auto text-left text-xs sm:text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">অর্ডার আইডি:</span>
                <span className="font-bold text-blue-700">{orderSuccess.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">প্রোডাক্ট:</span>
                <span className="font-bold text-gray-800 text-right">
                  {orderSuccess.productName} ({orderSuccess.selectedColor}) x{orderSuccess.quantity}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">মোবাইল:</span>
                <span className="font-bold text-gray-800">{orderSuccess.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ঠিকানা:</span>
                <span className="font-semibold text-gray-800 text-right">{orderSuccess.address}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-base font-bold text-red-600">
                <span>সর্বমোট প্রদেয় টাকা:</span>
                <span>৳ {orderSuccess.grandTotal}</span>
              </div>
            </div>
            <button
              onClick={() => setOrderSuccess(null)}
              className="px-6 py-2 rounded-md bg-[#2b3990] text-white font-bold text-xs cursor-pointer"
            >
              আরেকটি অর্ডার করুন
            </button>
          </div>
        )}

        {/* 1. TOP HERO CARD */}
        <div className="bg-white rounded-md border border-gray-200 shadow-xs p-4 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Gallery with SAVE Badge & Thumbnails (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Main Image with SAVE badge */}
            <div className="relative aspect-square w-full rounded-md border border-gray-100 flex items-center justify-center p-3 bg-white overflow-hidden">
              {savingsAmount > 0 && (
                <div className="absolute top-0 left-0 bg-[#e53e3e] text-white text-[11px] font-bold px-3 py-1 uppercase tracking-wider rounded-br-sm shadow-xs z-10">
                  SAVE ৳{savingsAmount}
                </div>
              )}
              <img
                src={activeImage || validImages[0]}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Thumbnails Strip */}
            <div className="grid grid-cols-4 gap-2.5">
              {validImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square rounded-sm overflow-hidden border p-1 bg-white cursor-pointer transition-all ${
                    activeImage === img
                      ? "border-2 border-red-600 shadow-xs"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Features, Price Box, Variants, Buttons (7 Cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>
              <div className="border-b border-gray-200 mt-2.5 mb-2.5" />
              
              {/* Meta info (Brand, SKU, Status) */}
              <div className="text-xs text-gray-500 space-y-1">
                <div>
                  <span className="text-gray-600">Brand:</span>{" "}
                  <span className="text-gray-900 font-semibold">{product.brand || "Prestige"}</span>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>{" "}
                  <span className="text-gray-900 font-semibold">{product.category}</span>
                </div>
                <div>
                  <span className="text-gray-600">Product Code:</span>{" "}
                  <span className="text-gray-900 font-semibold uppercase">{skuString}</span>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>{" "}
                  <span
                    className={`font-semibold ${
                      product.stock !== undefined && product.stock <= 0
                        ? "text-red-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {product.stock !== undefined && product.stock <= 0
                      ? "Out of Stock"
                      : "In Stock"}
                  </span>
                </div>
              </div>
              <div className="border-b border-gray-200 mt-2.5 mb-3" />
            </div>

            {/* KEY FEATURES (Dynamic from MySQL / Admin) */}
            {keyFeaturesList.length > 0 && (
              <div className="space-y-1.5">
                <div className="border-l-[3px] border-red-600 pl-2 font-bold text-xs uppercase tracking-wide text-gray-800">
                  KEY FEATURES
                </div>
                <ul className="text-xs text-gray-700 space-y-1 leading-relaxed pl-2 font-normal">
                  {keyFeaturesList.map((feat, idx) => {
                    const colonIdx = feat.indexOf(":");
                    if (colonIdx !== -1) {
                      const label = feat.slice(0, colonIdx);
                      const val = feat.slice(colonIdx + 1);
                      return (
                        <li key={idx}>
                          <strong className="text-gray-900">{label}:</strong>
                          {val}
                        </li>
                      );
                    }
                    return <li key={idx}>{feat}</li>;
                  })}
                </ul>
              </div>
            )}

            {/* PRICE HIGHLIGHT BOX */}
            <div className="bg-[#fbfbfb] border border-gray-200 rounded-md p-3.5 sm:p-4 space-y-1">
              <div className="flex flex-wrap items-center gap-3">
                {savingsAmount > 0 && (
                  <span className="text-sm text-gray-400 line-through">
                    ৳{regularPrice}
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-extrabold text-[#e53e3e]">
                  ৳{unitPrice}
                </span>
                {savingsAmount > 0 && (
                  <span className="bg-[#fff1f0] border border-[#ffccc7] text-[#e53e3e] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 uppercase rounded-xs tracking-wider">
                    YOU SAVE ৳{savingsAmount}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500">
                Price includes VAT. Free delivery inside Dhaka city on bulk orders.
              </p>
            </div>

            {/* COLOR / VARIANT SELECTOR (Dynamic from MySQL / Admin) */}
            {availableVariants.length > 0 && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">
                    আপনার পছন্দের কুকার/কালার সিলেক্ট করুন নিচে থেকে ।{" "}
                    <span className="text-gray-400">{availableVariants.length} options</span>
                  </span>
                  {selectedColor && (
                    <span className="font-bold text-gray-900">{selectedColor.name}</span>
                  )}
                </div>

                {/* Variant Pill Buttons */}
                <div className="flex flex-wrap gap-2">
                  {availableVariants.map((col) => {
                    const isSelected = selectedColor?.slug === col.slug;
                    return (
                      <button
                        key={col.slug}
                        type="button"
                        onClick={() => {
                          setSelectedColor(col);
                          if (col.image) setActiveImage(col.image);
                        }}
                        className={`px-3.5 py-1.5 rounded-md text-xs font-medium border cursor-pointer transition-all ${
                          isSelected
                            ? "border-2 border-gray-900 text-gray-900 bg-white font-bold shadow-xs"
                            : "border-gray-300 text-gray-700 hover:border-gray-400 bg-white"
                        }`}
                      >
                        {col.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price & SKU line */}
            <div className="flex items-center gap-3 text-xs pt-1">
              <span className="text-[#e53e3e] font-bold text-base">{unitPrice} ৳</span>
              {savingsAmount > 0 && (
                <span className="text-gray-400 line-through text-xs">{regularPrice} ৳</span>
              )}
              <span className="text-[#2b3990] font-mono text-[11px] font-semibold">
                SKU: {skuString}
              </span>
            </div>

            {/* QUANTITY & PRIMARY BUTTONS ROW */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {/* Stepper */}
              <div className="flex items-center border border-gray-300 rounded-md bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-xs font-bold cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="px-3 py-2 text-xs font-bold text-gray-800 min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-xs font-bold cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>

              {/* ADD TO CART Button (Dark Navy Blue) */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-md bg-[#2b3990] hover:bg-[#202c70] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{cartSuccess ? "ADDED TO CART!" : "ADD TO CART"}</span>
              </button>

              {/* BUY NOW Button (Red) */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-md bg-[#c53030] hover:bg-[#a82525] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>BUY NOW</span>
              </button>
            </div>

            {/* SECONDARY CALL & WHATSAPP BUTTONS (Dynamic phone & whatsapp) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {/* কল করে অর্ডার করুন */}
              <a
                href={`tel:${phoneNumber}`}
                className="py-2.5 px-4 rounded-md bg-[#ebf4ff] hover:bg-blue-100 text-[#1e40af] border border-blue-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>কল করে অর্ডার করুন ({phoneNumber})</span>
              </a>

              {/* হোয়াটসঅ্যাপে অর্ডার করুন */}
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `হ্যালো! আমি '${product.name}' ${
                    selectedColor ? `(${selectedColor.name})` : ""
                  } মূল্য: ৳${product.salePrice} অর্ডার করতে চাই।`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-md bg-[#25D366] hover:bg-[#1ebd56] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>হোয়াটসঅ্যাপে অর্ডার করুন</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. DESCRIPTION & RELATED PRODUCTS */}
        <div className="space-y-4">
          {/* Tabs bar */}
          <div className="bg-white rounded-md border border-gray-200 px-4 py-2.5">
            <span className="text-xs font-bold text-gray-900 border-b-2 border-red-600 pb-2.5 px-1 inline-block">
              Description
            </span>
          </div>

          {/* 2-Columns Grid: Left 8 Cols (Description + Order Form) | Right 4 Cols (Related Products) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column (8 Cols): DESCRIPTION & PLACE YOUR ORDER */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* DESCRIPTION CARD (100% Dynamic from Backend) */}
              <div className="bg-white rounded-md border border-gray-200 p-5 sm:p-7 space-y-4 shadow-xs">
                <div className="border-l-[3px] border-red-600 pl-2 font-bold text-sm uppercase tracking-wide text-gray-900">
                  DESCRIPTION
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
                  <h3 className="font-bold text-base text-gray-900">
                    {product.name}
                  </h3>

                  {product.description && (
                    <div
                      className="text-gray-700 leading-relaxed text-xs sm:text-sm space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-bold [&_h1]:text-lg [&_h2]:text-base [&_h3]:text-sm [&_h3]:font-bold [&_a]:text-blue-600 [&_a]:underline [&_*]:!bg-transparent"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  )}

                  {/* Benefits Array */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        কেন এটি আপনার পছন্দের তালিকায় থাকবে?
                      </h4>
                      <ul className="space-y-2 pl-1">
                        {product.benefits.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-red-600 font-bold">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Facilities / Package Array */}
                  {product.facilities && product.facilities.length > 0 && (
                    <div className="space-y-2 pt-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        প্যাকেজে যা যা থাকছে / বিশেষ সুবিধাসমূহ:
                      </h4>
                      <ul className="space-y-1.5 pl-1">
                        {product.facilities.map((fac, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-600">
                            <span className="text-emerald-600 font-bold">✔</span>
                            <span>{fac}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* DIRECT CASH ON DELIVERY ORDER FORM (PLACE YOUR ORDER) */}
              <div id="order-form-section" className="bg-white rounded-md border border-gray-200 p-5 sm:p-7 space-y-6 shadow-xs scroll-mt-20">
                <div className="text-center border-b border-gray-100 pb-3">
                  <h3 className="font-black text-base sm:text-lg uppercase tracking-widest text-[#e53e3e]">
                    PLACE YOUR ORDER
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    অর্ডার করতে নিচের ফর্মটি পূরণ করুন • পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন
                  </p>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">
                      আপনার সম্পূর্ণ নাম <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-md border border-gray-300 focus:border-red-600 focus:outline-none"
                      />
                      <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">
                      আপনার সচল মোবাইল নাম্বার <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="যেমন: 017XXXXXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-md border border-gray-300 focus:border-red-600 focus:outline-none font-mono"
                      />
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-gray-700">
                      সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        required
                        rows={2}
                        placeholder="বাসা নং, রোড নং, এলাকা, থানা ও জেলার নাম লিখুন..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-md border border-gray-300 focus:border-red-600 focus:outline-none"
                      />
                      <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  {/* Delivery Area Options (Dynamic Fees from Product) */}
                  <div className="space-y-1.5 pt-1">
                    <label className="block text-xs font-bold text-gray-700">
                      ডেলিভারি এলাকা সিলেক্ট করুন
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <label
                        onClick={() => setDeliveryArea("inside")}
                        className={`p-3 rounded-md border flex items-center justify-between cursor-pointer transition-all ${
                          deliveryArea === "inside"
                            ? "border-red-600 bg-red-50/50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="deliveryArea"
                            checked={deliveryArea === "inside"}
                            onChange={() => setDeliveryArea("inside")}
                            className="accent-red-600"
                          />
                          <span className="text-xs font-semibold text-gray-800">
                            ঢাকা সিটির ভেতরে (২৪-৪৮ ঘণ্টা)
                          </span>
                        </div>
                        <span className="font-bold text-xs text-gray-900">৳{deliveryInsideFee}</span>
                      </label>

                      <label
                        onClick={() => setDeliveryArea("outside")}
                        className={`p-3 rounded-md border flex items-center justify-between cursor-pointer transition-all ${
                          deliveryArea === "outside"
                            ? "border-red-600 bg-red-50/50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="deliveryArea"
                            checked={deliveryArea === "outside"}
                            onChange={() => setDeliveryArea("outside")}
                            className="accent-red-600"
                          />
                          <span className="text-xs font-semibold text-gray-800">
                            ঢাকা সিটির বাইরে (২-৩ দিন)
                          </span>
                        </div>
                        <span className="font-bold text-xs text-gray-900">৳{deliveryOutsideFee}</span>
                      </label>
                    </div>
                  </div>

                  {/* Order Calculation Summary */}
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3.5 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>
                        পণ্যের দাম ({quantity} পিস
                        {selectedColor ? ` - ${selectedColor.name}` : ""}):
                      </span>
                      <span>৳ {itemsTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>ডেলিভারি চার্জ:</span>
                      <span>৳ {deliveryFee}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-1.5 flex justify-between font-bold text-sm text-red-600">
                      <span>সর্বমোট প্রদেয় টাকা:</span>
                      <span>৳ {grandTotal}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-4 rounded-md bg-[#c53030] hover:bg-[#a82525] text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    {submitting ? (
                      <span>অর্ডার প্রসেস হচ্ছে...</span>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>অর্ডার কনফার্ম করুন (৳ {grandTotal})</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column (4 Cols): RELATED PRODUCTS */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-md border border-gray-200 p-4 space-y-4 shadow-xs">
                <div className="border-l-[3px] border-red-600 pl-2 font-bold text-sm uppercase tracking-wide text-gray-900">
                  RELATED PRODUCTS
                </div>

                <div className="space-y-4">
                  {relatedProducts.length === 0 ? (
                    <div className="text-xs text-gray-400 py-6 text-center">
                      কোনো সম্পর্কিত পণ্য পাওয়া যায়নি।
                    </div>
                  ) : (
                    relatedProducts.map((rel) => (
                      <div
                        key={rel.id}
                        className="border border-gray-200 rounded-md p-3.5 space-y-3 bg-white hover:shadow-xs transition-shadow relative"
                      >
                        {rel.regularPrice > rel.salePrice && (
                          <div className="absolute top-2 right-2 bg-[#e53e3e] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
                            -{rel.regularPrice - rel.salePrice}৳
                          </div>
                        )}

                        <div className="aspect-square w-full rounded-md overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                          <img
                            src={rel.featuredImage || "/products/related-power-saver.png"}
                            alt={rel.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <h4 className="font-bold text-xs text-gray-800 line-clamp-2 hover:text-[#2b3990] transition-colors leading-snug">
                            {rel.name}
                          </h4>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-xs text-gray-500">From</span>
                            <span className="text-sm font-bold text-red-600">
                              {rel.salePrice}৳
                            </span>
                            {rel.regularPrice > rel.salePrice && (
                              <span className="text-[11px] text-gray-400 line-through">
                                {rel.regularPrice}৳
                              </span>
                            )}
                          </div>
                        </div>

                        <Link
                          href={`/product/${rel.id}`}
                          className="w-full py-2 rounded-md bg-[#2b3990] hover:bg-[#202c70] text-white text-xs font-bold uppercase tracking-wider text-center block transition-colors shadow-xs"
                        >
                          ORDER NOW
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function SingleProductLandingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 bg-gray-50">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-bold text-sm">
            প্রোডাক্ট লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
          </p>
        </div>
      }
    >
      <SingleProductContent />
    </Suspense>
  );
}

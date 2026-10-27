import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  slug?: string;
  description: string;
  category: string;
  regularPrice: number;
  salePrice: number;
  discountPercentage: number;
  featuredImage: string;
  galleryImages: string[];
  benefits: string[];
  facilities: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  rating: number;
  badge?: string;
  icon: string;
  inStock: boolean;
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface ProductState {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  searchQuery: string;
  activeModalProduct: Product | null;
}

const initialCategories: Category[] = [
  { id: "cat-1", name: "Cloud Solutions", slug: "cloud-solutions", icon: "☁️" },
  { id: "cat-2", name: "AI & Machine Learning", slug: "ai-machine-learning", icon: "🧠" },
  { id: "cat-3", name: "Cyber Security", slug: "cyber-security", icon: "🛡️" },
  { id: "cat-4", name: "Infrastructure & API", slug: "infrastructure-api", icon: "⚡" },
  { id: "cat-5", name: "Business Operations", slug: "business-operations", icon: "📊" },
];

const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Enterprise Cloud Suite Pro",
    slug: "enterprise-cloud-suite-pro",
    category: "Cloud Solutions",
    regularPrice: 399,
    salePrice: 299,
    discountPercentage: 25,
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Complete enterprise-grade cloud suite with automated clustering, multi-region database failover, and serverless edge functions.",
    benefits: [
      "৯৯.৯৯% হাই-অ্যাভেইলেবিলিটি আপটাইম গ্যারান্টি",
      "স্বয়ংক্রিয় ক্লাউড ব্যাকআপ এবং ওয়ান-ক্লিক রিস্টোর",
      "সর্বাধুনিক মাইক্রোসার্ভিস এবং কুবারনেটিস সাপোর্ট",
      "জিরো ডাউনটাইম স্মুথ ক্লাউড মাইগ্রেশন"
    ],
    facilities: [
      "২৪/৭ ডেডিকেটেড টেকনিক্যাল হেল্পডেস্ক",
      "ফ্রি কমপ্লিট অনবোর্ডিং এবং আর্কিটেকচার কনসালটেশন",
      "৩০ দিনের শর্তহীন মানি-ব্যাক গ্যারান্টি",
      "রিয়েল-টাইম ডিসকর্ড এবং স্ল্যাক চ্যানেল সাপোর্ট"
    ],
    seoTitle: "Enterprise Cloud Suite Pro | Best Cloud Platform for Business",
    seoDescription: "Accelerate your infrastructure with Enterprise Cloud Suite Pro. High-availability cloud clustering with 24/7 dedicated support.",
    seoImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    badge: "Popular",
    icon: "☁️",
    inStock: true,
    stock: 45,
  },
  {
    id: "prod-2",
    name: "AI Analytics Intelligence Platform",
    slug: "ai-analytics-intelligence-platform",
    category: "AI & Machine Learning",
    regularPrice: 599,
    salePrice: 499,
    discountPercentage: 17,
    featuredImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Deep predictive learning models, anomaly detection, visual trend forecasting dashboards, and real-time business telemetry.",
    benefits: [
      "অটোমেটেড প্রিডিক্টিভ সেলস মডেলিং ও রেভিনিউ ফোরকাস্টিং",
      "রিয়েল-টাইম ফ্রড এবং ডেটা অস্বাভাবিকতা ডিটেকশন",
      "কাস্টমাইজেবল এক্সিকিউটিভ ড্যাশবোর্ড এবং ড্র্যাগ-অ্যান্ড-ড্রপ উইজেট",
      "REST & GraphQL ফুল এআই এপিআই অ্যাক্সেস"
    ],
    facilities: [
      "ডেডিকেটেড এআই ট্রেইনিং ও কাস্টম ফাইন-টিউনিং সাপোর্ট",
      "মাসিক এক্সক্লুসিভ বিজনেস অ্যানালিটিক্স রিপোর্ট",
      "সীমাহীন কোয়েরি ও কাস্টম ডেটাসেট ইন্টিগ্রেশন"
    ],
    seoTitle: "AI Analytics Intelligence Platform - Next-Gen Business Insights",
    seoDescription: "Transform business data into actionable growth with advanced AI and neural analytics.",
    seoImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80",
    rating: 5.0,
    badge: "Featured",
    icon: "🧠",
    inStock: true,
    stock: 18,
  },
  {
    id: "prod-3",
    name: "Shield Cyber Security Mesh",
    slug: "shield-cyber-security-mesh",
    category: "Cyber Security",
    regularPrice: 249,
    salePrice: 199,
    discountPercentage: 20,
    featuredImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Zero-trust identity verification, real-time intrusion prevention, endpoint protection, and automated compliance tracking.",
    benefits: [
      "মিলিটারি গ্রেড এন্ড-টু-এন্ড এনক্রিপশন প্রটোকল",
      "রিয়েল-টাইম অটোমেটিক থ্রেট ব্লকিং ও ব্ল্যাকলিস্টিং",
      "আইএসও এবং জিডিপিআর কমপ্লায়েন্স রেডিনেস চেকলিস্ট"
    ],
    facilities: [
      "২৪/৭ সিকিউরিটি অপারেশন সেন্টার (SOC) মনিটরিং",
      "ইন্সিডেন্ট রেসপন্স টিম সাপোর্ট"
    ],
    seoTitle: "Shield Cyber Security Mesh - Zero Trust Protection",
    seoDescription: "Enterprise-grade cyber security mesh protecting endpoints, networks, and data.",
    seoImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    badge: "Security",
    icon: "🛡️",
    inStock: true,
    stock: 80,
  },
  {
    id: "prod-4",
    name: "High-Throughput API Gateway",
    slug: "high-throughput-api-gateway",
    category: "Infrastructure & API",
    regularPrice: 199,
    salePrice: 149,
    discountPercentage: 25,
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Sub-millisecond latency rate limiting, token validation, distributed caching, and automated request tracing.",
    benefits: [
      "প্রতি সেকেন্ডে ৫০,০০০+ কনকারেন্ট রিকুয়েস্ট হ্যান্ডলিং",
      "সাব-মিলিটার্নসি রেট লিমিটিং এবং স্পাইক প্রোটেকশন",
      "অটোমেটেড ওপেনএপিআই ও সোয়েগার ডকুমেন্টেশন জেনারেশন"
    ],
    facilities: [
      "আনলিমিটেড এপিআই কী ও সিকিউর টোকেন ম্যানেজমেন্ট",
      "গ্লোবাল এজ ক্যাশিং এবং লোড ব্যালেন্সার"
    ],
    seoTitle: "High-Throughput API Gateway - Enterprise Performance",
    seoDescription: "High-throughput, sub-millisecond API Gateway built for mission-critical microservices.",
    seoImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    badge: "Fast",
    icon: "⚡",
    inStock: true,
    stock: 35,
  },
  {
    id: "prod-5",
    name: "Omnichannel Customer Hub",
    slug: "omnichannel-customer-hub",
    category: "Business Operations",
    regularPrice: 320,
    salePrice: 249,
    discountPercentage: 22,
    featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Centralized communications across WhatsApp, Email, Live Chat, and CRM with automated triage bots.",
    benefits: [
      "সিঙ্গেল ইনবক্সে সকল সোশ্যাল ও মেসেজিং চ্যানেল ইন্টিগ্রেশন",
      "স্মার্ট বট দ্বারা ৬০% সাধারণ সাপোর্ট টিকিট অটোমেশন",
      "কাস্টমার জার্নি ও লাইফটাইম ভ্যালু অ্যানালিটিক্স"
    ],
    facilities: [
      "আনলিমিটেড এজেন্ট অ্যাকাউন্টস",
      "হোয়াটসঅ্যাপ বিজনেস এপিআই ভেরিফাইড কানেক্টিভিটি"
    ],
    seoTitle: "Omnichannel Customer Hub - All-in-one CRM & Chat",
    seoDescription: "Empower your support and sales team with unified messaging across all enterprise channels.",
    seoImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    badge: "Top Rated",
    icon: "📊",
    inStock: true,
    stock: 62,
  },
  {
    id: "prod-6",
    name: "Global Edge Content Delivery",
    slug: "global-edge-content-delivery",
    category: "Infrastructure & API",
    regularPrice: 120,
    salePrice: 89,
    discountPercentage: 26,
    featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Ultra-fast global edge caching with automatic SSL, HTTP/3, image optimization, and DDoS mitigation.",
    benefits: [
      "বিশ্বব্যাপী ৩০০+ এজ লোকেশনে তাৎক্ষণিক কন্টেন্ট ডিস্ট্রিবিউশন",
      "স্বয়ংক্রিয় ওয়েবপি/এভিআইএফ ইমেজ কম্পপ্রেশন",
      "অটোমেটেড লেয়ার ৩/৪/৭ ডিডিওএস প্রটেকশন"
    ],
    facilities: [
      "ফ্রি ওয়াইল্ডকার্ড এসএসএল সার্টিফিকেট",
      "রিয়েল-টাইম ব্যান্ডউইথ ও ট্রাফিক মনিটরিং"
    ],
    seoTitle: "Global Edge CDN - Ultra-low Latency Worldwide",
    seoDescription: "Speed up your website with global edge caching and instant DDoS protection.",
    seoImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    icon: "🌐",
    inStock: true,
    stock: 120,
  },
];

const initialState: ProductState = {
  products: initialProducts,
  categories: initialCategories,
  selectedCategory: "All",
  searchQuery: "",
  activeModalProduct: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveModalProduct: (state, action: PayloadAction<Product | null>) => {
      state.activeModalProduct = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setActiveModalProduct,
  addProduct,
} = productSlice.actions;

export default productSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  badge?: string;
  icon: string;
  inStock: boolean;
}

interface ProductState {
  products: Product[];
  selectedCategory: string;
  searchQuery: string;
}

const initialProducts: Product[] = [
  {
    id: "prod-1",
    name: "Enterprise Cloud Suite Pro",
    description: "Full-scale cloud orchestration, multi-region failover, and automated scale.",
    price: 299,
    rating: 4.9,
    category: "Cloud",
    badge: "Popular",
    icon: "☁️",
    inStock: true,
  },
  {
    id: "prod-2",
    name: "AI Analytics Intelligence Platform",
    description: "Deep predictive learning models, anomaly detection, and visual dashboards.",
    price: 499,
    rating: 5.0,
    category: "AI & ML",
    badge: "Featured",
    icon: "🧠",
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Shield Cyber Security Mesh",
    description: "Zero-trust identity verification, real-time intrusion prevention & DLP.",
    price: 199,
    rating: 4.8,
    category: "Security",
    badge: "Security",
    icon: "🛡️",
    inStock: true,
  },
  {
    id: "prod-4",
    name: "High-Throughput API Gateway",
    description: "Sub-millisecond latency rate limiting, token validation & telemetry.",
    price: 149,
    rating: 4.7,
    category: "Infrastructure",
    badge: "Fast",
    icon: "⚡",
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Omnichannel Customer Hub",
    description: "Centralized communications, automated workflows, and CRM synchronization.",
    price: 249,
    rating: 4.9,
    category: "Business",
    badge: "Top Rated",
    icon: "📊",
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Global Edge Content Delivery",
    description: "Ultra-fast global edge caching with automatic SSL & DDoS mitigation.",
    price: 89,
    rating: 4.6,
    category: "Infrastructure",
    icon: "🌐",
    inStock: true,
  },
];

const initialState: ProductState = {
  products: initialProducts,
  selectedCategory: "All",
  searchQuery: "",
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
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.unshift(action.payload);
    },
  },
});

export const { setSelectedCategory, setSearchQuery, addProduct } =
  productSlice.actions;

export default productSlice.reducer;

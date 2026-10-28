import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const API_BASE = "http://localhost:5000/api";

export interface ProductVariant {
  name: string;
  slug: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  brand?: string;
  description: string;
  category: string;
  regularPrice: number;
  salePrice: number;
  discountPercentage: number;
  featuredImage: string;
  galleryImages: string[];
  variants?: ProductVariant[];
  keyFeatures?: string[];
  benefits: string[];
  facilities: string[];
  deliveryInside?: number;
  deliveryOutside?: number;
  phoneNumber?: string;
  whatsappNumber?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  rating: number;
  salesCount?: number;
  badge?: string;
  icon: string;
  inStock?: boolean;
  status?: string;
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface ProductState {
  products: Product[]; // 100% dynamic from MySQL
  categories: Category[]; // 100% dynamic from MySQL
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  searchQuery: string;
  activeModalProduct: Product | null;
}

// Fetch products dynamically from Express backend & MySQL
export const fetchWebsiteProducts = createAsyncThunk(
  "products/fetchWebsiteProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/products`, { cache: "no-store" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to fetch products");
      return json.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Network error fetching products");
    }
  }
);

// Fetch categories dynamically from Express backend & MySQL
export const fetchWebsiteCategories = createAsyncThunk(
  "products/fetchWebsiteCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/categories`, { cache: "no-store" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to fetch categories");
      return json.data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Network error fetching categories");
    }
  }
);

const initialState: ProductState = {
  products: [], // No static or fallback data
  categories: [], // No static or fallback data
  loading: false,
  error: null,
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
  },
  extraReducers: (builder) => {
    // fetchWebsiteProducts
    builder
      .addCase(fetchWebsiteProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsiteProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload || [];
      })
      .addCase(fetchWebsiteProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchWebsiteCategories
    builder.addCase(fetchWebsiteCategories.fulfilled, (state, action) => {
      state.categories = action.payload || [];
    });
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  setActiveModalProduct,
} = productSlice.actions;

export default productSlice.reducer;

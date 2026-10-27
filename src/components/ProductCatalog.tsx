"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Check,
  Search,
  CheckCircle,
  Sparkles,
  Percent,
  Eye,
  X,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import {
  setSelectedCategory,
  setSearchQuery,
  setActiveModalProduct,
  fetchWebsiteProducts,
  fetchWebsiteCategories,
  type Product,
} from "@/redux/slices/productSlice";

export function ProductCatalog() {
  const dispatch = useAppDispatch();
  const {
    products,
    categories,
    selectedCategory,
    searchQuery,
    activeModalProduct,
    loading,
    error,
  } = useAppSelector((state) => state.products);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    // 100% Dynamic data fetching from Express backend & MySQL
    dispatch(fetchWebsiteProducts());
    dispatch(fetchWebsiteCategories());
  }, [dispatch]);

  const categoryOptions = ["All", ...categories.map((c) => c.name)];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.salePrice,
        category: product.category,
        image: product.icon || "📦",
      })
    );
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <section id="products" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Dynamic Catalog & Category Engine
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Featured Enterprise Solutions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Browse through dynamic categories with regular vs sale price, discount savings, and verified benefits.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products & benefits..."
            className="pl-9 bg-card border-border/80"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categoryOptions.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => dispatch(setSelectedCategory(cat))}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/60"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Loading & Empty State */}
      {loading && products.length === 0 ? (
        <div className="text-center py-20 border border-border/60 rounded-2xl bg-card/40 space-y-3">
          <RefreshCw className="w-6 h-6 text-primary animate-spin mx-auto" />
          <p className="text-sm font-medium text-foreground">
            Fetching dynamic solutions from MySQL Database via Drizzle ORM...
          </p>
          <p className="text-xs text-muted-foreground">Connecting to localhost:5000/api/products</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/40">
          <p className="text-muted-foreground text-sm">
            {error ? `Database error: ${error}` : "No products found matching your search."}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              dispatch(setSelectedCategory("All"));
              dispatch(setSearchQuery(""));
              dispatch(fetchWebsiteProducts());
            }}
          >
            Refresh Dynamic Records
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col justify-between overflow-hidden border-border/80 hover:border-primary/50 group transition-all"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={product.featuredImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white border border-white/10">
                      {product.category}
                    </span>
                  </div>

                  {product.discountPercentage > 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-md">
                      <Percent className="w-3 h-3" />
                      {product.discountPercentage}% OFF
                    </div>
                  )}

                  {/* View Details quick hover button */}
                  <button
                    onClick={() => dispatch(setActiveModalProduct(product))}
                    className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-900 text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    Details & Benefits
                  </button>
                </div>

                <CardHeader className="pb-3 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold">
                      <Star className="h-4 w-4 fill-amber-500" />
                      <span>{product.rating.toFixed(1)} / 5.0</span>
                    </div>
                    {product.badge && (
                      <Badge variant="accent" className="font-semibold text-[10px]">
                        {product.badge}
                      </Badge>
                    )}
                  </div>

                  <CardTitle className="group-hover:text-primary transition-colors text-lg mt-1 line-clamp-1">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1 text-xs">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4 space-y-3">
                  {/* Highlights of Benefits */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/15 space-y-1">
                      <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        প্রধান উপকারিতা:
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        • {product.benefits[0]}
                      </p>
                    </div>
                  )}

                  {/* Pricing Matrix */}
                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-bold text-foreground">
                      ${product.salePrice}
                    </span>
                    {product.regularPrice > product.salePrice && (
                      <span className="text-sm line-through text-muted-foreground font-medium">
                        ${product.regularPrice}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">/ month</span>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-2 border-t border-border/40 flex gap-2">
                <Button
                  className="w-full gap-2 transition-all font-medium"
                  variant={addedId === product.id ? "secondary" : "default"}
                  onClick={() => handleAddToCart(product)}
                >
                  {addedId === product.id ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-600" />
                      Added to Cart!
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Customer Product Details & Benefits Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-muted/40">
              <div>
                <span className="text-xs font-semibold text-primary">
                  {activeModalProduct.category}
                </span>
                <h3 className="font-bold text-foreground text-lg">
                  {activeModalProduct.name}
                </h3>
              </div>
              <button
                onClick={() => dispatch(setActiveModalProduct(null))}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Media gallery */}
              <div className="space-y-3">
                <div className="h-56 rounded-xl overflow-hidden border border-border bg-black">
                  <img
                    src={activeModalProduct.featuredImage}
                    alt={activeModalProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {activeModalProduct.galleryImages &&
                  activeModalProduct.galleryImages.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {activeModalProduct.galleryImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          className="w-16 h-14 rounded-lg object-cover border border-border shrink-0"
                        />
                      ))}
                    </div>
                  )}
              </div>

              {/* Price & Savings */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">প্যাকেজ মূল্য</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold text-foreground">
                      ${activeModalProduct.salePrice}
                    </span>
                    {activeModalProduct.regularPrice >
                      activeModalProduct.salePrice && (
                      <span className="text-sm line-through text-muted-foreground font-medium">
                        ${activeModalProduct.regularPrice}
                      </span>
                    )}
                  </div>
                </div>

                {activeModalProduct.discountPercentage > 0 && (
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm flex items-center gap-1">
                    <Percent className="w-3.5 h-3.5" />
                    {activeModalProduct.discountPercentage}% Discount
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                  বিবরণ (Description)
                </h4>
                <p className="text-sm text-foreground leading-relaxed bg-muted/30 p-3.5 rounded-lg border border-border/60">
                  {activeModalProduct.description}
                </p>
              </div>

              {/* Benefits (উপকারিতা) */}
              {activeModalProduct.benefits &&
                activeModalProduct.benefits.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2.5 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" />
                      উপকারিতা সমূহ (Key Benefits)
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProduct.benefits.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-foreground"
                        >
                          <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Facilities (সুবিধাসমূহ) */}
              {activeModalProduct.facilities &&
                activeModalProduct.facilities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      সুবিধাসমূহ (Included Facilities)
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeModalProduct.facilities.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-xs text-foreground"
                        >
                          <span className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-muted/30 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                ইনস্ট্যান্ট অ্যাক্টিভেশন • ২৪/৭ সাপোর্ট
              </span>
              <Button
                className="bg-primary text-primary-foreground font-semibold"
                onClick={() => {
                  handleAddToCart(activeModalProduct);
                  dispatch(setActiveModalProduct(null));
                }}
              >
                Add to Cart (${activeModalProduct.salePrice})
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

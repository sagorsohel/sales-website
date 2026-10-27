"use client";

import React, { useState } from "react";
import { Star, Plus, Check, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";
import { setSelectedCategory, setSearchQuery } from "@/redux/slices/productSlice";

const categories = ["All", "Cloud", "AI & ML", "Security", "Infrastructure", "Business"];

export function ProductCatalog() {
  const dispatch = useAppDispatch();
  const { products, selectedCategory, searchQuery } = useAppSelector(
    (state) => state.products
  );
  const [addedId, setAddedId] = useState<string | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: (typeof products)[0]) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: product.icon,
      })
    );
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId(null);
    }, 1200);
  };

  return (
    <section id="products" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Catalog & Redux Store
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Featured Enterprise Solutions
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time shopping state managed via Redux Toolkit slices.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products..."
            className="pl-9 bg-card border-border/80"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => {
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

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card/40">
          <p className="text-muted-foreground text-sm">No products found matching your search.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => {
              dispatch(setSelectedCategory("All"));
              dispatch(setSearchQuery(""));
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="flex flex-col justify-between overflow-hidden border-border/80 hover:border-primary/50 group"
            >
              <div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-3xl p-2 rounded-xl bg-primary/10 border border-primary/20">
                      {product.icon}
                    </span>
                    {product.badge && (
                      <Badge variant="accent" className="font-semibold text-[11px]">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500 font-semibold mb-3">
                    <Star className="h-4 w-4 fill-amber-500" />
                    <span>{product.rating.toFixed(1)} / 5.0</span>
                    <span className="text-muted-foreground font-normal ml-2">
                      ({product.category})
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">
                      ${product.price}
                    </span>
                    <span className="text-xs text-muted-foreground">/ month</span>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="pt-2 border-t border-border/40">
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
    </section>
  );
}

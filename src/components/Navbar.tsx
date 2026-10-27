"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Sparkles, Layers, ShieldCheck, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleCart } from "@/redux/slices/cartSlice";

export function Navbar() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md shadow-primary/25 transition-transform group-hover:scale-105">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-foreground">
                Wide<span className="text-primary">Sales</span>
              </span>
              <span className="inline-flex items-center rounded-md bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">
              Enterprise Sales & Cloud Ecosystem
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <a
            href="#products"
            className="transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Products
          </a>
          <a
            href="#features"
            className="transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Features
          </a>
          <a
            href="#tech-stack"
            className="transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Architecture
          </a>
          <div className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Backend API :5000
          </div>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="relative gap-2 border-primary/30 hover:border-primary"
            onClick={() => dispatch(toggleCart())}
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline font-semibold">Cart</span>
            {totalCount > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground animate-in zoom-in-75">
                {totalCount}
              </span>
            )}
          </Button>

          <a
            href="http://localhost:5173"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button size="sm" className="bg-primary text-primary-foreground gap-1.5 shadow-md shadow-primary/20">
              Admin Panel
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

"use client";

import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-border/40">
      {/* Background Decorative Gradients with Primary Theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[700px] h-[400px] bg-gradient-to-tr from-primary/15 via-blue-500/10 to-indigo-600/15 blur-3xl opacity-70 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary mb-6 shadow-sm">
          <Sparkles className="h-4 w-4 animate-spin text-primary" />
          <span>Full-Stack Enterprise Architecture with Next.js & Redux</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
          Supercharge Your Sales & Ecosystem with{" "}
          <span className="bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent underline decoration-primary/40 decoration-wavy underline-offset-8">
            Modern Precision
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Built with <strong>Next.js 16</strong>, <strong>Tailwind CSS</strong>, custom <strong>shadcn/ui</strong> design tokens with primary theme palette, and centralized <strong>Redux Toolkit</strong> state management.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a href="#products">
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 text-base px-6 h-12">
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="http://localhost:5000/api/health" target="_blank" rel="noreferrer">
            <Button size="lg" variant="outline" className="text-base px-6 h-12 border-border/80">
              Check Express Backend
            </Button>
          </a>
        </div>

        {/* Key metric pillars */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-4">
            <div className="text-2xl font-bold text-primary">99.99%</div>
            <div className="text-xs text-muted-foreground mt-0.5">High-Availability SLA</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-4">
            <div className="text-2xl font-bold text-primary">&lt;15ms</div>
            <div className="text-xs text-muted-foreground mt-0.5">API Response Latency</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-4">
            <div className="text-2xl font-bold text-primary">Redux RTK</div>
            <div className="text-xs text-muted-foreground mt-0.5">Synced Global State</div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm p-4">
            <div className="text-2xl font-bold text-primary">shadcn/ui</div>
            <div className="text-xs text-muted-foreground mt-0.5">Tailwind Primary Palette</div>
          </div>
        </div>
      </div>
    </section>
  );
}

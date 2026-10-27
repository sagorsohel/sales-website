"use client";

import React from "react";
import { Server, Layout, Database, Shield, Cpu, RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TechStackSection() {
  const stack = [
    {
      title: "Frontend Website",
      tech: "Next.js 16 + React 19",
      desc: "App Router, Server & Client Components, SEO optimized, fast streaming SSR.",
      badge: "Port 3000",
      icon: <Layout className="h-6 w-6 text-primary" />,
    },
    {
      title: "UI Design System",
      tech: "shadcn/ui + Tailwind CSS",
      desc: "Curated modern primary color scheme, accessible components, CSS tokens.",
      badge: "Tailwind v4",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      title: "Global State Management",
      tech: "Redux Toolkit (RTK)",
      desc: "Cart, products, and user actions managed seamlessly with predictable slices.",
      badge: "Central Store",
      icon: <RefreshCw className="h-6 w-6 text-primary" />,
    },
    {
      title: "Backend API Service",
      tech: "Express.js + Nodemon",
      desc: "Fast REST API, dotenv configuration, CORS security, and modular routes.",
      badge: "Port 5000",
      icon: <Server className="h-6 w-6 text-primary" />,
    },
    {
      title: "Admin Panel Dashboard",
      tech: "React.js + RTK + Vite",
      desc: "Live analytics, product inventory management, order pipelines, and metrics.",
      badge: "Port 5173",
      icon: <Database className="h-6 w-6 text-primary" />,
    },
    {
      title: "Full-Stack Synergy",
      tech: "Unified Ecosystem",
      desc: "Real-time communication, unified schemas, and seamless developer experience.",
      badge: "Production Ready",
      icon: <Cpu className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <section id="tech-stack" className="py-16 bg-muted/30 border-y border-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="accent" className="mb-3">
            Monorepo Architecture
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Complete Three-Tier System
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Each layer is cleanly separated and built with modern engineering standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stack.map((item, idx) => (
            <Card key={idx} className="bg-card border-border/70 hover:border-primary/40">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  {item.icon}
                </div>
                <Badge variant="secondary" className="text-[11px] font-mono">
                  {item.badge}
                </Badge>
              </CardHeader>
              <CardContent className="pt-3">
                <h3 className="font-semibold text-foreground text-base">
                  {item.title}
                </h3>
                <div className="text-xs font-semibold text-primary mt-0.5 mb-2">
                  {item.tech}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

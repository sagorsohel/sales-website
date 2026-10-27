"use client";

import React from "react";
import { Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xs">
            <Layers className="h-4 w-4" />
          </div>
          <span className="font-semibold text-sm tracking-tight text-foreground">
            WideTech Sales System
          </span>
          <span className="text-xs text-muted-foreground ml-2">
            © 2026 All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          <span>Website: Next.js + Redux</span>
          <span>•</span>
          <span>Backend: Express.js + Nodemon</span>
          <span>•</span>
          <span>Admin: React + Redux Toolkit</span>
        </div>
      </div>
    </footer>
  );
}

// ReactProviders.tsx
"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./ui/tooltip";
import { Toaster as UiToaster } from "./ui/toaster";
import { Toaster as Sonner } from "./ui/sonner";
import ThemeToggle from "@components/ThemeToggle";

const queryClient = new QueryClient();

export default function ReactProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <UiToaster />
          <Sonner />
          <ThemeToggle />
          {children}
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

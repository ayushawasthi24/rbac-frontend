"use client";

import { LoadingProvider } from "@/lib/loading-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <LoadingProvider>{children}</LoadingProvider>;
}

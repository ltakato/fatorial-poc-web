"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </NextThemesProvider>
  );
}

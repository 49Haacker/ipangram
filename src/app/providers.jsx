"use client";

import { GlobalContextProvider } from "@/context/GlobalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>{children}</GlobalContextProvider>
    </QueryClientProvider>
  );
}

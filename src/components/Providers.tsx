"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { http } from "viem";
import { createConfig, WagmiProvider } from "wagmi";
import { injected } from "wagmi/connectors";
import { arcTestnet } from "@/lib/chains";
import { ToastProvider } from "@/components/Toast";

const config = createConfig({
  chains: [arcTestnet],
  connectors: [injected({ shimDisconnect: true })],
  ssr: true,
  transports: {
    [arcTestnet.id]: http(arcTestnet.rpcUrls.default.http[0])
  }
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

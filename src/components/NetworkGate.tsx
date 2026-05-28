"use client";

import { AlertCircle, Wifi } from "lucide-react";
import { ReactNode } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { arcTestnet } from "@/lib/chains";
import { cn } from "@/lib/utils";

export function NetworkGate({
  children,
  compact = false
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  const { isConnected, chainId } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  if (!isConnected) return <>{children}</>;
  if (chainId === arcTestnet.id) return <>{children}</>;

  return (
    <div className={cn("rounded-3xl border border-orange/20 bg-orange/10 p-5 text-cocoa", compact && "rounded-2xl p-3")}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-1 h-5 w-5 text-orange" />
          <div>
            <p className="font-black">Switch to Arc Testnet</p>
            <p className="mt-1 text-sm text-cocoaSoft">Onchain learning actions are available only on Arc Testnet.</p>
          </div>
        </div>
        <button
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-cocoa px-4 py-2.5 text-sm font-bold text-cream shadow-lift transition hover:bg-cocoa/90"
          onClick={() => switchChain({ chainId: arcTestnet.id })}
          disabled={isPending}
        >
          <Wifi className="h-4 w-4" />
          {isPending ? "Switching..." : "Switch Network"}
        </button>
      </div>
    </div>
  );
}

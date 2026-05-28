"use client";

import { Wallet, LogOut } from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { cn, shortAddress } from "@/lib/utils";

export function ConnectWalletButton({ className }: { className?: string }) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const connector = connectors[0];

  if (isConnected) {
    return (
      <button
        className={cn("focus-ring inline-flex items-center gap-2 rounded-full bg-cocoa px-4 py-2.5 text-sm font-bold text-cream shadow-lift transition hover:bg-cocoa/90", className)}
        onClick={() => disconnect()}
      >
        <LogOut className="h-4 w-4" />
        {shortAddress(address)}
      </button>
    );
  }

  return (
    <button
      className={cn("focus-ring inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2.5 text-sm font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:bg-[#dc7432] disabled:cursor-not-allowed disabled:opacity-70", className)}
      disabled={!connector || isPending}
      onClick={() => connector && connect({ connector })}
    >
      <Wallet className="h-4 w-4" />
      {isPending ? "Opening wallet..." : "Connect Wallet"}
    </button>
  );
}

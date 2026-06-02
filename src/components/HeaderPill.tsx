"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, BookOpen, Home, Info, Menu, Trophy, UserRound, Wifi, X } from "lucide-react";
import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { AlodocLogo } from "@/components/AlodocLogo";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { arcTestnet } from "@/lib/chains";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/classifier", label: "Classifier", icon: Activity },
  { href: "/passport", label: "Passport", icon: UserRound },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/about", label: "About", icon: Info }
];

const bottomNavItems = navItems.filter((item) => item.href !== "/about");

export function HeaderPill() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { chainId, isConnected } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const wrongNetwork = isConnected && chainId !== arcTestnet.id;

  return (
    <>
      <header className="sticky top-3 z-40 mx-auto flex w-[calc(100vw-24px)] max-w-7xl items-center justify-between gap-2 rounded-[1.7rem] border border-cocoa/10 bg-parchment/95 px-3 py-2 shadow-soft backdrop-blur md:top-4 md:rounded-full lg:px-5">
        <AlodocLogo compact />
        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-cocoaSoft transition hover:bg-mint/70 hover:text-cocoa",
                  active && "bg-mint text-cocoa"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          {wrongNetwork ? (
            <button
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-cocoa px-3 py-2.5 text-xs font-bold text-cream shadow-lift transition hover:bg-cocoa/90 sm:px-4 sm:text-sm"
              onClick={() => switchChain({ chainId: arcTestnet.id })}
              disabled={isPending}
            >
              <Wifi className="h-4 w-4" />
              {isPending ? "Switching" : <span className="hidden sm:inline">Arc Testnet</span>}
            </button>
          ) : (
            <ConnectWalletButton compact className="px-3 text-xs sm:px-4 sm:text-sm" />
          )}
          <button
            className="focus-ring inline-grid h-11 w-11 place-items-center rounded-full bg-white text-cocoa shadow-lift lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className="fixed left-3 right-3 top-[82px] z-30 rounded-[1.8rem] border border-cocoa/10 bg-parchment/95 p-3 shadow-soft backdrop-blur lg:hidden"
          >
            <div className="grid gap-2">
              {navItems.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "focus-ring flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-black text-cocoaSoft transition hover:bg-mint/70 hover:text-cocoa",
                      active && "bg-mint text-cocoa"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 border-t border-cocoa/10 pt-3">
                {wrongNetwork ? (
                  <button
                    className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-cocoa px-4 py-3 text-sm font-black text-cream shadow-lift"
                    onClick={() => switchChain({ chainId: arcTestnet.id })}
                    disabled={isPending}
                  >
                    <Wifi className="h-4 w-4" />
                    {isPending ? "Switching..." : "Switch to Arc Testnet"}
                  </button>
                ) : (
                  <ConnectWalletButton className="w-full justify-center" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <nav className="fixed bottom-3 left-3 right-3 z-40 grid grid-cols-5 gap-1 rounded-[1.6rem] border border-cocoa/10 bg-parchment/95 p-2 shadow-soft backdrop-blur md:hidden">
        {bottomNavItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={cn("grid place-items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-black text-cocoaSoft", active && "bg-mint text-cocoa")}>
              <Icon className="h-4 w-4" />
              {item.label === "Leaderboard" ? "Board" : item.label === "Classifier" ? "Classify" : item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

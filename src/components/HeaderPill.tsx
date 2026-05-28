"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Info, Trophy, UserRound } from "lucide-react";
import { AlodocLogo } from "@/components/AlodocLogo";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/library", label: "Library", icon: BookOpen },
  { href: "/passport", label: "Passport", icon: UserRound },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/about", label: "About", icon: Info }
];

export function HeaderPill() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-40 mx-auto flex w-[min(1120px,calc(100vw-24px))] items-center justify-between gap-3 rounded-full border border-cocoa/10 bg-parchment/90 px-3 py-2 shadow-soft backdrop-blur">
      <AlodocLogo compact />
      <nav className="hidden items-center gap-1 lg:flex">
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
      <ConnectWalletButton />
    </header>
  );
}

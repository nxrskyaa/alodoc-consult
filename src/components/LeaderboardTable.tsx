"use client";

import { useEffect, useState } from "react";
import { usePublicClient } from "wagmi";
import type { Address } from "viem";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { alodocContract } from "@/hooks/useAlodocContract";
import { AlodocProfile } from "@/lib/contract";
import { avatarUrl, shortAddress, toNumber } from "@/lib/utils";

type Row = {
  address: Address;
  profile: AlodocProfile;
  accuracy: number;
};

export function LeaderboardTable() {
  const publicClient = usePublicClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!publicClient) return;
      setLoading(true);
      try {
        const count = await publicClient.readContract({
          ...alodocContract,
          functionName: "getUserCount"
        });
        const limit = Number(count) > 100 ? 100n : BigInt(Number(count));
        const users = await publicClient.readContract({
          ...alodocContract,
          functionName: "getUsers",
          args: [0n, limit]
        });
        const loaded = await Promise.all(
          users.map(async (address) => {
            const [profile, accuracy] = await Promise.all([
              publicClient.readContract({
                ...alodocContract,
                functionName: "getProfile",
                args: [address]
              }),
              publicClient.readContract({
                ...alodocContract,
                functionName: "getAccuracy",
                args: [address]
              })
            ]);
            return { address, profile: profile as AlodocProfile, accuracy: Number(accuracy) };
          })
        );
        if (!cancelled) setRows(loaded.sort((a, b) => toNumber(b.profile.xp) - toNumber(a.profile.xp)));
      } catch {
        if (!cancelled) setRows([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [publicClient]);

  if (loading) {
    return <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-8 text-center font-black text-cocoa shadow-soft">Loading leaderboard...</div>;
  }

  if (!rows.length) {
    return (
      <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-8 text-center shadow-soft">
        <Trophy className="mx-auto h-10 w-10 text-orange" />
        <h2 className="mt-4 text-3xl font-black text-cocoa">No learners yet</h2>
        <p className="mt-2 text-sm font-semibold text-cocoaSoft">Create a passport and complete a quest to appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid gap-4 md:hidden">
        {rows.map((row, index) => (
          <motion.article
            key={row.address}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-[2rem] border border-cocoa/10 bg-parchment p-4 shadow-lift"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-orange text-lg font-black text-white">#{index + 1}</div>
              <img src={avatarUrl(row.profile.xUsername, row.profile.alodocUsername)} alt="" className="h-14 w-14 rounded-2xl bg-mint object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-black text-cocoa">{row.profile.displayName}</p>
                <p className="truncate text-sm font-semibold text-cocoaSoft">@{row.profile.alodocUsername}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <Metric label="XP" value={toNumber(row.profile.xp)} />
              <Metric label="Badges" value={toNumber(row.profile.badgeCount)} />
              <Metric label="Completed" value={toNumber(row.profile.completedCount)} />
              <Metric label="Accuracy" value={`${row.accuracy}%`} />
              <Metric label="Streak" value={toNumber(row.profile.streak)} />
              <Metric label="Wallet" value={shortAddress(row.address)} />
            </div>
          </motion.article>
        ))}
      </div>
      <div className="hidden overflow-hidden rounded-[2rem] border border-cocoa/10 bg-parchment shadow-soft md:block">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead className="bg-mint text-xs font-black uppercase text-oliveDeep">
            <tr>
              <th className="px-5 py-4">Rank</th>
              <th className="px-5 py-4">Learner</th>
              <th className="px-5 py-4">Wallet</th>
              <th className="px-5 py-4">XP</th>
              <th className="px-5 py-4">Completed</th>
              <th className="px-5 py-4">Badges</th>
              <th className="px-5 py-4">Accuracy</th>
              <th className="px-5 py-4">Streak</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <motion.tr
                key={row.address}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="border-t border-cocoa/10 bg-white/55"
              >
                <td className="px-5 py-4 text-lg font-black text-cocoa">#{index + 1}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={avatarUrl(row.profile.xUsername, row.profile.alodocUsername)} alt="" className="h-11 w-11 rounded-2xl bg-mint object-cover" />
                    <div>
                      <p className="font-black text-cocoa">{row.profile.displayName}</p>
                      <p className="text-sm font-semibold text-cocoaSoft">@{row.profile.alodocUsername}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-bold text-cocoaSoft">{shortAddress(row.address)}</td>
                <td className="px-5 py-4 font-black text-cocoa">{toNumber(row.profile.xp)}</td>
                <td className="px-5 py-4 font-bold text-cocoa">{toNumber(row.profile.completedCount)}</td>
                <td className="px-5 py-4 font-bold text-cocoa">{toNumber(row.profile.badgeCount)}</td>
                <td className="px-5 py-4 font-bold text-cocoa">{row.accuracy}%</td>
                <td className="px-5 py-4 font-bold text-cocoa">{toNumber(row.profile.streak)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white px-3 py-2 shadow-lift">
      <p className="text-xs font-black uppercase text-cocoaSoft">{label}</p>
      <p className="mt-1 truncate font-black text-cocoa">{value}</p>
    </div>
  );
}

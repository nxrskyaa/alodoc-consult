"use client";

import { useState } from "react";
import type { ElementType } from "react";
import { BookOpen, Medal, ShieldCheck, Sparkles, TrendingUp, UserRound } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { BadgeGrid } from "@/components/BadgeGrid";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import { CreatePassportModal } from "@/components/CreatePassportModal";
import { NetworkGate } from "@/components/NetworkGate";
import { diseases, getDiseaseById } from "@/data/diseases";
import { alodocContract, useAccuracy, useCompletedDiseaseIds, useProfileCreated } from "@/hooks/useAlodocContract";
import { avatarUrl, contractToLanguage, shortAddress, toNumber } from "@/lib/utils";

export function PassportCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const profileCreated = useProfileCreated(address);
  const profile = useReadContract({
    ...alodocContract,
    functionName: "getProfile",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address && profileCreated.data), retry: false }
  });
  const completedIdsRead = useCompletedDiseaseIds(address);
  const accuracy = useAccuracy(address);

  if (!isConnected) {
    return (
      <section className="rounded-[2rem] border border-cocoa/10 bg-parchment p-8 text-center shadow-soft">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.7rem] bg-mint text-oliveDeep">
          <UserRound className="h-9 w-9" />
        </div>
        <h1 className="mt-6 text-4xl font-black text-cocoa">Connect to view your passport</h1>
        <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-cocoaSoft">The app is public to explore, but your Health Literacy Passport lives with your wallet.</p>
        <div className="mt-6 flex justify-center">
          <ConnectWalletButton />
        </div>
      </section>
    );
  }

  if (profileCreated.data === false) {
    return (
      <>
        <NetworkGate>
          <section className="rounded-[2rem] border border-cocoa/10 bg-parchment p-8 text-center shadow-soft">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-[1.7rem] bg-mint text-oliveDeep">
              <ShieldCheck className="h-9 w-9" />
            </div>
            <h1 className="mt-6 text-4xl font-black text-cocoa">Create your Health Literacy Passport</h1>
            <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-cocoaSoft">Only display name, Alodoc username, X username, and preferred language are collected.</p>
            <button onClick={() => setModalOpen(true)} className="focus-ring mt-6 rounded-full bg-orange px-6 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432]">
              Create Passport
            </button>
          </section>
        </NetworkGate>
        <CreatePassportModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={() => profileCreated.refetch()} />
      </>
    );
  }

  const data = profile.data;
  const completedIds = (completedIdsRead.data ?? []).map((id) => Number(id));
  const completedDiseases = completedIds.map(getDiseaseById).filter(Boolean);
  const accuracyValue = toNumber(accuracy.data);

  return (
    <section className="grid gap-6">
      <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-6 shadow-soft md:p-8">
        <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
          <img
            src={avatarUrl(data?.xUsername ?? "", data?.alodocUsername ?? "")}
            alt=""
            className="h-28 w-28 rounded-[2rem] border-4 border-white bg-mint object-cover shadow-lift"
          />
          <div>
            <p className="text-sm font-black uppercase text-oliveDeep">Health Literacy Passport</p>
            <h1 className="mt-2 text-5xl font-black leading-tight text-cocoa">{data?.displayName || "Alodoc learner"}</h1>
            <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold text-cocoaSoft">
              <span className="rounded-full bg-white px-4 py-2">@{data?.alodocUsername}</span>
              <span className="rounded-full bg-white px-4 py-2">X: @{data?.xUsername}</span>
              <span className="rounded-full bg-white px-4 py-2">{shortAddress(address)}</span>
              <span className="rounded-full bg-white px-4 py-2">{contractToLanguage(data?.preferredLanguage) === "id" ? "Indonesia" : "English"}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-5">
          <Stat icon={Sparkles} label="XP" value={toNumber(data?.xp)} />
          <Stat icon={BookOpen} label="Completed" value={toNumber(data?.completedCount)} />
          <Stat icon={Medal} label="Badges" value={toNumber(data?.badgeCount)} />
          <Stat icon={TrendingUp} label="Accuracy" value={`${accuracyValue}%`} />
          <Stat icon={ShieldCheck} label="Streak" value={toNumber(data?.streak)} />
        </div>
        <p className="mt-6 rounded-2xl bg-orange/10 p-4 text-sm font-semibold leading-6 text-cocoa">This passport stores learning progress only, not medical records.</p>
      </div>

      <div className="rounded-[2rem] border border-cocoa/10 bg-parchment p-6 shadow-soft">
        <h2 className="text-2xl font-black text-cocoa">Completed disease list</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {completedDiseases.length ? completedDiseases.map((disease) => (
            <span key={disease?.id} className="rounded-full bg-mint px-4 py-2 text-sm font-black text-oliveDeep">{disease?.title.en}</span>
          )) : <span className="text-sm font-semibold text-cocoaSoft">No completed quests yet. Start with the library.</span>}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-2xl font-black text-cocoa">Badge grid</h2>
        <BadgeGrid completedIds={completedIds.length ? completedIds : diseases.slice(0, toNumber(data?.badgeCount)).map((disease) => disease.id)} />
      </div>
      <CreatePassportModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={() => profileCreated.refetch()} />
    </section>
  );
}

function Stat({ icon: Icon, label, value }: { icon: ElementType; label: string; value: string | number }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-lift">
      <Icon className="h-5 w-5 text-orange" />
      <p className="mt-4 text-2xl font-black text-cocoa">{value}</p>
      <p className="text-xs font-black uppercase text-cocoaSoft">{label}</p>
    </div>
  );
}

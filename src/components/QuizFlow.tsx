"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { CreatePassportModal } from "@/components/CreatePassportModal";
import { LanguageToggle } from "@/components/LanguageToggle";
import { QuizCard } from "@/components/QuizCard";
import { QuizResult } from "@/components/QuizResult";
import { SafetyDisclaimer } from "@/components/SafetyDisclaimer";
import { useToast } from "@/components/Toast";
import { Disease, Language } from "@/data/diseases";
import { alodocContract, useProfileCreated } from "@/hooks/useAlodocContract";
import { getUserFriendlyError, languageToContract } from "@/lib/utils";

export function QuizFlow({ disease }: { disease: Disease }) {
  const [language, setLanguage] = useState<Language>("id");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState<"complete" | "claim" | null>(null);
  const { address, isConnected, chainId } = useAccount();
  const { notify } = useToast();
  const profileCreated = useProfileCreated(address);
  const completed = useReadContract({
    ...alodocContract,
    functionName: "hasCompletedQuest",
    args: address ? [address, BigInt(disease.id)] : undefined,
    query: { enabled: Boolean(address), retry: false }
  });
  const canClaim = useReadContract({
    ...alodocContract,
    functionName: "canClaimBadge",
    args: address ? [address, BigInt(disease.id)] : undefined,
    query: { enabled: Boolean(address), retry: false }
  });
  const claimed = useReadContract({
    ...alodocContract,
    functionName: "hasClaimedBadge",
    args: address ? [address, BigInt(disease.id)] : undefined,
    query: { enabled: Boolean(address), retry: false }
  });
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });
  const score = useMemo(() => Math.round((correctCount / disease.quiz.length) * 100), [correctCount, disease.quiz.length]);

  useEffect(() => {
    if (error) notify({ tone: "error", message: getUserFriendlyError(error) });
  }, [error, notify]);

  useEffect(() => {
    if (!receipt.isSuccess || !action) return;
    notify({ tone: "success", message: action === "complete" ? "Quest completed on Arc Testnet." : "Badge claimed on Arc Testnet." });
    void completed.refetch();
    void canClaim.refetch();
    void claimed.refetch();
    void profileCreated.refetch();
    setAction(null);
  }, [action, canClaim, claimed, completed, notify, profileCreated, receipt.isSuccess]);

  function next() {
    const question = disease.quiz[index];
    if (!revealed) {
      if (selected !== null && question.options[selected]?.isCorrect) setCorrectCount((value) => value + 1);
      setRevealed(true);
      return;
    }
    if (index === disease.quiz.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
    setRevealed(false);
  }

  function retry() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setCorrectCount(0);
    setFinished(false);
  }

  function ensureProfile() {
    if (!isConnected) {
      notify({ tone: "error", message: "Connect your wallet first." });
      return false;
    }
    if (!profileCreated.data) {
      setModalOpen(true);
      return false;
    }
    return true;
  }

  function completeQuest() {
    if (!ensureProfile()) return;
    if (score < 60 || score > 100) return;
    setAction("complete");
    writeContract({
      ...alodocContract,
      functionName: "completeQuest",
      args: [BigInt(disease.id), BigInt(score), languageToContract(language)]
    });
  }

  function claimBadge() {
    if (!ensureProfile()) return;
    setAction("claim");
    writeContract({
      ...alodocContract,
      functionName: "claimBadge",
      args: [BigInt(disease.id)]
    });
  }

  const busy = isPending || receipt.isLoading ? action : null;

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-oliveDeep">Quiz</p>
          <h1 className="mt-2 text-5xl font-black leading-tight text-cocoa">{disease.title[language]}</h1>
        </div>
        <LanguageToggle language={language} onChange={setLanguage} />
      </div>
      {!finished ? (
        <QuizCard
          question={disease.quiz[index]}
          language={language}
          index={index}
          total={disease.quiz.length}
          selected={selected}
          revealed={revealed}
          onSelect={setSelected}
          onNext={next}
        />
      ) : (
        <QuizResult
          score={score}
          canComplete={isConnected && chainId === 5_042_002 && score >= 60 && completed.data !== true}
          canClaim={isConnected && chainId === 5_042_002 && canClaim.data === true}
          alreadyCompleted={completed.data === true}
          alreadyClaimed={claimed.data === true}
          busyLabel={busy ?? undefined}
          onRetry={retry}
          onComplete={completeQuest}
          onClaim={claimBadge}
        />
      )}
      <SafetyDisclaimer language={language} />
      <CreatePassportModal open={modalOpen} onClose={() => setModalOpen(false)} onSuccess={() => profileCreated.refetch()} />
    </div>
  );
}

"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { alodocContract } from "@/hooks/useAlodocContract";
import { getUserFriendlyError } from "@/lib/utils";
import { useToast } from "@/components/Toast";

const usernamePattern = /^[a-z0-9_]{3,24}$/;
const xPattern = /^[A-Za-z0-9_]{1,15}$/;

export function CreatePassportModal({
  open,
  onClose,
  onSuccess
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const { notify } = useToast();
  const [displayName, setDisplayName] = useState("");
  const [alodocUsername, setAlodocUsername] = useState("");
  const [xUsername, setXUsername] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<0 | 1>(0);
  const { writeContract, data: hash, error, isPending } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash });

  const isNameValid = displayName.trim().length >= 1 && displayName.trim().length <= 80;
  const isUsernameValid = usernamePattern.test(alodocUsername);
  const isXValid = xPattern.test(xUsername);
  const availability = useReadContract({
    ...alodocContract,
    functionName: "isAlodocUsernameAvailable",
    args: [alodocUsername],
    query: { enabled: open && isUsernameValid, retry: false }
  });

  const validation = useMemo(() => {
    if (!isNameValid) return "Display name must be 1-80 characters.";
    if (!isUsernameValid) return "Alodoc username must be 3-24 chars: a-z, 0-9, underscore.";
    if (!isXValid) return "X username must be 1-15 chars: letters, numbers, underscore.";
    if (availability.data === false) return "That Alodoc username is already taken.";
    return "";
  }, [availability.data, isNameValid, isUsernameValid, isXValid]);

  useEffect(() => {
    if (error) notify({ tone: "error", message: getUserFriendlyError(error) });
  }, [error, notify]);

  useEffect(() => {
    if (receipt.isSuccess) {
      notify({ tone: "success", message: "Health Literacy Passport created on Arc Testnet." });
      onSuccess?.();
      onClose();
    }
  }, [notify, onClose, onSuccess, receipt.isSuccess]);

  if (!open) return null;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (validation) {
      notify({ tone: "error", message: validation });
      return;
    }
    writeContract({
      ...alodocContract,
      functionName: "createProfile",
      args: [displayName.trim(), alodocUsername, xUsername, preferredLanguage]
    });
  }

  const busy = isPending || receipt.isLoading;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-cocoa/30 p-4 backdrop-blur-sm">
      <form onSubmit={submit} className="w-[min(100%,520px)] rounded-[2rem] border border-cocoa/10 bg-parchment p-6 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-cocoa">Create Your Health Literacy Passport</h2>
            <p className="mt-2 text-sm leading-6 text-cocoaSoft">Only learning identity fields are collected. No symptoms, diagnosis, medication, or medical history.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-cocoaSoft transition hover:bg-cocoa/5" aria-label="Close modal">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold text-cocoa">
            Display Name
            <input value={displayName} onChange={(event) => setDisplayName(event.target.value.slice(0, 80))} className="focus-ring rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base font-semibold" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-cocoa">
            Alodoc Username
            <input value={alodocUsername} onChange={(event) => setAlodocUsername(event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "").slice(0, 24))} className="focus-ring rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base font-semibold" placeholder="alodoc_learner" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-cocoa">
            X Username
            <input value={xUsername} onChange={(event) => setXUsername(event.target.value.replace(/^@+/, "").replace(/[^A-Za-z0-9_]/g, "").slice(0, 15))} className="focus-ring rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base font-semibold" placeholder="yourhandle" required />
          </label>
          <label className="grid gap-2 text-sm font-bold text-cocoa">
            Preferred Language
            <select value={preferredLanguage} onChange={(event) => setPreferredLanguage(Number(event.target.value) as 0 | 1)} className="focus-ring rounded-2xl border border-cocoa/10 bg-white px-4 py-3 text-base font-semibold">
              <option value={0}>Indonesia</option>
              <option value={1}>English</option>
            </select>
          </label>
        </div>

        <p className="mt-4 min-h-5 text-sm font-semibold text-orange">{validation}</p>
        <button disabled={Boolean(validation) || busy} className="focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-black text-white shadow-lift transition hover:bg-[#dc7432] disabled:cursor-not-allowed disabled:opacity-60">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {receipt.isLoading ? "Confirming on Arc..." : isPending ? "Confirm in wallet..." : "Create Passport"}
        </button>
      </form>
    </div>
  );
}

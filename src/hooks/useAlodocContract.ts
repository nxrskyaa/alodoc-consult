"use client";

import { useAccount, useReadContract } from "wagmi";
import { ALODOC_CONTRACT_ADDRESS, alodocLearningProofAbi } from "@/lib/contract";

export const alodocContract = {
  address: ALODOC_CONTRACT_ADDRESS,
  abi: alodocLearningProofAbi
} as const;

export function useMyProfile() {
  const { isConnected } = useAccount();
  return useReadContract({
    ...alodocContract,
    functionName: "getMyProfile",
    query: { enabled: isConnected, retry: false }
  });
}

export function useProfileCreated(address?: `0x${string}`) {
  return useReadContract({
    ...alodocContract,
    functionName: "isProfileCreated",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address), retry: false }
  });
}

export function useCompletedDiseaseIds(address?: `0x${string}`) {
  return useReadContract({
    ...alodocContract,
    functionName: "getCompletedDiseaseIds",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address), retry: false }
  });
}

export function useAccuracy(address?: `0x${string}`) {
  return useReadContract({
    ...alodocContract,
    functionName: "getAccuracy",
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address), retry: false }
  });
}

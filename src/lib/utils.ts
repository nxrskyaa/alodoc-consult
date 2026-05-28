import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function toNumber(value: bigint | number | undefined) {
  if (typeof value === "bigint") return Number(value);
  return value ?? 0;
}

export function getUserFriendlyError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("User rejected")) return "Wallet request was rejected.";
  if (message.includes("insufficient funds")) return "Not enough Arc Testnet USDC for gas.";
  if (message.includes("Connector not connected")) return "Connect your wallet first.";
  if (message.includes("Chain mismatch")) return "Switch to Arc Testnet before continuing.";
  return message.length > 160 ? `${message.slice(0, 157)}...` : message;
}

export function languageToContract(language: "id" | "en") {
  return language === "id" ? 0 : 1;
}

export function contractToLanguage(value: number | bigint | undefined): "id" | "en" {
  return Number(value ?? 0) === 1 ? "en" : "id";
}

export function avatarUrl(xUsername: string, alodocUsername: string) {
  const cleanX = xUsername.replace("@", "").trim();
  if (cleanX) return `https://unavatar.io/x/${encodeURIComponent(cleanX)}`;
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(alodocUsername || "Alodoc")}`;
}

import type { Chain } from "viem";

export const arcTestnet = {
  id: 5_042_002,
  name: "Arc Testnet",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18
  },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.arc.network"] },
    public: { http: ["https://rpc.testnet.arc.network"] }
  },
  blockExplorers: {
    default: { name: "Arcscan", url: "https://testnet.arcscan.app" }
  },
  testnet: true
} as const satisfies Chain;

export const ARC_TESTNET_PARAMS = {
  chainId: `0x${arcTestnet.id.toString(16)}`,
  chainName: arcTestnet.name,
  nativeCurrency: arcTestnet.nativeCurrency,
  rpcUrls: [arcTestnet.rpcUrls.default.http[0]],
  blockExplorerUrls: [arcTestnet.blockExplorers.default.url]
};

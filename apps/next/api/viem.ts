import { createPublicClient, http } from "viem";
import { mainnet, optimism } from "viem/chains";

export const publicMainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const publicOPClient = createPublicClient({
  chain: optimism,
  transport: http(),
});

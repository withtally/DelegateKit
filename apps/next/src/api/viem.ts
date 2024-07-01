import { createPublicClient, http } from "viem";
import { mainnet, optimism } from "viem/chains";
import { env } from "../../app/env";

export const publicMainnetClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export const publicOPClient = createPublicClient({
  chain: optimism,
  transport: http(env.OP_RPC_URL),
});

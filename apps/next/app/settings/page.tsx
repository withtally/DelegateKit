"use client";
import { AuthKitProvider } from "@farcaster/auth-kit";
import {} from "../components/Header/FarcasterAuth";
const FarcasterAuth = dynamic(
  () => import("../components/Header/FarcasterAuth"),
  {
    ssr: false,
  },
);

import dynamic from "next/dynamic";
import { publicEnv } from "../next-public-env";

const domain = publicEnv.NEXT_PUBLIC_HOST;
const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: domain.replace(/^https:\/\//, ""),
  siweUri: domain,
};
export default function Page() {
  return (
    <div className="px-10 lg:px-60">
      <AuthKitProvider config={config}>
        <FarcasterAuth />
      </AuthKitProvider>
    </div>
  );
}

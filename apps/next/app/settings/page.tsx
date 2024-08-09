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
    <div className="flex justify-center py-8">
      <div className="outer shadow-xl p-2 flex flex-col rounded-3xl bg-white w-[500px] p-8">
        {/* <div className="flex flex-col items-center py-8">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center"> */}
        {/* < className="lg:px-[340px]"> */}
        <AuthKitProvider config={config}>
          <FarcasterAuth />
        </AuthKitProvider>
        {/* </main>
    // </div> */}
      </div>
    </div>
  );
}

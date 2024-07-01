"use client";
import { AuthKitProvider, SignInButton } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { publicEnv } from "./next-public-env";

const domain = publicEnv.NEXT_PUBLIC_HOST;
const config = {
  relay: "https://relay.farcaster.xyz",
  rpcUrl: "https://mainnet.optimism.io",
  domain: domain.replace(/^https:\/\//, ""),
  siweUri: domain,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <AuthKitProvider config={config}>
          {" "}
          <SignInButton />
          {children}
        </AuthKitProvider>
      </body>
    </html>
  );
}

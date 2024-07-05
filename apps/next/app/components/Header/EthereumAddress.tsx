"use client";

import Link from "next/link";
import { useAddress } from "../../hooks/use-address";

export const EthereumAddress = () => {
  const { address } = useAddress();
  if (!address) {
    return <Link href="/settings">Login</Link>;
  }
  const printableAddress = address.slice(0, 4) + "..." + address.slice(-4);

  const addressImage = `https://cdn.stamp.fyi/avatar/${address}?s=30`;
  return (
    address && (
      <div className="flex items-center space-x-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={addressImage} alt={"Ethereum address"} />
        <code>{printableAddress}</code>
      </div>
    )
  );
};

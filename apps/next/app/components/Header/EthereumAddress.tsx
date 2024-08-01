"use client";

import Link from "next/link";
import { useAddress } from "../../hooks/use-address";

export const EthereumAddress = () => {
  const { address } = useAddress();
  if (!address) {
    return (
      <Link href="/settings">
        <b>Login</b>
      </Link>
    );
  }

  // a nice little eth avatar library https://github.com/snapshot-labs/stamp
  const addressImage = `https://cdn.stamp.fyi/avatar/${address}?s=60`;
  const printableAddress = address.slice(0, 4) + "..." + address.slice(-4);
  return (
    <Link href="/settings" className="flex items-center">
      <div className="flex items-center space-x-3 pl-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={addressImage}
          alt={"Ethereum address avatar"}
          style={{ borderRadius: "3px" }}
          width="30"
          height="30"
        />
        <code>{printableAddress}</code>
      </div>
    </Link>
  );
};

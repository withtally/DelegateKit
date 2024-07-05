"use client";

import { useAddress } from "../../hooks/use-address";

export const EthereumAddress = () => {
  const { address } = useAddress();
  if (!address) {
    return <>Login</>;
  }

  // a nice little eth avatar library https://github.com/snapshot-labs/stamp
  const addressImage = `https://cdn.stamp.fyi/avatar/${address}?s=30`;
  const printableAddress = address.slice(0, 4) + "..." + address.slice(-4);
  return (
    <div className="flex items-center space-x-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={addressImage} alt={"Ethereum address avatar"} />
      <code>{printableAddress}</code>
    </div>
  );
};

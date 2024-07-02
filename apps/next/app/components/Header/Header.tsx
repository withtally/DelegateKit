"use client";
// @ts-ignore
import { Addreth } from "addreth/no-wagmi";
import Link from "next/link";
import { useAddress } from "../../hooks/use-address";

const Header = () => {
  const { address } = useAddress();
  return (
    <header className="bg-white shadow p-5 flex justify-end space-x-10">
      <Link href="/">Home</Link>
      <Link href="/settings">Settings</Link>
      {address && <Addreth address={address} />}
    </header>
  );
};
export default Header;

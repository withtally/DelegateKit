"use client";

import Link from "next/link";
import { useAddress } from "../hooks/use-address";
import { Button } from "./Button";

export const LoginButton = () => {
  const { address } = useAddress();
  return (
    !address && (
      <Link href="/settings" className="py-8">
        <Button>Login</Button>
      </Link>
    )
  );
};
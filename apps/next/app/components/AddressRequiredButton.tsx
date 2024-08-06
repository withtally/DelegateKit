"use client";

import Link from "next/link";
import { useAddress } from "../hooks/use-address";
import { Button } from "./Button";

const AddressRequiredButton = ({
  text,
  href,
}: {
  text: string;
  href: string;
}) => {
  const { address } = useAddress();
  if (href.includes("/delegates") && address) {
    href += `/${address}`;
  }
  return (
    <Link href={address ? href : "/settings"}>
      <Button secondary>{text}</Button>
    </Link>
  );
};

export default AddressRequiredButton;

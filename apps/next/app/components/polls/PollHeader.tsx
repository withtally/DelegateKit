"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

type PollElementProps = { href: string } & PropsWithChildren;
function PollElement({ href, children }: PollElementProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: "7px",
        ...(isActive ? { color: "black" } : { color: "grey" }),
      }}
    >
      {children}
    </Link>
  );
}
export function PollHeader() {
  return (
    <div className="flex  items-center justify-center flex-1 px-4 sm:px-20">
      <PollElement href="/polls/new">New poll</PollElement>
      <PollElement href="/polls/history">Poll history</PollElement>
    </div>
  );
}

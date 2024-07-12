"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import NewPollIcon from "./icons/NewPoll";
import PollHistoryIcon from "./icons/PollHistoryIcon";

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
        padding: "8px 24px",
        gap: "6px",
        borderRadius: "7px",
        ...(isActive ? { color: "black" } : { color: "grey" }),
      }}
    >
      {children}
    </Link>
  );
}
export function PollHeader() {
  const newPollHref = "/polls/new";
  const pollHistoryHref = "/polls/history";
  const pathname = usePathname();
  return (
    <div className="flex  items-center justify-center flex-1 px-4 sm:px-20 border-b-2">
      <PollElement href={newPollHref}>
        <NewPollIcon isActive={pathname === newPollHref} />
        <span>New poll</span>
      </PollElement>
      <PollElement href={pollHistoryHref}>
        <PollHistoryIcon isActive={pathname === pollHistoryHref} />
        <span>Poll history</span>
      </PollElement>
    </div>
  );
}

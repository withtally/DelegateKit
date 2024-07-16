"use client";
import { useAddress } from "../../hooks/use-address";
import { Poll } from "../new/types";

export default function AllMyPolls({ polls }: { polls: Poll[] }) {
  const { address } = useAddress();
  return (
    <div className="flex-1 flex-wrap items-center justify-around max-w-4xl my-8 sm:w-full bg-white rounded-md shadow-xl h-full border border-gray-100">
      {polls
        .filter(
          (poll) =>
            poll.creatorEthAddress?.toLowerCase() === address?.toLowerCase(),
        )
        .map((poll) => {
          // returns links to poll ids
          return (
            <div key={poll.id}>
              <a href={`/polls/${poll.id}`} className="underline">
                <p className="text-md sm:text-xl mx-4">{poll.title}</p>
              </a>
            </div>
          );
        })}
    </div>
  );
}

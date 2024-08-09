"use client";
import { useAddress } from "../../hooks/use-address";
import { Poll } from "../new/types";

type AllPolls = Array<Partial<Poll>>;
export default function AllMyPolls({ polls }: { polls: AllPolls }) {
  const { address } = useAddress();
  return (
    <>
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
    </>
  );
}

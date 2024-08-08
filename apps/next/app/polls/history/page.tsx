import { NextPage } from "next";
import dynamic from "next/dynamic";
import { z } from "zod";
import { PollRepository } from "../PollRepository";
const AllMyPollsNoSSR = dynamic(() => import("./AllMyPolls"), { ssr: false });

async function getPolls(creatorAddress: string) {
  try {
    const polls = await PollRepository.selectAllPolls(creatorAddress);
    return polls;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Page: NextPage<{ searchParams: URLSearchParams }> = async ({
  searchParams: searchParamsProp,
}) => {
  const searchParams = new URLSearchParams(searchParamsProp);

  const creatorAddress = z.string().parse(searchParams.get("address"));
  const polls = await getPolls(creatorAddress);

  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center min-h-80 py-2">
      <h1 className="text-lg sm:text-2xl font-bold mb-2">
        Created Polls ({polls.length})
      </h1>
      <AllMyPollsNoSSR polls={polls} />
    </main>
  );
};

export default Page;

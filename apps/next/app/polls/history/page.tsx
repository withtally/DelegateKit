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
    <div className="flex justify-center py-8">
      <div className="outer shadow-xl p-2 flex flex-col rounded-3xl bg-white w-[400px] max-w-[100vw] p-8">
        <AllMyPollsNoSSR polls={polls} />
      </div>
    </div>
  );
};

export default Page;

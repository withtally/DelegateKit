import { PollVoteForm } from "@/app/polls/new/form";
import { Poll } from "@/app/polls/new/types";
import { Metadata, ResolvingMetadata } from "next";
import { Address } from "viem";
import { publicEnv } from "../../next-public-env";
import { PollRepository } from "../PollRepository";

async function getPoll(id: string): Promise<Poll> {
  const creatorEthAddress: Address = "0xdead";
  const nullPoll: Poll = {
    id: "",
    creatorEthAddress,
    title: "No poll found",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    isPrivate: true,
    votes1: 0,
    votes2: 0,
    votes3: 0,
    votes4: 0,
  };

  try {
    const poll = await PollRepository.getPoll(id);

    if (!poll) {
      return nullPoll;
    }

    return poll;
  } catch (error) {
    console.error(error);
    return nullPoll;
  }
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const poll = await getPoll(id);

  const fcMetadata: Record<string, string> = {
    "fc:frame": "vNext",
    "fc:frame:image:aspect_ratio": "1:1",
    "fc:frame:post_url": `${publicEnv.NEXT_PUBLIC_HOST}/api/polls/vote?id=${id}`,
    "fc:frame:image": `${publicEnv.NEXT_PUBLIC_HOST}/api/polls/image?id=${id}`,
  };
  [poll.option1, poll.option2, poll.option3, poll.option4]
    .filter((o) => o !== "")
    .map((option, index) => {
      fcMetadata[`fc:frame:button:${index + 1}`] = option;
    });

  return {
    title: poll.title,
    openGraph: {
      title: poll.title,
      images: [`/api/polls/image?id=${id}`],
    },
    other: {
      ...fcMetadata,
    },
    metadataBase: new URL(publicEnv.NEXT_PUBLIC_HOST),
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const poll = await getPoll(params.id);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
          <PollVoteForm poll={poll} />
        </main>
      </div>
    </>
  );
}

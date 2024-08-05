"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PollRepository } from "../PollRepository";
import { Poll } from "./types";

export async function savePoll(poll: Poll, formData: FormData) {
  const creatorAddress = poll.creatorEthAddress;
  const title = formData.get("title") as string;
  const newPoll = await PollRepository.createPoll(
    title,
    creatorAddress,
    [poll.option1, poll.option2, poll.option3, poll.option4],
    poll.isPrivate,
  );

  revalidatePath("/polls");
  redirect(`/polls/${poll.id}`);
}

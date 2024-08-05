"use server";

import { kv } from "@vercel/kv";
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
  redirect(`/polls/${newPoll.id}`);
}

export async function votePoll(poll: Poll, optionIndex: number) {
  await kv.hincrby(`poll:${poll.id}`, `votes${optionIndex}`, 1);

  revalidatePath(`/polls/${poll.id}`);
  redirect(`/polls/${poll.id}?results=true`);
}

export async function redirectToPolls() {
  redirect("/polls");
}

import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PollRepository } from "../../../app/polls/PollRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log({ query: req.query });
  const pollId = z.string().parse(req.query.id);
  return res.send(await PollRepository.getPoll(pollId));
}

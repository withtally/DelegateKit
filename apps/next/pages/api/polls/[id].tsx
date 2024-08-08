import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PollRepository } from "../../../app/polls/PollRepository";

/**
 * Normally the backend could call this direclty, but pg is not allowed in edge functions
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const pollId = z.string().parse(req.query.id);
  return res.send(await PollRepository.getPoll(pollId));
}

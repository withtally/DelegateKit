import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PollRepository } from "./../../../app/polls/PollRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // Process the vote
    // For example, let's assume you receive an option in the body
    try {
      const pollId = z.string().parse(req.body["poll-id"]);
      const message = z.string().parse(req.body["message"]);
      const fromFid = req.body["from-fid"];
      await PollRepository.insertPollFeedback({ pollId, fromFid, message });
      res.status(200).end();
    } catch (err) {
      console.warn(err);
      res.status(400).end();
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { Poll } from "@/app/polls/new/types";
import { Message, getSSLHubRpcClient } from "@farcaster/hub-nodejs";
import type { NextApiRequest, NextApiResponse } from "next";
import * as v from "valibot";
import { z } from "zod";
import { env } from "../../../app/env";
import { publicEnv } from "../../../app/next-public-env";
import { PollRepository } from "../../../app/polls/PollRepository";

const client = getSSLHubRpcClient(env.HUB_URL);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // Process the vote
    // For example, let's assume you receive an option in the body
    try {
      const pollId = z.string().parse(req.query["id"]);
      const results = req.query["results"] === "true";
      let voted = req.query["voted"] === "true";
      if (!pollId) {
        return res.status(400).send("Missing poll ID");
      }

      let validatedMessage: Message | undefined = undefined;
      try {
        const frameMessage = Message.decode(
          Buffer.from(req.body?.trustedData?.messageBytes || "", "hex"),
        );
        const result = await client.validateMessage(frameMessage);
        if (result && result.isOk() && result.value.valid) {
          validatedMessage = result.value.message;
        }

        // Also validate the frame url matches the expected url
        const urlBuffer = validatedMessage?.data?.frameActionBody?.url || [];
        const urlString = Buffer.from(urlBuffer).toString("utf-8");
        if (
          validatedMessage &&
          !urlString.startsWith(publicEnv.NEXT_PUBLIC_HOST)
        ) {
          return res.status(400).send(`Invalid frame url: ${urlBuffer}`);
        }
      } catch (e) {
        return res.status(400).send(`Failed to validate message: ${e}`);
      }

      let buttonId = 0,
        fid = 0;
      // If HUB_URL is not provided, don't validate and fall back to untrusted data
      if (client) {
        buttonId = v.parse(
          v.number(),
          validatedMessage?.data?.frameActionBody?.buttonIndex,
        );
        fid = v.parse(v.number(), validatedMessage?.data?.fid);
      } else {
        buttonId = v.parse(v.number(), req.body?.untrustedData?.buttonIndex);
        fid = v.parse(v.number(), req.body?.untrustedData?.fid);
      }

      // Clicked create poll
      if ((results || voted) && buttonId === 2) {
        return res
          .status(302)
          .setHeader("Location", publicEnv.NEXT_PUBLIC_HOST)
          .send("Redirecting to create poll");
      }

      const voteExists = await PollRepository.voteExists(pollId, fid);
      voted = voted || voteExists;

      console.log({ fid, buttonId, results, voted });
      if (fid > 0 && buttonId > 0 && buttonId < 5 && !results && !voted) {
        await PollRepository.voteOnPoll({
          pollId,
          optionIndex: buttonId,
          fromFid: fid,
        });
      }

      const poll: Poll | null = await PollRepository.getPoll(pollId);

      if (!poll) {
        return res.status(400).send("Missing poll in db");
      }
      const imageUrl = `${publicEnv.NEXT_PUBLIC_HOST}/api/polls/image?id=${poll.id}&results=${
        results ? "false" : "true"
      }&date=${Date.now()}${fid > 0 ? `&fid=${fid}` : ""}`;
      let button1Text = "View Results";
      if (!voted && !results) {
        button1Text = "Back";
      } else if (voted && !results) {
        button1Text = "Already Voted";
      } else if (voted && results) {
        button1Text = "View Results";
      }

      // Return an HTML response
      res.setHeader("Content-Type", "text/html");
      res.status(200).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vote Recorded</title>
          <meta property="og:title" content="Vote Recorded">
          <meta property="og:image" content="${imageUrl}">
          <meta name="fc:frame" content="vNext">
          <meta name="fc:frame:image:aspect_ratio" content="1:1" />
          <meta name="fc:frame:image" content="${imageUrl}">
          <meta name="fc:frame:post_url" content="${publicEnv.NEXT_PUBLIC_HOST}/api/polls/vote?id=${
            poll.id
          }&voted=true&results=${results ? "false" : "true"}">
          <meta name="fc:frame:button:1" content="${button1Text}">
          <meta name="fc:frame:button:2" content="Create your poll">
          <meta name="fc:frame:button:2:action" content="post_redirect">
        </head>
        <body>
          <p>${
            results || voted
              ? `You have already voted. You clicked ${buttonId}`
              : `Your vote for ${buttonId} has been recorded for fid ${fid}.`
          }</p>
        </body>
      </html>
    `);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating image");
    }
  } else {
    // Handle any non-POST requests
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { Poll } from "@/app/polls/new/types";
import type { NextApiResponse } from "next";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { z } from "zod";
import { routes } from "../../../../app/routes";
import { frameHeight, frameWidth } from "../../frame-config";

const StarIcon = () => {
  return (
    //  eslint-disable-next-line @next/next/no-img-element
    <img alt="star" src={routes.images.star} width="40px" height="40px" />
  );
};
const ChatIcon = () => {
  return (
    //  eslint-disable-next-line @next/next/no-img-element
    <img
      alt="chat bubble"
      src={routes.images.chatBubble}
      width="240px"
      height="240px"
    />
  );
};
export const OPSmileIcon = () => {
  return (
    //  eslint-disable-next-line @next/next/no-img-element
    <img alt="smile" src={routes.images.oPsmile} width="140px" height="140px" />
  );
};
export const ThumbIcon = () => {
  return (
    //  eslint-disable-next-line @next/next/no-img-element
    <img alt="thumb" src={routes.images.thumb} width="240px" height="240px" />
  );
};

export const runtime = "edge";

export default async function handler(req: NextRequest, res: NextApiResponse) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const pollId = z.string().parse(searchParams.get("id"));
  if (!z.string().safeParse(pollId).success) {
    return res.status(400).send("Missing poll ID");
  }

  const poll: Poll | null = await fetch(
    routes.v1.api.polls.dbHelpers.getPoll(pollId),
  ).then((_res) => _res.json());

  if (!poll) {
    return res.status(400).send("Missing poll in db");
  }

  const showResults = searchParams.get("results") === "true";

  const pollOptions = [
    poll.option1,
    poll.option2,
    poll.option3,
    poll.option4,
  ].filter((option) => option !== "");
  const totalVotes = pollOptions
    // @ts-ignore
    .map((option, index) => parseInt(poll[`votes${index + 1}`]))
    .reduce((a, b) => a + b, 0);
  const pollData = {
    question: showResults ? `Results for ${poll.title}` : poll.title,
    options: pollOptions.map((option, index) => {
      // @ts-ignore
      const votes = poll[`votes${index + 1}`];
      const percentOfTotal = totalVotes
        ? Math.round((votes / totalVotes) * 100)
        : 0;
      const text = showResults
        ? `${percentOfTotal}%: ${option} (${votes} votes)`
        : `${index + 1}. ${option}`;
      return { option, votes, text, percentOfTotal };
    }),
  };

  return new ImageResponse(
    (
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          fontSize: 24,
          marginTop: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            left: 180,
            top: 20,
          }}
        >
          <StarIcon />
        </div>
        <div
          style={{ position: "absolute", display: "flex", left: 50, top: 82 }}
        >
          <OPSmileIcon />
        </div>
        <div
          style={{
            position: "absolute",
            display: "flex",
            right: 30,
            top: 20,
          }}
        >
          <ThumbIcon />
        </div>
        <ChatIcon />

        <div
          style={{
            display: "flex",
            color: "#404040",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                marginTop: "-40px",
              }}
            >
              {showResults ? "Thank you. here are the results" : poll.title}
            </h2>
            {showResults &&
              pollData.options.map((opt, index) => {
                return (
                  <div
                    key={opt.text}
                    style={{
                      backgroundColor: showResults ? "#7764FD" : "",
                      padding: 10,
                      marginBottom: 10,
                      borderRadius: 4,
                      width: `${showResults ? opt.percentOfTotal : 100}%`,
                      whiteSpace: "nowrap",
                      overflow: "visible",
                    }}
                  >
                    {opt.text}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    ),
    {
      width: frameWidth,
      height: frameHeight,
    },
  );
}

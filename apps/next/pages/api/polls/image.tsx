import { Poll } from "@/app/polls/new/types";
import { kv } from "@vercel/kv";
import * as fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import satori from "satori";
import sharp from "sharp";
import { routes } from "../../../app/routes";
import { frameHeight, frameWidth } from "../frame-config";

const fontPath = join(process.cwd(), "Roboto-Regular.ttf");
const fontData = fs.readFileSync(fontPath);

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
const OPSmileIcon = () => {
  return (
    //  eslint-disable-next-line @next/next/no-img-element
    <img alt="smile" src={routes.images.OPsmile} width="140px" height="140px" />
  );
};
const ThumbIcon = () => {
  return (
    //  eslint-disable-next-line @next/next/no-img-element
    <img alt="thumb" src={routes.images.thumb} width="240px" height="240px" />
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const pollId = req.query["id"];
    if (!pollId) {
      return res.status(400).send("Missing poll ID");
    }

    const poll: Poll | null = await kv.hgetall(`poll:${pollId}`);

    if (!poll) {
      return res.status(400).send("Missing poll ID");
    }

    const showResults = req.query["results"] === "true";
    // let votedOption: number | null = null
    // if (showResults && fid > 0) {
    //     votedOption = await kv.hget(`poll:${pollId}:votes`, `${fid}`) as number
    // }

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

    const svg = await satori(
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#F9F9F9",
          fontSize: 24,
          marginTop: 0,
        }}
      >
        <div
          style={{ position: "absolute", display: "flex", left: 180, top: 20 }}
        >
          <StarIcon />
        </div>
        <div
          style={{ position: "absolute", display: "flex", left: 50, top: 82 }}
        >
          <OPSmileIcon />
        </div>
        <div
          style={{ position: "absolute", display: "flex", right: 30, top: 20 }}
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
      </div>,
      {
        width: frameWidth,
        height: frameHeight,
        fonts: [
          {
            data: fontData,
            name: "Roboto",
            style: "normal",
            weight: 400,
          },
        ],
      },
    );

    // Convert SVG to PNG using Sharp
    const pngBuffer = await sharp(Buffer.from(svg)).toFormat("png").toBuffer();

    // Set the content type to PNG and send the response
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "max-age=10");
    res.send(pngBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating image");
  }
}

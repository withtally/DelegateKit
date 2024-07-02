import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { publicEnv } from "../../../../app/next-public-env";
import { DelegateFrameFactory } from "../../../../src/api/services/DelegateFrameFactory";

export default async function generateFrame(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // TODO: Handle button index to determine if we're showing frame 1,2, or 3
  const buttonIndex = z
    .number()
    .int()
    .parse(req.body.untrustedData.buttonIndex);

  const currentIndex = z.string().parse(req.query.currentIndex);

  const address = z.string().parse(req.query.address);
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  const frameFactory = new DelegateFrameFactory(
    publicEnv.NEXT_PUBLIC_HOST,
    address,
  );
  if (currentIndex === "1") {
    if (buttonIndex === 1) {
      return res.send(frameFactory.frame2);
    }
    if (buttonIndex === 2) {
      return res.send(frameFactory.frame3);
    }
  }
  if (currentIndex === "2") {
    if (buttonIndex === 1) {
      return res.send(frameFactory.frame1);
    }
    if (buttonIndex === 2) {
      return res.send(frameFactory.frame3);
    }
  }
  if (currentIndex === "3") {
    if (buttonIndex === 1) {
      return res.send(frameFactory.frame1);
    }
    if (buttonIndex === 2) {
      return res.send(frameFactory.frame2);
    }
  }

  throw new Error("impossible state");
}

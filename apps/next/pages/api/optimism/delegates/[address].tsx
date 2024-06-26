import { NextApiRequest, NextApiResponse } from "next";
import * as v from "valibot";
import { OPDelegate } from "../../../../src/api/services/OPDelegate/OPDelegate";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const address = v.parse(v.string(), req.query.address);
  const opDelegate = new OPDelegate(address);
  return res.send(await opDelegate.fetchAgoraData());
}

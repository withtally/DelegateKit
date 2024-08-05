import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import * as v from "valibot";
import { isAddress } from "viem";
import { ENS } from "../../../../../src/api/ENS/ENS";
import { OPDelegate } from "../../../../../src/api/services/OPDelegate/OPDelegate";
import { frameHeight, frameWidth } from "../../../frame-config";
import { DelegateImageOnly } from "./1-image";

export const runtime = "edge";

export default async function Frame1(req: NextApiRequest) {
  const url = new URL(v.parse(v.string([v.url()]), req.url));
  let address = v.parse(v.string(), url.searchParams.get("address"));
  const avatar = (await ENS.getENSAvatar(address)) || "";
  const opDelegate = new OPDelegate(address);
  const delegateData = await opDelegate.fetchAgoraData();
  // reverse lookup
  if (isAddress(address)) {
    address = await ENS.getENSName(address);
  }
  return new ImageResponse(
    (
      <DelegateImageOnly
        address={address}
        ensAvatar={avatar}
        votingPower={delegateData.votingPower.total}
      />
    ),
    {
      width: frameWidth,
      height: frameHeight,
    },
  );
}

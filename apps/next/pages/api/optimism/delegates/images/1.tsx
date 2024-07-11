import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import * as v from "valibot";
import { fetchAddressImage } from "../../../../../app/delegates/[address]/fetch-address-image";
import { OPDelegate } from "../../../../../src/api/services/OPDelegate/OPDelegate";
import { frameHeight, frameWidth } from "../../../frame-config";
import { DelegateImageOnly } from "./1-image";

export const runtime = "edge";

export default async function Frame1(req: NextApiRequest) {
  const url = new URL(v.parse(v.string([v.url()]), req.url));
  const address = v.parse(v.string(), url.searchParams.get("address"));
  const avatar = fetchAddressImage(address);
  const opDelegate = new OPDelegate(address);
  const delegateData = await opDelegate.fetchAgoraData();
  return new ImageResponse(
    (
      <DelegateImageOnly
        address={address}
        ensAvatar={avatar}
        votingPower={delegateData.votingPower}
      />
    ),
    {
      width: frameWidth,
      height: frameHeight,
    },
  );
}

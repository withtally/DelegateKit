import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import * as v from "valibot";
import { formatEther } from "viem";
import { fetchAddressImage } from "../../../../../app/delegate/fetch-address-image";
import { fetchDelegateData } from "../../../../../app/delegate/fetchers";
import DelegateImageContainer from "../../../../../src/api/delegates/DelegateImageContainer";
import { frameHeight, frameWidth } from "../../../frame-config";

export const runtime = "edge";

export default async function Frame1(req: NextApiRequest) {
  const url = new URL(v.parse(v.string([v.url()]), req.url));
  const address = v.parse(v.string(), url.searchParams.get("address"));
  const [delegateData, ensAvatar] = await Promise.all([
    fetchDelegateData(address),
    fetchAddressImage(address),
  ]);
  return new ImageResponse(
    (
      <DelegateImageContainer>
        <img
          src={ensAvatar}
          style={{
            borderRadius: "50%",
            height: "88px",
            width: "88px",
            marginRight: "40px",
          }}
          alt="profile"
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "48px" }}>{delegateData.address}</h1>
          <h3 style={{ fontSize: "30px" }}>
            {Math.trunc(
              Number(formatEther(BigInt(delegateData.votingPower))),
            ).toLocaleString()}{" "}
            OP
          </h3>
        </div>
      </DelegateImageContainer>
    ),
    {
      width: frameWidth,
      height: frameHeight,
    },
  );
}

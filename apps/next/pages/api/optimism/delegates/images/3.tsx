import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import { z } from "zod";
import { fetchAddressImage } from "../../../../../app/delegates/fetch-address-image";
import { fetchDelegateData } from "../../../../../app/delegates/fetchers";
import DelegateImageContainer from "../../../../../src/api/delegates/DelegateImageContainer";

export const runtime = "edge";

export default async function Frame2(req: NextApiRequest) {
  const url = new URL(z.string().url().parse(req.url));
  const address = z.string().parse(url.searchParams.get("address"));
  const [delegateData, delegateImage] = await Promise.all([
    fetchDelegateData(address),
    fetchAddressImage(address),
  ]);
  return new ImageResponse(
    (
      <DelegateImageContainer>
        <img
          src={delegateImage}
          style={{
            borderRadius: "50%",
            height: "160px",
            width: "160px",
            marginRight: "40px",
          }}
          alt="profile"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "520px",
            fontSize: "20px",
          }}
        >
          <span>Proposals Voted: {delegateData.proposalsVotedOn}</span>
          <span>
            For / Against / Abstain: {delegateData.votedFor} /{" "}
            {delegateData.votedAbstain} / {delegateData.votedAbstain}
          </span>
          {/* <span>
            Recent Activity:
            {delegateData.votingParticipation}
          </span> */}
          <span>Proposals Created: {delegateData.proposalsCreated}</span>
          <span>
            Delegated From: {delegateData.numOfDelegators.toLocaleString()}
          </span>
        </div>
      </DelegateImageContainer>
    ),
    {
      width: 1146,
      height: 600,
    },
  );
}

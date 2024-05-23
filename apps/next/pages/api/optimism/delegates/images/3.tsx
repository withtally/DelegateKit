import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import { z } from "zod";
import DelegateImageContainer from "../../../../../api/delegates/DelegateImageContainer";
import { fetchDelegateData } from "../../../../../app/delegates/fetchers";

export const runtime = "edge";

export default async function Frame2(req: NextApiRequest) {
  const url = new URL(z.string().url().parse(req.url));
  const address = z.string().parse(url.searchParams.get("address"));
  const delegateData = await fetchDelegateData(address);
  return new ImageResponse(
    (
      <DelegateImageContainer>
        <img
          src={delegateData.imgSrc}
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
          <span>
            Proposals Voted:
            {delegateData.proposalsVoted}
          </span>
          <span>
            For / Against / Abstain:
            {delegateData.forAbstainAgainst}
          </span>
          <span>
            Recent Activity:
            {delegateData.recentActivity}
          </span>
          <span>
            Proposals Created:
            {delegateData.proposalsCreated}
          </span>
          <span>
            Delegated From:
            {delegateData.delegatedFrom}
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
import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import { z } from "zod";
import { fetchDelegateData } from "../../../../app/delegates/fetchers";
import { routes } from "../../../../app/routes";

export const runtime = "edge";

export default async function Frame2(req: NextApiRequest) {
  const url = new URL(z.string().url().parse(req.url));
  const address = z.string().parse(url.searchParams.get("address"));
  const delegateData = await fetchDelegateData(address);
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          background: "white",
          padding: "50px",
        }}
      >
        <span>
          <img
            src={routes.images.op}
            alt="op logo"
            width="50px"
            height="50px"
            style={{ position: "absolute", left: "60px", top: "60px" }}
          />
          <img
            src={routes.images.tally}
            alt="tally logo"
            width="50px"
            height="50px"
            style={{
              position: "absolute",
              left: "120px",
              top: "60px",
              borderRadius: "5px",
            }}
          />
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
            height: "100%",
            width: "100%",
          }}
        >
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
        </div>
      </div>
    ),
    {
      width: 1146,
      height: 600,
    },
  );
}

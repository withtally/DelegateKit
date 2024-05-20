import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import { z } from "zod";
import { fetchDelegateData } from "../../../../app/delegates/fetchers";
import { publicEnv } from "../../../../app/next-public-env";

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
            src={`${publicEnv.NEXT_PUBLIC_HOST}/images/op.png`}
            alt="op logo"
            width="50px"
            height="50px"
            style={{ position: "absolute", left: "60px", top: "60px" }}
          />
          <img
            src={`${publicEnv.NEXT_PUBLIC_HOST}/images/tally.jpg`}
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
            }}
          >
            <h3 style={{ fontSize: "20px" }}>
              {/* TODO only truncate to 200 if it's longer than 200 */}
              {delegateData.description.slice(0, 340)}...
            </h3>
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

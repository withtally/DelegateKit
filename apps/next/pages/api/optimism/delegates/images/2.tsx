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
          }}
        >
          <h3 style={{ fontSize: "20px" }}>
            {/* TODO only truncate to 200 if it's longer than 200 */}
            {delegateData.description.slice(0, 340)}...
          </h3>
        </div>
      </DelegateImageContainer>
    ),
    {
      width: 1146,
      height: 600,
    },
  );
}
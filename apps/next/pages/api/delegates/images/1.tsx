import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import * as v from "valibot";
import DelegateImageContainer from "../../../../api/delegates/DelegateImageContainer";
import { fetchDelegateData } from "../../../../app/delegates/fetchers";

export const runtime = "edge";

export default async function Frame1(req: NextApiRequest) {
  const url = new URL(v.parse(v.string([v.url()]), req.url));
  const address = v.parse(v.string(), url.searchParams.get("address"));
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1 style={{ fontSize: "48px" }}>{delegateData.address}</h1>
          <h3 style={{ fontSize: "30px" }}>{delegateData.delegatedOP}</h3>
        </div>
      </DelegateImageContainer>
    ),
    {
      width: 1146,
      height: 600,
    },
  );
}

import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import * as v from "valibot";
import { fetchDelegateData } from "../../../../app/delegates/fetchers";
import { routes } from "../../../../app/routes";

export const runtime = "edge";

export default async function Frame1(req: NextApiRequest) {
  const url = new URL(v.parse(v.string([v.url()]), req.url));
  const address = v.parse(v.string(), url.searchParams.get("address"));
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 style={{ fontSize: "48px" }}>{delegateData.address}</h1>
            <h3 style={{ fontSize: "30px" }}>{delegateData.delegatedOP}</h3>
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

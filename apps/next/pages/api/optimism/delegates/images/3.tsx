import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import { z } from "zod";
import { fetchAddressImage } from "../../../../../app/delegates/[address]/fetch-address-image";
import { fetchDelegateData } from "../../../../../app/delegates/[address]/fetchers";
import { routes } from "../../../../../app/routes";
import DelegateImageContainer from "../../../../../src/api/delegates/DelegateImageContainer";
import { frameHeight, frameWidth } from "../../../frame-config";

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
          src={routes.images.op}
          alt="op logo"
          width="50px"
          height="50px"
          style={{
            position: "relative",
            left: "56px",
            top: "66px",
          }}
        />
        <img
          src={delegateImage}
          width="80px"
          height="80px"
          style={{
            borderRadius: "50%",
            height: "80px",
            width: "80px",
            position: "relative",
            left: "100px",
          }}
          alt="profile"
        />
        <img
          alt="star"
          src={routes.images.star}
          width="40px"
          height="40px"
          style={{ position: "absolute", right: "80px", bottom: "100px" }}
        />
        <img
          alt="star"
          src={routes.images.star}
          width="20px"
          height="20px"
          style={{
            position: "absolute",
            right: "280px",
            top: "130px",
            transform: `rotate(40deg)`,
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            left: "56px",
            top: "160px",
          }}
        >
          <p style={{ color: "grey", fontSize: "20px" }}>Delegate Statistics</p>
          <br />
          <h3
            style={{
              border: "1px solid grey",
              borderRadius: "6px",
              padding: "6px 18px",
              alignSelf: "flex-start",
              fontSize: "20px",
            }}
          >
            {delegateData.proposalsVotedOn}{" "}
            <div style={{ color: "grey", display: "flex", paddingLeft: "8px" }}>
              votes
            </div>
          </h3>
          <h3
            style={{
              border: "1px solid grey",
              borderRadius: "6px",
              padding: "6px 18px",
              alignSelf: "flex-start",
              fontSize: "20px",
            }}
          >
            <div
              style={{ color: "grey", display: "flex", paddingRight: "8px" }}
            >
              created{" "}
            </div>
            {delegateData.proposalsCreated}{" "}
            <div style={{ color: "grey", display: "flex", paddingLeft: "8px" }}>
              proposals
            </div>
          </h3>
          <h3
            style={{
              border: "1px solid grey",
              borderRadius: "6px",
              padding: "6px 18px",
              alignSelf: "flex-start",
              fontSize: "20px",
            }}
          >
            <div
              style={{ color: "grey", display: "flex", paddingRight: "8px" }}
            >
              Delegated from
            </div>
            {Number(delegateData.numOfDelegators).toLocaleString("en-US")}{" "}
            <div style={{ color: "grey", display: "flex", paddingLeft: "8px" }}>
              OP holders
            </div>
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

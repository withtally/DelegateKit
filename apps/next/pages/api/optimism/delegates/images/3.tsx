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
            // {
            // position: "relative", top: "60px",
            // left: "00px",
            // display: "flex",
            // alignItems: "center",
            // justifyContent: "center",
            // textAlign: "center",
            // }
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
            {delegateData.proposalsVotedOn} Votes
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
            Created {delegateData.proposalsCreated} Proposals
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
            Delegated from{" "}
            {Number(delegateData.numOfDelegators).toLocaleString("en-US")} OP
            holders
          </h3>
        </div>
        {/* <img
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
        {/* <span>Proposals Created: {delegateData.proposalsCreated}</span>
          <span>
            Delegated From: {delegateData.numOfDelegators.toLocaleString()}
          </span>
        </div> */}
      </DelegateImageContainer>
    ),
    {
      width: frameWidth,
      height: frameHeight,
    },
  );
}

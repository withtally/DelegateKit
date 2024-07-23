import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import { Address } from "viem";
import { z } from "zod";
import { fetchAddressImage } from "../../../../../app/delegates/[address]/fetch-address-image";
import { routes } from "../../../../../app/routes";
import { TallyAPI } from "../../../../../src/api/TallyAPI/TallyAPI";
import DelegateImageContainer from "../../../../../src/api/delegates/DelegateImageContainer";
import { frameHeight, frameWidth } from "../../../frame-config";

export const runtime = "edge";

export default async function Frame2(req: NextApiRequest) {
  const url = new URL(z.string().url().parse(req.url));
  const address = z
    .string()
    .startsWith("0x")
    .parse(url.searchParams.get("address")) as Address;
  const tallyAPI = new TallyAPI("optimism");
  const [delegateStatement, delegateImage] = await Promise.all([
    tallyAPI.fetchStatementSummary(address),
    fetchAddressImage(address),
  ]);
  const shortenedStatement = delegateStatement?.slice(0, 220);
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
            position: "relative",
            top: "100px",
            left: "60px",
            display: "flex",
            maxWidth: "80%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "20px" }}>
            {/* TODO only truncate to 200 if it's longer than 200 */}
            {shortenedStatement}...
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

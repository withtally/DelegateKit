import { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import { Address } from "viem";
import { z } from "zod";
import { fetchAddressImage } from "../../../../../app/delegates/[address]/fetch-address-image";
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
  const shortenedStatement = delegateStatement?.slice(0, 340);
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

import { PropsWithChildren } from "react";
import { formatEther } from "viem";
import { routes } from "../../../../../app/routes";
import DelegateImageContainer from "../../../../../src/api/delegates/DelegateImageContainer";

const ImageContainer = ({
  size,
  children,
  left,
  top,
}: { size: number; left: string; top: string } & PropsWithChildren) => {
  const MAGIC_OUTER_CIRCLE_RATIO = 1.08;
  const pixelSize = size * MAGIC_OUTER_CIRCLE_RATIO;
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        borderRadius: "9999px",
        backgroundColor: "white",
        boxShadow:
          "0px 0.631px 1.894px 0px rgba(0, 0, 0, 0.20), 0px 12.333px 37px 0px rgba(0, 0, 0, 0.08), 0px 6.167px 6.167px 0px rgba(0, 0, 0, 0.08)",
      }}
    >
      {children}
    </div>
  );
};
export const DelegateImageOnly = ({
  ensAvatar,
  address,
  votingPower,
}: {
  ensAvatar: string;
  address: string;
  votingPower: string;
}) => {
  return (
    <DelegateImageContainer>
      <div
        className="foreground"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "450px",
        }}
      >
        <div style={{ display: "flex" }}>
          <ImageContainer size={105} left="180px" top="204px">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={routes.images.op}
              alt="op logo"
              width="100px"
              height="100px"
            />
          </ImageContainer>

          <ImageContainer size={150} left="270px" top="180px">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ensAvatar}
              style={{
                borderRadius: "50%",
                height: "130px",
                width: "130px",
              }}
              alt="profile"
            />
          </ImageContainer>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: 340,
            width: "100%",
            paddingLeft: "140px",
          }}
        >
          <h1 style={{ fontSize: "48px" }}>
            {address.includes(".")
              ? address
              : `${address.slice(0, 6)}...${address.slice(-4)}`}
          </h1>
          <h3 style={{ fontSize: "30px", marginTop: "0px" }}>
            {Math.trunc(
              Number(formatEther(BigInt(votingPower))),
            ).toLocaleString()}{" "}
            OP
          </h3>
        </div>
      </div>
    </DelegateImageContainer>
  );
};

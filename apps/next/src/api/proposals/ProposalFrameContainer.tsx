/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { publicEnv } from "../../../app/next-public-env";

const BASE_URL = publicEnv.NEXT_PUBLIC_HOST;
export const ProposalFrameContainer: React.FC<{
  children: ReactNode;
  orgImageSrc: string;
}> = ({ children, orgImageSrc }) => {
  const imageHeight = "140px";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        color: "white",
        background: "#725BFF",
        padding: "40px",
        fontSize: "30px",
        fontFamily: "DM Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          src={orgImageSrc}
          alt="organization"
          height={imageHeight}
          width={imageHeight}
          style={{
            position: "absolute",
            right: "0px",
            top: "0px",
            borderRadius: "50%",
          }}
        />
        {children}
      </div>
    </div>
  );
};

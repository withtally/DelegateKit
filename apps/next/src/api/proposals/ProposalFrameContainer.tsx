/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import { routes } from "../../../app/routes";

export const ProposalFrameContainer: React.FC<{
  children: ReactNode;
  orgImageSrc: string;
}> = ({ children, orgImageSrc }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "40px",
        backgroundColor: "white",
        fontSize: "20px",
        fontFamily: "DM Sans",
      }}
    >
      <img
        alt="smile"
        src={routes.images.oPsmile}
        width="120px"
        height="120px"
        style={{
          transform: `rotate(-10deg)`,
          position: "absolute",
          left: "-30px",
          top: "40px",
        }}
      />
      <img
        alt="star"
        src={routes.images.star}
        width="26px"
        height="26px"
        style={{ position: "absolute", left: "150px", top: "170px" }}
      />
      <img
        alt="star"
        src={routes.images.star}
        width="50px"
        height="50px"
        style={{ position: "absolute", left: "50px", top: "180px" }}
      />
      <img
        alt="thumb"
        src={routes.images.thumb}
        width="140px"
        height="140px"
        style={{ position: "absolute", right: "20px", top: "90px" }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

import { PropsWithChildren } from "react";
import { routes } from "../../../app/routes";

export default function DelegateImageContainer({
  children,
}: PropsWithChildren) {
  return (
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
        {children}
      </div>
    </div>
  );
}

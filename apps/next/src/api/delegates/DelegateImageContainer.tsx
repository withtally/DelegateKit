import { PropsWithChildren } from "react";
import { frameHeight } from "../../../pages/api/frame-config";

export default function DelegateImageContainer({
  children,
}: PropsWithChildren) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        fontFamily: "sans-serif",
        height: frameHeight,
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
}

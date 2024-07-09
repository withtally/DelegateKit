import { PropsWithChildren } from "react";

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
        height: "100%",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
}

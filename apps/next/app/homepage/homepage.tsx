import Image from "next/image";
import { LoginButton } from "../components/LoginButton";
import MobileTopImageSrc from "./mobile-top.svg";
const LeftColumn = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-0 md:px-24">{children}</div>;
};
const RightColumn = ({ children }: { children: React.ReactNode }) => {
  return <div className="lg:w-1/2">{children}</div>;
};
export const Home = () => {
  return (
    <div className="flex text-left flex-col-reverse lg:flex-row">
      <LeftColumn>
        <div style={{ zIndex: 1 }} className="w-full pt-10">
          <h1 style={{ fontSize: "84px", fontWeight: 500, marginTop: "-20px" }}>
            Frames
            <br style={{ height: "10px" }} />
            <i
              style={{ color: "#7764FD", marginTop: "0px", paddingTop: "0px" }}
            >
              Simplified.
            </i>
          </h1>
          <p>
            The missing connection between Optimism Governance and Farcaster
          </p>
          <LoginButton />
        </div>
      </LeftColumn>
      <RightColumn>
        <Image
          src={MobileTopImageSrc}
          alt="backdrop"
          style={{ width: "100%", borderRadius: "24px" }}
          className="mb-[-100px] md:mb-0"
        />
      </RightColumn>
    </div>
  );
};

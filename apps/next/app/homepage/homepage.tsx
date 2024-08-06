import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/Button";
import MobileTopImageSrc from "./mobile-top.svg";
const LoginButtonWithNoSSR = dynamic(
  () => import("../components/LoginButton"),
  {
    ssr: false,
  },
);
const LeftColumn = ({ children }: { children: React.ReactNode }) => {
  return <div className="">{children}</div>;
};
const RightColumn = ({ children }: { children: React.ReactNode }) => {
  return <div className="lg:w-1/2 py-12">{children}</div>;
};

export const Home = () => {
  return (
    <div>
      <section className="px-0 md:px-24 flex text-left flex-col-reverse lg:flex-row justify-between">
        <LeftColumn>
          <div style={{ zIndex: 1 }} className="w-full pt-[100px]">
            <h1
              style={{ fontSize: "84px", fontWeight: 500, marginTop: "-20px" }}
            >
              Frames
              <br style={{ height: "10px" }} />
              <i
                style={{
                  color: "#7764FD",
                  marginTop: "0px",
                  paddingTop: "0px",
                }}
              >
                Simplified.
              </i>
            </h1>
            <p>
              The missing connection between Optimism Governance and Farcaster
            </p>
            <div className="pt-8"></div>
            <LoginButtonWithNoSSR />
          </div>
        </LeftColumn>
        <RightColumn>
          <Image
            src={MobileTopImageSrc}
            alt="backdrop"
            style={{ width: "100%", borderRadius: "24px" }}
            className="mb-[-100px] md:mb-0 lg:h-[600px]"
          />
        </RightColumn>
      </section>
      {/* three column section */}
      <section className="pb-0 lg:pb-12 flex px-0 md:px-24 flex-col lg:flex-row lg:space-x-10 space-y-10 lg:space-y-0">
        <div className="lg:w-1/3 pt-16 lg:pt-0">
          <Image
            src="/images/homepage/polls.svg"
            width={120}
            height={120}
            alt="chat-bubble"
          />
          <h2>
            <b>Poll your audience</b>
            <p>
              Ask your Farcaster followers what they think of governance
              proposals
            </p>
          </h2>
        </div>
        <div className="lg:w-1/3  lg:pt-0">
          <Image
            src="/images/homepage/profile.svg"
            width={120}
            height={120}
            alt="chat-bubble"
          />
          <h2>
            <b>Show your profile</b>
            <p>Get more delegated OP by showing off your activity</p>
          </h2>
        </div>
        <div className="lg:w-1/3  lg:pt-0">
          <Image
            src="/images/homepage/proposal.svg"
            width={120}
            height={120}
            alt="chat-bubble"
          />
          <h2>
            <b>Share proposals</b>
            <p>Link directly to a contentious proposal</p>
          </h2>
        </div>
      </section>
      <section className="py-24 px-0 md:px-24 flex text-left flex-col-reverse lg:flex-row justify-between">
        <LeftColumn>
          <Image
            src="/images/homepage/polls-demo.svg"
            width={500}
            height={500}
            alt="polls demo"
          />
        </LeftColumn>
        <RightColumn>
          <Image
            src="/images/homepage/polls.svg"
            width={120}
            height={120}
            alt="chat-bubble"
          />
          <h2 style={{ fontSize: "48px" }}>
            {" "}
            Get feedback
            <br />
            quickly and easily.
          </h2>
          <p className="py-6">
            Represent your followers best on-chain by first polling for their
            opinions!
          </p>
          <Link href="/polls/new">
            <Button secondary>Create a Poll</Button>
          </Link>
        </RightColumn>
      </section>
    </div>
  );
};

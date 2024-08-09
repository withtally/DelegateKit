import dynamic from "next/dynamic";
import Image from "next/image";
import opLogoSrc from "../../public/images/op.png";
import { Button } from "../components/Button";
import MobileTopImageSrc from "./mobile-top.svg";
const LoginButtonWithNoSSR = dynamic(
  () => import("../components/LoginButton"),
  {
    ssr: false,
  },
);
const AddressRequiredButtonWithNoSSR = dynamic(
  () => import("../components/AddressRequiredButton"),
  {
    ssr: false,
  },
);
const LeftColumn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={"lg:w-1/2 " + className}>{children}</div>;
};
const RightColumn = ({ children }: { children: React.ReactNode }) => {
  return <div className="lg:w-1/2 py-12">{children}</div>;
};

export const Home = () => {
  return (
    <div>
      <section className="px-0 md:px-24 flex text-left flex-col-reverse lg:flex-row justify-between">
        <LeftColumn className="flex items-center mb-20 lg:mb-0">
          <div style={{ zIndex: 1 }} className="w-full">
            <h1
              style={{
                fontWeight: 500,
                marginTop: "-20px",
                overflowX: "hidden",
                lineHeight: 1.3,
              }}
              className="text-6xl lg:text-8xl"
            >
              Frames
              <br />
              <i
                style={{
                  color: "#7764FD",
                }}
              >
                Simplified.
              </i>
            </h1>
            <p className="pt-4">
              The missing connection between Optimism Governance and Farcaster
            </p>
            <div className="pt-8"></div>
            <LoginButtonWithNoSSR />
          </div>
        </LeftColumn>
        <RightColumn>
          <Image
            src={MobileTopImageSrc}
            priority
            alt="backdrop"
            style={{ width: "100%", borderRadius: "24px" }}
            className="mb-[-100px] md:mb-0 lg:h-[600px]"
          />
        </RightColumn>
      </section>

      <div className="flex mb-20 lg:mx-24 space-x-4 items-center justify-between">
        <div className="flex">
          <Image
            src={opLogoSrc}
            alt="OP"
            width={26}
            height={26}
            className="mr-4"
            style={{ height: "26px", width: "26px" }}
          />
          <b className="mr-2">DelegateKit receives $50k OP Grant</b>
          <p className="hidden lg:block">Bringing OP governance to Farcaster</p>
        </div>
        <div>
          <a
            href="https://app.charmverse.io/op-grants/delegatekit-a-complete-farcaster-dao-toolkit-5127535289761294"
            target="_blank"
          >
            <Button secondary>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.33301 5.80744H10.6663M10.6663 5.80744L5.99967 1.14078M10.6663 5.80744L5.99967 10.4741"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </a>
        </div>
      </div>
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
      <section className="py-24 px-0 md:px-24 flex text-left flex-col-reverse lg:flex-row">
        <LeftColumn className="flex-1">
          <div
            style={{
              display: "flex",
              justifyContent: "right",
            }}
            className="lg:pr-16"
          >
            <Image
              src="/images/homepage/polls-demo.svg"
              width={500}
              height={500}
              alt="polls demo"
            />
          </div>
        </LeftColumn>
        <RightColumn>
          <Image
            src="/images/homepage/polls.svg"
            width={120}
            height={120}
            alt="chat-bubble"
          />
          <h2 style={{ fontSize: "48px" }}>
            Get feedback
            <br />
            quickly and easily.
          </h2>
          <p className="py-6">
            Represent your followers best on-chain by first polling for their
            opinions!
          </p>
          <AddressRequiredButtonWithNoSSR
            href="/polls/new"
            text="Create a Poll"
          />
        </RightColumn>
      </section>
      <section className="py-14 px-0 md:px-24 flex text-left flex-col lg:flex-row">
        <LeftColumn className="flex justify-end lg:pr-16">
          <div className="inline-block">
            <Image
              src="/images/homepage/profile.svg"
              width={120}
              height={120}
              alt="chat-bubble"
            />
            <h2 style={{ fontSize: "48px" }}>
              Get more views
              <br />
              with a slick profile.
            </h2>
            <p className="py-6">
              Gathering delegated OP is easier when you have a sleek profile!
            </p>
            <AddressRequiredButtonWithNoSSR
              href="/delegates"
              text="Share your profile"
            />
          </div>
        </LeftColumn>
        <RightColumn>
          <Image
            src="/images/homepage/profile-demo.svg"
            width={500}
            height={500}
            alt="polls demo"
          />
        </RightColumn>
      </section>
      <section className="py-14 px-0 md:px-24 flex text-left flex-col-reverse lg:flex-row">
        <LeftColumn className="flex-1">
          <div
            style={{
              display: "flex",
              justifyContent: "right",
            }}
            className="lg:pr-16"
          >
            <Image
              src="/images/homepage/proposals-demo.svg"
              width={500}
              height={500}
              alt="polls demo"
            />
          </div>
        </LeftColumn>
        <RightColumn>
          <Image
            src="/images/homepage/proposal.svg"
            width={120}
            height={120}
            alt="chat-bubble"
          />
          <h2 style={{ fontSize: "48px" }}>
            Share proposals
            <br />
            in seconds.
          </h2>
          <p className="py-6">
            Want to tell Farcaster all about a proposal? Share it with
            DelegateKit!
          </p>
          <AddressRequiredButtonWithNoSSR
            href="/proposals"
            text="Share proposals"
          />
        </RightColumn>
      </section>
      {/* loved by our end users */}
      {/* <section className="px-8 md:px-24 py-14 bg-[#eae7fa] rounded-3xl flex justify-center flex-col lg:flex-row"> */}
      <section className="px-8 md:px-24 py-14 my-14 bg-gradient-to-br from-[#eae1fa] to-[#f0f0f0] rounded-3xl flex justify-center flex-col lg:flex-row">
        <LeftColumn className="flex items-center">
          <h1 style={{ fontSize: "48px" }}>
            Loved by our
            <br /> early users.
          </h1>
        </LeftColumn>
        <RightColumn>
          <div className="flex">
            <Image
              src="/images/homepage/demo-profile.png"
              width={64}
              height={64}
              alt="user"
              style={{ borderRadius: "100%", width: 64, height: 64 }}
              className="mr-8"
            />
            <div>
              <div className="bg-white rounded-3xl px-6 py-2 mb-2 inline-block">
                This is insane!
              </div>
              <div className="bg-white rounded-3xl px-6 py-2 my-2">
                The amount of hours this will save me!
              </div>
              <div className="bg-white rounded-3xl px-6 py-2 my-4">
                Thanks for building this frens
              </div>
              <p className="pt-4">Dawson, a web3 developer</p>
            </div>
          </div>
        </RightColumn>
      </section>
    </div>
  );
};

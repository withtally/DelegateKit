import copy from "copy-to-clipboard";
import { PropsWithChildren } from "react";
import { Button } from "../Button";

type ShareFrameProps = {
  frameImgSrc: string;
  frameUrl: string;
} & PropsWithChildren;
export const ShareFrameCard = ({ frameUrl, frameImgSrc }: ShareFrameProps) => {
  return (
    <div>
      <img src={frameImgSrc} alt="frame" width={320} height={320} />
      {/* footer */}
      <div className="flex">
        <Button secondary customClasses={["px-2.5"]}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M15.8337 10.4993H4.16699M4.16699 10.4993L10.0003 16.3327M4.16699 10.4993L10.0003 4.66602"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </Button>
        <Button secondary onClick={() => copy(frameUrl)}>
          Copy Link
        </Button>
        <Button>Share on Warpcast</Button>
      </div>
    </div>
  );
};

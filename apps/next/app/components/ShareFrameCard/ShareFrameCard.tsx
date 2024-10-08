import copy from "copy-to-clipboard";
import { PropsWithChildren } from "react";
import { Button } from "../Button";

type ShareFrameProps = {
  frameImgSrc: string;
  frameUrl: string;
} & PropsWithChildren;
function shareToWarpcastLink(frameUrl: string) {
  return `https://warpcast.com/~/compose?text=${frameUrl}`;
}
export const ShareFrameCard = ({ frameUrl, frameImgSrc }: ShareFrameProps) => {
  return (
    <div className="outer shadow-xl p-2 flex items-center flex-col rounded-3xl bg-white">
      <div className="p-6 flex items-center flex-col rounded-3xl bg-slate-100">
        <img
          src={frameImgSrc}
          alt="frame"
          width={360}
          height={360}
          className="rounded-3xl"
        />
        {/* footer */}
        <div className="flex space-x-2 pt-6">
          <Button
            secondary
            onClick={() => copy(frameUrl)}
            customClasses={["flex", "items-center", "space-x-2"]}
          >
            <div>Copy Link</div>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.25">
                <path
                  d="M8.00033 14.6673H6.33366C4.03247 14.6673 2.16699 12.8018 2.16699 10.5007C2.16699 8.19946 4.03247 6.33398 6.33366 6.33398H8.00033M13.0003 14.6673H14.667C16.9682 14.6673 18.8337 12.8018 18.8337 10.5007C18.8337 8.19946 16.9682 6.33398 14.667 6.33398H13.0003M6.33366 10.5007L14.667 10.5007"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </Button>
          <a href={shareToWarpcastLink(frameUrl)} target="_blank">
            <Button>Share on Warpcast</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

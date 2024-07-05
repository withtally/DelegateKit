import { PropsWithChildren } from "react";
import { Button } from "../Button";

type ShareFrameProps = { frameImgSrc: string } & PropsWithChildren;
export const ShareFrameCard = ({ frameImgSrc }: ShareFrameProps) => {
  return (
    <div>
      <img src={frameImgSrc} alt="frame" width={320} height={320} />
      {/* footer */}
      <div>
        <Button>back</Button>
        <Button>Copy Link</Button>
        <Button>Share on Warpcast</Button>
      </div>
    </div>
  );
};

"use client";
import { ShareFrameCard } from "../components/ShareFrameCard/ShareFrameCard";
import { routes } from "../routes";

export const DelegateFrame = () => {
  // TODO: pull from URL
  const address = "lefteris.eth";
  const frameUrl = routes.v1.api.delegates.frame["1"].buildUrl(address);
  const frameImageSrc = routes.v1.api.delegates.images["1"].buildUrl(address);
  return <ShareFrameCard frameUrl={frameUrl} frameImgSrc={frameImageSrc} />;
};

export default DelegateFrame;

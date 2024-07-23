"use client";

import { ShareFrameCard } from "../../components/ShareFrameCard/ShareFrameCard";
import { routes } from "../../routes";

export const Frame = ({ proposalId }: { proposalId: string }) => {
  const frameUrl = routes.v1.api.proposals.frame["1"].buildUrl(proposalId);
  const frameImageSrc =
    routes.v1.api.proposals.images["1"].buildUrl(proposalId);
  return <ShareFrameCard frameUrl={frameUrl} frameImgSrc={frameImageSrc} />;
};

export default Frame;

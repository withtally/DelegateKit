import { publicEnv } from "./next-public-env";

export const routes = {
  images: {
    op: `${publicEnv.NEXT_PUBLIC_HOST}/images/op.png`,
    chatBubble: `${publicEnv.NEXT_PUBLIC_HOST}/images/chat-red.png`,
    star: `${publicEnv.NEXT_PUBLIC_HOST}/images/star.png`,
    OPsmile: `${publicEnv.NEXT_PUBLIC_HOST}/images/op-smile.png`,
    thumb: `${publicEnv.NEXT_PUBLIC_HOST}/images/thumb.png`,
  },
  v1: {
    api: {
      delegates: {
        frame: {
          "1": {
            buildUrl: (address: string) =>
              `${publicEnv.NEXT_PUBLIC_HOST}/optimism/delegates/${address}`,
          },
        },
        images: {
          "1": {
            buildUrl: (address: string) =>
              `${publicEnv.NEXT_PUBLIC_HOST}/api/optimism/delegates/images/1?address=${address}`,
          },
        },
        address: {
          buildUrl: (address: string) =>
            `${publicEnv.NEXT_PUBLIC_HOST}/api/optimism/delegates/${address}`,
        },
      },
    },
  },
};

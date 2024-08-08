import { publicEnv } from "./next-public-env";

export const routes = {
  images: {
    op: `${publicEnv.NEXT_PUBLIC_HOST}/images/op.png`,
    chatBubble: `${publicEnv.NEXT_PUBLIC_HOST}/images/chat-red.png`,
    star: `${publicEnv.NEXT_PUBLIC_HOST}/images/star.png`,
    oPsmile: `${publicEnv.NEXT_PUBLIC_HOST}/images/op-smile.png`,
    thumb: `${publicEnv.NEXT_PUBLIC_HOST}/images/thumb.png`,
  },
  v1: {
    api: {
      polls: {
        dbHelpers: {
          getPoll: (pollId: string) =>
            `${publicEnv.NEXT_PUBLIC_HOST}/api/polls/${pollId}`,
        },
        // delegates: {
        frame: {
          "1": {
            buildUrl: (pollId: string) =>
              `${publicEnv.NEXT_PUBLIC_HOST}/polls/${pollId}`,
          },
        },
        images: {
          "1": {
            buildUrl: (pollId: string) =>
              `${publicEnv.NEXT_PUBLIC_HOST}/api/polls/image/${pollId}`,
          },
        },
      },
      proposals: {
        frame: {
          "1": {
            buildUrl: (proposalId: string) =>
              `${publicEnv.NEXT_PUBLIC_HOST}/optimism/proposals/${proposalId}`,
          },
        },
        images: {
          "1": {
            buildUrl: (proposalId: string) =>
              `${publicEnv.NEXT_PUBLIC_HOST}/api/optimism/proposals/images/1?proposalId=${proposalId}`,
          },
        },
      },
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

import { publicEnv } from "./next-public-env";

export const routes = {
  v1: {
    api: {
      delegates: {
        images: {
          "1": {
            buildUrl: (address: string) =>
              `${publicEnv.NEXT_PUBLIC_HOST}/api/delegates/images/1?address=${address}`,
          },
        },
        address: {
          buildUrl: (address: string) =>
            `${publicEnv.NEXT_PUBLIC_HOST}/api/delegates/${address}`,
        },
      },
    },
  },
};

import { publicEnv } from "./next-public-env";

export const routes = {
  v1: {
    api: {
      delegates: {
        address: {
          buildUrl: (address: string) =>
            `${publicEnv.NEXT_PUBLIC_HOST}/api/delegates/${address}`,
        },
      },
    },
  },
};

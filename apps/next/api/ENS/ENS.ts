import { Address, createPublicClient, http, isAddress } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export class ENS {
  public static isENS(address: string): boolean {
    return !isAddress(address) && address.includes(".");
  }
  public static async resolve(address: string): Promise<Address> {
    if (this.isENS(address)) {
      const ensAddress = await publicClient.getEnsAddress({
        name: normalize(address),
      });
      return ensAddress ? ensAddress : (address as Address);
    }
    return address as Address;
  }
}

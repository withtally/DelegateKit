import { Address, isAddress } from "viem";
import { normalize } from "viem/ens";
import { publicMainnetClient } from "../viem";

export class ENS {
  public static isENS(address: string): boolean {
    return !isAddress(address) && address.includes(".");
  }
  public static async resolve(address: string): Promise<Address> {
    if (this.isENS(address)) {
      const ensAddress = await publicMainnetClient.getEnsAddress({
        name: normalize(address),
      });
      return ensAddress ? ensAddress : (address as Address);
    }
    return address as Address;
  }

  public static async getENSAvatar(ensName: string): Promise<string | null> {
    try {
      const avatar = await publicMainnetClient.getEnsAvatar({ name: ensName });
      return avatar;
    } catch (error) {
      console.error("Error fetching ENS avatar:", error);
      return null;
    }
  }
}

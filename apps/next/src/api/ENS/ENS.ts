import { Address, isAddress } from "viem";
import { normalize } from "viem/ens";
import { routes } from "../../../app/routes";
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

  public static async getENSAvatar(ensName: string): Promise<string> {
    let name = ensName;
    if (!name.includes(".")) {
      // reverse loookup ens
      name =
        (await publicMainnetClient.getEnsName({
          address: ensName as Address,
        })) || ensName;
    }
    if (!name.includes(".")) return routes.images.oPsmile;
    try {
      const avatar = await publicMainnetClient.getEnsAvatar({ name });
      return avatar || routes.images.oPsmile;
    } catch (error) {
      console.error("Error fetching ENS avatar:", error);
      return routes.images.oPsmile;
    }
  }
}

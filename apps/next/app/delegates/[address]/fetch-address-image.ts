import { ENS } from "../../../src/api/ENS/ENS";

export function fetchAddressImage(address: string) {
  return ENS.getENSAvatar(address);
}

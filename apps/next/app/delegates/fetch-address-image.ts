import { ENS } from "../../api/ENS/ENS";

export async function fetchAddressImage(address: string) {
  const DEFAULT_IMAGE = `https://vote.optimism.io/_next/static/media/optimism_delegate.c05d053b.svg`;
  const ensAvatar = await ENS.getENSAvatar(address);
  return ensAvatar || DEFAULT_IMAGE;
}

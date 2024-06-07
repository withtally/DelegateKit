import { ENS } from "../../api/ENS/ENS";

export async function fetchAddressImage(address: string) {
  const DEFAULT_IMAGE =
    "https://vote.optimism.io/_next/static/media/avatar0.4f344536.svg";
  const ensAvatar = await ENS.getENSAvatar(address);
  return ensAvatar || DEFAULT_IMAGE;
}

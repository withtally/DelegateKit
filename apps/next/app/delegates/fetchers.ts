import { AgoraAPI } from "../../api/services/AgoraAPI/AgoraAPI";
import { routes } from "../routes";

/**
 * Given an eth address or ENS domain, fetch the delegate's data
 *
 * @example
 * fetchDelegateData('lefteris.eth')
 */
export const fetchDelegateData = (
  address: string,
): Promise<ReturnType<typeof AgoraAPI.prototype.fetchDelegate>> => {
  const url = routes.v1.api.delegates.address.buildUrl(address);
  return fetch(url).then((res) => res.json());
};

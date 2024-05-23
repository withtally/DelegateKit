import { delegateDataSchema } from "../../api/OPDelegate.types";
import { routes } from "../routes";

/**
 * Given an eth address or ENS domain, fetch the delegate's data
 *
 * @example
 * fetchDelegateData('lefteris.eth')
 */
export const fetchDelegateData = (address: string) => {
  const url = routes.v1.api.delegates.address.buildUrl(address);
  return fetch(url)
    .then((res) => res.json())
    .then(delegateDataSchema.parse)
    .catch((err) => {
      console.error(`Error fetching delegate data from url "${url}"`, err);
    });
};

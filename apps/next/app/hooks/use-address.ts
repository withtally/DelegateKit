import { useLocalStorage } from "@uidotdev/usehooks";
import { Address } from "viem";

export const useAddress = () => {
  const [address] = useLocalStorage<Address | null>("selectedAddress", null);
  const [verifiedAddresses] = useLocalStorage<ReadonlyArray<Address>>(
    "verifiedAddresses",
    [],
  );
  return { address, verifiedAddresses };
};

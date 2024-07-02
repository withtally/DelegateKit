import { useProfile } from "@farcaster/auth-kit";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Address, isAddress } from "viem";

export const useSetAddress = () => {
  const { profile } = useProfile();
  const [address, setAddress] = useLocalStorage<Address | null>(
    "selectedAddress",
    null,
  );
  const [verifiedAddresses, setVerifiedAddresses] = useLocalStorage<
    ReadonlyArray<Address>
  >("verifiedAddresses", []);
  useEffect(() => {
    if (!Array.isArray(profile?.verifications)) return;
    const { verifications } = profile;
    const ethereumVerifications = verifications.filter((verification) =>
      isAddress(verification),
    );
    setVerifiedAddresses(ethereumVerifications);
    setAddress(verifications?.[0] || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(profile?.verifications)]);
  return { address, setAddress, verifiedAddresses };
};

"use client";
import { useProfile } from "@farcaster/auth-kit";
export const UserAddress = () => {
  const userAddress = useUserAddress();
  return (
    <pre>
      <code>{userAddress}</code>
    </pre>
  );
};

export const useUserAddress = () => {
  const { isAuthenticated, profile } = useProfile();
  return profile.verifications?.[0] || null;
};

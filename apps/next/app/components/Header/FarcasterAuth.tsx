import { SignInButton } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import { useSetAddress } from "../../hooks/use-set-address";

const FarcasterAuth = () => {
  const { address, verifiedAddresses } = useSetAddress();
  return (
    <>
      <SignInButton />
      selected address: {address}
      <br />
      <br />
      verified addreses: {verifiedAddresses.join("\n")}
    </>
  );
};
export default FarcasterAuth;

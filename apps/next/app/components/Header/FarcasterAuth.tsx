import { SignInButton } from "@farcaster/auth-kit";
import "@farcaster/auth-kit/styles.css";
import Select, { SingleValue } from "react-select";
import { useSetAddress } from "../../hooks/use-set-address";

const FarcasterAuth = () => {
  const { address, setAddress, verifiedAddresses } = useSetAddress();
  const selectOptions = verifiedAddresses.map((verifiedAddress) => ({
    value: verifiedAddress,
    label: verifiedAddress,
  }));

  const onChange = (
    newValue: SingleValue<{ value: `0x${string}`; label: `0x${string}` }>,
  ) => {
    if (newValue === null) {
      return;
    }
    setAddress(newValue.value);
  };

  return (
    <>
      <div className="flex justify-center">
        <SignInButton />
      </div>
      {address && (
        <div className="pt-8">
          <hr />
          <div className="pt-6">
            <div className="pb-2">Selected address:</div>
            <Select
              className="basic-single"
              defaultValue={selectOptions.find(
                (option) => option.value === address,
              )}
              classNamePrefix="select"
              isDisabled={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              name="color"
              options={selectOptions}
              onChange={onChange}
            />
            <p className="pt-5">
              <b>Don&apos;t see your address? </b>
              <br />
              <a
                href="https://warpcast.com/~/settings/verified-addresses"
                target="_blank"
                className="underline"
              >
                Verify your address on Warpcast
              </a>
              , return here, and sign in to refresh addresses.
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default FarcasterAuth;

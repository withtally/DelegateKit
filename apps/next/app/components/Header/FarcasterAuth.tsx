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
      <div className="py-5">
        <SignInButton />
      </div>
      {address && (
        <>
          Selected address:
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
          <p>
            Don&apos;t see your delegate address here?{" "}
            <a
              href="https://warpcast.com/~/settings/verified-addresses"
              target="_blank"
              className="underline"
            >
              Verify your address on Warpcast
            </a>
            , return here, and sign in to refresh addresses.
          </p>
        </>
      )}
    </>
  );
};
export default FarcasterAuth;

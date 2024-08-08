import { ENS } from "../../../src/api/ENS/ENS";
import { DelegateFrame } from "./DelegateFrame";

export const metadata = {
  title: "Delegate Frame Generator",
  description: "Post a frame to farcaster for your OP delegate profile",
};

export default async function Page(req: { params: { address: string } }) {
  let { address } = req.params;
  if (address.includes(".")) {
    address = await ENS.resolve(address);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center flex-1 px-4 sm:px-20">
        <DelegateFrame address={address} />
      </main>
    </div>
  );
}

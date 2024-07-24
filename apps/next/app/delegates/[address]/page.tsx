import { Logo } from "../../components/Logo";
import { DelegateFrame } from "./DelegateFrame";

export const metadata = {
  title: "Delegate Frame Generator",
  description: "Post a frame to farcaster for your OP delegate profile",
};

export default async function Page(req: { params: { address: string } }) {
  const { address } = req.params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center flex-1 px-4 sm:px-20 text-center">
        <div className="flex justify-center items-center bg-black rounded-full w-16 sm:w-24 h-16 sm:h-24 my-8">
          <Logo />
        </div>
        <h1 className="text-lg sm:text-2xl font-bold mb-2">{metadata.title}</h1>
        <h2 className="text-md sm:text-xl mx-4">{metadata.description}</h2>
        <div className="p-8">
          <DelegateFrame address={address} />
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { Button } from "./components/Button";
import { Logo } from "./components/Logo";

export const metadata = {
  title: "DelegateKit",
  description: "Frames simplified",
};

export default async function Page() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
      <div className="flex justify-center items-center bg-black rounded-full w-16 sm:w-24 h-16 sm:h-24 my-8">
        <Logo />
      </div>
      <h1 className="text-lg sm:text-2xl font-bold mb-2">{metadata.title}</h1>
      <h2 className="text-md sm:text-xl mx-4">{metadata.description}</h2>A new
      tool to enhance Optimism governance using Farcaster.
      <Link href="/settings" className="py-8">
        <Button>Login</Button>
      </Link>
    </main>
  );
}

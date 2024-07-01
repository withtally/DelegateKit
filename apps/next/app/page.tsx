import Image from "next/image";
import { PollCreateForm } from "./polls/form";

export const metadata = {
  title: "DelegateKit Polls",
  description: "Ask your followers what they think",
};

function VercelLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Image
      src="https://avatars.githubusercontent.com/u/72627615?s=280&v=4"
      alt="Tally"
      width={100}
      height={100}
      style={{ borderRadius: 8 }}
    />
  );
}

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <div className="flex justify-center items-center bg-black rounded-full w-16 sm:w-24 h-16 sm:h-24 my-8">
          <VercelLogo className="h-8 sm:h-16 invert p-3 mb-1" />
        </div>
        <h1 className="text-lg sm:text-2xl font-bold mb-2">{metadata.title}</h1>
        <h2 className="text-md sm:text-xl mx-4">{metadata.description}</h2>
        <div className="flex flex-wrap items-center justify-around max-w-4xl my-8 sm:w-full bg-white rounded-md shadow-xl h-full border border-gray-100">
          <PollCreateForm />
        </div>
      </main>
    </div>
  );
}

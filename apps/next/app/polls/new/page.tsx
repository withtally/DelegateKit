import { PollCreateForm } from "./form";

export const metadata = {
  title: "DelegateKit Polls",
  description: "Ask your Farcaster followers what they think",
};

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <h2 className="text-md sm:text-xl mx-4">{metadata.description}</h2>
        <div className="flex flex-wrap items-center justify-around max-w-4xl my-8 sm:w-full bg-white rounded-md shadow-xl h-full border border-gray-100">
          <PollCreateForm />
        </div>
      </main>
    </div>
  );
}

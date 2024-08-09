import { ProposalsList } from "./ProposalsList";

export const metadata = {
  title: "Proposal Frame Generator",
  description: "Post a frame to farcaster for a governance proposal",
};

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <ProposalsList />
      </main>
    </div>
  );
}

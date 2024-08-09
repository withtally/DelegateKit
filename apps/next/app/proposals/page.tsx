import { ProposalsList } from "./ProposalsList";

export const metadata = {
  title: "Proposal Frame Generator",
  description: "Post a frame to farcaster for a governance proposal",
};

export default async function Page() {
  return (
    <div className="flex justify-center py-8">
      <div className="outer shadow-xl p-2 flex flex-col rounded-3xl bg-white w-[800px] max-w-[100vw] p-8">
        Description
        <hr className="my-4" />
        <ProposalsList />
      </div>
    </div>
  );
}

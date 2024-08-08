import Link from "next/link";
import { PonderAPI } from "../../src/api/PonderAPI/PonderAPI";

export async function ProposalsList() {
  const allProposals = await PonderAPI.fetchAllProposals();
  return allProposals.map((proposal) => {
    return (
      <Link key={proposal.id} href={`/proposals/${proposal.id}`}>
        <div className="p-2 my-4 bw-2 bg-gray-100">
          {proposal.description.slice(0, 70).replace(/^#/, "")}
        </div>
      </Link>
    );
  });
}

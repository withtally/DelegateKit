import Link from "next/link";
import { PonderAPI } from "../../src/api/PonderAPI/PonderAPI";

export async function ProposalsList() {
  const allProposals = await PonderAPI.fetchAllProposals();
  return allProposals.map((proposal) => {
    return (
      <Link
        key={proposal.id}
        href={`/proposals/${proposal.id}`}
        className="underline hover:bg-slate-100"
      >
        <div className="p-2 py-2 bw-2 truncate">
          {proposal.description.replace(/^#/, "")}
        </div>
      </Link>
    );
  });
}

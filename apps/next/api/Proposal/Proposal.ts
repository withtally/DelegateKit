import { z } from "zod";
import { RPC } from "../RPC/RPC";
import { OPGovernor } from "../services/OPGovernor/OPGovernor";

export type ProposalStatus =
  | "active"
  | "archived"
  | "canceled"
  | "defeated"
  | "draft"
  | "executed"
  | "expired"
  | "extended"
  | "pending"
  | "queued"
  | "submitted"
  | "succeeded";

const apiResponseSchema = z.object({
  proposal: z.object({
    id: z.string(),
    description: z.string(),
    startBlock: z.string(),
    endBlock: z.string(),
    canceled: z.boolean(),
    executed: z.boolean(),
  }),
});
const PONDER_API_URL = "http://localhost:42069/";
export class Proposal {
  public static fetchProposal = async (proposalId: string) => {
    const proposal = await fetch(PONDER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
        proposal(id:"${proposalId}") {
          id
          proposer
          description
          startBlock
          endBlock
          canceled
          executed
      }}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => res.data)
      .then(apiResponseSchema.parse)
      .then((data) => data.proposal);
    return proposal;
  };
  public static async computeProposalStatus(
    proposal: z.infer<typeof apiResponseSchema>["proposal"],
  ) {
    if (proposal.canceled) {
      return "canceled";
    } else if (proposal.executed) {
      return "executed";
    }
    const latestBlock = await RPC.getBlockNumber();
    const isProposalEnded = BigInt(proposal.endBlock) < latestBlock;
    if (isProposalEnded) {
      const opGovernor = new OPGovernor(proposal.id);
      const votes = await opGovernor.getProposalVotes();
      const [againstVotes, forVotes, abstainVotes] = votes;
      if (againstVotes > forVotes) {
        return "defeated";
      } else {
        return "succeeded";
      }
    }
    return "active";
  }
  public static fetchProposalStatus = async (
    proposalId: string,
  ): Promise<ProposalStatus> => {
    const proposal = await Proposal.fetchProposal(proposalId);
    return Proposal.computeProposalStatus(proposal);
  };
}

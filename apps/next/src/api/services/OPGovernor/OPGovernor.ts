import { contract } from "./contract";

/**
 * Consumable API for accessing Optimism Proposals
 */
export class OPGovernor {
  #proposalId: bigint;
  #contract: typeof contract;
  /**
   * Never make proposalId a number, it will lose precision
   */
  public constructor(proposalId: string) {
    this.#proposalId = BigInt(proposalId);
    this.#contract = contract;
  }
  public getProposalVotes() {
    return this.#contract.read.proposalVotes([this.#proposalId]);
  }
}

import { assert, describe, test } from "vitest";
import { Proposal } from "./Proposal";

describe("Proposal", () => {
  test("knows succeeded", async () => {
    // https://vote.optimism.io/proposals/4537769538885163906898768401836322976193114338273264147746088063279656611139
    const proposalId =
      "0004537769538885163906898768401836322976193114338273264147746088063279656611139";
    const proposal = await Proposal.fetchProposalStatus(proposalId);

    assert.deepEqual(proposal, "succeeded");
  });
  test("knows defeated", async () => {
    // https://vote.optimism.io/proposals/105090569675606228680479820654354019470447822380910214626164858605991232311940
    const proposalId =
      "105090569675606228680479820654354019470447822380910214626164858605991232311940";
    const proposal = await Proposal.fetchProposalStatus(proposalId);

    assert.deepEqual(proposal, "defeated");
  });
});

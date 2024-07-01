import { describe, expect, it } from "vitest";
import { OPGovernor } from "./OPGovernor";

describe("OPGovernor", () => {
  // https://vote.optimism.io/proposals/4537769538885163906898768401836322976193114338273264147746088063279656611139
  const proposalId =
    "4537769538885163906898768401836322976193114338273264147746088063279656611139";
  const governor = new OPGovernor(proposalId);
  describe("getProposalVotes", () => {
    it("should return an array with three elements, all BigInts and greater than 0", async () => {
      const votes = await governor.getProposalVotes();

      expect(votes).toBeInstanceOf(Array);
      expect(votes).toHaveLength(3);
      votes.forEach((vote) => {
        expect(typeof vote).toBe("bigint");
        expect(vote).toBeGreaterThan(BigInt(0));
      });
    });
  });
});

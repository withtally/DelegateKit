import * as v from "valibot";
import { expect, test } from "vitest";
import { TallyAPI } from "./TallyAPI";

const lefterisDotEth = "0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12";

test("Fetches governorId for optimism", async () => {
  const tallyAPI = new TallyAPI("optimism");
  const organization = await tallyAPI.fetchOrganization();
  expect(organization.governorIds[0]).toBe(
    "eip155:10:0xcDF27F107725988f2261Ce2256bDfCdE8B382B10",
  );
});

test("Fetches addressStats for lefteris.eth", async () => {
  const tallyAPI = new TallyAPI("optimism");
  const addressStats = await tallyAPI.fetchAddressStats(lefterisDotEth);
  expect(addressStats.proposalsCreatedCount).toBe(0);
  const DELEGATORS_LOWER_LIMIT = 1_000;
  const { delegatorsCount, votesCount } = addressStats;
  expect(delegatorsCount).toBeGreaterThan(DELEGATORS_LOWER_LIMIT);
  expect(() => v.parse(v.number([v.integer()]), delegatorsCount)).not.toThrow();
  const VOTES_COUNT_LOWER_LIMIT = 500_000;
  expect(votesCount).toBeGreaterThan(VOTES_COUNT_LOWER_LIMIT);
  expect(() => v.parse(v.number([v.integer()]), votesCount)).not.toThrow();
  const imageSrc = addressStats.imageSrc;
  expect(imageSrc).toBe(
    "https://static.tally.xyz/fbd4bf84-3c60-4543-af17-3a16fb054426_400x400.jpg",
  );
});

test("Fetches delegate", async () => {
  const tallyAPI = new TallyAPI("optimism");
  const statementSummary = await tallyAPI.fetchStatementSummary(lefterisDotEth);
  expect(statementSummary.includes("I have considerable experience")).toBe(
    true,
  );
});

test("Fetches proposal", async () => {
  // https://www.tally.xyz/gov/arbitrum/proposal/38070839538623347085766954167338451189998347523518753197890888828931691912919
  const tallyAPI = new TallyAPI("arbitrum");
  const proposalId =
    "38070839538623347085766954167338451189998347523518753197890888828931691912919";

  const proposal = await tallyAPI.fetchProposal(proposalId);
  expect(proposal.title).toBe("Arbitrum Stable Treasury Endowment Program");
  expect(proposal.status).toBe("ACTIVE");
});

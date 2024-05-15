import { expect, test } from "vitest";
import { TallyAPIFetcher } from "./TallyAPIFetcher";

test("Fetches governor", async () => {
  const governorId = "eip155:10:0xcDF27F107725988f2261Ce2256bDfCdE8B382B10";
  const slug = "optimism";
  const governor = await TallyAPIFetcher.fetchGovernor({ governorId, slug });
  expect(governor.token.symbol).toBe("OP");
});

test("Fetches governorId for optimism", async () => {
  const organizationSlug = "optimism";
  const organization =
    await TallyAPIFetcher.fetchOrganization(organizationSlug);
  expect(organization.governorIds[0]).toBe(
    "eip155:10:0xcDF27F107725988f2261Ce2256bDfCdE8B382B10",
  );
});

const LEFTERIS_DOT_ETH_ADDRESS = "0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12";
test("Fetches delegate", async () => {
  const governorId = "eip155:10:0xcDF27F107725988f2261Ce2256bDfCdE8B382B10";
  const delegate = await TallyAPIFetcher.fetchDelegate(
    LEFTERIS_DOT_ETH_ADDRESS,
    governorId,
  );
  expect(delegate.statementV2.statementSummary).includes(
    "I have considerable experience",
  );
});

test("Fetches proposals", async () => {
  // https://www.tally.xyz/gov/arbitrum/proposal/38070839538623347085766954167338451189998347523518753197890888828931691912919
  const governorIds = [
    "eip155:42161:0x789fC99093B09aD01C34DC7251D0C89ce743e5a4",
  ];
  const proposalId =
    "38070839538623347085766954167338451189998347523518753197890888828931691912919";
  const chainId = "eip155:42161";

  const proposals = await TallyAPIFetcher.fetchProposals({
    governanceIds: governorIds,
    proposalIds: [proposalId],
    chainId,
  });
  const proposal = proposals[0];
  expect(proposal.title).toBe("# Arbitrum Stable Treasury Endowment Program");
});

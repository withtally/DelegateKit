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
  expect(delegate.statement.statementSummary).includes(
    "I have considerable experience",
  );
});

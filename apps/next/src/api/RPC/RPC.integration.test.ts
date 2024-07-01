import { expect, test } from "vitest";
import { RPC } from "./RPC";
test("RPC gets latest block number", async () => {
  const latestBlockNumber = await RPC.getBlockNumber();
  expect(latestBlockNumber).toBeGreaterThan(121579101n);
});

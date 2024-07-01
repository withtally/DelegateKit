import { Address } from "viem";
import { assert, expect, test } from "vitest";
import { ENS } from "./ENS";

test("isENS should return true for non-address strings", () => {
  expect(ENS.isENS("lefteris.eth")).toBe(true);
});

test("isENS should return false for valid addresses", () => {
  expect(ENS.isENS("invalid-address")).toBe(false);
  expect(ENS.isENS("0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12")).toBe(false);
  expect(ENS.isENS("0x0123456789012345678901234567890123456789")).toBe(false);
});

test("should resolve valid ENS name", async () => {
  const resolvedAddress =
    "0x2B888954421b424C5D3D9Ce9bB67c9bD47537d12" as Address;

  const result = await ENS.resolve("lefteris.eth");
  expect(result).toBe(resolvedAddress);
});

// resolving ENS images not working currently
test("finds ENS avatar images properly", async (t) => {
  const address = "lindajxie.eth";
  const imageSrc = await ENS.getENSAvatar(address);
  assert.equal(
    imageSrc,
    "https://cryptocoven.s3.amazonaws.com/54986ff127ad77379a722350c2331e55.png",
  );
});

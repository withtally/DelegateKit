import { assert, test } from "vitest";
import { OPDelegate } from "../OPDelegate";

// delegate has profile photo set
test("fetches delegate data for lefteris.eth", async (t) => {
  const address = "lefteris.eth";
  const delegate = new OPDelegate(address);
  const data = await delegate.fetchAgoraData();
  // assert.equal(
  // Agora API has not yet implemented statement pulling
  // https://t.me/c/1969840540/143
  // assert.equal(
  //   data.statement?.includes("I have considerable experience"),
  //   true,
  // );

  assert.equal(has1MOPOrMore(data.votingPower), true);
});

/**
 * Verifies 1M or more OP
 * @example
 * ["2.2907M OP", "1M OP", "1.1M OP"].forEach(amount => has1MOPOrMore(amount))
 * // returns true for all
 */
function has1MOPOrMore(amountString: string): boolean {
  return BigInt(amountString) > 1000000000000000000000000n;
}

// delegate does NOT have profile photo set
test("fetches delegate data for 0x3d2d722b443a5cae8e41877bb7cd649f3650937c", async (t) => {
  const address = "0x3d2d722b443a5cae8e41877bb7cd649f3650937c";
  const delegate = new OPDelegate(address);
  const data = await delegate.fetchAgoraData();

  assert.equal(data.address, address);
  // assert.equal(data.statement?.includes("We are the PoolCollective"), true);
  assert.equal(has1MOPOrMore(data.votingPower), true);
});

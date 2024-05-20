import { assert, test } from "vitest";
import { OPDelegate } from "../OPDelegate";

// delegate has profile photo set
test("fetches delegate data for lefteris.eth", async (t) => {
  const address = "lefteris.eth";
  const delegate = new OPDelegate(address);
  const data = await delegate.fetchAgoraData();
  assert.equal(
    data.imgSrc,
    "https://s.gravatar.com/avatar/9c124c1f38e3df30d0c582beec001257?s=420",
  );
  assert.equal(data.address, address);
  assert.equal(
    data.description.includes("I have considerable experience"),
    true,
  );

  assert.equal(has1MOPOrMore(data.delegatedOP), true);
});

/**
 * Verifies 1M or more OP
 * @example
 * ["2.2907M OP", "1M OP", "1.1M OP"].forEach(amount => has1MOPOrMore(amount))
 * // returns true for all
 */
function has1MOPOrMore(amountString: string): boolean {
  const oneMillionOPRegex = /^(\d+(?:\.\d+)?M) OP$/;
  return oneMillionOPRegex.test(amountString);
}

// delegate does NOT have profile photo set
test("fetches delegate data for 0x3d2d722b443a5cae8e41877bb7cd649f3650937c", async (t) => {
  const address = "0x3d2d722b443a5cae8e41877bb7cd649f3650937c";
  const abbreviatedAddress = "0x3d...937c";
  const delegate = new OPDelegate(address);
  const data = await delegate.fetchAgoraData();

  assert.equal(data.imgSrc.includes(".svg"), true);
  assert.equal(data.address, abbreviatedAddress);
  assert.equal(data.description.includes("We are the PoolCollective"), true);
  assert.equal(has1MOPOrMore(data.delegatedOP), true);
});

// resolving ENS images not working currently
test.skip("finds ENS avatar images properly", async (t) => {
  const address = "lindajxie.eth";
  const delegate = new OPDelegate(address);
  const data = await delegate.fetchAgoraData();
  assert.equal(
    data.imgSrc,
    "https://cryptocoven.s3.amazonaws.com/54986ff127ad77379a722350c2331e55.png",
  );
});

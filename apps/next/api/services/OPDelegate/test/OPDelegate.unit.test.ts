import fs from "node:fs";
import path from "node:path";
import { assert, test } from "vitest";
import { OPDelegate } from "../OPDelegate";
const mockAgoraHtml = fs.readFileSync(
  path.join(__dirname, "mocks/0x48a63097e1ac123b1f5a8bbffafa4afa8192fab0.html"),
  "utf8",
);

test("finds participation data properly", async (t) => {
  const address = "0x48a63097e1ac123b1f5a8bbffafa4afa8192fab0";
  const delegate = new OPDelegate(address);
  const data = await delegate.parseAgoraHtml(mockAgoraHtml);
  assert.equal(data.proposalsVoted, "13 (3.44%)");

  assert.equal(data.forAbstainAgainst, "13 / 0 / 0");

  assert.equal(data.recentActivity, "2 of 10 last props");
  assert.equal(data.proposalsCreated, "0");
  assert.equal(data.delegatedFrom, "6.66k addresses");
});

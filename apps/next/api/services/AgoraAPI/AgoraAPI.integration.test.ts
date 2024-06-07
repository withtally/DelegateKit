import { assert, test } from "vitest";
import { AgoraAPI } from "./AgoraAPI";

test("Fetches delegate data", async (t) => {
  const address = "0xda6d1f091b672c0f9e215eb9fa6b5a84bf2c5e11";
  const agoraAPI = new AgoraAPI();
  const delegateData = await agoraAPI.fetchDelegate(address);

  assert.deepEqual(delegateData, {
    address: "0xda6d1f091b672c0f9e215eb9fa6b5a84bf2c5e11",
    citizen: false,
    votingPower: "0",
    votingPowerRelativeToVotableSupply: 0,
    votingPowerRelativeToQuorum: 0,
    proposalsCreated: "0",
    proposalsVotedOn: "0",
    votedFor: "0",
    votedAgainst: "0",
    votedAbstain: "0",
    votingParticipation: 0,
    lastTenProps: "0",
    numOfDelegators: "0",
    statement: null,
  });
});

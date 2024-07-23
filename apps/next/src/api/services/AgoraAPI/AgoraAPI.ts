import { z } from "zod";
import { env } from "../../../../app/env";

export class AgoraAPI {
  #apiFetch = (pathname: string) => {
    const url = `https://vote.optimism.io/api/v1${pathname}`;
    return fetch(url, {
      headers: { Authorization: `Bearer ${env.AGORA_API_KEY}` },
    }).then((res) => res.json());
  };
  #fetchDelegateSchema = z.object({
    address: z.string(),
    citizen: z.boolean(),
    votingPower: z.object({
      total: z.string(),
    }),
    votingPowerRelativeToVotableSupply: z.number(),
    votingPowerRelativeToQuorum: z.number(),
    proposalsCreated: z.string(),
    proposalsVotedOn: z.string(),
    votedFor: z.string(),
    votedAgainst: z.string(),
    votedAbstain: z.string(),
    votingParticipation: z.number(),
    lastTenProps: z.string(),
    numOfDelegators: z.string(),
    statement: z.any(),
  });
  public fetchDelegate = async (address: string) => {
    const pathname = `/delegates/${address}`;
    const data = await this.#apiFetch(pathname).then((res) => {
      console.log({ res });
      return this.#fetchDelegateSchema.parse(res);
    });
    return data;
  };
}

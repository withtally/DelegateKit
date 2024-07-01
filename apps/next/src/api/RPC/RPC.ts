import { env } from "../../../app/env";

export class RPC {
  public static async getBlockNumber() {
    const data = await fetch(env.OP_RPC_URL, {
      method: "POST",
      body: JSON.stringify({
        method: "eth_blockNumber",
        params: [],
        id: 1,
        jsonrpc: "2.0",
      }),
    }).then((res) => res.json());
    const hex = data.result;
    return BigInt(hex);
  }
}

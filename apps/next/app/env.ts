import * as v from "valibot";
/* eslint-disable no-process-env */

export const env = {
  HUB_URL: v.parse(
    v.string([v.regex(/^(?!http)/, 'HUB_URL must not start with "http"')]),
    process.env.HUB_URL,
  ),
  AGORA_API_KEY: v.parse(v.string(), process.env.AGORA_API_KEY),
  OP_RPC_URL: v.parse(v.string(), process.env.OP_RPC_URL),
  TALLY_API_KEY: v.parse(v.string(), process.env.TALLY_API_KEY),
  PONDER_API_URL: v.parse(v.string(), process.env.PONDER_API_URL),
  DATABASE_URL: v.parse(v.string(), process.env.DATABASE_URL),
} as const;

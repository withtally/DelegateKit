import * as v from "valibot";
/* eslint-disable no-process-env */

export const env = {
  HUB_URL: v.parse(
    v.string([v.regex(/^(?!http)/, 'HUB_URL must not start with "http"')]),
    process.env.HUB_URL,
  ),
} as const;

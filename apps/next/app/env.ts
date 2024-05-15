import * as v from "valibot";
/* eslint-disable no-process-env */
const VERCEL_PROJECT_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const VERCEL_BRANCH_URL = process.env.VERCEL_BRANCH_URL;
const VERCEL_ENV = process.env.VERCEL_ENV;

const VERCEL_HOST =
  VERCEL_ENV === "production"
    ? VERCEL_PROJECT_PRODUCTION_URL
    : VERCEL_ENV === "preview"
      ? VERCEL_BRANCH_URL
      : null;

export const env = {
  HOST: VERCEL_HOST
    ? `https://${VERCEL_HOST}`
    : v.parse(v.string([v.url()]), process.env.HOST),
  HUB_URL: v.parse(
    v.string([v.regex(/^(?!http)/, 'HUB_URL must not start with "http"')]),
    process.env.HUB_URL,
  ),
  TALLY_API_KEY: v.parse(v.string(), process.env.TALLY_API_KEY),
} as const;

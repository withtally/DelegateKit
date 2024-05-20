import * as v from "valibot";
/* eslint-disable no-process-env */
const VERCEL_PROJECT_PRODUCTION_URL =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
const VERCEL_BRANCH_URL = process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL;
const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;

const VERCEL_HOST =
  VERCEL_ENV === "production"
    ? VERCEL_PROJECT_PRODUCTION_URL
    : VERCEL_ENV === "preview"
      ? VERCEL_BRANCH_URL
      : null;
export const publicEnv = {
  NEXT_PUBLIC_HOST: VERCEL_HOST
    ? `https://${VERCEL_HOST}`
    : v.parse(v.string([v.url()]), process.env.NEXT_PUBLIC_HOST),
} as const;

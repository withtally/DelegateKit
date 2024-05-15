/* eslint-disable no-process-env */
import { z } from "zod";
const VERCEL_PROJECT_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const env = {
  HOST: VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${VERCEL_PROJECT_PRODUCTION_URL}`
    : z.string().parse(process.env.HOST),
  HUB_URL: z.string().parse(process.env.HUB_URL),
} as const;

console.log({
  HOST: env.HOST,
  VERCEL_URL: process.env.VERCEL_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
});

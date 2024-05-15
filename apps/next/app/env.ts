/* eslint-disable no-process-env */
import { z } from "zod";
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
    : z.string().url().parse(process.env.HOST),
  HUB_URL: z
    .string()
    .refine((hubUrl) => !hubUrl.startsWith("http"), {
      message: '"HUB_URL" must not begin with "http"',
    })
    .parse(process.env.HUB_URL),
} as const;

import { z } from "zod";
export const env = {
  HOST: process.env.VERCEL_URL || z.string().parse(process.env.HOST),
  HUB_URL: z.string().parse(process.env.HUB_URL),
} as const;

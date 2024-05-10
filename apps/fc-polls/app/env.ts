import { z } from "zod";
export const env = {
  HOST: process.env.VERCEL_URL || process.env.HOST || "http://localhost:3000",
  HUB_URL: z.string().parse(process.env.HUB_URL),
} as const;

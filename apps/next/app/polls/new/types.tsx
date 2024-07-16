import { Address } from "viem";

export type Poll = {
  id: string;
  creatorEthAddress: Address;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  isPrivate: boolean;
  votes1: number;
  votes2: number;
  votes3: number;
  votes4: number;
  created_at: number;
};

export const POLL_EXPIRY = 60 * 60 * 24 * 180; // Expire polls after 3 months

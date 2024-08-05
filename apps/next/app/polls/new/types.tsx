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
};

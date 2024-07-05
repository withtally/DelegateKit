import { PropsWithChildren } from "react";

export const Button = ({ children }: PropsWithChildren) => {
  return <button className=" py-2 px-4 rounded-full">{children}</button>;
};

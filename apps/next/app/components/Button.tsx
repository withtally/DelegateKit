import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  customClasses?: Array<string>;
} & PropsWithChildren &
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
export const Button = ({
  children,
  primary,
  secondary,
  customClasses,
  ...rest
}: ButtonProps) => {
  if (!secondary) {
    primary = true;
  }
  const sharedClasses = ["py-2.5", "px-6", "rounded-full", "shadow-md"];
  if (primary) {
    sharedClasses.push("bg-purple", "text-white");
  }
  sharedClasses.push(...(customClasses || []));
  return (
    <button className={sharedClasses.join(" ")} {...rest}>
      {children}
    </button>
  );
};

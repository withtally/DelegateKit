import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export function PrivatePollSelector({
  isPrivate,
  setIsPrivate,
  ...rest
}: {
  isPrivate: boolean;
  setIsPrivate: (_isPrivate: boolean) => void;
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <div className="flex items-center justify-center space-x-2 pb-4">
      <div>Make this a Private poll </div>
      {/* css toggle inspired by https://flowbite.com/docs/forms/toggle/ */}
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={isPrivate}
          onChange={() => setIsPrivate(!isPrivate)}
          {...rest}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple"></div>
      </label>
    </div>
  );
}

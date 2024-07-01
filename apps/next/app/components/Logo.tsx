import Image from "next/image";
export function Logo() {
  return (
    <Image
      src="https://avatars.githubusercontent.com/u/72627615?s=280&v=4"
      alt="Tally"
      width={100}
      height={100}
      style={{ borderRadius: 8 }}
    />
  );
}

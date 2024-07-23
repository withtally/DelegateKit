"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAddress } from "../../hooks/use-address";
import { EthereumAddress } from "./EthereumAddress";
import { ProfileIcon } from "./icons/ProfileIcon";
import { ProposalIcon } from "./icons/ProposalIcon";

/**
 *  converts a hex color to rgba with an alpha value of 0.15
 */
function hexToRgbA(hex: string) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      // @ts-ignore
      "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",.15)"
    );
  }
  throw new Error("Bad Hex");
}
const HeaderElement = ({
  color,
  children,
  text,
  href,
}: { color: string; text: string; href: string } & PropsWithChildren) => {
  const pathname = usePathname();
  const rootHref = href.split("/")[1]; // works for both /polls/new and /polls/history
  const active = pathname?.includes(rootHref);
  const backgroundColor = hexToRgbA(color);
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 24px",
        borderRadius: "7px",
        ...(active ? { backgroundColor } : {}),
      }}
    >
      <div className="flex">
        <div
          className="flex justify-center items-center"
          style={{
            borderRadius: "7px",
            height: "24px",
            width: "24px",
            boxShadow:
              "0px 0.205px 0.614px 0px rgba(0, 0, 0, 0.20), 0px 4px 12px 0px rgba(0, 0, 0, 0.08), 0px 2px 2px 0px rgba(0, 0, 0, 0.08)",
            marginRight: "8px",
          }}
        >
          <div
            style={{
              height: "22px",
              width: "22px",
              backgroundColor: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "7px",
              paddingTop: "2px",
            }}
          >
            {children}
          </div>
        </div>
        <div style={{ ...(active ? {} : { opacity: "50%" }) }}>{text}</div>
      </div>
    </Link>
  );
};
const Header = () => {
  const { address } = useAddress();
  return (
    <header className="bg-white shadow py-3 px-6 flex justify-between items-center">
      <Link href="/">DelegateKit</Link>
      {address && (
        <div className="flex items-center">
          <HeaderElement color="#7F6BFF" text="Polls" href="/polls/new">
            <Image
              src="/images/chat-bubble.svg"
              width={80}
              height={80}
              alt="chat-bubble"
            />
          </HeaderElement>
          <HeaderElement
            color="#70EEFF"
            text="Share Profile"
            href={`/delegates/${address}`}
          >
            <ProfileIcon />
          </HeaderElement>
          <HeaderElement
            color="#FF84FF"
            text="Share Proposal"
            href={`/proposals`}
          >
            <ProposalIcon />
          </HeaderElement>
        </div>
      )}
      <div className="flex justify-end">
        <EthereumAddress />
      </div>
    </header>
  );
};
export default Header;

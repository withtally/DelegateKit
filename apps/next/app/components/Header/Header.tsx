"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAddress } from "../../hooks/use-address";
import { EthereumAddress } from "./EthereumAddress";

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
  const active = pathname === href;
  const backgroundColor = hexToRgbA(color);
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
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
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_ddd_4074_2576)">
                <rect
                  x="3"
                  y="2"
                  width="12"
                  height="12"
                  rx="6"
                  fill="white"
                  shape-rendering="crispEdges"
                />
                <path
                  d="M10.7553 9.16004L10.7553 6.05859M10.7553 6.05859H7.65388M10.7553 6.05859L7.05372 9.52901"
                  stroke="#4DCBE5"
                  stroke-width="1.19798"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_ddd_4074_2576"
                  x="0"
                  y="-5.96046e-08"
                  width="18"
                  height="18"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="1"
                    operator="erode"
                    in="SourceAlpha"
                    result="effect1_dropShadow_4074_2576"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_4074_2576"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_4074_2576"
                    result="effect2_dropShadow_4074_2576"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="1"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect3_dropShadow_4074_2576"
                  />
                  <feOffset />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect2_dropShadow_4074_2576"
                    result="effect3_dropShadow_4074_2576"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect3_dropShadow_4074_2576"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </HeaderElement>
          <HeaderElement color="#FF84FF" text="Share Proposal" href="/proposal">
            <svg
              width="16"
              height="18"
              viewBox="0 0 16 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_ddd_4074_2581)">
                <path
                  d="M3.5 4.88C3.5 3.87191 3.5 3.36786 3.68393 2.98282C3.84571 2.64413 4.10387 2.36876 4.42139 2.19619C4.78237 2 5.25491 2 6.2 2H9.8C10.7451 2 11.2176 2 11.5786 2.19619C11.8961 2.36876 12.1543 2.64413 12.3161 2.98282C12.5 3.36786 12.5 3.87191 12.5 4.88V11.12C12.5 12.1281 12.5 12.6321 12.3161 13.0172C12.1543 13.3559 11.8961 13.6312 11.5786 13.8038C11.2176 14 10.7451 14 9.8 14H6.2C5.25491 14 4.78237 14 4.42139 13.8038C4.10387 13.6312 3.84571 13.3559 3.68393 13.0172C3.5 12.6321 3.5 12.1281 3.5 11.12V4.88Z"
                  fill="white"
                />
              </g>
              <rect
                x="4.5"
                y="4"
                width="6"
                height="1"
                rx="0.5"
                fill="#DC61F8"
              />
              <rect
                x="4.5"
                y="8"
                width="3"
                height="1"
                rx="0.5"
                fill="#DC61F8"
              />
              <rect
                x="4.5"
                y="6"
                width="7"
                height="1"
                rx="0.5"
                fill="#DC61F8"
              />
              <defs>
                <filter
                  id="filter0_ddd_4074_2581"
                  x="0.5"
                  y="-5.96046e-08"
                  width="15"
                  height="18"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="1"
                    operator="erode"
                    in="SourceAlpha"
                    result="effect1_dropShadow_4074_2581"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_4074_2581"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="1" />
                  <feGaussianBlur stdDeviation="1.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_4074_2581"
                    result="effect2_dropShadow_4074_2581"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feMorphology
                    radius="1"
                    operator="dilate"
                    in="SourceAlpha"
                    result="effect3_dropShadow_4074_2581"
                  />
                  <feOffset />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="effect2_dropShadow_4074_2581"
                    result="effect3_dropShadow_4074_2581"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect3_dropShadow_4074_2581"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
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

import "@farcaster/auth-kit/styles.css";
import { Plus_Jakarta_Sans } from "next/font/google";

import dynamic from "next/dynamic";
import "./globals.css";

const HeaderWithNoSSR = dynamic(() => import("./components/Header/Header"), {
  ssr: false,
});
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.className}>
      <body>
        <HeaderWithNoSSR />
        <div className="px-8 lg:pt-10">{children}</div>
      </body>
    </html>
  );
}

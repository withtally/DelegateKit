import "@farcaster/auth-kit/styles.css";
import { GeistSans } from "geist/font/sans";
import dynamic from "next/dynamic";
import "./globals.css";

const HeaderWithNoSSR = dynamic(() => import("./components/Header/Header"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <HeaderWithNoSSR />
        <div className="px-40 py-20">{children}</div>
      </body>
    </html>
  );
}

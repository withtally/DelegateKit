import { GetStaticProps } from "next";
import Head from "next/head";
import { isAddress } from "viem";
import { z } from "zod";
import { publicEnv } from "../../app/next-public-env";

type ServerHydratedProps = {
  address: string;
};

export default function Home(props: ServerHydratedProps) {
  const { address } = props;
  const imgSrc = `${publicEnv.NEXT_PUBLIC_HOST}/api/delegates/images/1?address=${address}`;
  const framePostUrl = `${publicEnv.NEXT_PUBLIC_HOST}/api/delegates/frame-2?address=${address}&currentIndex=1`;
  return (
    <Head>
      <meta name="fc:frame" content="vNext" />

      <meta name="fc:frame:image" content={imgSrc} />
      <meta name="fc:frame:image:aspect_ratio" content="1.91:1" />
      <meta property="og:image" content={imgSrc} />

      <meta name="fc:frame:button:1" content="Statement →" />
      <meta name="fc:frame:button:1:action" content="post" />
      <meta name="fc:frame:post_url" content={framePostUrl} />

      <meta name="fc:frame:button:2" content="Participation →→" />
      <meta name="fc:frame:button:2:action" content="post" />

      <meta name="fc:frame:button:3" content="Delegate" />
      <meta name="fc:frame:button:3:action" content="link" />
      <meta
        name="fc:frame:button:3:target"
        content={`https://www.tally.xyz/profile/${address}`}
      />
    </Head>
  );
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

/**
 * @example
 * isValidENS('vitalik.eth')
 * // true
 */
const isValidENS = (value: string): boolean => {
  // Replace this regex with your own ENS domain name validation
  const ensRegex = /^(.+)\.eth$/i;
  return ensRegex.test(value);
};

/**
 * eth addresses or ENS names
 */
const addressSchema = z.string().refine(
  (value) => {
    return isAddress(value) || isValidENS(value) || false;
  },
  {
    message: "Invalid Ethereum address or ENS domain name",
  },
);
/**
 * getStaticProps is a hack used to ensure the first render has address found.
 * If we rely only on the useRouter hook in the component, the first render will not find address
 */
export const getStaticProps: GetStaticProps<ServerHydratedProps> = async ({
  params,
}) => {
  try {
    const address: string = addressSchema
      .parse(params?.address?.[0])
      .toLowerCase();
    return { props: { address } };
  } catch {
    return { notFound: true };
  }
};

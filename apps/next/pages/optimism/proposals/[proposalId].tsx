import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { parse, string } from "valibot";
import { publicEnv } from "../../../app/next-public-env";

type ServerHydratedProps = {
  governorSlug: string;
  proposalId: string;
  proposal: {
    status: string;
  };
};

const ProposalFrame1: NextPage<ServerHydratedProps> = (props) => {
  const { proposalId, governorSlug, proposal } = props;
  const imgSrc = `${publicEnv.NEXT_PUBLIC_HOST}/api/proposal/image/frame-1?proposalId=${proposalId}&governorSlug=${governorSlug}`;
  // const framePostUrl = `${BASE_URL}/api/proposal/generate-frame?proposalId=${proposalId}&currentIndex=1&governorSlug=${governorSlug}`;
  const proposalUrl = `https://vote.optimism.io/proposals/${proposalId}`;

  const actionText = proposal.status === "ACTIVE" ? "Vote" : "View Proposal";
  return (
    <Head>
      <meta name="fc:frame" content="vNext" />

      <meta name="fc:frame:image" content={imgSrc} />
      <meta name="fc:frame:image:aspect_ratio" content="1.91:1" />
      <meta property="og:image" content={imgSrc} />

      <meta name="fc:frame:button:1" content={actionText} />
      <meta name="fc:frame:button:1:action" content="link" />
      <meta name="fc:frame:button:1:target" content={proposalUrl} />
    </Head>
  );
};
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

/**
 * getStaticProps is a hack used to ensure the first render has proposalId found.
 * If we rely only on the useRouter hook in the component, the first render will not find proposalId
 */
export const getStaticProps: GetStaticProps<ServerHydratedProps> = async ({
  params,
}) => {
  try {
    const proposalId: string = parse(
      string(),
      params?.proposalId,
    ).toLowerCase();
    const governorSlug: string = parse(string(), params?.governorSlug);
    throw new Error("proposal fetching not implemented");

    // return { props };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

export default ProposalFrame1;

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { publicEnv } from "../../../app/next-public-env";
import { Proposal, ProposalStatus } from "../../../src/api/Proposal/Proposal";

type ServerHydratedProps = {
  governorSlug: string;
  proposalId: string;
  proposal: {
    status: ProposalStatus;
  };
};

const ProposalFrame1: NextPage<ServerHydratedProps> = (props) => {
  const { proposalId, governorSlug, proposal } = props;
  const imgSrc = `${publicEnv.NEXT_PUBLIC_HOST}/api/optimism/proposals/images/1?proposalId=${proposalId}&governorSlug=${governorSlug}`;
  // const framePostUrl = `${BASE_URL}/api/proposal/generate-frame?proposalId=${proposalId}&currentIndex=1&governorSlug=${governorSlug}`;
  const proposalUrl = `https://vote.optimism.io/proposals/${proposalId}`;

  const actionText = proposal.status === "active" ? "Vote" : "View Proposal";
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
export const getServerSideProps: GetServerSideProps<
  ServerHydratedProps
> = async ({ params }) => {
  try {
    const proposalId = params?.proposalId;
    if (typeof proposalId !== "string") {
      // nextjs build runs this function with no props, so we need to return notFound
      return { notFound: true };
    }
    const proposalStatus = await Proposal.fetchProposalStatus(proposalId);
    const props = {
      governorSlug: "optimism",
      proposalId: proposalId.toLowerCase(),
      proposal: {
        status: proposalStatus,
      },
    };

    return { props };
  } catch (err) {
    console.error(err);
    return { notFound: true };
  }
};

export default ProposalFrame1;

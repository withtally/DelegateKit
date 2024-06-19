import type { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import * as v from "valibot";
import { parse, string } from "valibot";
import { Proposal } from "../../../../../api/Proposal/Proposal";
import { ProposalFrameContainer } from "../../../../../api/proposals/ProposalFrameContainer";
import { routes } from "../../../../../app/routes";

export const runtime = "edge";

export default async function Frame1(req: NextApiRequest) {
  const url = new URL(parse(v.string(), req.url));
  const proposalId = parse(string(), url.searchParams.get("proposalId"));
  const proposal = await Proposal.fetchProposal(proposalId);

  const title = proposal.description.split("\n")[0].replace("#", "");
  const status = await Proposal.computeProposalStatus(proposal);
  return new ImageResponse(
    (
      <ProposalFrameContainer orgImageSrc={routes.images.op}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 700,
            }}
          >
            {title}
          </h1>
          <h3>{status}</h3>
        </div>
      </ProposalFrameContainer>
    ),
    {
      width: 1146,
      height: 600,
    },
  );
}

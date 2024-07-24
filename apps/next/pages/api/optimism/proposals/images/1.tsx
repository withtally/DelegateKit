import type { NextApiRequest } from "next";
import { ImageResponse } from "next/og";
import * as v from "valibot";
import { parse, string } from "valibot";
import { routes } from "../../../../../app/routes";
import { Proposal } from "../../../../../src/api/Proposal/Proposal";
import { ProposalFrameContainer } from "../../../../../src/api/proposals/ProposalFrameContainer";
import { OPGovernor } from "../../../../../src/api/services/OPGovernor/OPGovernor";
import { frameHeight, frameWidth } from "../../../frame-config";

export const runtime = "edge";

const ForAgainstRow = ({
  text,
  votes,
  total,
  isWinner,
}: {
  text: string;
  votes: bigint;
  total: bigint;
  isWinner: boolean;
}) => {
  const backgroundColor = isWinner ? "#7764FD" : "grey";
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "40px",
        width: "100%",
        borderRadius: "4px",
        backgroundColor,
        paddingTop: "8px",
        paddingBottom: "8px",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      {text}: {Number((votes * 100n) / total)}%
    </div>
  );
};
export default async function Frame1(req: NextApiRequest) {
  const url = new URL(parse(v.string(), req.url));
  const proposalId = parse(string(), url.searchParams.get("proposalId"));
  const proposal = await Proposal.fetchProposal(proposalId);

  const title = proposal.description.split("\n")[0].replace("#", "");
  const opGovernor = new OPGovernor(proposalId);
  const [status, votes] = await Promise.all([
    Proposal.computeProposalStatus(proposal),
    opGovernor.getProposalVotes(),
  ]);
  const [againstVotes, forVotes, abstainVotes] = votes;
  const totalVotes = againstVotes + forVotes + abstainVotes;
  return new ImageResponse(
    (
      <ProposalFrameContainer orgImageSrc={routes.images.op}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              maxWidth: "90%",
            }}
          >
            {title}
          </h1>
          <div
            style={{
              display: "flex",
              backgroundColor: "#7764FD",
              padding: "6px 14px",
              borderRadius: "7px",
              color: "white",
              // marginBottom: "80px",
            }}
          >
            {status}
          </div>
          <div style={{ display: "flex", marginBottom: "80px" }}></div>
          <ForAgainstRow
            text="for"
            votes={forVotes}
            total={totalVotes}
            isWinner={forVotes >= againstVotes && forVotes >= abstainVotes}
          />
          <ForAgainstRow
            text="against"
            votes={againstVotes}
            total={totalVotes}
            isWinner={againstVotes > forVotes && againstVotes > abstainVotes}
          />
          <ForAgainstRow
            text="abstain"
            votes={abstainVotes}
            total={totalVotes}
            isWinner={abstainVotes > forVotes && abstainVotes > againstVotes}
          />
        </div>
      </ProposalFrameContainer>
    ),
    {
      width: frameWidth,
      height: frameHeight,
    },
  );
}

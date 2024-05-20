import { Address } from "viem";
import { ENS } from "../ENS/ENS";
import { TallyAPIFetcher } from "./TallyAPIFetcher";

/**
 * Consumable API for accessing the Tally API.
 * All details like graphql should be abstracted to a different class
 */
export class TallyAPI {
  #organizationSlug: string;

  /**
   * Creation is done via async "init" function instead of constructor to perform async operations
   */
  public constructor(organizationSlug: string) {
    this.#organizationSlug = organizationSlug;
  }

  public async fetchAddressStats(address: Address) {
    const resolvedAddress = await ENS.resolve(address);
    const addressStats = await TallyAPIFetcher.fetchAddressStats(
      resolvedAddress,
      this.#organizationSlug,
    );

    // divide by 10^18
    const votesCount: number = Number(
      BigInt(addressStats.delegate.votesCount) /
        BigInt(10) ** BigInt(addressStats.delegate.token.decimals),
    );

    let { picture } = addressStats.account;
    if (picture === null) {
      picture = `https://effigy.im/a/${resolvedAddress}.png`;
    }
    const toReturn = {
      proposalsCreatedCount: addressStats.account.proposalsCreatedCount,
      delegatorsCount: addressStats.delegate.delegatorsCount,
      votesCount,
      imageSrc: picture,
    };
    return toReturn;
  }

  public async fetchStatementSummary(address: Address): Promise<string> {
    const governorId = await this.fetchOrganization().then(
      (organization) => organization.governorIds[0],
    );
    const res = await TallyAPIFetcher.fetchDelegate(address, governorId);
    return res.statementV2.statementSummary;
  }

  public async fetchOrganization() {
    const organization = await TallyAPIFetcher.fetchOrganization(
      this.#organizationSlug,
    );
    return organization;
  }
  public async fetchGovernorTokenSymbol(governorId: string): Promise<string> {
    const res = await TallyAPIFetcher.fetchGovernor({
      governorId,
      slug: this.#organizationSlug,
    });
    return res.token.symbol;
  }
  public async fetchProposal(proposalId: string) {
    const organization = await TallyAPIFetcher.fetchOrganization(
      this.#organizationSlug,
    );
    const chainId = organization.chainIds[0];
    const governorIds = organization.governorIds;
    const proposals = await TallyAPIFetcher.fetchProposals({
      governanceIds: governorIds,
      chainId,
      proposalIds: [proposalId],
    });

    const proposal = proposals[0];
    return {
      title: proposal.title.replace("# ", ""),
      status: proposal.status[proposal.status.length - 1].type,
    };
  }
  public static async resolveENS(ens: string): Promise<Address> {
    const data = await TallyAPIFetcher.fetchAddressFromEns({
      ens,
    });
    return data.address as Address;
  }
}

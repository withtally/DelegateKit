import type { Output } from "valibot";
import * as v from "valibot";
import { Address } from "viem";
import { env } from "../../app/env";
import { ENS } from "../ENS/ENS";

const TALLY_API_URL = "https://api.tally.xyz";
const TALLY_API_KEY = env.TALLY_API_KEY;

type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
    ? T
    : T extends object
      ? DeepReadonlyObject<T>
      : T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

/**
 * Do not consume this directly. Should only be imported to TallyApi.ts
 */
export class TallyAPIFetcher {
  private static async apiFetch(postBody: {
    query: string;
    variables: Record<string, any>;
  }) {
    const body = JSON.stringify(postBody);
    const data = await fetch(`${TALLY_API_URL}/query`, {
      headers: {
        "api-key": TALLY_API_KEY,
        "content-type": "application/json",
      },
      body,
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => res.data);
    return data;
  }
  private static getAccountId = async (
    address: Address,
    organizationSlug: string,
  ): Promise<string> => {
    const governorId = (
      await TallyAPIFetcher.fetchOrganization(organizationSlug)
    ).governorIds[0];
    const chainId = governorId.split(":")[1];
    const accountId = `eip155:${chainId}:${address}`;
    return accountId;
  };

  private static governorSchema = v.object({
    governor: v.object({
      token: v.object({
        symbol: v.string(),
      }),
    }),
  });

  private static accountSchema = v.object({
    accountByEns: v.object({
      address: v.string([v.startsWith("0x")]),
    }),
  });

  public static async fetchGovernor({
    governorId,
    slug,
  }: {
    governorId: string;
    slug: string;
  }): Promise<
    DeepReadonly<Output<typeof TallyAPIFetcher.governorSchema>>["governor"]
  > {
    const query = `query GovernorByAccountIdAndSlug($input: GovernorInput!) {
		governor(input: $input) {
		  token {
			symbol
		  }
		}
	  }`;
    const input = {
      id: governorId,
      slug: slug,
    };
    const data = await TallyAPIFetcher.apiFetch({
      query,
      variables: {
        input,
      },
    }).then((res) => v.parse(TallyAPIFetcher.governorSchema, res));
    return data.governor;
  }

  public static async fetchAddressFromEns({
    ens,
  }: {
    ens: string;
  }): Promise<Output<typeof TallyAPIFetcher.accountSchema>["accountByEns"]> {
    const query = `query AccountByEns($ens: String!) {
      accountByEns(ens: $ens) {
        address
      }
	  }`;

    const data = await TallyAPIFetcher.apiFetch({
      query,
      variables: {
        ens,
      },
    }).then((res) => v.parse(TallyAPIFetcher.accountSchema, res));
    return data.accountByEns;
  }

  private static organizationSchema = v.object({
    organization: v.object({
      governorIds: v.array(v.string()),
      chainIds: v.array(v.string()),
      metadata: v.object({
        icon: v.string(),
      }),
    }),
  });
  /** Given a slug, return information for this organization */
  public static async fetchOrganization(
    organizationSlug: string,
  ): Promise<
    DeepReadonly<
      Output<typeof TallyAPIFetcher.organizationSchema>
    >["organization"]
  > {
    const data = await TallyAPIFetcher.apiFetch({
      query: `query OrganizationBySlug($input: OrganizationInput!) {
			  organization(input: $input) {
				 governorIds
         chainIds
				 metadata {
				  icon
				}
			  }
			}`,
      variables: {
        input: {
          slug: organizationSlug,
        },
      },
    }).then((res) => v.parse(TallyAPIFetcher.organizationSchema, res));
    return data.organization;
  }

  private static delegateSchema = v.object({
    delegate: v.object({
      statementV2: v.object({
        statementSummary: v.string(),
      }),
    }),
  });
  public static async fetchDelegate(
    address: Address,
    governorId: string,
  ): Promise<
    DeepReadonly<Output<typeof TallyAPIFetcher.delegateSchema>>["delegate"]
  > {
    const resolvedAddress = await ENS.resolve(address);
    const data = await TallyAPIFetcher.apiFetch({
      query: `query DelegateStatement($input: DelegateInput!) {
			delegate(input: $input) {
			  statementV2 {
          statementSummary
			  }
			}
		  }`,
      variables: {
        input: {
          address: resolvedAddress,
          governorId,
        },
      },
    })
      .then((res) => v.parse(TallyAPIFetcher.delegateSchema, res))
      .then((res) => res.delegate);

    return data;
  }

  private static addressStatsSchema = v.object({
    account: v.object({
      proposalsCreatedCount: v.number([v.integer()]),
      picture: v.union([v.null_(), v.string()]),
    }),
    delegate: v.object({
      delegatorsCount: v.number([v.integer()]),
      votesCount: v.string() /*'2156808169374296420740353', */,
      token: v.object({
        decimals: v.number([v.integer()]),
      }),
    }),
  });
  public static async fetchAddressStats(
    address: Address,
    organizationSlug: string,
  ) {
    const query = `query AddressTabPanelsStats(
	  $input: DelegateInput!,
	  $proposalsCreatedCountInput: ProposalsCreatedCountInput!,
	  $accountId: AccountID!
	) {
	  account(id: $accountId) {
      proposalsCreatedCount(input: $proposalsCreatedCountInput)
      picture
	  }
	  delegate(input: $input) {
      delegatorsCount
      votesCount
      token {
        decimals
      }
	  }
	}`;

    const [accountId, governorId] = await Promise.all([
      TallyAPIFetcher.getAccountId(address, organizationSlug),
      this.fetchOrganization(organizationSlug).then(
        (organization) => organization.governorIds[0],
      ),
    ]);
    const variables = {
      accountId: accountId,
      input: {
        address,
        governorId,
      },
      proposalsCreatedCountInput: {
        governorId,
      },
    };
    const data = await TallyAPIFetcher.apiFetch({
      query,
      variables,
    }).then((res) => v.parse(this.addressStatsSchema, res));
    return data;
  }

  private static proposalsSchema = v.object({
    proposals: v.array(
      v.object({
        title: v.string(),
        statusChanges: v.array(
          v.object({
            type: v.string(),
          }),
        ),
      }),
    ),
  });
  public static async fetchProposals({
    governanceIds,
    proposalIds,
    chainId,
  }: {
    governanceIds: ReadonlyArray<string>;
    proposalIds: ReadonlyArray<string>;
    chainId: string;
  }): Promise<
    DeepReadonly<Output<typeof TallyAPIFetcher.proposalsSchema>>["proposals"]
  > {
    const data = await TallyAPIFetcher.apiFetch({
      query: `query ProposalsMetadata(
        $chainId: ChainID!
        $governanceIds: [AccountID!]
        $proposalIds: [ID!]
      ) {
        proposals(
          chainId: $chainId
          governanceIds: $governanceIds
          proposalIds: $proposalIds
        ) {
          title
          statusChanges {
            type
          }
        }
      }`,
      variables: {
        governanceIds,
        proposalIds,
        chainId,
      },
    }).then((res) => v.parse(this.proposalsSchema, res));

    return data.proposals;
  }
}

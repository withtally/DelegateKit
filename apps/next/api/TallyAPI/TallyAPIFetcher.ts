import type { Output } from "valibot";
import * as v from "valibot";
import {
  array,
  integer,
  null_,
  number,
  object,
  parse,
  string,
  union,
} from "valibot";
import { Address } from "viem";
import { env } from "../../app/env";
import { ENS } from "../ENS/ENS";

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
    const data = await fetch(`https://api.tally.xyz/query`, {
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

  private static governorSchema = object({
    governor: object({
      token: object({
        symbol: string(),
      }),
    }),
  });

  private static accountSchema = object({
    accountByEns: object({
      address: string([v.startsWith("0x")]),
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
    }).then((res) => parse(TallyAPIFetcher.governorSchema, res));
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
    }).then((res) => parse(TallyAPIFetcher.accountSchema, res));
    return data.accountByEns;
  }

  private static organizationSchema = object({
    organization: object({
      governorIds: array(string()),
      chainIds: array(string()),
      metadata: object({
        icon: string(),
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
    }).then((res) => parse(TallyAPIFetcher.organizationSchema, res));
    return data.organization;
  }

  private static delegateSchema = object({
    delegate: object({
      statement: object({
        statementSummary: string(),
      }),
    }),
  });
  public static async fetchDelegate(
    address: Address,
    governorId: string,
  ): Promise<
    DeepReadonly<Output<typeof TallyAPIFetcher.delegateSchema>>["delegate"]
  > {
    address = await ENS.resolve(address);
    const data = await TallyAPIFetcher.apiFetch({
      query: `query DelegateStatement($input: DelegateInput!) {
        delegate(input: $input) {
        statement {
            statementSummary
          }
        }
		  }`,
      variables: {
        input: {
          address,
          governorId,
        },
      },
    })
      .then((res) => parse(TallyAPIFetcher.delegateSchema, res))
      .then((res) => res.delegate);

    return data;
  }

  private static addressStatsSchema = object({
    account: object({
      proposalsCreatedCount: number([integer()]),
      picture: union([null_(), string()]),
    }),
    delegate: object({
      delegatorsCount: number([integer()]),
      votesCount: string() /*'2156808169374296420740353', */,
      token: object({
        decimals: number([integer()]),
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
    }).then((res) => parse(this.addressStatsSchema, res));
    return data;
  }

  private static proposalsSchema = object({
    proposals: v.array(
      object({
        title: string(),
        statusChanges: array(
          object({
            type: string(),
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
    }).then((res) => parse(this.proposalsSchema, res));

    return data.proposals;
  }
}

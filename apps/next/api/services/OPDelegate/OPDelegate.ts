import * as cheerio from "cheerio";
import { z } from "zod";

import { DelegateData, delegateDataSchema } from "../../OPDelegate.types";
import { Postgres } from "../../database/Postgres";
import { fetchRenderedHtml } from "../PlaywrightHelper";

export class OPDelegate {
  readonly #ethereumAddress: string;
  readonly #OPTIMISM_VOTE_BASE_URL = "https://vote.optimism.io";
  private postgres: Postgres;

  /**
   * @example
   * Works for ENS addresses
   * ```
   * new OPDelegate('lefteris.eth')
   * ```
   */
  constructor(ethereumAddress: string) {
    this.#ethereumAddress = ethereumAddress;
    this.postgres = new Postgres();
  }

  public fetchAgoraData = async (): Promise<DelegateData> => {
    const cachedRow = await this.postgres.selectRowByAddress(
      this.#ethereumAddress,
    );
    const html: string = await (async () => {
      if (cachedRow) {
        console.log(
          `cache hit for html for address: "${this.#ethereumAddress}"`,
        );
        return cachedRow.scraped_html;
      }
      console.log(
        `cache miss for html for address: "${this.#ethereumAddress}"`,
      );
      const url = `${this.#OPTIMISM_VOTE_BASE_URL}/delegates/${this.#ethereumAddress}`;
      const html = await fetchRenderedHtml(url);
      this.postgres.upsertDelegate(this.#ethereumAddress, html);
      return html;
    })();
    return this.parseAgoraHtml(html);
  };
  public parseAgoraHtml = (html: string): DelegateData => {
    const $ = cheerio.load(html);

    // contains the image, address, and delegated OP count
    const delegateCardSelector = "div[class*=delegateCard_card__]";

    const delegateCard = $(delegateCardSelector);

    const selectedDelegateImage = z
      .string()
      .parse(
        delegateCard.find('img[alt="ENS Avatar"]').attr("src") ||
          delegateCard
            .find("div[class*=delegateCard_avatar_] > img")
            .attr("src"),
      );
    const imgSrc: string = (() => {
      if (selectedDelegateImage.startsWith("/")) {
        return `${this.#OPTIMISM_VOTE_BASE_URL}${selectedDelegateImage}`;
      }
      return selectedDelegateImage;
    })();

    const delegatedOP: string = z
      .string()
      .parse(delegateCard.find("div[class*=delegateCard_token_]").html());

    const address: string = z
      .string()
      .parse(
        delegateCard.find("div[class*=delegateCard_address_]  span").html(),
      );

    const description: string = z
      .string()
      .parse(
        $(
          "div > div > div > div > div[class*=markdown_agora_markdown_]",
        ).html(),
      );

    const delegateCardContent = delegateCard.find(
      "div[class*=delegateCard_content__] > div",
    );
    const proposalsVoted: string = z
      .string()
      .parse(
        delegateCardContent.find("div:nth-child(1) > span:nth-child(2)").html(),
      );

    const forAbstainAgainst: string = z
      .string()
      .parse(
        delegateCardContent.find("div:nth-child(2) > span:nth-child(2)").html(),
      );

    const recentActivity: string = z
      .string()
      .parse(
        delegateCardContent.find("div:nth-child(3) > span:nth-child(2)").html(),
      );

    const proposalsCreated: string = z
      .string()
      .parse(
        delegateCardContent.find("div:nth-child(4) > span:nth-child(2)").html(),
      );

    const delegatedFrom: string = z
      .string()
      .parse(
        delegateCardContent.find("div:nth-child(5) > span:nth-child(2)").html(),
      );
    const delegateData: DelegateData = delegateDataSchema.parse({
      address,
      description,
      delegatedOP,
      imgSrc,
      proposalsVoted,
      forAbstainAgainst,
      recentActivity,
      proposalsCreated,
      delegatedFrom,
    });

    return delegateData;
  };
}

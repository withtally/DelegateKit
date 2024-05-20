import { Client } from "pg";
import { z } from "zod";
import { pgClient } from "./pg";

const agoraDelegateRowSchema = z.object({
  address: z.string(),
  scraped_html: z.string(),
});

type AgoraDelegateRow = z.infer<typeof agoraDelegateRowSchema>;
export class Postgres {
  private pgClient: Client;
  constructor() {
    this.pgClient = pgClient;
  }

  public upsertDelegate(
    address: string,
    scrapedHtml: string,
  ): Promise<unknown> {
    return this.pgClient.query(
      `INSERT into agora_delegates (address, scraped_html)
       VALUES ($1, $2);`,
      [address, scrapedHtml],
    );
  }

  public selectRowByAddress = async (
    addressToFind: string,
  ): Promise<AgoraDelegateRow | null> => {
    const { rows } = await this.pgClient.query(
      `SELECT * FROM agora_delegates
		WHERE address = $1
    LIMIT 1`,
      [addressToFind],
    );
    const row = rows[0];
    return row;
  };
}

import { Pool } from "pg";
import { Address } from "viem";
import { z } from "zod";

const DATABASE_URL = z.string().parse(process.env.DATABASE_URL);
const pool = new Pool({
  connectionString: DATABASE_URL,
});

type DBPoll = {
  creator_address: string;
  created_at: any;
  id: string;
  title: string;
  option_1: string;
  option_2: string;
  option_3: string;
  option_4: string;
  hide_results: boolean;
};

/**
 * Backend only
 */
export class PollRepository {
  public static async createPoll(
    title: string,
    creatorAddress: Address,
    options: string[],
    hideResults: boolean,
  ) {
    const row = await pool
      .query(
        `INSERT INTO polls (title, creator_address, option_1, option_2, option_3, option_4, hide_results)
	  VALUES ($1, $2, $3, $4, $5, $6, $7)
	  RETURNING *;`,
        [
          title,
          creatorAddress.toLowerCase(),
          options[0],
          options[1],
          options[2],
          options[3],
          hideResults,
        ],
      )
      .then((res) => res.rows[0]);
    return row;
  }

  public static async getPoll(id: string) {
    const row = await pool
      .query(`SELECT * FROM polls WHERE id = $1`, [id])
      .then((res) => {
        return res.rows[0] as DBPoll;
      });
    return {
      id: row.id,
      creatorEthAddress: row.creator_address as Address,
      title: row.title,
      option1: row.option_1,
      option2: row.option_2,
      option3: row.option_3,
      option4: row.option_4,
      isPrivate: row.hide_results,
    };
  }
  public static async selectAllPolls(creatorAddress: string) {
    const rows = await pool
      .query(`SELECT * FROM polls WHERE creator_address = $1`, [
        creatorAddress.toLowerCase(),
      ])
      .then((res) => {
        return res.rows as Array<DBPoll>;
      });
    return rows.map((row) => ({
      id: row.id,
      creatorEthAddress: row.creator_address as Address,
      title: row.title,
      option1: row.option_1,
      option2: row.option_2,
      option3: row.option_3,
      option4: row.option_4,
      isPrivate: row.hide_results,
    }));
  }
}

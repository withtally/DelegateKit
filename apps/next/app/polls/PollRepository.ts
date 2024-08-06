import { Pool } from "pg";
import { env } from "process";
import { Address } from "viem";
import { Poll } from "./new/types";

const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

type DBPoll = {
  creator_address: string;
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

  public static async getPoll(id: string): Promise<Poll> {
    const [poll, pollVotes] = await Promise.all([
      pool
        .query(
          `SELECT * FROM polls
        WHERE polls.id = $1`,
          [id],
        )
        .then((res) => {
          return res.rows[0] as DBPoll;
        }),
      pool
        .query(
          `SELECT * FROM poll_votes
        WHERE poll_id = $1`,
          [id],
        )
        .then((res) => {
          return res.rows;
        }),
    ]);

    let votes1 = 0;
    let votes2 = 0;
    let votes3 = 0;
    let votes4 = 0;

    pollVotes.forEach((vote) => {
      switch (vote.option_number) {
        case 1:
          votes1 += 1;
          break;
        case 2:
          votes2 += 1;
          break;
        case 3:
          votes3 += 1;
          break;
        case 4:
          votes4 += 1;
          break;
      }
    });
    return {
      id: poll.id,
      creatorEthAddress: poll.creator_address as Address,
      title: poll.title,
      option1: poll.option_1,
      option2: poll.option_2,
      option3: poll.option_3,
      option4: poll.option_4,
      isPrivate: poll.hide_results,
      votes1,
      votes2,
      votes3,
      votes4,
    };
  }
  public static async selectAllPolls(creatorAddress: string) {
    const rows = await pool
      .query(
        `SELECT *
        FROM polls
        WHERE creator_address = $1`,
        [creatorAddress.toLowerCase()],
      )
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

  public static voteOnPoll({
    pollId,
    optionIndex,
    fromFid,
  }: {
    pollId: string;
    optionIndex: number;
    fromFid: number;
  }) {
    return pool.query(
      `INSERT INTO poll_votes(poll_id, option_number, from_fid)
      VALUES ($1, $2, $3)`,
      [pollId, optionIndex, fromFid],
    );
  }

  public static voteExists(pollId: string, fromFid: number) {
    return pool
      .query(
        `SELECT * FROM poll_votes
      WHERE poll_id = $1
      AND from_fid = $2`,
        [pollId, fromFid],
      )
      .then((res) => res.rows.length > 0);
  }

  public static insertPollFeedback({
    pollId,
    message,
    fromFid,
  }: {
    pollId: string;
    message: string;
    fromFid: number;
  }) {
    return pool.query(
      `INSERT INTO poll_feedback(poll_id, message, from_fid)
      VALUES ($1, $2, $3)`,
      [pollId, message, fromFid],
    );
  }
}

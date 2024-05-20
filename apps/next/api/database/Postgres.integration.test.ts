import { assert, test } from "vitest";
import { z } from "zod";
import { Postgres } from "./Postgres";

test("Selects rows from the database", async (t) => {
  const address = "lefteris.eth";
  const postgres = new Postgres();
  const row = await postgres.selectRowByAddress(address);
  const scrapedHtml = z.string().parse(row?.scraped_html);
  assert.equal(scrapedHtml.length > 100, true);
});

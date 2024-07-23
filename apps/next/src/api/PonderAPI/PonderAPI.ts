import { z } from "zod";

const allProposalsSchema = z.array(
  z.object({
    description: z.string(),
    canceled: z.boolean(),
    endBlock: z.string(),
    executed: z.boolean(),
    startBlock: z.string(),
    id: z.string(),
  }),
);
export class PonderAPI {
  public static async fetchAllProposals() {
    return (
      fetch("https://op-gov-ponder-api-production-083b.up.railway.app/", {
        headers: {
          "content-type": "application/json",
        },
        body: '{"query":"{\\n  proposals(orderBy: \\"startBlock\\", orderDirection: \\"desc\\", limit: 999) {\\n    items {  id    description\\n      canceled\\n      endBlock\\n      executed\\n      startBlock\\n    }\\n  }\\n}"}',
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => data.data.proposals.items)
        .then(allProposalsSchema.parse)
        // first 3 proposals were tests
        .then((proposals) => proposals.slice(0, -3))
    );
  }
}

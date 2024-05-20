import { Client } from "pg";

const DEFAULT_TIMEOUT = 5_000;
const pgClient = new Client({
  // eslint-disable-next-line no-process-env
  user: process.env.PGUSER || "postgres",
  // eslint-disable-next-line no-process-env
  password: process.env.PGPASSWORD || "postgres",
  statement_timeout: DEFAULT_TIMEOUT, // number of milliseconds before a statement in query will time out, default is no timeout
  query_timeout: DEFAULT_TIMEOUT, // number of milliseconds before a query call will timeout, default is no timeout
  connectionTimeoutMillis: DEFAULT_TIMEOUT, // number of milliseconds to wait for connection, default is no timeout
  idle_in_transaction_session_timeout: DEFAULT_TIMEOUT,
});

pgClient
  .connect()
  .then(() => console.log("⚡️ postgresql connected successfully"))
  .catch((err) => {
    console.error("☠️ Unable to connect to postgresql");
    console.error(err);
    throw err;
  });

export { pgClient };

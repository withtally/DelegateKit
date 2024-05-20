import { Client } from "pg";

// six-second timeout
const DEFAULT_TIMEOUT = 9_000;
const pgClient = new Client({
  user: process.env.PGUSER || "postgres",
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

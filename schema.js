require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? "./.env" : "./.env.development",
});
const { Client, Pool } = require("pg");

console.log("node_env", process.env.NODE_ENV);

const client =
  process.env.NODE_ENV === "production"
    ? new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
      });

client.connect();

const createUsersTable = async () => {
  const createTableSql = `CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(45) UNIQUE NOT NULL,
    sentiment_score INTEGER
  );`;

  console.log("\ncreateTableSql:", createTableSql);

  await client.query(createTableSql).then((tableErr, tableRes) => {
    if (tableErr) {
      console.log("createTableSql:", tableErr);
    }

    if (tableRes) {
      console.log("\nCREATE TABLE RESULT:", tableRes);
    }
  });
};

const dropUsersTable = () => {
  const dropTableSql = `DROP TABLE IF EXISTS users CASCADE;`;

  console.log("\ndropTableSql:", dropTableSql);

  client.query(dropTableSql).then((tableErr, tableRes) => {
    if (tableErr) {
      console.log("dropTableSql:", tableErr);
    }

    if (tableRes) {
      console.log("DROP TABLE RESULT:", tableRes);
    }
  });
};

dropUsersTable();

createUsersTable();

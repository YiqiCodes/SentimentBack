const Pool = require("pg").Pool;

// Declare a constant for the Postgres ROLE
const postgresRole = "yiqi";

const pool = new Pool({
  user: postgresRole,
  host: "localhost",
  database: "sentiment",
  password: "password",
  port: 5432,
});

const createUsersTable = async () => {
  const createTableSql = `CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(45) UNIQUE NOT NULL,
    sentiment_score INTEGER
  );`;

  console.log("\ncreateTableSql:", createTableSql);

  await pool.query(createTableSql).then((tableErr, tableRes) => {
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

  pool.query(dropTableSql).then((tableErr, tableRes) => {
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

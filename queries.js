const { Client, Pool } = require("pg");

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

const getUsers = (request, response) => {
  client.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  console.log("getuser", request.params);

  client.query(
    "SELECT * FROM users WHERE username = $1",
    [request.params.username],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log("results row", results.rows);
      response.status(200).json(results.rows[0]);
    }
  );
};

const createUser = (request, response) => {
  console.log("create user", request.body);
  const { username } = request.body;

  client.query(
    "INSERT INTO users (username) VALUES ($1)",
    [username],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${username}`);
    }
  );
};

const updateUser = (request, response) => {
  const { username, userId } = request.body;

  client.query(
    "UPDATE users SET username = $1, WHERE id = $2",
    [username, userId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${1}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const createScore = (request, response) => {
  const { score, text, userId } = request.body;

  console.log(score, text, userId);

  client.query(
    "INSERT INTO scores (user_id, text, sentiment_score) VALUES ($1, $2, $3)",
    [userId, text, score],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send({
        userId,
        text,
        score,
      });
    }
  );
};

const getUserScores = (request, response) => {
  const user_id = parseInt(request.params.user_id);

  client.query(
    "SELECT * FROM scores WHERE user_id = $1",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(results.rows);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createScore,
  getUserScores,
};

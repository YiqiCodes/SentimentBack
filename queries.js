const Pool = require("pg").Pool;
const pool = new Pool({
  user: "yiqi",
  host: "localhost",
  database: "sentiment",
  password: "password",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  console.log("getuser", request.params);

  pool.query(
    "SELECT * FROM users WHERE name = $1",
    [request.params.username],
    (error, results) => {
      if (error) {
        throw error;
      }
      // console.log("logged in");
      response.status(200).json(results.rows);
    }
  );
};

const createUser = (request, response) => {
  console.log("create user", request.body);
  const { username } = request.body;

  pool.query(
    "INSERT INTO users (name, sentiment_score) VALUES ($1, 0)",
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
  console.log("req", request.body);
  // console.log("response", response);

  // const id = parseInt(request.params.id);
  const { sentiment_score } = request.body;

  pool.query(
    "UPDATE users SET name = $1, sentiment_score = $2 WHERE id = $3",
    ["Adam", sentiment_score, 1],
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

  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

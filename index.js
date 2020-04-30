const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/update", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
